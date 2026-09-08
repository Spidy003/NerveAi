"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, Sun, Moon, ShieldCheck, CheckCircle2, Wrench } from "lucide-react";
import toast from "react-hot-toast";

export default function AlertsPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [alerts, setAlerts] = useState([
    { id: 1, plate: "KA 05 XY 9876", component: "Alternator", days: 12, date: "Oct 20, 2026", severity: "High", ack: false },
    { id: 2, plate: "DL 03 CQ 4567", component: "Battery", days: 28, date: "Nov 5, 2026", severity: "Medium", ack: false },
    { id: 3, plate: "MH 01 AB 1234", component: "Coolant Temp Anomaly", days: 4, date: "Oct 12, 2026", severity: "Critical", ack: false },
  ]);

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

  const handleAck = (id: number) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, ack: true } : a)));
    toast.success("Alert Acknowledged // Telemetry Dispatch Notified");
  };

  return (
    <div
      className={`min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-cyber select-none transition-colors duration-300 relative ${
        isLight ? "bg-[#F4F7FA] text-[#0C121A]" : "bg-[#080B10] text-white"
      }`}
    >
      <div className="absolute inset-0 bg-grid-tech opacity-30 pointer-events-none" />

      {/* Top Breadcrumb */}
      <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-between mb-8 border-b border-gray-800/80 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/" className={`text-xl font-black tracking-wider ${isLight ? "text-black" : "text-white"}`}>
            NERVE
            <span className={isLight ? "text-[#00897B]" : "text-[#2DE1C2]"}> AI</span>
          </Link>
          <span className="text-gray-500 font-mono text-sm">//</span>
          <span className="font-mono text-xs text-gray-400 tracking-wider">
            [SYS_LSTM_PREDICTION_DECK]
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-[#2DE1C2] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Fleet Console
          </Link>

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border transition-colors flex items-center gap-2 text-xs font-mono ${
              isLight
                ? "bg-white border-gray-300 text-gray-800 hover:bg-gray-100"
                : "bg-navy-card/80 border-cyan/30 text-cyan hover:bg-cyan/10"
            }`}
            title="Toggle theme"
          >
            {isLight ? <Moon className="w-4 h-4 text-amber-500" /> : <Sun className="w-4 h-4 text-cyan" />}
            <span className="hidden sm:inline">{isLight ? "DARK" : "LIGHT"} MODE</span>
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-[11px] font-mono tracking-widest text-red-400 uppercase font-bold">
                LSTM REMAINING USEFUL LIFE (RUL) ALERTS
              </span>
            </div>
            <h1 className={`text-3xl font-black ${isLight ? "text-black" : "text-white"}`}>
              Active Telemetry Predictions
            </h1>
          </div>
        </div>

        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-6 border cyber-chamfer-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                alert.ack
                  ? isLight
                    ? "bg-gray-100 border-gray-200 opacity-60"
                    : "bg-[#0A0E17]/60 border-gray-800 opacity-60"
                  : alert.days < 10
                  ? isLight
                    ? "bg-red-50 border-red-200"
                    : "bg-red-950/20 border-red-500/40"
                  : isLight
                  ? "bg-amber-50 border-amber-200"
                  : "bg-amber-950/20 border-amber-500/40"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-xl border shrink-0 ${
                    alert.days < 10
                      ? "bg-red-500/20 text-red-400 border-red-500/30"
                      : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                  }`}
                >
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-mono font-bold text-base ${isLight ? "text-black" : "text-white"}`}>
                      {alert.plate}
                    </h3>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                        alert.severity === "Critical"
                          ? "bg-red-500/20 text-red-400 border border-red-500/30"
                          : alert.severity === "High"
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      }`}
                    >
                      {alert.severity} Severity
                    </span>
                    {alert.ack && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                        ACKNOWLEDGED
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-mono text-gray-400 leading-relaxed">
                    <strong className={isLight ? "text-gray-900" : "text-gray-200"}>{alert.component}</strong>{" "}
                    failure predicted in{" "}
                    <strong className="text-[#2DE1C2]">{alert.days} operational days</strong> (projected {alert.date}).
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {!alert.ack ? (
                  <button
                    onClick={() => handleAck(alert.id)}
                    className="px-4 py-2 bg-[#2DE1C2] hover:bg-[#25c4a8] text-black font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-[0_0_15px_rgba(45,225,194,0.3)]"
                  >
                    Acknowledge
                  </button>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" /> Dispatched
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
