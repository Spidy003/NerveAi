"use client";

import { MOCK_CUSTOMERS } from "@/lib/mock-data";
import { DataTable } from "@/components/admin/DataTable";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const mrrData = [
  { month: "Jan", mrr: 650000 },
  { month: "Feb", mrr: 680000 },
  { month: "Mar", mrr: 720000 },
  { month: "Apr", mrr: 750000 },
  { month: "May", mrr: 810000 },
  { month: "Jun", mrr: 840000 },
];

export default function SubscriptionsPage() {
  const cols = [
    { key: "fleetName", label: "Customer", render: (val: string) => <span className="font-bold text-slate-800">{val}</span> },
    { key: "subscription", label: "Plan", render: (val: string) => <span className="capitalize font-bold text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{val}</span> },
    { key: "vehicles", label: "Active Devices", render: (val: number) => <span className="font-semibold text-slate-700">{val}</span> },
    { key: "mrr", label: "Monthly Rev", render: (val: number) => <span className="font-bold text-blue-600">₹{val.toLocaleString()}</span> },
    { key: "joined", label: "Started Date", render: (val: string) => <span className="text-slate-500 text-xs">{val}</span> },
    { 
      key: "actions", 
      label: "Actions", 
      render: () => (
        <div className="flex gap-2">
          <button className="text-xs px-3 py-1.5 neu-btn hover:text-blue-600 rounded-xl font-bold transition-all text-slate-700 cursor-pointer">Upgrade</button>
          <button className="text-xs px-3 py-1.5 neu-btn hover:text-rose-600 text-rose-500 rounded-xl font-bold transition-all cursor-pointer">Cancel</button>
        </div>
      ) 
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="neu-flat rounded-3xl p-6 sm:p-8 col-span-2">
          <h3 className="text-lg font-black text-slate-800 mb-6">MRR Growth Trajectory (6 Months)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mrrData}>
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#E6ECF5", 
                    borderColor: "#CBD5E1", 
                    borderRadius: "16px",
                    boxShadow: "6px 6px 14px #C5D0E0, -6px -6px 14px #FFFFFF",
                    color: "#1E293B",
                    fontWeight: 600,
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="mrr" 
                  stroke="#2563EB" 
                  strokeWidth={3.5} 
                  dot={{ r: 5, fill: "#2563EB", strokeWidth: 2, stroke: "#E6ECF5" }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="neu-flat rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
          <h3 className="text-lg font-black text-slate-800 mb-4">Subscription Key Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2.5 border-b border-slate-200/80">
              <span className="text-xs font-semibold text-slate-500">Total Active</span>
              <span className="text-xl font-black text-slate-800">1,240</span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-slate-200/80">
              <span className="text-xs font-semibold text-slate-500">Net New (MTD)</span>
              <span className="text-xl font-black text-emerald-600">+45</span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-slate-200/80">
              <span className="text-xs font-semibold text-slate-500">Churned (MTD)</span>
              <span className="text-xl font-black text-rose-600">12</span>
            </div>
            <div className="flex justify-between items-center py-2.5">
              <span className="text-xs font-semibold text-slate-500">Churn Rate</span>
              <span className="text-xl font-black text-slate-800">0.96%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-lg font-black text-slate-800">Active Subscriptions</h3>
          <span className="text-xs text-slate-400 font-semibold">Real-time Telemetry Accounts</span>
        </div>
        <DataTable columns={cols} data={MOCK_CUSTOMERS.filter(c => c.status !== 'churned')} />
      </div>
    </div>
  );
}
