"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { MOCK_CUSTOMERS } from "@/lib/mock-data";
import { CustomerDetailModal } from "@/components/admin/CustomerDetailModal";
import { Search, Users } from "lucide-react";

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const filteredCustomers = MOCK_CUSTOMERS.filter(c => 
    c.fleetName.toLowerCase().includes(search.toLowerCase()) || 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const cols = [
    { 
      key: "avatar", 
      label: "", 
      render: (_: any, item: any) => (
        <div className="w-9 h-9 rounded-2xl neu-inset text-blue-600 flex items-center justify-center font-bold text-xs">
          {item.name.charAt(0)}{item.name.split(" ")[1]?.charAt(0)}
        </div>
      ) 
    },
    { key: "fleetName", label: "Fleet Name", render: (val: string) => <span className="font-bold text-slate-800">{val}</span> },
    { key: "name", label: "Contact Person", render: (val: string) => <span className="text-slate-600">{val}</span> },
    { key: "city", label: "City", render: (val: string) => <span className="text-slate-500 text-xs">{val}</span> },
    { key: "vehicles", label: "Vehicles", render: (val: number) => <span className="font-semibold text-slate-700">{val} Units</span> },
    { 
      key: "subscription", 
      label: "Plan", 
      render: (val: string) => <span className="capitalize font-bold text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{val}</span> 
    },
    { key: "mrr", label: "MRR", render: (val: number) => <span className="font-bold text-blue-600">₹{val.toLocaleString()}</span> },
    { 
      key: "status", 
      label: "Status",
      render: (val: string) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${
          val === 'active' ? 'bg-emerald-100 text-emerald-700' : 
          val === 'warning' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
        }`}>{val}</span>
      )
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Search bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 neu-flat p-4 rounded-3xl">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search customers or fleets..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full neu-inset rounded-2xl pl-11 pr-4 py-2.5 text-sm text-slate-700 font-medium placeholder-slate-400 focus:outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <Users className="w-4 h-4 text-blue-600" />
          <span>{filteredCustomers.length} Fleet Customers</span>
        </div>
      </div>

      <DataTable 
        columns={cols} 
        data={filteredCustomers} 
        onRowClick={(item) => setSelectedCustomer(item)}
      />

      <CustomerDetailModal 
        isOpen={!!selectedCustomer} 
        onClose={() => setSelectedCustomer(null)} 
        customer={selectedCustomer} 
      />
    </div>
  );
}
