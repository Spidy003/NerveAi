"use client";

import { MOCK_ALERTS } from "@/lib/mock-data";
import { DataTable } from "@/components/admin/DataTable";
import { format } from "date-fns";

export default function AlertsPage() {
  const cols = [
    { key: "vehicle", label: "Vehicle Plate", render: (val: string) => <span className="font-mono bg-gray-800 px-2 py-1 rounded text-white">{val}</span> },
    { key: "customer", label: "Fleet" },
    { key: "component", label: "Component", render: (val: string) => <span className="font-semibold text-gray-200">{val}</span> },
    { key: "daysRemaining", label: "Time to Failure", render: (val: number) => <span className={`font-bold ${val <= 3 ? 'text-red-500' : 'text-yellow-500'}`}>{val} Days</span> },
    { key: "date", label: "Triggered At", render: (val: string) => format(new Date(val), "MMM dd, HH:mm") },
    { 
      key: "status", 
      label: "Status",
      render: (val: string) => (
        <span className={`px-2 py-1 rounded text-xs capitalize ${
          val === 'acknowledged' ? 'bg-primary/20 text-primary' : 'bg-red-500/20 text-red-500 animate-pulse'
        }`}>{val}</span>
      )
    },
    { 
      key: "actions", 
      label: "Actions", 
      render: (_: any, item: any) => (
        <button 
          disabled={item.status === 'acknowledged'}
          className={`text-xs px-3 py-1 rounded transition-colors ${
            item.status === 'acknowledged' 
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
              : 'bg-primary text-background hover:bg-primary/90 font-semibold'
          }`}
        >
          {item.status === 'acknowledged' ? 'Done' : 'Acknowledge'}
        </button>
      ) 
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-xl border border-gray-800">
          <h4 className="text-gray-400 text-sm">Total Alerts (MTD)</h4>
          <p className="text-3xl font-bold text-white mt-2">156</p>
        </div>
        <div className="bg-card p-6 rounded-xl border border-gray-800">
          <h4 className="text-gray-400 text-sm">Critical Unresolved</h4>
          <p className="text-3xl font-bold text-red-500 mt-2">24</p>
        </div>
        <div className="bg-card p-6 rounded-xl border border-gray-800">
          <h4 className="text-gray-400 text-sm">Resolution Rate</h4>
          <p className="text-3xl font-bold text-primary mt-2">94.5%</p>
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 border border-gray-800 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">Active Predictive Alerts</h3>
          <select className="bg-background border border-gray-700 text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary">
            <option>All Severities</option>
            <option>Critical Only</option>
            <option>Warning Only</option>
          </select>
        </div>
        <DataTable columns={cols} data={MOCK_ALERTS} />
      </div>
    </div>
  );
}
