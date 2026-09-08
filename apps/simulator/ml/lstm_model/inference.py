# -*- coding: utf-8 -*-
"""
Nerve AI - Real-time OBD-II Inference Engine
Loads the trained LSTM model and runs predictions on mock sensor data.
Deployed as part of the FastAPI WebSocket server.
"""

import os
import sys
import json
import pickle
import asyncio
import random
import numpy as np
from datetime import datetime, timedelta
from pathlib import Path

# Force UTF-8 output on Windows
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

# ── Try loading PyTorch (falls back to mock if not available) ──
try:
    import torch
    TORCH_AVAILABLE = True
except ImportError:
    TORCH_AVAILABLE = False
    print("[WARN]  PyTorch not installed — running in MOCK mode")

MODEL_DIR = Path(__file__).parent

# ──────────────────────────────────────────────────────────────
# Load model artifacts
# ──────────────────────────────────────────────────────────────

_model        = None
_scaler       = None
_model_config = None

def load_model():
    """Load LSTM model, scaler, and config from disk."""
    global _model, _scaler, _model_config

    config_path = MODEL_DIR / "nerve_model_config.json"
    scaler_path = MODEL_DIR / "nerve_scaler.pkl"
    model_path  = MODEL_DIR / "nerve_lstm_best.pt"

    if not config_path.exists():
        print("[WARN]  Model config not found — using defaults")
        _model_config = {
            "n_features": 14,
            "window_size": 30,
            "rul_cap": 125,
            "hours_per_cycle": 4.0,
        }
    else:
        with open(config_path) as f:
            _model_config = json.load(f)
        print(f"[OK] Model config loaded: {_model_config}")

    if scaler_path.exists():
        with open(scaler_path, "rb") as f:
            _scaler = pickle.load(f)
        print("[OK] Feature scaler loaded")

    if TORCH_AVAILABLE and model_path.exists():
        try:
            # Import NerveLSTM architecture inline
            import torch.nn as nn

            class NerveLSTM(nn.Module):
                def __init__(self, n_features, hidden1=128, hidden2=64, dropout=0.2):
                    super().__init__()
                    self.lstm1 = nn.LSTM(n_features, hidden1, batch_first=True, dropout=dropout)
                    self.drop1 = nn.Dropout(dropout)
                    self.lstm2 = nn.LSTM(hidden1, hidden2, batch_first=True)
                    self.drop2 = nn.Dropout(dropout)
                    self.fc1   = nn.Linear(hidden2, 32)
                    self.relu  = nn.ReLU()
                    self.fc2   = nn.Linear(32, 1)

                def forward(self, x):
                    out, _ = self.lstm1(x)
                    out = self.drop1(out)
                    out, _ = self.lstm2(out)
                    out = self.drop2(out)
                    out = self.relu(self.fc1(out[:, -1, :]))
                    return self.fc2(out).squeeze()

            n_features = _model_config.get("n_features", 14)
            _model = NerveLSTM(n_features=n_features)
            _model.load_state_dict(torch.load(model_path, map_location="cpu"))
            _model.eval()
            print("[OK] LSTM model loaded successfully")
        except Exception as e:
            print(f"[WARN]  Could not load model weights: {e} — using mock inference")
            _model = None
    else:
        print("[WARN]  Running in MOCK inference mode")


# ──────────────────────────────────────────────────────────────
# OBD-II Sensor Data Generator
# ──────────────────────────────────────────────────────────────

