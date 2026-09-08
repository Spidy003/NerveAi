"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Sun, Moon, Truck, ShieldCheck, Activity } from "lucide-react";
import toast from "react-hot-toast";

export default function VehiclesPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [vehicles, setVehicles] = useState([
    { id: 1, plate: "MH 01 AB 1234", model: "Tata Ace Gold (Diesel)", status: "Active", score: 92, lastSeen: "Live Telemetry", depot: "Depot 1 (Bhiwandi)" },
    { id: 2, plate: "KA 05 XY 9876", model: "Mahindra Bolero Maxi Truck", status: "Warning", score: 45, lastSeen: "Live Telemetry", depot: "Depot 2 (Whitefield)" },
    { id: 3, plate: "DL 03 CQ 4567", model: "Maruti Super Carry CNG", status: "Active", score: 78, lastSeen: "12 mins ago", depot: "Depot 1 (Okhla)" },
    { id: 4, plate: "TN 09 AZ 3341", model: "Ashok Leyland Dost+", status: "Active", score: 88, lastSeen: "Live Telemetry", depot: "Depot 3 (Ambattur)" },
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

  const handleAddVehicle = () => {
    toast.success("Depot Provisioning Modal Initialized // OBD Link Required");
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
            [SYS_FLEET_VEHICLE_REGISTRY]
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

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#2DE1C2] animate-ping" />
              <span className="text-[11px] font-mono tracking-widest text-[#2DE1C2] uppercase font-bold">
                COMMERCIAL FLEET REGISTRY
              </span>
            </div>
            <h1 className={`text-3xl font-black ${isLight ? "text-black" : "text-white"}`}>
              Vehicle Asset Management
            </h1>
          </div>

          <button
            onClick={handleAddVehicle}
            className="px-5 py-3 bg-[#2DE1C2] hover:bg-[#25c4a8] text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(45,225,194,0.3)] flex items-center gap-2 self-start sm:self-center"
          >
            <Plus className="w-4 h-4" /> Provision New Vehicle Link
          </button>
        </div>

        {/* Vehicles Table HUD */}
        <div className={`border cyber-chamfer-lg shadow-2xl overflow-hidden ${
          isLight ? "bg-white border-gray-200" : "bg-[#0E1520]/90 border-cyan/20"
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className={`border-b text-gray-400 uppercase tracking-wider ${
                isLight ? "bg-gray-50 border-gray-200" : "bg-[#090D14] border-gray-800"
              }`}>
                <tr>
                  <th className="p-4">Registration</th>
                  <th className="p-4">Chassis / Model</th>
                  <th className="p-4">Assigned Depot</th>
                  <th className="p-4">Telemetry Health</th>
                  <th className="p-4">CAN-Bus Feed</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isLight ? "divide-gray-200" : "divide-gray-800/80"}`}>
                {vehicles.map((v) => (
                  <tr
                    key={v.id}
                    className={`transition-colors ${
                      isLight ? "hover:bg-gray-50" : "hover:bg-[#121926]"
                    }`}
                  >
                    <td className="p-4 font-bold">
                      <span className={isLight ? "text-black" : "text-white"}>{v.plate}</span>
                    </td>
                    <td className="p-4 text-gray-400">{v.model}</td>
                    <td className="p-4 text-gray-400">{v.depot}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-black ${
                            v.score >= 80 ? "text-[#2DE1C2]" : v.score >= 60 ? "text-amber-400" : "text-red-400"
                          }`}
                        >
                          {v.score}/100
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${
                            v.status === "Warning"
                              ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                              : "bg-[#2DE1C2]/15 text-[#2DE1C2] border border-[#2DE1C2]/30"
                          }`}
                        >
                          {v.status}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2DE1C2] animate-pulse" />
                        <span>{v.lastSeen}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href="/dashboard"
                        className="text-[#2DE1C2] hover:underline font-bold"
                      >
                        Inspect Telemetry &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
