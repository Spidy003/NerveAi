"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
  Truck,
  Activity,
  AlertTriangle,
  Flame,
  BatteryCharging,
  Zap,
  RotateCcw,
  LogOut,
  Gauge,
  Clock,
  ChevronRight,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { useWebSocket } from "@/lib/hooks/useWebSocket";

// Dynamic Client-Only 3D WebGL Airport Catering Truck Model with 360° Orbit Controls
const AirportTruck3D = dynamic(
  () => import("@/components/landing/AirportTruck3D"),
  { ssr: false }
);

// ====================================================================
// NEUMORPHIC CIRCULAR DIAL GAUGE (MATCHING USER REFERENCE 75% DIAL)
// Outer Neumorphic Card + Circular Track + Convex Center Knob
// ====================================================================
function NeumorphicDialMeter({
  value,
  min = 0,
  max = 100,
  label,
  unit,
  status,
  size = 136,
  isAlert = false,
}: {
  value: number;
  min?: number;
  max?: number;
  label: string;
  unit: string;
  status?: string;
  size?: number;
  isAlert?: boolean;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const strokeWidth = 7;
  const radius = (size - strokeWidth * 2 - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(1, Math.max(0, (value - min) / (max - min)));
  const strokeDashoffset = circumference - pct * circumference;

  const displayStatus =
    status || (isAlert ? "CRITICAL" : pct > 0.85 ? "HIGH" : pct > 0.35 ? "OPTIMAL" : "NOMINAL");

  return (
    <div
      className={`neu-flat rounded-3xl p-3 sm:p-4 flex flex-col items-center justify-center select-none transition-all ${
        isAlert ? "ring-2 ring-red-500/50" : ""
      }`}
    >
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* SVG Arc Gauges */}
        <svg width={size} height={size} className="overflow-visible -rotate-90">
          {/* 1. Inset Background Track */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="#CBD5E1"
            strokeWidth={strokeWidth}
            opacity={0.4}
          />

          {/* 2. Secondary Gray Reference Track (Like reference image) */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="#94A3B8"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.4}
            strokeLinecap="round"
            opacity={0.5}
          />

          {/* 3. Primary Royal Blue or Alert Red Progress Arc */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={isAlert ? "#EF4444" : "#2563EB"}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </svg>

        {/* 4. Convex Center Neumorphic Knob */}
        <div
          className="absolute rounded-full neu-dial-knob flex flex-col items-center justify-center text-center p-2 shadow-md"
          style={{ width: size * 0.62, height: size * 0.62 }}
        >
          <span
            className={`font-black tracking-tight leading-none ${
              isAlert ? "text-red-500 animate-pulse" : "text-slate-800"
            }`}
            style={{ fontSize: size * 0.2 }}
          >
            {typeof value === "number" && value % 1 !== 0 ? value.toFixed(1) : value.toLocaleString()}
          </span>
          <span className="text-[9px] font-bold text-slate-400 mt-0.5 uppercase">
            {unit}
          </span>
        </div>
      </div>

      {/* Label and Status Pill below Dial */}
      <div className="mt-2 text-center space-y-1">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 truncate max-w-[120px]">
          {label}
        </div>
        <div
          className={`neu-inset px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
            isAlert ? "text-red-500" : "text-blue-600"
          }`}
        >
          {displayStatus}
        </div>
      </div>
    </div>
  );
}

// ====================================================================
// MAIN COCKPIT DASHBOARD COMPONENT (NEUMORPHIC SOFT UI)
// ====================================================================
export default function CarDashboardPage() {
  const router = useRouter();

  // Auth Guard
  useEffect(() => {
    const hasDemo = typeof document !== "undefined" && document.cookie.includes("nerve_demo_session=active");
    const hasSb = typeof document !== "undefined" && document.cookie.split(";").some((c) => c.trim().startsWith("sb-"));
    if (!hasDemo && !hasSb) {
      router.push("/login");
    }
  }, [router]);

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
  const { data: wsData } = useWebSocket("v_8932abc");

  // Mobile Mode Tab Switcher
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
    <div className="min-h-screen lg:h-screen w-screen bg-[#E6ECF5] text-slate-800 font-sans select-none flex flex-col overflow-y-auto lg:overflow-hidden">
      
      {/* ============================================================ */}
      {/* 1. TOP NEUMORPHIC HEADER BAR                                 */}
      {/* ============================================================ */}
      <header className="h-16 px-4 sm:px-8 border-b border-slate-200/80 flex items-center justify-between shrink-0 bg-[#E6ECF5]">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl neu-flat flex items-center justify-center">
              <span className="font-extrabold text-blue-600 text-base">N</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-slate-800">
                NERVE <span className="text-blue-600">AI</span>
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase -mt-1 hidden sm:inline">
                Cockpit Console
              </span>
            </div>
          </Link>

          {/* Vehicle Selector Dropdown */}
          <div className="neu-inset rounded-full px-3 py-1 flex items-center gap-2 text-xs font-semibold text-slate-700 ml-2">
            <span className="text-slate-400 font-bold hidden xs:inline">UNIT:</span>
            <select
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
              className="bg-transparent outline-none font-bold text-xs cursor-pointer text-slate-800"
            >
              <option value="MH 01 AB 1234">MH 01 AB 1234 (Tata Ace)</option>
              <option value="KA 05 XY 9876">KA 05 XY 9876 (Bolero)</option>
              <option value="DL 03 CQ 4567">DL 03 CQ 4567 (Super Carry)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          {/* Live Clock Pill */}
          <div className="hidden sm:flex items-center gap-2 neu-inset px-3 py-1.5 rounded-full text-slate-600 font-bold text-xs">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>{currentTime}</span>
          </div>

          {/* CAN-BUS Live Pill */}
          <div className="hidden md:flex items-center gap-2 neu-inset px-3 py-1.5 rounded-full text-blue-600 font-bold text-xs">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>CAN-BUS 60HZ</span>
          </div>

          <Link href="/pricing" className="neu-btn px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:text-blue-600 transition-colors hidden lg:inline">
            Pricing
          </Link>
          <Link href="/store" className="neu-btn px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:text-blue-600 transition-colors hidden lg:inline">
            Store
          </Link>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="neu-btn p-2 rounded-full text-slate-500 hover:text-red-500 transition-colors cursor-pointer"
            title="Exit Session"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. MAIN COCKPIT STAGE (Responsive Neumorphic Layout)          */}
      {/* ============================================================ */}
      <main className="flex-1 min-h-0 p-3 sm:p-4 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-12 gap-4 overflow-y-auto lg:overflow-hidden">
        
        {/* Mobile View Mode Switcher */}
        <div className="flex md:hidden items-center justify-between neu-flat p-1.5 rounded-2xl shrink-0 gap-2">
          <button
            onClick={() => setMobileTab("cluster")}
            className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mobileTab === "cluster"
                ? "neu-btn-primary"
                : "neu-btn text-slate-600"
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>Instruments</span>
          </button>
          <button
            onClick={() => setMobileTab("diagnostics")}
            className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mobileTab === "diagnostics"
                ? "neu-btn-primary"
                : "neu-btn text-slate-600"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Fault Injection</span>
          </button>
        </div>

        {/* ========================================================== */}
        {/* LEFT COLUMN: NEUMORPHIC DIAL GAUGES                        */}
        {/* ========================================================== */}
        <section
          className={`${
            mobileTab === "cluster" ? "flex" : "hidden"
          } md:flex md:col-span-1 lg:col-span-3 neu-flat rounded-3xl p-4 flex-col gap-3 min-h-0`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 shrink-0">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-blue-600" />
              <span className="text-xs uppercase font-bold text-slate-800">
                Instrument Cluster
              </span>
            </div>
            <span className="neu-inset px-2.5 py-0.5 rounded-full text-[9px] font-bold text-blue-600">
              J1962 CAN
            </span>
          </div>

          {/* Vehicle Health Score Card */}
          <div className="neu-flat p-3.5 rounded-2xl shrink-0 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-500 uppercase tracking-wider text-[10px]">
                Health Score
              </span>
              <span
                className={`neu-inset px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                  healthScore >= 80
                    ? "text-blue-600"
                    : healthScore >= 50
                    ? "text-amber-500"
                    : "text-red-500 animate-pulse"
                }`}
              >
                {healthScore >= 80 ? "Optimal" : healthScore >= 50 ? "Degraded" : "Critical"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1.5">
                <span
                  className={`text-3xl font-black ${
                    healthScore >= 80 ? "text-blue-600" : healthScore >= 50 ? "text-amber-500" : "text-red-500"
                  }`}
                >
                  {healthScore}
                </span>
                <span className="text-xs font-bold text-slate-400">/ 100</span>
              </div>

              {/* Progress Bar */}
              <div className="w-32 h-3 rounded-full neu-inset p-0.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    healthScore >= 80 ? "bg-blue-600" : healthScore >= 50 ? "bg-amber-500" : "bg-red-500"
                  }`}
                  style={{ width: `${healthScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* 4 Realistic Circular Dial Meters (2x2 Grid) */}
          <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
            {/* Speed Dial */}
            <NeumorphicDialMeter
              value={speed}
              min={0}
              max={160}
              label="Ground Speed"
              unit="KM/H"
              status={speed > 100 ? "HIGH" : speed > 0 ? "CRUISE" : "STOP"}
              size={116}
              isAlert={speed > 110}
            />

            {/* Tachometer Dial */}
            <NeumorphicDialMeter
              value={rpm}
              min={0}
              max={5000}
              label="Engine Tach"
              unit="RPM"
              status={rpm > 3000 ? "HIGH" : "NORMAL"}
              size={116}
              isAlert={rpm > 3000}
            />

            {/* Coolant Temp Dial */}
            <NeumorphicDialMeter
              value={engineTemp}
              min={40}
              max={130}
              label="Coolant Temp"
              unit="°C"
              status={engineTemp > 100 ? "OVERHEAT" : "NOMINAL"}
              size={116}
              isAlert={engineTemp > 100}
            />

            {/* Battery Voltage Dial */}
            <NeumorphicDialMeter
              value={batteryVoltage}
              min={9.0}
              max={15.0}
              label="12V Battery"
              unit="VOLTS"
              status={batteryVoltage < 11.5 ? "LOW" : "12.6V"}
              size={116}
              isAlert={batteryVoltage < 11.5}
            />
          </div>

          {/* Sub-Telemetry Bar */}
          <div className="neu-flat p-2.5 rounded-2xl shrink-0 grid grid-cols-3 gap-1 text-[10px] text-center">
            <div>
              <span className="text-slate-400 block text-[9px] font-medium">FUEL LEVEL</span>
              <span className="font-bold text-blue-600">78% (342 KM)</span>
            </div>
            <div className="border-x border-slate-200 px-1">
              <span className="text-slate-400 block text-[9px] font-medium">GEAR MODE</span>
              <span className="font-bold text-slate-800">[ D ] DRIVE</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[9px] font-medium">MONTHLY SAVINGS</span>
              <span className="font-bold text-blue-600">₹34,200/mo</span>
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* CENTER COLUMN: 3D TRUCK DIGITAL TWIN                       */}
        {/* ========================================================== */}
        <section className="hidden md:flex md:col-span-1 lg:col-span-6 neu-flat rounded-3xl p-4 flex-col min-h-0 overflow-hidden relative">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 shrink-0 z-20">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-600" />
              <span className="text-xs uppercase font-bold text-slate-800">
                3D Fleet Digital Twin • 360° View
              </span>
            </div>
            <div className="neu-inset px-3 py-1 rounded-full text-[10px] font-bold text-blue-600 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span>DRAG TO ROTATE</span>
            </div>
          </div>

          {/* 3D WebGL Model Container */}
          <div className="relative flex-1 w-full min-h-[300px] lg:min-h-0 flex items-center justify-center overflow-visible my-2">
            <AirportTruck3D theme="light" autoRotateSpeed={0.8} framingScale={0.72} className="w-full h-full min-h-0" />

            {/* Corner Sensor Badges */}
            <div className="absolute top-2 left-2 neu-flat px-3 py-1.5 rounded-xl text-[10px] font-bold text-blue-600 pointer-events-none flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span>RADAR: 77GHz</span>
            </div>
            <div className="absolute top-2 right-2 neu-flat px-3 py-1.5 rounded-xl text-[10px] font-bold text-slate-700 pointer-events-none flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span>OBD-II: LOCKED</span>
            </div>
          </div>

          {/* Bottom Diagnostic Banner */}
          <div className="neu-flat p-3 rounded-2xl shrink-0 z-20 space-y-1">
            <div className="flex items-center justify-between text-[10px] font-bold">
              <span className="text-slate-400 uppercase tracking-wider">CAN Telemetry Status</span>
              <span className={activeFault !== "none" ? "text-red-500 font-extrabold" : "text-blue-600 font-extrabold"}>
                {activeFault !== "none" ? "⚠️ CRITICAL ALERT" : "✓ ALL SENSORS NOMINAL"}
              </span>
            </div>
            <div className="font-bold text-xs text-slate-800 truncate">
              {failureComponent}
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* RIGHT COLUMN: FAULT INJECTION & LSTM RUL LOGS              */}
        {/* ========================================================== */}
        <section
          className={`${
            mobileTab === "diagnostics" ? "flex" : "hidden"
          } md:flex md:col-span-2 lg:col-span-3 neu-flat rounded-3xl p-4 flex-col gap-3 min-h-0`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 shrink-0">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-xs uppercase font-bold text-slate-800">
                Fault Injection (Viva)
              </span>
            </div>
            {activeFault !== "none" && (
              <button
                onClick={resetFault}
                className="neu-btn px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-600 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>

          {/* 3 Fault Action Buttons */}
          <div className="flex flex-col gap-2.5 shrink-0 w-full">
            {/* 1. Alternator Fault Button */}
            <button
              onClick={() => triggerFault("alternator")}
              className={`w-full p-3 rounded-2xl text-left transition-all cursor-pointer flex items-center justify-between group ${
                activeFault === "alternator"
                  ? "neu-inset text-red-600 font-bold"
                  : "neu-btn text-slate-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl neu-flat flex items-center justify-center text-red-500">
                  <BatteryCharging className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold">1. Alternator Fault</div>
                  <div className="text-[10px] text-slate-400">10.8V Regulator Drop</div>
                </div>
              </div>
              <span
                className={`text-[9px] px-2.5 py-1 rounded-full font-bold uppercase ${
                  activeFault === "alternator"
                    ? "bg-red-500 text-white animate-pulse"
                    : "neu-inset text-slate-500"
                }`}
              >
                {activeFault === "alternator" ? "ACTIVE" : "INJECT"}
              </span>
            </button>

            {/* 2. Engine Overheat Fault Button */}
            <button
              onClick={() => triggerFault("overheating")}
              className={`w-full p-3 rounded-2xl text-left transition-all cursor-pointer flex items-center justify-between group ${
                activeFault === "overheating"
                  ? "neu-inset text-amber-600 font-bold"
                  : "neu-btn text-slate-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl neu-flat flex items-center justify-center text-amber-500">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold">2. Engine Overheat</div>
                  <div className="text-[10px] text-slate-400">Thermal Surge (&gt;119°C)</div>
                </div>
              </div>
              <span
                className={`text-[9px] px-2.5 py-1 rounded-full font-bold uppercase ${
                  activeFault === "overheating"
                    ? "bg-amber-500 text-white animate-pulse"
                    : "neu-inset text-slate-500"
                }`}
              >
                {activeFault === "overheating" ? "ACTIVE" : "INJECT"}
              </span>
            </button>

            {/* 3. Battery Drop Fault Button */}
            <button
              onClick={() => triggerFault("battery")}
              className={`w-full p-3 rounded-2xl text-left transition-all cursor-pointer flex items-center justify-between group ${
                activeFault === "battery"
                  ? "neu-inset text-amber-600 font-bold"
                  : "neu-btn text-slate-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl neu-flat flex items-center justify-center text-blue-600">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold">3. Battery Drop</div>
                  <div className="text-[10px] text-slate-400">Cell Drop (&lt;11.1V)</div>
                </div>
              </div>
              <span
                className={`text-[9px] px-2.5 py-1 rounded-full font-bold uppercase ${
                  activeFault === "battery"
                    ? "bg-blue-600 text-white animate-pulse"
                    : "neu-inset text-slate-500"
                }`}
              >
                {activeFault === "battery" ? "ACTIVE" : "INJECT"}
              </span>
            </button>
          </div>

          {/* LSTM RUL Prediction Card */}
          <div className="neu-flat p-3.5 rounded-2xl shrink-0 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
              <span>LSTM REMAINING USEFUL LIFE (RUL)</span>
              <span className="text-blue-600 font-extrabold">{failureProb} PROB</span>
            </div>
            <div className="flex items-baseline justify-between">
              <div>
                <span className={`text-2xl font-black ${activeFault !== "none" ? "text-red-500" : "text-blue-600"}`}>
                  {failureDays} DAYS
                </span>
                <span className="text-[10px] font-bold text-slate-400 ml-1.5">ESTIMATED RUNTIME</span>
              </div>
              <span
                className={`neu-inset px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                  activeFault !== "none" ? "text-red-500" : "text-blue-600"
                }`}
              >
                {activeFault !== "none" ? "P1 CRITICAL" : "HEALTHY"}
              </span>
            </div>
          </div>

          {/* Automated Supply Chain & EDI Audit Log */}
          <div className="neu-inset p-3 rounded-2xl text-[10px] flex-1 min-h-0 flex flex-col overflow-hidden space-y-2">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-300/80 pb-1 shrink-0 font-bold">
              <span className="text-blue-600">AUTOMATED SUPPLY CHAIN AUDIT</span>
              <span className="text-[9px]">MODULE 3 &amp; 4</span>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto space-y-1.5 pr-1 font-mono">
              {faultLogs.length > 0 ? (
                faultLogs.map((l, i) => (
                  <div key={i} className={`leading-tight ${i === 0 ? "text-red-500 font-bold" : "text-slate-700 font-medium"}`}>
                    {l}
                  </div>
                ))
              ) : (
                <div className="text-slate-400 leading-relaxed font-sans text-xs">
                  Click any fault injection button above to simulate live CAN-bus failure, trigger LSTM neural RUL recalculations, dispatch Twilio alerts, and auto-generate an ANSI X12 EDI 850 Purchase Order.
                </div>
              )}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
