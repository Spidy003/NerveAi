"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";
import { DataTable } from "@/components/admin/DataTable";

const funnelData = [
  { name: "Landing", users: 15420 },
  { name: "Store", users: 8200 },
  { name: "Cart", users: 3150 },
  { name: "Checkout", users: 1840 },
  { name: "Order", users: 842 },
];

const sourceData = [
  { name: "Organic", value: 40 },
  { name: "Direct", value: 30 },
  { name: "Referral", value: 20 },
  { name: "Paid", value: 10 },
];
const COLORS = ["#2563EB", "#3B82F6", "#60A5FA", "#93C5FD"];

const topPages = [
  { path: "/", views: "45,210", time: "2m 14s", bounce: "42%" },
  { path: "/store", views: "28,450", time: "4m 05s", bounce: "28%" },
  { path: "/products/nerve-hub", views: "15,800", time: "3m 45s", bounce: "35%" },
  { path: "/pricing", views: "12,100", time: "1m 50s", bounce: "55%" },
];

export default function AnalyticsPage() {
  const pageCols = [
    { key: "path", label: "Page Path", render: (val: string) => <span className="font-mono font-bold text-blue-600">{val}</span> },
    { key: "views", label: "Page Views", render: (val: string) => <span className="font-semibold text-slate-800">{val}</span> },
    { key: "time", label: "Avg. Time on Page", render: (val: string) => <span className="text-slate-600">{val}</span> },
    { key: "bounce", label: "Bounce Rate", render: (val: string) => <span className="text-slate-500 font-medium">{val}</span> }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="neu-flat rounded-3xl p-6 sm:p-8">
          <h3 className="text-lg font-black text-slate-800 mb-6">User Acquisition &amp; Conversion Funnel</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={funnelData} margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#94A3B8" axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }} 
                  contentStyle={{ 
                    backgroundColor: "#E6ECF5", 
                    borderColor: "#CBD5E1", 
                    borderRadius: "16px",
                    boxShadow: "6px 6px 14px #C5D0E0, -6px -6px 14px #FFFFFF",
                    color: "#1E293B",
                    fontWeight: 600,
                  }} 
                />
                <Bar dataKey="users" radius={[0, 8, 8, 0]}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`rgba(37, 99, 235, ${1 - index * 0.18})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="neu-flat rounded-3xl p-6 sm:p-8 flex flex-col items-center">
          <h3 className="text-lg font-black text-slate-800 mb-2 w-full">Traffic Acquisition Channels</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sourceData} cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={4} dataKey="value">
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#E6ECF5", 
                    borderColor: "#CBD5E1", 
                    borderRadius: "16px",
                    boxShadow: "6px 6px 14px #C5D0E0, -6px -6px 14px #FFFFFF",
                    color: "#1E293B",
                  }} 
                  formatter={(val) => `${val}%`} 
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-lg font-black text-slate-800">Top Visited Pages</h3>
          <span className="text-xs text-slate-400 font-semibold">Storefront traffic telemetry</span>
        </div>
        <DataTable columns={pageCols} data={topPages} />
      </div>
    </div>
  );
}
