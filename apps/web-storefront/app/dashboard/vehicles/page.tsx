"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Truck, ShieldCheck, Activity } from "lucide-react";
import toast from "react-hot-toast";

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([
    { id: 1, plate: "MH 01 AB 1234", model: "Tata Ace Gold (Diesel)", status: "Active", score: 92, lastSeen: "Live Telemetry", depot: "Depot 1 (Bhiwandi)" },
    { id: 2, plate: "KA 05 XY 9876", model: "Mahindra Bolero Maxi Truck", status: "Warning", score: 45, lastSeen: "Live Telemetry", depot: "Depot 2 (Whitefield)" },
    { id: 3, plate: "DL 03 CQ 4567", model: "Maruti Super Carry CNG", status: "Active", score: 78, lastSeen: "12 mins ago", depot: "Depot 1 (Okhla)" },
    { id: 4, plate: "TN 09 AZ 3341", model: "Ashok Leyland Dost+", status: "Active", score: 88, lastSeen: "Live Telemetry", depot: "Depot 3 (Ambattur)" },
  ]);

  const handleAddVehicle = () => {
    toast.success("Depot Provisioning Modal Initialized • OBD Link Required");
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
          <span className="text-xs font-semibold text-slate-500">Commercial Fleet Registry</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="neu-btn px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Fleet Console
          </Link>
          <Link
            href="/dashboard/alerts"
            className="neu-btn px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            Predictive Alerts
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="neu-inset px-3.5 py-1 rounded-full text-[11px] font-bold text-blue-600 inline-flex items-center gap-1.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>COMMERCIAL FLEET REGISTRY</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Vehicle Asset Management
            </h1>
          </div>

          <button
            onClick={handleAddVehicle}
            className="neu-btn-primary px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 self-start sm:self-center cursor-pointer shadow-md shadow-blue-500/25 active:scale-95"
          >
            <Plus className="w-4 h-4" /> Provision New Vehicle Link
          </button>
        </div>

        {/* Vehicles Table Card */}
        <div className="neu-flat rounded-3xl p-4 sm:p-6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200/80 text-slate-400 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Registration</th>
                  <th className="p-4">Chassis / Model</th>
                  <th className="p-4">Assigned Depot</th>
                  <th className="p-4">Telemetry Health</th>
                  <th className="p-4">CAN-Bus Feed</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60">
                {vehicles.map((v) => (
                  <tr
                    key={v.id}
                    className="hover:bg-slate-200/40 transition-colors"
                  >
                    <td className="p-4 font-bold text-slate-800">
                      {v.plate}
                    </td>
                    <td className="p-4 text-slate-600 font-medium">{v.model}</td>
                    <td className="p-4 text-slate-500">{v.depot}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-black ${
                            v.score >= 80 ? "text-blue-600" : v.score >= 60 ? "text-amber-600" : "text-rose-600"
                          }`}
                        >
                          {v.score}/100
                        </span>
                        <span
                          className={`text-[10px] px-2.5 py-0.5 rounded-full uppercase font-bold ${
                            v.status === "Warning"
                              ? "neu-inset text-amber-600 font-black"
                              : "neu-inset text-emerald-600 font-bold"
                          }`}
                        >
                          {v.status}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                        <span>{v.lastSeen}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href="/dashboard"
                        className="text-blue-600 hover:text-blue-700 font-bold"
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
