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
const COLORS = ["#00C896", "#3B82F6", "#F59E0B", "#EF4444"];

const topPages = [
  { path: "/", views: "45,210", time: "2m 14s", bounce: "42%" },
  { path: "/store", views: "28,450", time: "4m 05s", bounce: "28%" },
  { path: "/products/nerve-hub", views: "15,800", time: "3m 45s", bounce: "35%" },
  { path: "/pricing", views: "12,100", time: "1m 50s", bounce: "55%" },
];

export default function AnalyticsPage() {
  const pageCols = [
    { key: "path", label: "Page Path", render: (val: string) => <span className="font-mono text-primary">{val}</span> },
    { key: "views", label: "Page Views" },
    { key: "time", label: "Avg. Time on Page" },
    { key: "bounce", label: "Bounce Rate" }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-6 border border-gray-800 shadow-sm">
          <h3 className="text-lg font-bold text-white mb-6">Conversion Funnel</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={funnelData} margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#9CA3AF" axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: "#1C2128", borderColor: "#374151" }} />
                <Bar dataKey="users" radius={[0, 4, 4, 0]}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`rgba(0, 200, 150, ${1 - index * 0.15})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border border-gray-800 shadow-sm flex flex-col items-center">
          <h3 className="text-lg font-bold text-white mb-2 w-full">Traffic Sources</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sourceData} cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={2} dataKey="value">
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#1C2128", borderColor: "#374151" }} formatter={(val) => `${val}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 border border-gray-800 shadow-sm">
        <h3 className="text-lg font-bold text-white mb-4">Top Pages</h3>
        <DataTable columns={pageCols} data={topPages} />
      </div>
    </div>
  );
}