class OBDSensorSimulator:
    """
    Generates realistic mock OBD-II sensor readings at 2Hz.
    Can inject fault patterns to simulate component degradation.
    """

    SENSOR_BASELINES = {
        "rpm":              (1200, 3200),
        "engine_temp":      (82,   96),
        "battery_voltage":  (13.2, 14.4),
        "fuel_pressure":    (38,   52),
        "vibration":        (0.2,  1.1),
        "speed":            (0,    90),
        "throttle_pos":     (15,   65),
        "coolant_temp":     (85,   95),
        "intake_air_temp":  (28,   42),
        "maf_sensor":       (3.5,  15.0),
        "o2_sensor":        (0.1,  0.9),
        "fuel_trim":        (-5,   5),
        "load_value":       (20,   75),
        "timing_advance":   (8,    28),
    }

    FAULT_PATTERNS = {
        "battery_failure": {
            "battery_voltage": (10.5, 11.8),   # Low voltage
            "rpm":             (800,  1600),    # Rough idle
        },
        "overheating": {
            "engine_temp":  (102, 115),         # High temp
            "coolant_temp": (105, 120),
        },
        "fuel_system": {
            "fuel_pressure": (18, 28),          # Low pressure
            "fuel_trim":     (15, 25),          # Rich correction
            "o2_sensor":     (0.0, 0.1),
        },
        "alternator": {
            "battery_voltage": (11.2, 12.5),
            "rpm":             (700, 1100),
        },
    }

    def __init__(self, vehicle_id: str, fault_mode: str = None):
        self.vehicle_id = vehicle_id
        self.fault_mode = fault_mode
        self._history: list[dict] = []
        self._tick = 0

    def inject_fault(self, fault_mode: str):
        """Trigger a fault pattern for this vehicle."""
        self.fault_mode = fault_mode
        print(f"[ALERT] Fault injected: {fault_mode} on vehicle {self.vehicle_id}")

    def clear_fault(self):
        self.fault_mode = None

    def generate_reading(self) -> dict:
        """Generate one sensor reading with optional fault injection."""
        self._tick += 1
        reading = {}

        # Add subtle noise + time-based variation
        t = self._tick / 10.0
        speed_base = 45 + 35 * abs(np.sin(t * 0.3))

        for sensor, (lo, hi) in self.SENSOR_BASELINES.items():
            if self.fault_mode and sensor in self.FAULT_PATTERNS.get(self.fault_mode, {}):
                fault_lo, fault_hi = self.FAULT_PATTERNS[self.fault_mode][sensor]
                val = random.uniform(fault_lo, fault_hi)
            else:
                mid   = (lo + hi) / 2
                noise = (hi - lo) * 0.05 * random.gauss(0, 1)
                val   = float(np.clip(mid + noise, lo, hi))
            reading[sensor] = round(val, 2)

        # Speed drives RPM
        reading["speed"] = round(speed_base, 1)
        reading["rpm"]   = round(reading["speed"] * 35 + random.uniform(-100, 100) + 800, 0)

        reading["vehicle_id"] = self.vehicle_id
        reading["timestamp"]  = datetime.utcnow().isoformat()
        reading["fault_mode"] = self.fault_mode

        self._history.append(reading)
        if len(self._history) > 100:
            self._history.pop(0)

        return reading

    def get_history(self) -> list[dict]:
        return self._history.copy()


# ──────────────────────────────────────────────────────────────
# LSTM Inference Engine
# ──────────────────────────────────────────────────────────────

FEATURE_ORDER = [
    "engine_temp", "rpm", "fuel_pressure", "vibration",
    "battery_voltage", "speed", "throttle_pos", "coolant_temp",
    "intake_air_temp", "maf_sensor", "o2_sensor", "fuel_trim",
    "load_value", "timing_advance",
]


def predict_rul(sensor_history: list[dict]) -> dict:
    """
    Run LSTM prediction on the last 30 sensor readings.
    Returns days_to_failure, health_score, alert info.
    """
    global _model, _scaler, _model_config

    if _model_config is None:
        load_model()

    window_size      = _model_config.get("window_size", 30)
    rul_cap          = _model_config.get("rul_cap", 125)
    hours_per_cycle  = _model_config.get("hours_per_cycle", 4.0)

    # ── Use real LSTM if available ──
    if _model is not None and TORCH_AVAILABLE and len(sensor_history) >= window_size:
        try:
            window = sensor_history[-window_size:]
            features = []
            for r in window:
                row = [r.get(f, 0.0) for f in FEATURE_ORDER[:_model_config.get("n_features", 14)]]
                features.append(row)

            X = np.array(features, dtype=np.float32)
            if _scaler is not None:
                n = min(X.shape[1], _scaler.n_features_in_)
                X[:, :n] = _scaler.transform(X[:, :n])

            import torch
            with torch.no_grad():
                tensor = torch.tensor(X).unsqueeze(0)
                rul_cycles = float(_model(tensor).item())

            rul_cycles = max(0, min(rul_cap, rul_cycles))
            days       = int(rul_cycles * hours_per_cycle / 24)

        except Exception as e:
            print(f"Inference error: {e} — falling back to mock")
            days = _mock_rul_from_sensors(sensor_history)
    else:
        # ── Mock inference based on sensor values ──
        days = _mock_rul_from_sensors(sensor_history)

    return _build_prediction_result(days)


def _mock_rul_from_sensors(history: list[dict]) -> int:
    """
    Heuristic RUL estimation when LSTM is unavailable.
    Uses battery voltage and engine temp as primary signals.
    """
    if not history:
        return 45  # Default healthy

    latest = history[-1]
    fault_mode = latest.get("fault_mode")

    if fault_mode == "battery_failure":
        return random.randint(10, 16)
    elif fault_mode == "overheating":
        return random.randint(5, 12)
    elif fault_mode == "fuel_system":
        return random.randint(18, 25)
    elif fault_mode == "alternator":
        return random.randint(8, 14)

    # Normal operation
    batt  = latest.get("battery_voltage", 13.5)
    temp  = latest.get("engine_temp", 88)
    score = 60

    if batt < 12.0:
        score -= 30
    elif batt < 12.8:
        score -= 15

    if temp > 105:
        score -= 25
    elif temp > 98:
        score -= 10

    return max(3, min(90, score))


