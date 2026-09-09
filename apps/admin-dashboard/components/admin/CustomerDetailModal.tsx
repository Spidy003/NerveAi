"use client";

import { X } from "lucide-react";

interface CustomerDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: any;
}

export function CustomerDetailModal({ isOpen, onClose, customer }: CustomerDetailModalProps) {
  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#E6ECF5] h-full shadow-2xl border-l border-slate-300 flex flex-col animate-in slide-in-from-right duration-300 z-10">
        <div className="p-6 border-b border-slate-300/80 flex justify-between items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Fleet Account</span>
            <h2 className="text-xl font-black text-slate-800">{customer.fleetName}</h2>
          </div>
          <button 
            onClick={onClose} 
            className="w-9 h-9 neu-btn rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Primary Contact</h3>
            <div className="neu-inset rounded-2xl p-4 space-y-2.5 text-sm">
              <div className="flex justify-between"><span className="text-slate-500 font-medium">Name</span><span className="text-slate-800 font-semibold">{customer.name}</span></div>
              <div className="flex justify-between"><span className="text-slate-500 font-medium">City</span><span className="text-slate-800 font-semibold">{customer.city}</span></div>
              <div className="flex justify-between"><span className="text-slate-500 font-medium">Joined</span><span className="text-slate-800 font-semibold">{customer.joined}</span></div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Subscription &amp; Fleet Size</h3>
            <div className="neu-inset rounded-2xl p-4 space-y-2.5 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Plan</span>
                <span className="capitalize font-bold text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{customer.subscription}</span>
              </div>
              <div className="flex justify-between"><span className="text-slate-500 font-medium">Connected Vehicles</span><span className="text-slate-800 font-semibold">{customer.vehicles} Units</span></div>
              <div className="flex justify-between"><span className="text-slate-500 font-medium">Monthly Run Rate</span><span className="text-blue-600 font-bold">₹{customer.mrr.toLocaleString()}</span></div>
            </div>
          </div>
          
          <div className="pt-4 flex gap-3">
            <button className="flex-1 neu-btn-primary py-3 rounded-full font-bold text-sm">
              Send Alert
            </button>
            <button className="flex-1 neu-btn text-rose-600 hover:text-rose-700 py-3 rounded-full font-bold text-sm">
              Manage Tier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
