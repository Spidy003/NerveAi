"use client";

import { useState } from "react";
import { MOCK_ALERTS } from "@/lib/mock-data";
import { DataTable } from "@/components/admin/DataTable";
import { format } from "date-fns";
import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";

export default function AlertsPage() {
  const [filterSeverity, setFilterSeverity] = useState("All");

  const filteredAlerts = MOCK_ALERTS.filter(alert => {
    if (filterSeverity === "Critical") return alert.severity === "critical";
    if (filterSeverity === "Warning") return alert.severity === "warning";
    return true;
  });

  const cols = [
    { 
      key: "vehicle", 
      label: "Vehicle Plate", 
      render: (val: string) => (
        <span className="font-mono text-xs font-bold neu-inset px-2.5 py-1 rounded-lg text-slate-700">
          {val}
        </span>
      ) 
    },
    { key: "customer", label: "Fleet", render: (val: string) => <span className="font-semibold text-slate-800">{val}</span> },
    { key: "component", label: "Component", render: (val: string) => <span className="font-medium text-slate-700">{val}</span> },
    { 
      key: "daysRemaining", 
      label: "Time to Failure", 
      render: (val: number) => (
        <span className={`font-black ${val <= 3 ? 'text-rose-600' : 'text-amber-600'}`}>
          {val} Days
        </span>
      ) 
    },
    { key: "date", label: "Triggered At", render: (val: string) => <span className="text-xs text-slate-500">{format(new Date(val), "MMM dd, HH:mm")}</span> },
    { 
      key: "status", 
      label: "Status",
      render: (val: string) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${
          val === 'acknowledged' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
        }`}>{val}</span>
      )
    },
    { 
      key: "actions", 
      label: "Actions", 
      render: (_: any, item: any) => (
        <button 
          disabled={item.status === 'acknowledged'}
          className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all ${
            item.status === 'acknowledged' 
              ? 'neu-inset text-slate-400 cursor-not-allowed opacity-60' 
              : 'neu-btn-primary cursor-pointer'
          }`}
        >
          {item.status === 'acknowledged' ? 'Resolved' : 'Acknowledge'}
        </button>
      ) 
    }
  ];

  return (
    <div className="space-y-8">
      {/* Top 3 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="neu-flat p-6 rounded-3xl flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Alerts (MTD)</h4>
            <p className="text-3xl font-black text-slate-800 mt-2">156</p>
          </div>
          <div className="w-12 h-12 neu-inset rounded-2xl flex items-center justify-center text-blue-600">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="neu-flat p-6 rounded-3xl flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Critical Unresolved</h4>
            <p className="text-3xl font-black text-rose-600 mt-2">24</p>
          </div>
          <div className="w-12 h-12 neu-inset rounded-2xl flex items-center justify-center text-rose-600">
            <ShieldAlert className="w-6 h-6" />
          </div>
        </div>

        <div className="neu-flat p-6 rounded-3xl flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Auto-Resolution Rate</h4>
            <p className="text-3xl font-black text-blue-600 mt-2">94.5%</p>
          </div>
          <div className="w-12 h-12 neu-inset rounded-2xl flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Alerts Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-1">
          <div>
            <h3 className="text-lg font-black text-slate-800">Active Predictive Alerts</h3>
            <p className="text-xs text-slate-400 font-medium">Predicted via LSTM neural telemetry inference</p>
          </div>

          <div className="flex gap-2">
            {["All", "Critical", "Warning"].map((sev) => (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  filterSeverity === sev
                    ? "neu-btn-primary"
                    : "neu-btn text-slate-600 hover:text-slate-900"
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        <DataTable columns={cols} data={filteredAlerts} />
      </div>
    </div>
  );
}