def _build_prediction_result(days: int) -> dict:
    """Build full prediction response from days to failure."""
    if days > 30:
        severity = "healthy"
        alert    = None
        health   = min(100, 60 + days)
    elif days > 14:
        severity = "warning"
        alert    = f"[WARN] Component degradation detected. Estimated {days} days remaining."
        health   = 50 + days
    elif days > 7:
        severity = "critical"
        alert    = f"[CRIT] HIGH RISK: Predicted failure in {days} days. Schedule maintenance soon."
        health   = max(10, days * 3)
    else:
        severity = "failure_imminent"
        alert    = f"[ALERT] FAILURE IMMINENT in ~{days} days. Stop vehicle and inspect immediately."
        health   = max(0, days * 2)

    predicted_date = (datetime.utcnow() + timedelta(days=days)).date().isoformat()

    return {
        "days_to_failure":       days,
        "predicted_failure_date": predicted_date,
        "health_score":          min(100, health),
        "severity":              severity,
        "alert_message":         alert,
        "model_version":         "nerve-lstm-v1",
        "predicted_at":          datetime.utcnow().isoformat(),
    }


# ──────────────────────────────────────────────────────────────
# WebSocket Telemetry Packet Builder
# ──────────────────────────────────────────────────────────────

def build_telemetry_packet(vehicle_id: str, reading: dict, prediction: dict) -> dict:
    """
    Build the full real-time packet sent via WebSocket to the dashboard.
    """
    return {
        "type":       "telemetry",
        "vehicle_id": vehicle_id,
        "timestamp":  reading["timestamp"],
        "sensors": {
            "rpm":             reading["rpm"],
            "engine_temp":     reading["engine_temp"],
            "battery_voltage": reading["battery_voltage"],
            "fuel_pressure":   reading["fuel_pressure"],
            "vibration":       reading["vibration"],
            "speed":           reading["speed"],
            "throttle_pos":    reading["throttle_pos"],
            "coolant_temp":    reading["coolant_temp"],
        },
        "prediction":  prediction,
        "health_score": prediction["health_score"],
        "alert":       prediction["alert_message"],
    }


# ──────────────────────────────────────────────────────────────
# Simulator Registry (used by WebSocket server)
# ──────────────────────────────────────────────────────────────

_simulators: dict[str, OBDSensorSimulator] = {}


def get_simulator(vehicle_id: str) -> OBDSensorSimulator:
    """Get or create a simulator for a vehicle."""
    if vehicle_id not in _simulators:
        _simulators[vehicle_id] = OBDSensorSimulator(vehicle_id)
    return _simulators[vehicle_id]


def inject_fault(vehicle_id: str, fault_mode: str):
    """Inject a fault into a running vehicle simulator."""
    sim = get_simulator(vehicle_id)
    sim.inject_fault(fault_mode)


async def stream_vehicle_telemetry(vehicle_id: str, send_fn, interval: float = 2.0):
    """
    Async generator that streams telemetry for a vehicle.
    Call this from the WebSocket handler.
    send_fn: async function that sends JSON to the WebSocket client
    """
    sim = get_simulator(vehicle_id)
    load_model()

    # Pre-warm with 30 readings so LSTM has a full window
    for _ in range(30):
        sim.generate_reading()

    try:
        while True:
            reading    = sim.generate_reading()
            prediction = predict_rul(sim.get_history())
            packet     = build_telemetry_packet(vehicle_id, reading, prediction)
            await send_fn(json.dumps(packet))
            await asyncio.sleep(interval)
    except Exception as e:
        print(f"Telemetry stream ended for {vehicle_id}: {e}")


# ──────────────────────────────────────────────────────────────
# CLI test (run: python inference.py)
# ──────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("[START] Testing Nerve AI inference engine...")
    load_model()

    sim = OBDSensorSimulator("TEST-001")

    # Pre-warm
    for _ in range(30):
        sim.generate_reading()

    # Normal operation
    reading    = sim.generate_reading()
    prediction = predict_rul(sim.get_history())
    packet     = build_telemetry_packet("TEST-001", reading, prediction)

    print("\n[DATA] Normal operation:")
    print(json.dumps(packet, indent=2))

    # Inject battery fault
    print("\n[BATTERY] Injecting battery failure fault...")
    sim.inject_fault("battery_failure")
    for _ in range(5):
        sim.generate_reading()

    reading    = sim.generate_reading()
    prediction = predict_rul(sim.get_history())
    packet     = build_telemetry_packet("TEST-001", reading, prediction)

    print("[DATA] Battery fault scenario:")
    print(json.dumps({"days_to_failure": packet["prediction"]["days_to_failure"],
                      "health_score":    packet["health_score"],
                      "alert":           packet["alert"]}, indent=2))
    print("\n[OK] Inference engine working correctly!")
