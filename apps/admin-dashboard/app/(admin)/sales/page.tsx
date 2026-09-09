"use client";

import { useState, useMemo } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { generateRevenueData, MOCK_ORDERS } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import { Download, FileCode } from "lucide-react";
import EDIDocumentModal, { OrderRecord } from "@/components/admin/EDIDocumentModal";

export default function SalesPage() {
  const [period, setPeriod] = useState("30D");
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
  const chartData = useMemo(() => generateRevenueData(30), []);

  const orderCols = [
    { key: "id", label: "Order ID", render: (val: string) => <span className="font-mono font-bold text-blue-600">{val}</span> },
    { key: "customer", label: "Customer" },
    { key: "amount", label: "Total Amount", render: (val: number) => <span className="font-bold text-slate-800">₹{val.toLocaleString()}</span> },
    { 
      key: "status", 
      label: "Status", 
      render: (val: string) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${
          val === 'completed' ? 'bg-emerald-100 text-emerald-700' : 
          val === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
        }`}>{val}</span>
      )
    },
    { key: "date", label: "Date", render: (val: string) => <span className="text-slate-500 text-xs">{val}</span> },
    {
      key: "actions",
      label: "EDI Transaction (Module 3)",
      render: (_: any, row: any) => (
        <button
          onClick={() => setSelectedOrder(row)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-xl neu-btn text-blue-600 font-bold transition-all cursor-pointer"
        >
          <FileCode className="w-3.5 h-3.5" />
          View EDI 850/855
        </button>
      ),
    },
  ];

  const pieData = [
    { name: "Hardware", value: 400000 },
    { name: "SaaS", value: 600000 }
  ];
  const COLORS = ["#2563EB", "#60A5FA"];

  return (
    <div className="space-y-8">
      {/* Top Filter and Export Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 neu-flat p-4 rounded-3xl">
        <div className="flex gap-2">
          {["7D", "30D", "90D", "1Y"].map((p) => {
            const isActive = period === p;
            return (
              <button 
                key={p} 
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  isActive 
                    ? "neu-btn-primary" 
                    : "neu-btn text-slate-600 hover:text-slate-900"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        <button className="flex items-center gap-2 neu-btn px-5 py-2.5 rounded-full text-xs font-bold text-slate-700 hover:text-blue-600 transition-all cursor-pointer">
          <Download className="w-4 h-4 text-blue-600" /> Export Financial Report
        </button>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 neu-flat rounded-3xl p-6 sm:p-8">
          <h3 className="text-lg font-black text-slate-800 mb-6">Revenue Split (Hardware vs SaaS)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="date" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val}`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#E6ECF5", 
                    borderColor: "#CBD5E1", 
                    borderRadius: "16px",
                    boxShadow: "6px 6px 14px #C5D0E0, -6px -6px 14px #FFFFFF",
                    color: "#1E293B",
                    fontWeight: 600,
                    fontSize: "12px",
                  }}
                />
                <Legend />
                <Bar dataKey="hardware" stackId="a" fill="#2563EB" name="Hardware Telemetry" radius={[4, 4, 0, 0]} />
                <Bar dataKey="saas" stackId="a" fill="#60A5FA" name="SaaS AI Subscriptions" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="neu-flat rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center">
          <h3 className="text-lg font-black text-slate-800 mb-2 w-full">Distribution</h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={4} dataKey="value">
                  {pieData.map((entry, index) => (
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
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-lg font-black text-slate-800">All Purchase Orders</h3>
          <span className="text-xs text-slate-400 font-semibold">{MOCK_ORDERS.length} records</span>
        </div>
        <DataTable columns={orderCols} data={MOCK_ORDERS} />
      </div>

      <EDIDocumentModal
        order={selectedOrder}
        isOpen={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}
