"use client";

import React from "react";
import { X, Layers, Server, Database, Monitor, Cpu, Radio, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: "dark" | "light";
}

export default function ArchitectureModal({
  isOpen,
  onClose,
  theme = "dark",
}: ArchitectureModalProps) {
  if (!isOpen) return null;

  const isLight = theme === "light";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 select-none">
      <div
        className={`relative w-full max-w-5xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[92vh] font-mono transition-colors ${
          isLight
            ? "bg-[#FFFFFF] border-[#D1DCE5] text-[#0C121A]"
            : "bg-[#0A0E15] border-cyan/40 text-white"
        }`}
      >
        {/* Modal Top Bar */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b ${
            isLight ? "bg-[#F4F7FA] border-[#D1DCE5]" : "bg-[#0E141F] border-cyan/20"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                isLight ? "bg-[#00897B]/15 text-[#00897B]" : "bg-cyan/20 text-cyan"
              }`}
            >
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-cyber font-black tracking-wider uppercase">
                  3-Tier System Architecture &amp; E-Business Model
                </h3>
                <span
                  className={`px-2 py-0.5 text-[10px] rounded font-bold ${
                    isLight ? "bg-[#00897B]/15 text-[#00897B]" : "bg-cyan/20 text-cyan"
                  }`}
                >
                  MODULE 1 &amp; 3 SYLLABUS
                </span>
              </div>
              <p className="text-xs text-gray-500 font-mono">
                Nerve AI Platform • IL 470 E-Commerce and E-Business Architectural Specification
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-xs leading-relaxed">
          
          {/* Section 1: 3-Tier Architecture Flow */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className={`font-cyber text-xs font-bold tracking-widest uppercase ${isLight ? "text-[#00897B]" : "text-cyan"}`}>
                // THREE-TIER CLIENT-SERVER ARCHITECTURE (MODULE 1 &amp; 3)
              </span>
              <span className="text-[10px] text-gray-500">SOA // POLYGLOT PERSISTENCE</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* TIER 1: Presentation */}
              <div
                className={`p-5 rounded-xl border flex flex-col justify-between ${
                  isLight
                    ? "bg-[#F8FAFC] border-[#D1DCE5]"
                    : "bg-[#0D121B] border-cyan/20"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-3 text-blue-400 font-bold">
                    <Monitor className="w-4 h-4" />
                    <span>TIER 1: PRESENTATION (CLIENT)</span>
                  </div>
                  <p className="text-[11px] text-gray-400 mb-3">
                    User-facing portals built with Next.js 14 App Router, Three.js WebGL, and Tailwind CSS.
                  </p>
                  <ul className="space-y-1.5 text-[11px] text-gray-300">
                    <li>• <strong>Web Storefront:</strong> Customer B2B portal, hardware store, Razorpay checkout, 3D Mercedes telemetry.</li>
                    <li>• <strong>Admin Dashboard:</strong> Internal fleet ops, revenue split, ANSI X12 EDI 850/855 viewer.</li>
                    <li>• <strong>Fleet Console:</strong> Real-time vehicle telemetry HUD with WebSocket feed.</li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-800 text-[10px] text-gray-500">
                  Tech: Next.js 14 • React 18 • Three.js • Lucide
                </div>
              </div>

              {/* TIER 2: Application / Logic */}
              <div
                className={`p-5 rounded-xl border flex flex-col justify-between ${
                  isLight
                    ? "bg-[#F8FAFC] border-[#D1DCE5]"
                    : "bg-[#0D121B] border-cyan/30 shadow-[0_0_20px_rgba(45,225,194,0.1)]"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-3 text-[#00C896] font-bold">
                    <Server className="w-4 h-4" />
                    <span>TIER 2: APPLICATION &amp; AI (SERVER)</span>
                  </div>
                  <p className="text-[11px] text-gray-400 mb-3">
                    FastAPI asynchronous microservices running Uvicorn ASGI with native WebSockets.
                  </p>
                  <ul className="space-y-1.5 text-[11px] text-gray-300">
                    <li>• <strong>REST API Routers:</strong> 8 modules (auth, orders, fleet, telemetry, alerts, bookings, admin, webhooks).</li>
                    <li>• <strong>LSTM Neural Engine:</strong> Real-time Remaining Useful Life (RUL) inference.</li>
                    <li>• <strong>EDI Integration:</strong> ANSI X12 850 Purchase Order &amp; 855 Acknowledgment generator.</li>
                    <li>• <strong>Notification Bus:</strong> Twilio SMS &amp; Resend transactional email services.</li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-800 text-[10px] text-gray-500">
                  Tech: FastAPI • Python 3.11 • Uvicorn • PyTorch LSTM
                </div>
              </div>

              {/* TIER 3: Data / Persistence */}
              <div
                className={`p-5 rounded-xl border flex flex-col justify-between ${
                  isLight
                    ? "bg-[#F8FAFC] border-[#D1DCE5]"
                    : "bg-[#0D121B] border-cyan/20"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-3 text-purple-400 font-bold">
                    <Database className="w-4 h-4" />
                    <span>TIER 3: DATA &amp; STORAGE (DATABASE)</span>
                  </div>
                  <p className="text-[11px] text-gray-400 mb-3">
                    Polyglot persistence separating transactional ACID records from high-frequency sensor streams.
                  </p>
                  <ul className="space-y-1.5 text-[11px] text-gray-300">
                    <li>• <strong>Supabase (PostgreSQL):</strong> Relational ACID storage with Row Level Security (RLS) for users, orders, payments &amp; subscriptions.</li>
                    <li>• <strong>MongoDB Atlas:</strong> High-write time-series document store for raw CAN-bus sensor packets (Speed, RPM, Temp, Volts).</li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-800 text-[10px] text-gray-500">
                  Tech: PostgreSQL (Supabase) • MongoDB Atlas
                </div>
              </div>

            </div>
          </div>

          {/* Section 2: E-Commerce vs E-Business Viva Cheat-Sheet */}
          <div className={`p-6 rounded-xl border ${isLight ? "bg-[#F8FAFC] border-[#D1DCE5]" : "bg-[#0C1017] border-gray-800"}`}>
            <span className={`font-cyber text-xs font-bold tracking-widest uppercase block mb-3 ${isLight ? "text-[#00897B]" : "text-cyan"}`}>
              // E-COMMERCE VS. E-BUSINESS (SYLLABUS MODULE 1 COMPARISON)
            </span>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] border-collapse">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400">
                    <th className="py-2 font-bold w-1/4">Evaluation Dimension</th>
                    <th className="py-2 font-bold w-3/8 text-blue-400">Standard E-Commerce</th>
                    <th className="py-2 font-bold w-3/8 text-[#00C896]">Nerve AI E-Business Platform</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 text-gray-300">
                  <tr>
                    <td className="py-2.5 font-bold text-white">Scope</td>
                    <td className="py-2.5">Limited to online transactions and buying/selling goods.</td>
                    <td className="py-2.5 text-[#00C896]">Covers procurement, telemetry streaming, automated B2B logistics, and predictive servicing.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">Revenue Model</td>
                    <td className="py-2.5">One-time product sale margin.</td>
                    <td className="py-2.5 text-[#00C896]">Hybrid: One-time hardware sale (₹1,499) + Recurring monthly SaaS subscription (₹150–₹200/veh).</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">Supply Chain (EDI)</td>
                    <td className="py-2.5">Typically manual receipt/email confirmation.</td>
                    <td className="py-2.5 text-[#00C896]">ANSI X12 EDI 850 (Purchase Order) &amp; EDI 855 (PO Acknowledgment) automated dispatch.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">Customer Relationship</td>
                    <td className="py-2.5">Transactional (ends after delivery).</td>
                    <td className="py-2.5 text-[#00C896]">Continuous (24/7 telemetry monitoring, LSTM failure prevention, Twilio SMS dispatch).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Course Evaluation Alignment */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-[10px] font-mono">
            <div className="p-3 rounded-lg bg-gray-900 border border-gray-800">
              <span className="text-gray-400 block mb-1">Module 1 &amp; 3</span>
              <span className="font-bold text-white">3-Tier Architecture</span>
            </div>
            <div className="p-3 rounded-lg bg-gray-900 border border-gray-800">
              <span className="text-gray-400 block mb-1">Module 3</span>
              <span className="font-bold text-[#00C896]">ANSI X12 EDI 850/855</span>
            </div>
            <div className="p-3 rounded-lg bg-gray-900 border border-gray-800">
              <span className="text-gray-400 block mb-1">Module 4</span>
              <span className="font-bold text-cyan">Razorpay &amp; WebSockets</span>
            </div>
            <div className="p-3 rounded-lg bg-gray-900 border border-gray-800">
              <span className="text-gray-400 block mb-1">Module 6</span>
              <span className="font-bold text-purple-400">Twilio SMS &amp; Resend Email</span>
            </div>
          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div
          className={`px-6 py-3 border-t flex items-center justify-between text-xs font-mono ${
            isLight ? "bg-[#F4F7FA] border-[#D1DCE5]" : "bg-[#0E141F] border-gray-800"
          }`}
        >
          <span className="text-gray-500">Course: IL 470 E-Commerce &amp; E-Business</span>
          <button
            onClick={onClose}
            className={`px-4 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              isLight
                ? "bg-[#00897B] text-white hover:bg-[#00796B]"
                : "bg-cyan text-black hover:bg-cyan-glow"
            }`}
          >
            Close Specification
          </button>
        </div>
      </div>
    </div>
  );
}
