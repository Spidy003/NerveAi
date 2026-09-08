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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-card h-full shadow-2xl border-l border-gray-800 flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">{customer.fleetName}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Contact Info</h3>
            <div className="bg-background rounded-lg p-4 border border-gray-800 space-y-2">
              <div className="flex justify-between"><span className="text-gray-500">Name</span><span className="text-white">{customer.name}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">City</span><span className="text-white">{customer.city}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Joined</span><span className="text-white">{customer.joined}</span></div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Subscription Details</h3>
            <div className="bg-background rounded-lg p-4 border border-gray-800 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Plan</span>
                <span className="text-white capitalize badge bg-primary/20 text-primary px-2 py-0.5 rounded text-xs">{customer.subscription}</span>
              </div>
              <div className="flex justify-between"><span className="text-gray-500">Vehicles</span><span className="text-white">{customer.vehicles}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">MRR</span><span className="text-white">₹{customer.mrr.toLocaleString()}</span></div>
            </div>
          </div>
          
          <div className="pt-4 flex gap-3">
            <button className="flex-1 bg-primary text-background font-semibold py-2 rounded-lg hover:bg-primary/90 transition">
              Send Alert
            </button>
            <button className="flex-1 bg-red-500/10 text-red-500 font-semibold py-2 rounded-lg hover:bg-red-500/20 transition border border-red-500/20">
              Cancel Sub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
