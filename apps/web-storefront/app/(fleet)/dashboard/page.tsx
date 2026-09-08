"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
  Car,
  Activity,
  AlertTriangle,
  Flame,
  BatteryCharging,
  Zap,
  RotateCcw,
  Sun,
  Moon,
  LogOut,
  Gauge,
  Cpu,
  Clock,
  Radio,
  Fuel,
  Disc,
  Wrench,
  ChevronRight,
  ShieldAlert,
  CheckCircle,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import toast from "react-hot-toast";
import { useWebSocket } from "@/lib/hooks/useWebSocket";

// Dynamic Client-Only 3D WebGL Car Model with 360° Orbit Controls
const MercedesCar3D = dynamic(
  () => import("@/components/landing/MercedesCar3D"),
  { ssr: false }
);

// ====================================================================
// EXACT HIGH-TECH AUTOMOTIVE METER (MATCHING USER REFERENCE IMAGE)
// Outer Dotted Orbit + Thick Curved Gauge + Slanted Value + Boxed Badge
// ====================================================================
function CyberCircularMeter({
  value,
  min = 0,
  max = 100,
  label,
  unit,
  status,
  color = "#2DE1C2",
  size = 142,
  isAlert = false,
  isLight = false,
}: {
  value: number;
  min?: number;
  max?: number;
  label: string;
  unit: string;
  status?: string;
  color?: string;
  size?: number;
  isAlert?: boolean;
  isLight?: boolean;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const strokeWidth = size * 0.095; // Thick prominent track matching user reference
  const radius = (size - strokeWidth * 2 - 14) / 2;
  const circumference = 2 * Math.PI * radius;
  const sweepAngle = 270; // 270-degree horseshoe sweep
  const arcLength = circumference * (sweepAngle / 360);
  const pct = Math.min(1, Math.max(0, (value - min) / (max - min)));
  const strokeDashoffset = arcLength - pct * arcLength;

  const activeColor = isAlert ? "#EF4444" : color;
  const displayStatus =
    status || (isAlert ? "CRITICAL" : pct > 0.85 ? "HIGH" : pct > 0.35 ? "OPTIMAL" : "NOMINAL");

  return (
    <div
      className={`relative w-full h-full rounded-2xl border p-2 flex flex-col items-center justify-center select-none transition-all duration-300 ${
        isAlert
          ? "border-red-500/60 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.25)]"
          : isLight
          ? "bg-white border-gray-200/90 shadow-sm hover:border-gray-300"
          : "bg-[#090E17] border-cyan/25 shadow-md hover:border-cyan/45"
      }`}
    >
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="overflow-visible"
        >
          {/* 1. Outer Circular Dotted Orbit Ring (Exact match to reference image!) */}
          <circle
            cx={cx}
            cy={cy}
            r={radius + strokeWidth + 5}
            fill="none"
            stroke={isLight ? "#94A3B8" : "#334155"}
            strokeWidth={1.8}
            strokeDasharray="2 7"
            strokeLinecap="round"
            opacity={0.85}
          />

          {/* 2. Thick Muted Background Track Arc (270° from 135°) */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={isLight ? "#E2E8F0" : "#16202E"}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
            className="rotate-[135deg]"
            style={{ transformOrigin: "center" }}
          />

          {/* 3. Dynamic Filled Progress Arc */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={activeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="rotate-[135deg]"
            style={{
              transformOrigin: "center",
              transition: "stroke-dashoffset 0.5s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.3s ease",
              filter: `drop-shadow(0 0 8px ${activeColor}99)`,
            }}
          />
        </svg>

        {/* 4. Center High-Tech Content (Top Label, Slanted Bold Value, Boxed Status Badge) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-1 text-center">
          {/* Top Label (e.g. SPOOF PROBABILITY / GROUND SPEED) */}
          <span
            className={`font-mono font-bold uppercase tracking-widest text-[9px] sm:text-[10px] truncate max-w-full mb-0.5 ${
              isLight ? "text-gray-600" : "text-gray-400"
            }`}
          >
            {label}
          </span>

          {/* Large Slanted Number + Unit Badge */}
          <div className="flex items-baseline justify-center font-mono my-0.5">
            <span
              className={`font-black italic tracking-tighter leading-none ${
                isAlert
                  ? "text-red-400 animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                  : isLight
                  ? "text-gray-900"
                  : "text-white"
              }`}
              style={{ fontSize: size * 0.22 }}
            >
              {typeof value === "number" && value % 1 !== 0 ? value.toFixed(1) : value.toLocaleString()}
            </span>
            <span
              className="text-[10px] sm:text-xs font-mono font-black ml-1 uppercase"
              style={{ color: activeColor }}
            >
              {unit}
            </span>
          </div>

          {/* Bottom Boxed Status Badge (Like [AUTHENTIC] in reference image) */}
          <div
            className="mt-1 px-2.5 py-0.5 rounded border text-[8px] sm:text-[9px] font-mono font-black tracking-widest uppercase transition-all"
            style={{
              borderColor: activeColor,
              color: activeColor,
              backgroundColor: `${activeColor}15`,
              boxShadow: `0 0 8px ${activeColor}25`,
            }}
          >
            {displayStatus}
          </div>
        </div>
      </div>
    </div>
  );
}

// ====================================================================
// MAIN VEHICLE TELEMETRY DASHBOARD COMPONENT
// ====================================================================
export default function CarDashboardPage() {
  const router = useRouter();

  // Theme Sync
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const saved = localStorage.getItem("cyber-theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("cyber-theme", next);
  };

  const isLight = theme === "light";

  // Live Digital Clock
  const [currentTime, setCurrentTime] = useState("09:35:00");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", { hour12: false }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Selected Vehicle
  const [selectedVehicle, setSelectedVehicle] = useState("MH 01 AB 1234");
  const { data: wsData, connected: wsConnected } = useWebSocket("v_8932abc");

  // Mobile Mode Tab Switcher (Professional Automotive UI for Phones)
  const [mobileTab, setMobileTab] = useState<"cluster" | "diagnostics">("cluster");

  // Fault Injection Simulator (Viva Modules 1, 3, 4)
  const [activeFault, setActiveFault] = useState<"none" | "alternator" | "overheating" | "battery">("none");
  const [faultLogs, setFaultLogs] = useState<string[]>([]);

  // Computed Telemetry
  let healthScore = wsData?.healthScore || 92;
  let rpm = wsData?.rpm || 2150;
  let engineTemp = wsData?.engineTemp || 88;
  let batteryVoltage = wsData?.batteryVoltage || 12.6;
  let speed = 64;
  let failureComponent = "All Powertrain Sensors Nominal";
  let failureDays = 45;
  let failureProb = "4.2%";

  if (activeFault === "alternator") {
    healthScore = 31;
    batteryVoltage = 10.8;
    rpm = 2450;
    speed = 52;
    failureComponent = "Alternator Voltage Regulator Collapse";
    failureDays = 2;
    failureProb = "98.4%";
  } else if (activeFault === "overheating") {
    healthScore = 24;
    engineTemp = 119;
    rpm = 3100;
    speed = 40;
    failureComponent = "Coolant Loop & Radiator Thermal Overrun";
    failureDays = 1;
    failureProb = "99.1%";
  } else if (activeFault === "battery") {
    healthScore = 42;
    batteryVoltage = 11.1;
    rpm = 2200;
    speed = 58;
    failureComponent = "Lead-Acid Auxiliary Battery Cell Degradation";
    failureDays = 4;
    failureProb = "94.6%";
  }

  const triggerFault = (fault: "alternator" | "overheating" | "battery") => {
    setActiveFault(fault);
    const ts = new Date().toLocaleTimeString();
    const names = {
      alternator: "Alternator Voltage Collapse (10.8V)",
      overheating: "Coolant Loop Thermal Surge (119°C)",
      battery: "Battery Internal Resistance Spike (11.1V)",
    };

    setFaultLogs([
      `[${ts}] ⚠️ CAN-BUS FAULT: ${names[fault]} on ${selectedVehicle}`,
      `[${ts}] 🧠 LSTM Neural Model: Failure Probability spiked to ${fault === "overheating" ? "99.1%" : fault === "alternator" ? "98.4%" : "94.6%"} (RUL: <48h)`,
      `[${ts}] 📲 Twilio SMS Service: Alert dispatched to Depot Manager (+91 98765 43210)`,
      `[${ts}] 📑 ANSI X12 EDI 850: Auto-generated Purchase Order EDI-850-2026-9812`,
    ]);
    toast.error(`Fault Injected: ${names[fault]}`);
  };

  const resetFault = () => {
    setActiveFault("none");
    setFaultLogs([]);
    toast.success("Telemetry Reset: All sensors normal");
  };

  const handleSignOut = () => {
    document.cookie = "nerve_demo_session=; path=/; max-age=0";
    router.push("/login");
  };

  return (
    <div
      className={`min-h-screen lg:h-screen w-screen overflow-y-auto lg:overflow-hidden font-cyber select-none flex flex-col transition-colors duration-300 ${
        isLight ? "bg-[#EEF2F6] text-[#0C121A]" : "bg-[#05070B] text-white"
      }`}
    >
      {/* Background High-Tech Grid */}
      <div className="absolute inset-0 bg-grid-tech opacity-20 pointer-events-none" />

      {/* ============================================================ */}
      {/* 1. TOP COMPACT HUD HEADER (48px)                             */}
      {/* ============================================================ */}
      <header
        className={`relative z-30 h-12 px-2.5 sm:px-4 border-b flex items-center justify-between shrink-0 transition-colors ${
          isLight ? "bg-white/95 border-gray-300 shadow-sm" : "bg-[#090D14]/95 border-gray-800"
        }`}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span className={`text-base sm:text-lg font-black tracking-wider ${isLight ? "text-black" : "text-white"}`}>
              NERVE<span className={isLight ? "text-[#00897B]" : "text-[#2DE1C2]"}> AI</span>
            </span>
            <span className="text-gray-500 font-mono text-xs hidden sm:inline">//</span>
            <span className="text-[10px] font-mono tracking-widest text-[#2DE1C2] uppercase font-bold hidden md:inline">
              3D COCKPIT
            </span>
          </Link>

          {/* Vehicle Selector Dropdown */}
          <div className="flex items-center gap-1 font-mono text-[11px] sm:text-xs">
            <span className="text-gray-400 font-bold hidden xs:inline">UNIT:</span>
            <select
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
              className={`max-w-[125px] sm:max-w-none px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg border outline-none font-bold text-[10px] sm:text-xs cursor-pointer truncate ${
                isLight ? "bg-gray-100 border-gray-300 text-black" : "bg-[#101722] border-gray-700 text-white"
              }`}
            >
              <option value="MH 01 AB 1234">MH 01 AB 1234 (Tata Ace)</option>
              <option value="KA 05 XY 9876">KA 05 XY 9876 (Bolero)</option>
              <option value="DL 03 CQ 4567">DL 03 CQ 4567 (Super Carry)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3 font-mono text-xs">
          {/* Live Clock */}
          <div className="hidden sm:flex items-center gap-1.5 text-gray-400 text-[11px]">
            <Clock className="w-3.5 h-3.5 text-[#2DE1C2]" />
            <span className={isLight ? "text-black font-bold" : "text-white font-bold"}>{currentTime}</span>
          </div>

          {/* CAN-BUS Live Indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>CAN-BUS 60HZ</span>
          </div>

          <Link href="/pricing" className="text-gray-400 hover:text-[#2DE1C2] transition-colors hidden lg:inline">
            // PRICING
          </Link>
          <Link href="/store" className="text-gray-400 hover:text-[#2DE1C2] transition-colors hidden lg:inline">
            // STORE
          </Link>

          {/* Prominent High-Contrast Theme Switcher (Dark / Light Mode) */}
          <div
            className={`flex items-center rounded-lg sm:rounded-xl p-0.5 border text-[10px] sm:text-xs font-mono font-bold transition-all ${
              isLight
                ? "bg-gray-100 border-gray-300 shadow-inner"
                : "bg-[#0b1018] border-cyan/30 shadow-[0_0_12px_rgba(45,225,194,0.15)]"
            }`}
          >
            <button
              onClick={() => {
                setTheme("dark");
                localStorage.setItem("cyber-theme", "dark");
              }}
              className={`flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg transition-all cursor-pointer ${
                !isLight
                  ? "bg-[#2DE1C2] text-black font-black shadow-[0_0_10px_rgba(45,225,194,0.5)]"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              title="Activate Cyber Dark Mode"
            >
              <Moon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>DARK</span>
            </button>
            <button
              onClick={() => {
                setTheme("light");
                localStorage.setItem("cyber-theme", "light");
              }}
              className={`flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg transition-all cursor-pointer ${
                isLight
                  ? "bg-white text-gray-900 font-black shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
              title="Activate Clean Light Mode"
            >
              <Sun className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>LIGHT</span>
            </button>
          </div>

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            className="p-1 sm:p-1.5 text-gray-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
            title="Exit Session"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. MAIN COCKPIT HUD STAGE (Responsive Grid)                   */}
      {/* ============================================================ */}
      <main className="relative z-20 flex-1 min-h-0 p-2 sm:p-3 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-12 gap-2.5 overflow-y-auto lg:overflow-hidden">
        
        {/* Mobile Automotive View Mode Selector (Tesla/Rivian style tab switcher for Phones) */}
        <div className="flex md:hidden items-center justify-between p-1 bg-black/80 rounded-xl border border-cyan/30 shrink-0">
          <button
            onClick={() => setMobileTab("cluster")}
            className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mobileTab === "cluster"
                ? "bg-[#2DE1C2] text-black shadow-[0_0_12px_rgba(45,225,194,0.4)]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>INSTRUMENTS</span>
          </button>
          <button
            onClick={() => setMobileTab("diagnostics")}
            className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mobileTab === "diagnostics"
                ? "bg-[#2DE1C2] text-black shadow-[0_0_12px_rgba(45,225,194,0.4)]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>FAULT INJECTION</span>
          </button>
        </div>

        {/* ========================================================== */}
        {/* LEFT COLUMN: COMPACT AUTOMOTIVE DIAL GAUGES                */}
        {/* ========================================================== */}
        <section
          className={`${
            mobileTab === "cluster" ? "flex" : "hidden"
          } md:flex md:col-span-1 lg:col-span-3 rounded-2xl border p-2.5 flex-col gap-2 min-h-0 shadow-xl transition-colors ${
            isLight ? "bg-white/90 border-gray-300" : "bg-[#090D15]/95 border-cyan/30"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-800/60 pb-1.5 shrink-0">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-[#2DE1C2]" />
              <span className="font-mono text-xs uppercase font-bold text-[#2DE1C2]">
                // INSTRUMENT CLUSTER
              </span>
            </div>
            <span className="text-[10px] font-mono text-gray-400 font-bold">J1962 11-BIT CAN</span>
          </div>

          {/* Overall Health Score Card */}
          <div
            className={`p-2.5 rounded-xl border shrink-0 relative overflow-hidden transition-all ${
              healthScore < 50
                ? "bg-red-500/10 border-red-500/40"
                : isLight
                ? "bg-gray-50 border-gray-200"
                : "bg-[#06080E] border-cyan/25"
            }`}
          >
            <div className="flex items-center justify-between text-[11px] font-mono font-bold mb-1">
              <span className="text-gray-400">VEHICLE HEALTH SCORE</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] uppercase font-black ${
                  healthScore >= 80
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : healthScore >= 50
                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                    : "bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse"
                }`}
              >
                {healthScore >= 80 ? "OPTIMAL" : healthScore >= 50 ? "DEGRADED" : "CRITICAL ALERT"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-3xl font-black font-mono tracking-tight ${
                    healthScore >= 80 ? "text-[#2DE1C2]" : healthScore >= 50 ? "text-amber-400" : "text-red-400"
                  }`}
                >
                  {healthScore}
                </span>
                <span className="text-xs font-mono text-gray-500 font-bold">/ 100 PTS</span>
              </div>
              <div className="w-36 h-2 rounded-full bg-black/40 overflow-hidden border border-gray-700/50">
                <div
                  className={`h-full transition-all duration-500 ${
                    healthScore >= 80 ? "bg-[#2DE1C2]" : healthScore >= 50 ? "bg-amber-400" : "bg-red-500"
                  }`}
                  style={{ width: `${healthScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* 4 Realistic Automotive Circular Dial Meters (2x2 Grid) - Compact & High-Tech */}
          <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
            {/* Meter 1: Ground Speed */}
            <CyberCircularMeter
              value={speed}
              min={0}
              max={160}
              label="GROUND SPEED"
              unit="KM/H"
              status={speed > 100 ? "HIGH SPEED" : speed > 0 ? "CRUISE" : "STOP"}
              color="#2DE1C2"
              size={120}
              isAlert={speed > 110}
              isLight={isLight}
            />

            {/* Meter 2: Tachometer / RPM */}
            <CyberCircularMeter
              value={rpm}
              min={0}
              max={5000}
              label="ENGINE TACH"
              unit="RPM"
              status={rpm > 3000 ? "REDLINE" : "OPTIMAL"}
              color="#00C896"
              size={120}
              isAlert={rpm > 3000}
              isLight={isLight}
            />

            {/* Meter 3: Coolant Temperature */}
            <CyberCircularMeter
              value={engineTemp}
              min={40}
              max={130}
              label="COOLANT TEMP"
              unit="°C"
              status={engineTemp > 100 ? "OVERHEAT" : "NOMINAL"}
              color="#38bdf8"
              size={120}
              isAlert={engineTemp > 100}
              isLight={isLight}
            />

            {/* Meter 4: 12V Battery Voltage */}
            <CyberCircularMeter
              value={batteryVoltage}
              min={9.0}
              max={15.0}
              label="12V BATTERY"
              unit="VOLTS"
              status={batteryVoltage < 11.5 ? "LOW VOLT" : "AUTHENTIC"}
              color="#f59e0b"
              size={120}
              isAlert={batteryVoltage < 11.5}
              isLight={isLight}
            />
          </div>

          {/* Cockpit Sub-Telemetry Bar */}
          <div className={`p-2 rounded-xl border shrink-0 grid grid-cols-3 gap-1 text-[10px] font-mono text-center ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#06080E] border-gray-800/80"}`}>
            <div>
              <span className="text-gray-400 block text-[9px]">FUEL / RANGE</span>
              <span className="font-bold text-[#2DE1C2]">78% (342 KM)</span>
            </div>
            <div className="border-x border-gray-700/60 px-1">
              <span className="text-gray-400 block text-[9px]">TRANSMISSION</span>
              <span className="font-bold text-emerald-400">[ D ] DRIVE</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[9px]">DEPOT SAVINGS</span>
              <span className="font-bold text-amber-400">₹34,200/mo</span>
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* CENTER COLUMN: 3D CAR TELEMETRY MODEL                      */}
        {/* COMPLETELY REMOVED ON MOBILE (hidden md:flex)              */}
        {/* ========================================================== */}
        <section
          className={`hidden md:flex md:col-span-1 lg:col-span-6 rounded-2xl border p-3 flex-col min-h-0 overflow-hidden shadow-xl transition-colors ${
            isLight ? "bg-white/90 border-gray-300" : "bg-[#090D15]/95 border-cyan/30"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-800/60 pb-1.5 shrink-0 z-20">
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-[#2DE1C2]" />
              <span className="font-mono text-xs uppercase font-bold text-[#2DE1C2]">
                // 3D ORBIT CAR MODEL • 360° INSPECTION
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-gray-400 uppercase font-bold">DRAG TO ROTATE</span>
              <span className="w-2 h-2 rounded-full bg-[#2DE1C2] animate-ping" />
            </div>
          </div>

          {/* 3D WebGL Model Container (Fills entire available height smoothly) */}
          <div className="relative flex-1 w-full min-h-[300px] lg:min-h-0 flex items-center justify-center overflow-visible my-1">
            <MercedesCar3D theme={theme} autoRotateSpeed={0.8} framingScale={0.70} className="w-full h-full min-h-0" />

            {/* Floating Sensor Badges on Corners */}
            <div className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-black/85 text-[10px] font-mono text-[#2DE1C2] border border-cyan/40 shadow-lg pointer-events-none flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2DE1C2] animate-pulse" />
              <span>RADAR: ACTIVE (77GHz)</span>
            </div>
            <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-black/85 text-[10px] font-mono text-emerald-400 border border-emerald-500/40 shadow-lg pointer-events-none flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>OBD-II: J1962 LOCK</span>
            </div>
            <div className="absolute bottom-2 left-2 px-2 py-1 rounded-lg bg-black/85 text-[10px] font-mono text-gray-300 border border-gray-700 shadow-lg pointer-events-none">
              TYRES: FL 33 • FR 33 • RL 34 • RR 34 PSI
            </div>
            <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/85 text-[10px] font-mono text-white border border-gray-700 shadow-lg pointer-events-none">
              GNSS: 10HZ RTK • LAT 19.0760° N
            </div>
          </div>

          {/* Bottom Real-Time Diagnostic Analysis Banner */}
          <div
            className={`p-2.5 rounded-xl border shrink-0 font-mono text-xs transition-colors z-20 ${
              activeFault !== "none"
                ? "bg-red-500/15 border-red-500/40 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                : isLight
                ? "bg-gray-50 border-gray-200 text-gray-700"
                : "bg-[#06080E] border-gray-800 text-gray-300"
            }`}
          >
            <div className="flex items-center justify-between text-[10px] mb-0.5">
              <span className="text-gray-400 font-bold">// REAL-TIME CAN TELEMETRY STREAM:</span>
              <span className={activeFault !== "none" ? "text-red-400 font-bold" : "text-emerald-400 font-bold"}>
                {activeFault !== "none" ? "⚠️ CRITICAL COMPONENT ALERT" : "✓ ALL SENSORS NOMINAL"}
              </span>
            </div>
            <div className="font-bold text-xs truncate text-[#2DE1C2]">
              {failureComponent}
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* RIGHT COLUMN: 3 FAULT BUTTONS & LSTM                       */}
        {/* ========================================================== */}
        <section
          className={`${
            mobileTab === "diagnostics" ? "flex" : "hidden"
          } md:flex md:col-span-2 lg:col-span-3 rounded-2xl border p-3 flex-col gap-2 min-h-0 shadow-xl transition-colors ${
            isLight ? "bg-white/90 border-gray-300" : "bg-[#090D15]/95 border-cyan/30"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-800/60 pb-1.5 shrink-0">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-red-400" />
              <span className="font-mono text-xs uppercase font-bold text-red-400">
                // FAULT INJECTION (VIVA)
              </span>
            </div>
            {activeFault !== "none" && (
              <button
                onClick={resetFault}
                className="px-2 py-0.5 rounded bg-gray-800 hover:bg-gray-700 text-[10px] font-mono text-white flex items-center gap-1 border border-gray-700 cursor-pointer transition-all"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>

          {/* ======================================================== */}
          {/* 3 FAULT BUTTONS IN VERTICAL LINE (ONE DOWN ONE, MAX WIDTH)*/}
          {/* ======================================================== */}
          <div className="flex flex-col gap-2 shrink-0 w-full">
            {/* 1. Alternator Fault Button */}
            <button
              onClick={() => triggerFault("alternator")}
              className={`w-full p-2.5 rounded-xl border text-left font-mono transition-all cursor-pointer flex items-center justify-between group ${
                activeFault === "alternator"
                  ? "bg-red-500/20 text-white border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                  : isLight
                  ? "bg-gray-50 hover:bg-red-50 text-gray-900 border-gray-300 hover:border-red-400"
                  : "bg-[#06080E] hover:bg-red-950/30 text-gray-200 border-gray-800 hover:border-red-500/50"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`p-2 rounded-lg ${
                    activeFault === "alternator"
                      ? "bg-red-500 text-white"
                      : "bg-red-500/10 text-red-400 border border-red-500/20 group-hover:bg-red-500 group-hover:text-white"
                  } transition-colors`}
                >
                  <BatteryCharging className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black tracking-wide">1. ALTERNATOR FAULT</div>
                  <div className="text-[10px] text-gray-400 font-bold">Regulator Failure (10.8V Drop)</div>
                </div>
              </div>
              <span
                className={`text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-wider ${
                  activeFault === "alternator"
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-gray-800 text-gray-400"
                }`}
              >
                {activeFault === "alternator" ? "ACTIVE" : "INJECT"}
              </span>
            </button>

            {/* 2. Engine Overheat Fault Button */}
            <button
              onClick={() => triggerFault("overheating")}
              className={`w-full p-2.5 rounded-xl border text-left font-mono transition-all cursor-pointer flex items-center justify-between group ${
                activeFault === "overheating"
                  ? "bg-amber-500/20 text-white border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                  : isLight
                  ? "bg-gray-50 hover:bg-amber-50 text-gray-900 border-gray-300 hover:border-amber-400"
                  : "bg-[#06080E] hover:bg-amber-950/30 text-gray-200 border-gray-800 hover:border-amber-500/50"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`p-2 rounded-lg ${
                    activeFault === "overheating"
                      ? "bg-amber-500 text-black"
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-black"
                  } transition-colors`}
                >
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black tracking-wide">2. ENGINE OVERHEAT</div>
                  <div className="text-[10px] text-gray-400 font-bold">Thermal Surge (&gt;119°C Peak)</div>
                </div>
              </div>
              <span
                className={`text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-wider ${
                  activeFault === "overheating"
                    ? "bg-amber-500 text-black animate-pulse"
                    : "bg-gray-800 text-gray-400"
                }`}
              >
                {activeFault === "overheating" ? "ACTIVE" : "INJECT"}
              </span>
            </button>

            {/* 3. Battery Drop Fault Button */}
            <button
              onClick={() => triggerFault("battery")}
              className={`w-full p-2.5 rounded-xl border text-left font-mono transition-all cursor-pointer flex items-center justify-between group ${
                activeFault === "battery"
                  ? "bg-yellow-500/20 text-white border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.4)]"
                  : isLight
                  ? "bg-gray-50 hover:bg-yellow-50 text-gray-900 border-gray-300 hover:border-yellow-400"
                  : "bg-[#06080E] hover:bg-yellow-950/30 text-gray-200 border-gray-800 hover:border-yellow-500/50"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`p-2 rounded-lg ${
                    activeFault === "battery"
                      ? "bg-yellow-500 text-black"
                      : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 group-hover:bg-yellow-500 group-hover:text-black"
                  } transition-colors`}
                >
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black tracking-wide">3. BATTERY DROP</div>
                  <div className="text-[10px] text-gray-400 font-bold">Cell Degradation (&lt;11.1V Drop)</div>
                </div>
              </div>
              <span
                className={`text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-wider ${
                  activeFault === "battery"
                    ? "bg-yellow-500 text-black animate-pulse"
                    : "bg-gray-800 text-gray-400"
                }`}
              >
                {activeFault === "battery" ? "ACTIVE" : "INJECT"}
              </span>
            </button>
          </div>

          {/* LSTM RUL Prediction Box */}
          <div className={`p-2.5 rounded-xl border font-mono shrink-0 ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#06080E] border-cyan/25"}`}>
            <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1 font-bold">
              <span>LSTM REMAINING USEFUL LIFE (RUL)</span>
              <span className="text-[#2DE1C2] font-black">{failureProb} PROB</span>
            </div>
            <div className="flex items-baseline justify-between">
              <div>
                <span className={`text-2xl font-black ${activeFault !== "none" ? "text-red-400" : "text-[#2DE1C2]"}`}>
                  {failureDays} DAYS
                </span>
                <span className="text-[10px] text-gray-400 ml-1.5 font-bold">ESTIMATED RUNTIME</span>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-wider ${
                  activeFault !== "none" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                }`}
              >
                {activeFault !== "none" ? "P1 CRITICAL" : "HEALTHY"}
              </span>
            </div>
          </div>

          {/* Automated Supply Chain & EDI Audit Log Terminal (Fills remaining height) */}
          <div className="p-2.5 rounded-xl bg-black/95 border border-gray-800 font-mono text-[10px] flex-1 min-h-0 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between text-gray-400 border-b border-gray-800 pb-1 mb-1.5 shrink-0">
              <span className="text-[#2DE1C2] font-bold">// AUTOMATED SUPPLY CHAIN AUDIT:</span>
              <span className="text-[9px] text-gray-500 font-bold">MODULE 3 &amp; 4</span>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto space-y-1.5 pr-1">
              {faultLogs.length > 0 ? (
                faultLogs.map((l, i) => (
                  <div key={i} className={`leading-tight ${i === 0 ? "text-red-400 font-bold" : "text-emerald-400"}`}>
                    {l}
                  </div>
                ))
              ) : (
                <div className="text-gray-500 leading-relaxed">
                  Click any fault button above to trigger live CAN-bus degradation, trigger LSTM RUL countdowns, dispatch Twilio SMS, and generate an automated ANSI X12 EDI 850 PO.
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
