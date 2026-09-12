"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";
import toast from "react-hot-toast";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([
    { id: 1, plate: "KA 05 XY 9876", component: "Alternator", days: 12, date: "Oct 20, 2026", severity: "High", ack: false },
    { id: 2, plate: "DL 03 CQ 4567", component: "Battery", days: 28, date: "Nov 5, 2026", severity: "Medium", ack: false },
    { id: 3, plate: "MH 01 AB 1234", component: "Coolant Temp Anomaly", days: 4, date: "Oct 12, 2026", severity: "Critical", ack: false },
  ]);

  const handleAck = (id: number) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, ack: true } : a)));
    toast.success("Alert Acknowledged • Telemetry Dispatch Notified");
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans bg-[#E6ECF5] text-slate-800 select-none relative">
      
      {/* Top Breadcrumb */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 neu-flat px-6 py-4 rounded-full">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-lg font-black tracking-tight text-slate-800 flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl neu-flat flex items-center justify-center text-blue-600 font-extrabold text-sm">
              N
            </div>
            <span>NERVE <span className="text-blue-600">AI</span></span>
          </Link>
          <span className="text-slate-300">•</span>
          <span className="text-xs font-semibold text-slate-500">LSTM Predictive Alerts</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="neu-btn px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Fleet Console
          </Link>
          <Link
            href="/dashboard/vehicles"
            className="neu-btn-primary px-5 py-2 rounded-full text-xs font-bold tracking-wide"
          >
            Vehicle Registry
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="neu-inset px-3.5 py-1 rounded-full text-[11px] font-bold text-rose-600 inline-flex items-center gap-1.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>LSTM REMAINING USEFUL LIFE (RUL) ALERTS</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Active Telemetry Predictions
            </h1>
          </div>
        </div>

        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-6 sm:p-7 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                alert.ack
                  ? "neu-inset opacity-75"
                  : "neu-flat"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3.5 rounded-2xl shrink-0 ${
                    alert.days < 10
                      ? "neu-inset text-rose-600"
                      : "neu-inset text-amber-600"
                  }`}
                >
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <h3 className="font-extrabold text-base text-slate-800">
                      {alert.plate}
                    </h3>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                        alert.severity === "Critical"
                          ? "neu-inset text-rose-600 font-black"
                          : alert.severity === "High"
                          ? "neu-inset text-amber-600 font-bold"
                          : "neu-inset text-blue-600 font-bold"
                      }`}
                    >
                      {alert.severity} Severity
                    </span>
                    {alert.ack && (
                      <span className="neu-flat px-2.5 py-0.5 rounded-full text-[10px] text-emerald-600 font-bold">
                        ACKNOWLEDGED
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong className="text-slate-800">{alert.component}</strong>{" "}
                    failure predicted in{" "}
                    <strong className="text-blue-600">{alert.days} operational days</strong> (projected {alert.date}).
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-auto">
                {!alert.ack ? (
                  <button
                    onClick={() => handleAck(alert.id)}
                    className="neu-btn-primary px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer active:scale-95 shadow-md shadow-blue-500/20"
                  >
                    Acknowledge
                  </button>
                ) : (
                  <span className="neu-inset px-4 py-2 rounded-full flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
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
