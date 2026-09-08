"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { MOCK_CUSTOMERS } from "@/lib/mock-data";
import { CustomerDetailModal } from "@/components/admin/CustomerDetailModal";
import { Search } from "lucide-react";

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
        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
          {item.name.charAt(0)}{item.name.split(" ")[1]?.charAt(0)}
        </div>
      ) 
    },
    { key: "fleetName", label: "Fleet Name", render: (val: string) => <span className="font-semibold text-white">{val}</span> },
    { key: "name", label: "Contact Person" },
    { key: "city", label: "City" },
    { key: "vehicles", label: "Vehicles" },
    { 
      key: "subscription", 
      label: "Plan", 
      render: (val: string) => <span className="capitalize">{val}</span> 
    },
    { key: "mrr", label: "MRR", render: (val: number) => `₹${val.toLocaleString()}` },
    { 
      key: "status", 
      label: "Status",
      render: (val: string) => (
        <span className={`px-2 py-1 rounded text-xs capitalize ${
          val === 'active' ? 'bg-primary/20 text-primary' : 
          val === 'warning' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-red-500/20 text-red-500'
        }`}>{val}</span>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card p-4 rounded-xl border border-gray-800">
        <div className="relative w-96">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search customers or fleets..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-background border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
          />
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
