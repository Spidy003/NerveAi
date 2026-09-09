"use client";

import { KPICard } from "@/components/admin/KPICard";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { DataTable } from "@/components/admin/DataTable";
import { generateRevenueData, MOCK_ORDERS, MOCK_ALERTS } from "@/lib/mock-data";
import { DollarSign, Activity, Users, ShoppingCart, Cpu, AlertTriangle, ArrowRight, Sparkles } from "lucide-react";
import { useMemo } from "react";
import Link from "next/link";

export default function Dashboard() {
  const chartData = useMemo(() => generateRevenueData(30), []);

  const orderCols = [
    { key: "id", label: "Order ID", render: (val: string) => <span className="font-mono font-bold text-blue-600">{val}</span> },
    { key: "customer", label: "Customer" },
    { key: "amount", label: "Amount", render: (val: number) => <span className="font-bold text-slate-800">₹{val.toLocaleString()}</span> },
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
    { key: "date", label: "Date", render: (val: string) => <span className="text-slate-500 text-xs">{val}</span> }
  ];

  const alertCols = [
    { key: "vehicle", label: "Vehicle Plate", render: (val: string) => <span className="font-mono text-xs font-bold neu-inset px-2.5 py-1 rounded-lg text-slate-700">{val}</span> },
    { key: "component", label: "Component", render: (val: string) => <span className="font-semibold text-slate-800">{val}</span> },
    { key: "daysRemaining", label: "Days Left", render: (val: number) => <span className={`font-black ${val <= 3 ? "text-rose-600" : "text-amber-600"}`}>{val} Days</span> },
    { 
      key: "severity", 
      label: "Severity", 
      render: (val: string) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${
          val === 'critical' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
        }`}>{val}</span>
      )
    }
  ];

  return (
    <div className="space-y-8">
      {/* Neumorphic UI Kit Banner */}
      <div className="neu-flat p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 neu-inset rounded-2xl flex items-center justify-center text-blue-600">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-slate-800">Neumorphic Design System Active</h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                Live Soft UI
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Featuring soft dual-shadow extrusion, inset input wells, and royal blue primary components matching your reference design.
            </p>
          </div>
        </div>

        <Link
          href="/uikit"
          className="neu-btn-primary px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <span>Open UI Kit Board</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard title="Total Revenue (MTD)" value="₹1,245,000" icon={DollarSign} change={12.5} changeLabel="vs last month" trend="up" />
        <KPICard title="MRR Run Rate" value="₹840,000" icon={Activity} change={8.2} changeLabel="vs last month" trend="up" />
        <KPICard title="Active Subscriptions" value="1,240" icon={Users} change={4.1} changeLabel="vs last month" trend="up" />
        <KPICard title="Total Orders (MTD)" value="342" icon={ShoppingCart} change={-2.4} changeLabel="vs last month" trend="down" />
        <KPICard title="Vehicles Deployed" value="8,450" icon={Cpu} change={15.0} changeLabel="vs last month" trend="up" />
        <KPICard title="Alerts Triggered" value="156" icon={AlertTriangle} change={1.2} changeLabel="vs last month" trend="down" />
      </div>

      {/* Revenue Chart Section */}
      <div className="neu-flat rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-lg font-black text-slate-800">Revenue Overview</h3>
            <p className="text-xs text-slate-400 font-medium">30-day continuous cashflow and recurring telemetry billings</p>
          </div>
          <div className="neu-inset px-3 py-1.5 rounded-full text-xs font-bold text-blue-600 flex items-center gap-1.5 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            Live Sync
          </div>
        </div>
        <RevenueChart data={chartData} />
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-base font-black text-slate-800">Recent Dispatch Orders</h3>
            <span className="text-xs text-slate-400 font-semibold">Latest 5 events</span>
          </div>
          <DataTable columns={orderCols} data={MOCK_ORDERS.slice(0, 5)} />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-base font-black text-slate-800">Critical Fleet Alerts</h3>
            <span className="text-xs text-rose-500 font-semibold">Requires Dispatch Attention</span>
          </div>
          <DataTable columns={alertCols} data={MOCK_ALERTS.slice(0, 5)} />
        </div>
      </div>
    </div>
  );
}
