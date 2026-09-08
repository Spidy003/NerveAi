"use client";

import { KPICard } from "@/components/admin/KPICard";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { DataTable } from "@/components/admin/DataTable";
import { generateRevenueData, MOCK_ORDERS, MOCK_ALERTS } from "@/lib/mock-data";
import { DollarSign, Activity, Users, ShoppingCart, Cpu, AlertTriangle } from "lucide-react";
import { useMemo } from "react";

export default function Dashboard() {
  const chartData = useMemo(() => generateRevenueData(30), []);

  const orderCols = [
    { key: "id", label: "Order ID" },
    { key: "customer", label: "Customer" },
    { key: "amount", label: "Amount", render: (val: number) => `₹${val.toLocaleString()}` },
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
    { key: "date", label: "Date" }
  ];

  const alertCols = [
    { key: "vehicle", label: "Vehicle" },
    { key: "component", label: "Component" },
    { key: "daysRemaining", label: "Days Left", render: (val: number) => <span className="text-red-400 font-bold">{val} Days</span> },
    { 
      key: "severity", 
      label: "Severity", 
      render: (val: string) => (
        <span className={`px-2 py-1 rounded text-xs capitalize ${
          val === 'critical' ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500'
        }`}>{val}</span>
      )
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard title="Total Revenue (MTD)" value="₹1,245,000" icon={DollarSign} change={12.5} changeLabel="vs last month" trend="up" />
        <KPICard title="MRR" value="₹840,000" icon={Activity} change={8.2} changeLabel="vs last month" trend="up" />
        <KPICard title="Active Subscriptions" value="1,240" icon={Users} change={4.1} changeLabel="vs last month" trend="up" />
        <KPICard title="Total Orders (MTD)" value="342" icon={ShoppingCart} change={-2.4} changeLabel="vs last month" trend="down" />
        <KPICard title="Devices Deployed" value="8,450" icon={Cpu} change={15.0} changeLabel="vs last month" trend="up" />
        <KPICard title="Alerts Triggered (MTD)" value="156" icon={AlertTriangle} change={1.2} changeLabel="vs last month" trend="down" />
      </div>

      <div className="bg-card rounded-xl p-6 border border-gray-800 shadow-sm">
        <h3 className="text-lg font-bold text-white mb-6">Revenue Overview (Last 30 Days)</h3>
        <RevenueChart data={chartData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Recent Orders</h3>
          <DataTable columns={orderCols} data={MOCK_ORDERS.slice(0, 5)} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Critical Alerts</h3>
          <DataTable columns={alertCols} data={MOCK_ALERTS.slice(0, 5)} />
        </div>
      </div>
    </div>
  );
}
