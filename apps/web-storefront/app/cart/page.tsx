"use client";

import { useCart } from "@/lib/hooks/useCart";
import { useAuth } from "@/lib/hooks/useAuth";
import AuthModal from "@/components/shared/AuthModal";
import { Trash2, ArrowRight, ShieldCheck, ArrowLeft, ShoppingBag, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import Footer from "@/components/shared/Footer";

export default function CartPage() {
  const { items, updateQuantity, totalUpfront, totalMonthly, addItem, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleAddSample = () => {
    addItem({
      id: "nerve-link-v1",
      name: "Nerve Link OBD-II Telemetry Device",
      price: 1499,
      monthlyPrice: 180,
      quantity: 10,
    });
    toast.success("Added 10x Nerve OBD-II Units to Cart");
  };

  const gstAmount = Math.round(totalUpfront * 0.18);
  const totalWithTax = totalUpfront + gstAmount;

  const handleProceedToCheckout = () => {
    if (isAuthenticated) {
      router.push("/checkout");
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans bg-[#E6ECF5] text-slate-800 select-none relative">
      
      {/* Top Header & Breadcrumb */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 neu-flat px-6 py-4 rounded-full">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-lg font-black tracking-tight text-slate-800 flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl neu-flat flex items-center justify-center text-blue-600 font-extrabold text-sm">
              N
            </div>
            <span>NERVE <span className="text-blue-600">AI</span></span>
          </Link>
          <span className="text-slate-300">•</span>
          <span className="text-xs font-semibold text-slate-500">Shopping Cart</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/store"
            className="neu-btn px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="neu-inset px-3.5 py-1 rounded-full text-[11px] font-bold text-blue-600 inline-block mb-2">
              COMMERCE TELEMETRY BUFFER
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
              Telemetry Cart &amp; Requisition
            </h1>
          </div>

          <div className="neu-inset px-4 py-2 rounded-full text-xs font-bold text-slate-600">
            Items: <strong className="text-blue-600">{items.reduce((s, i) => s + i.quantity, 0)} Units</strong>
          </div>
        </div>

        {items.length === 0 ? (
          /* Empty Cart Card */
          <div className="neu-flat p-12 sm:p-16 text-center rounded-3xl space-y-6">
            <div className="w-20 h-20 rounded-full neu-flat flex items-center justify-center mx-auto text-blue-600">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">
              Your Telemetry Cart is Empty
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
              No OBD-II CAN-bus telemetry devices or LSTM SaaS subscriptions have been staged in this session.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={handleAddSample}
                className="neu-btn-primary px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Load Recommended 10x Fleet Bundle</span>
              </button>
              <Link
                href="/store"
                className="neu-btn px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-blue-600 transition-all"
              >
                Browse Hardware Catalog
              </Link>
            </div>
          </div>
        ) : (
          /* Cart Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Items Column */}
            <div className="lg:col-span-8 space-y-6">
              <div className="neu-flat p-6 sm:p-8 rounded-3xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                  <span className="text-xs uppercase tracking-wider text-slate-600 font-bold">
                    Staged Hardware &amp; Subscriptions
                  </span>
                  <button
                    onClick={clearCart}
                    className="neu-btn px-3 py-1 rounded-full text-xs font-bold text-slate-500 hover:text-red-500 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear Cart
                  </button>
                </div>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="neu-flat p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl neu-inset p-2 flex items-center justify-center shrink-0">
                          <img
                            src="/nerve-link-obd.png"
                            alt="Nerve Link OBD-II"
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div>
                          <span className="neu-inset px-2.5 py-0.5 rounded-full text-[9px] font-bold text-blue-600">
                            HSN 8471 • SAC 9983
                          </span>
                          <h3 className="text-base font-bold text-slate-800 mt-1">
                            {item.name}
                          </h3>
                          <p className="text-xs text-slate-500">
                            Dual-Core OBD-II Link + Neural LSTM Cloud Ingestion
                          </p>
                        </div>
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex items-center gap-5 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="flex items-center neu-inset rounded-full p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full neu-btn flex items-center justify-center text-slate-600 hover:text-blue-600 font-bold cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-10 text-center font-bold text-xs text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full neu-btn flex items-center justify-center text-slate-600 hover:text-blue-600 font-bold cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="font-extrabold text-base text-slate-800">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </div>
                          <div className="text-[11px] font-semibold text-blue-600">
                            +₹{(item.monthlyPrice! * item.quantity).toLocaleString()}/mo SaaS
                          </div>
                        </div>

                        <button
                          onClick={() => updateQuantity(item.id, 0)}
                          className="neu-btn p-2 rounded-full text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Module Assurance Banner */}
              <div className="neu-flat p-4 rounded-2xl flex items-center gap-3 text-xs text-slate-600">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                <span>
                  <strong>Module 3 &amp; 4 Ready:</strong> Auto-transmits ANSI X12 EDI 850 PO upon authorization. GST Input Tax Credit (ITC) claimable under Rule 46.
                </span>
              </div>
            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-4">
              <div className="neu-flat p-6 sm:p-8 rounded-3xl space-y-6 sticky top-8">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                    Requisition Summary
                  </h2>
                  <span className="neu-inset px-2.5 py-0.5 rounded-full text-[10px] text-blue-600 font-bold">
                    INR • B2B
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Hardware Procurement</span>
                    <span className="font-bold text-slate-800">₹{totalUpfront.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Surface Freight (Bluedart)</span>
                    <span className="text-blue-600 font-bold">FREE // WAIVED</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>CGST (9%) + SGST (9%)</span>
                    <span className="font-bold text-slate-800">₹{gstAmount.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-slate-200/80 pt-3 flex justify-between items-baseline">
                    <span className="font-bold text-sm text-slate-800">Total Due Today</span>
                    <span className="text-blue-600 text-2xl font-black">₹{totalWithTax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 pt-1 border-t border-slate-200/80">
                    <span>SaaS Predictor (Month 2+)</span>
                    <span className="text-blue-600 font-bold">₹{totalMonthly.toLocaleString()}/mo</span>
                  </div>
                </div>

                <button
                  onClick={handleProceedToCheckout}
                  className="w-full neu-btn-primary py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/30 active:scale-95"
                >
                  <span>Proceed to Payment Authorization</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        redirectTo="/checkout"
        title="Sign In or Register Fleet Account"
      />

      <Footer />
    </div>
  );
}
