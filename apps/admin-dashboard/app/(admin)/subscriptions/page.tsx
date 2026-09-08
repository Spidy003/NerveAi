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
    { key: "fleetName", label: "Customer" },
    { key: "subscription", label: "Plan", render: (val: string) => <span className="capitalize font-semibold text-primary">{val}</span> },
    { key: "vehicles", label: "Active Devices" },
    { key: "mrr", label: "Monthly Rev", render: (val: number) => `₹${val.toLocaleString()}` },
    { key: "joined", label: "Started Date" },
    { 
      key: "actions", 
      label: "Actions", 
      render: () => (
        <div className="flex gap-2">
          <button className="text-xs px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded transition-colors text-white">Upgrade</button>
          <button className="text-xs px-2 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded transition-colors">Cancel</button>
        </div>
      ) 
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl p-6 border border-gray-800 shadow-sm col-span-2">
          <h3 className="text-lg font-bold text-white mb-6">MRR Growth (6 Months)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mrrData}>
                <XAxis dataKey="month" stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: "#1C2128", borderColor: "#374151" }} />
                <Line type="monotone" dataKey="mrr" stroke="#00C896" strokeWidth={3} dot={{ r: 4, fill: "#00C896", strokeWidth: 2, stroke: "#1C2128" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-card rounded-xl p-6 border border-gray-800 shadow-sm">
          <h3 className="text-lg font-bold text-white mb-4">Subscription Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-800">
              <span className="text-gray-400">Total Active</span>
              <span className="text-xl font-bold text-white">1,240</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-800">
              <span className="text-gray-400">Net New (MTD)</span>
              <span className="text-xl font-bold text-primary">+45</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-800">
              <span className="text-gray-400">Churned (MTD)</span>
              <span className="text-xl font-bold text-red-500">12</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-400">Churn Rate</span>
              <span className="text-xl font-bold text-white">0.96%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 border border-gray-800 shadow-sm">
        <h3 className="text-lg font-bold text-white mb-4">Active Subscriptions</h3>
        <DataTable columns={cols} data={MOCK_CUSTOMERS.filter(c => c.status !== 'churned')} />
      </div>
    </div>
  );
}
