import asyncio
import json
import sys
import os
import random
from datetime import datetime
from pathlib import Path
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Query
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from db.mongo_client import mongo_client
from routers import auth, orders, fleet, telemetry, alerts, bookings, admin, webhooks

# ── Add simulator to path so inference.py can be imported ──
INFERENCE_PATH = Path(__file__).parent.parent.parent / "apps" / "simulator" / "ml" / "lstm_model"
if str(INFERENCE_PATH) not in sys.path:
    sys.path.insert(0, str(INFERENCE_PATH))

try:
    from inference import get_simulator, predict_rul, build_telemetry_packet, inject_fault
    INFERENCE_AVAILABLE = True
    print("✅ LSTM inference engine loaded")
except ImportError as e:
    INFERENCE_AVAILABLE = False
    print(f"⚠️  Inference engine not available: {e} — using basic mock")


# ──────────────────────────────────────────────────────────────
# WebSocket connection manager
# ──────────────────────────────────────────────────────────────
class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[str, list[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, vehicle_id: str):
        await websocket.accept()
        if vehicle_id not in self.active_connections:
            self.active_connections[vehicle_id] = []
        self.active_connections[vehicle_id].append(websocket)

    def disconnect(self, websocket: WebSocket, vehicle_id: str):
        if vehicle_id in self.active_connections:
            try:
                self.active_connections[vehicle_id].remove(websocket)
            except ValueError:
                pass

    async def broadcast_to_vehicle(self, message: dict, vehicle_id: str):
        for ws in self.active_connections.get(vehicle_id, []):
            try:
                await ws.send_json(message)
            except Exception:
                pass

manager = ConnectionManager()


@asynccontextmanager
async def lifespan(app: FastAPI):
    mongo_client.connect()
    yield
    mongo_client.close()


app = FastAPI(
    title="Nerve AI API",
    description="Predictive Fleet Maintenance & Energy Optimizer API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ──
app.include_router(auth.router,      prefix="", tags=["Auth"])
app.include_router(orders.router,    prefix="", tags=["Orders"])
app.include_router(fleet.router,     prefix="", tags=["Fleet"])
app.include_router(telemetry.router, prefix="", tags=["Telemetry"])
app.include_router(alerts.router,    prefix="", tags=["Alerts"])
app.include_router(bookings.router,  prefix="", tags=["Bookings"])
app.include_router(admin.router,     prefix="", tags=["Admin"])
app.include_router(webhooks.router,  prefix="", tags=["Webhooks"])


@app.get("/", tags=["System"])
async def root():
    return {
        "status": "online",
        "service": "Nerve AI Predictive Fleet Telemetry Engine",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health",
        "timestamp": datetime.utcnow().isoformat(),
    }


@app.get("/health", tags=["System"])
async def health_check():
    return {
        "status": "ok",
        "inference_engine": INFERENCE_AVAILABLE,
        "timestamp": datetime.utcnow().isoformat(),
    }



# ──────────────────────────────────────────────────────────────
# WebSocket: Live Telemetry + LSTM Inference Stream
# ──────────────────────────────────────────────────────────────

async def telemetry_stream(websocket: WebSocket, vehicle_id: str, fault_mode: str = None):
    """
    Streams real-time telemetry + LSTM predictions every 2 seconds.
    Uses the real inference engine if available, otherwise falls back to mock.
    """
    if INFERENCE_AVAILABLE:
        sim = get_simulator(vehicle_id)
        if fault_mode:
            inject_fault(vehicle_id, fault_mode)
        # Pre-warm simulator with 30 readings for full LSTM window
        for _ in range(30):
            sim.generate_reading()

    try:
        while True:
            if INFERENCE_AVAILABLE:
                reading    = sim.generate_reading()
                prediction = predict_rul(sim.get_history())
                packet     = build_telemetry_packet(vehicle_id, reading, prediction)
            else:
                # Basic mock fallback
                days = 14 if fault_mode else random.randint(30, 90)
                packet = {
                    "type": "telemetry",
                    "vehicle_id": vehicle_id,
                    "timestamp": datetime.utcnow().isoformat(),
                    "sensors": {
                        "rpm":             round(random.uniform(800, 3200), 0),
                        "engine_temp":     round(random.uniform(82, 98), 1),
                        "battery_voltage": round(random.uniform(12.8, 14.4), 2),
                        "fuel_pressure":   round(random.uniform(38, 52), 1),
                        "vibration":       round(random.uniform(0.2, 1.2), 2),
                        "speed":           round(random.uniform(0, 90), 1),
                        "throttle_pos":    round(random.uniform(15, 60), 1),
                        "coolant_temp":    round(random.uniform(85, 95), 1),
                    },
                    "prediction": {
                        "days_to_failure": days,
                        "health_score": min(100, days + 30),
                        "severity": "warning" if days <= 14 else "healthy",
                        "alert_message": f"⚠️ Predicted failure in {days} days" if days <= 14 else None,
                    },
                    "health_score": min(100, days + 30),
                    "alert": f"⚠️ Predicted failure in {days} days" if days <= 14 else None,
                }

            await websocket.send_json(packet)
            await asyncio.sleep(2)

    except Exception:
        pass  # Client disconnected


@app.websocket("/ws/{vehicle_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    vehicle_id: str,
    fault: str = Query(default=None, description="Inject fault: battery_failure|overheating|fuel_system|alternator"),
):
    """
    WebSocket endpoint for real-time vehicle telemetry.
    Connect: ws://localhost:8000/ws/{vehicle_id}
    Inject fault: ws://localhost:8000/ws/{vehicle_id}?fault=battery_failure
    """
    await manager.connect(websocket, vehicle_id)
    stream_task = asyncio.create_task(telemetry_stream(websocket, vehicle_id, fault_mode=fault))
    try:
        while True:
            msg = await websocket.receive_text()
            # Handle client commands e.g. {"action": "inject_fault", "fault": "battery_failure"}
            try:
                cmd = json.loads(msg)
                if cmd.get("action") == "inject_fault" and INFERENCE_AVAILABLE:
                    inject_fault(vehicle_id, cmd.get("fault", "battery_failure"))
                elif cmd.get("action") == "clear_fault" and INFERENCE_AVAILABLE:
                    sim = get_simulator(vehicle_id)
                    sim.clear_fault()
            except Exception:
                pass
    except WebSocketDisconnect:
        manager.disconnect(websocket, vehicle_id)
        stream_task.cancel()

