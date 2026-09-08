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
    { key: "id", label: "Order ID" },
    { key: "customer", label: "Customer" },
    { key: "amount", label: "Total Amount", render: (val: number) => `₹${val.toLocaleString()}` },
    { 
      key: "status", 
      label: "Status", 
      render: (val: string) => (
        <span className={`px-2 py-1 rounded text-xs capitalize ${
          val === 'completed' ? 'bg-primary/20 text-primary' : 
          val === 'pending' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-red-500/20 text-red-500'
        }`}>{val}</span>
      )
    },
    { key: "date", label: "Date" },
    {
      key: "actions",
      label: "EDI Transaction (Module 3)",
      render: (_: any, row: any) => (
        <button
          onClick={() => setSelectedOrder(row)}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded bg-[#00C896]/15 hover:bg-[#00C896]/25 text-[#00C896] border border-[#00C896]/30 transition-colors"
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
  const COLORS = ["#3B82F6", "#00C896"];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {["7D", "30D", "90D", "1Y"].map(p => (
            <button 
              key={p} 
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${period === p ? "bg-primary text-background font-semibold" : "bg-gray-800 text-gray-400 hover:text-white"}`}
            >
              {p}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl p-6 border border-gray-800 shadow-sm">
          <h3 className="text-lg font-bold text-white mb-6">Revenue Split</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="date" stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val}`} />
                <Tooltip contentStyle={{ backgroundColor: "#1C2128", borderColor: "#374151" }} />
                <Legend />
                <Bar dataKey="hardware" stackId="a" fill="#3B82F6" name="Hardware" />
                <Bar dataKey="saas" stackId="a" fill="#00C896" name="SaaS" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-card rounded-xl p-6 border border-gray-800 shadow-sm flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold text-white mb-2 w-full">Distribution</h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#1C2128", borderColor: "#374151" }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 border border-gray-800 shadow-sm">
        <h3 className="text-lg font-bold text-white mb-4">All Orders</h3>
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
