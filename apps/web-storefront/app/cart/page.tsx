"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/hooks/useCart";
import { Trash2, ArrowRight, ShieldCheck, Cpu, ArrowLeft, Sun, Moon, ShoppingBag, Sparkles, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CartPage() {
  const { items, updateQuantity, totalUpfront, totalMonthly, addItem, clearCart } = useCart();
  const router = useRouter();
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("cyber-theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("cyber-theme", next);
  };

  const isLight = theme === "light";

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

  return (
    <div
      className={`min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-cyber select-none transition-colors duration-300 relative ${
        isLight ? "bg-[#F4F7FA] text-[#0C121A]" : "bg-[#080B10] text-white"
      }`}
    >
      <div className="absolute inset-0 bg-grid-tech opacity-30 pointer-events-none" />

      {/* Top Breadcrumb & Cyber Controls */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-gray-800/80 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/" className={`text-xl font-black tracking-wider ${isLight ? "text-black" : "text-white"}`}>
            NERVE
            <span className={isLight ? "text-[#00897B]" : "text-[#2DE1C2]"}> AI</span>
          </Link>
          <span className="text-gray-500 font-mono text-sm">//</span>
          <span className="font-mono text-xs text-gray-400 tracking-wider">
            [SYS_CART_REV_04]
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <Link
            href="/store"
            className="flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-[#2DE1C2] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
          </Link>

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border transition-colors flex items-center gap-2 text-xs font-mono ${
              isLight
                ? "bg-white border-gray-300 text-gray-800 hover:bg-gray-100"
                : "bg-navy-card/80 border-cyan/30 text-cyan hover:bg-cyan/10"
            }`}
            title="Toggle theme"
          >
            {isLight ? <Moon className="w-4 h-4 text-amber-500" /> : <Sun className="w-4 h-4 text-cyan" />}
            <span className="hidden sm:inline">{isLight ? "DARK" : "LIGHT"} MODE</span>
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header HUD banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#2DE1C2] animate-ping" />
              <span className="text-[11px] font-mono tracking-widest text-[#2DE1C2] uppercase font-bold">
                COMMERCE TELEMETRY • STAGE 01
              </span>
            </div>
            <h1 className={`text-3xl sm:text-4xl font-black tracking-tight ${isLight ? "text-black" : "text-white"}`}>
              Telemetry Cart &amp; Requisition
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-3 py-1.5 rounded-lg border text-xs font-mono ${
              isLight ? "bg-white border-gray-200 text-gray-600" : "bg-[#0E1520] border-gray-800 text-gray-300"
            }`}>
              ITEMS IN BUFFER: <strong className="text-[#2DE1C2]">{items.reduce((s, i) => s + i.quantity, 0)} UNITS</strong>
            </span>
          </div>
        </div>

        {items.length === 0 ? (
          /* Empty State HUD */
          <div className={`p-12 sm:p-16 text-center border cyber-chamfer-lg ${
            isLight ? "bg-white border-gray-200" : "bg-[#0E1520]/90 border-cyan/20"
          }`}>
            <div className="w-20 h-20 rounded-full bg-[#2DE1C2]/10 border border-[#2DE1C2]/30 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-[#2DE1C2]" />
            </div>
            <h2 className={`text-2xl font-bold mb-2 ${isLight ? "text-gray-900" : "text-white"}`}>
              Telemetry Cart is Currently Clear
            </h2>
            <p className="text-gray-400 font-mono text-sm max-w-md mx-auto mb-8">
              No OBD-II CAN-bus telemetry devices or LSTM SaaS subscriptions have been staged in this session.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleAddSample}
                className="px-6 py-3.5 bg-[#2DE1C2] hover:bg-[#25c4a8] text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(45,225,194,0.3)] flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Load Recommended 10x Fleet Bundle
              </button>
              <Link
                href="/store"
                className={`px-6 py-3.5 border rounded-xl font-mono text-xs uppercase tracking-wider transition-all ${
                  isLight
                    ? "border-gray-300 hover:bg-gray-100 text-gray-800"
                    : "border-gray-700 hover:border-cyan text-gray-300"
                }`}
              >
                Browse Hardware Catalog
              </Link>
            </div>
          </div>
        ) : (
          /* Cart Grid */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Items Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className={`p-6 border cyber-chamfer-lg ${
                isLight ? "bg-white border-gray-200 shadow-sm" : "bg-[#0E1520]/80 border-cyan/20 shadow-xl"
              }`}>
                <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#2DE1C2] font-bold">
                    // STAGED HARDWARE &amp; RECURRING PROTOCOLS
                  </span>
                  <button
                    onClick={clearCart}
                    className="text-xs font-mono text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear Cart
                  </button>
                </div>

                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className={`p-5 rounded-xl border transition-all ${
                        isLight
                          ? "bg-gray-50 border-gray-200"
                          : "bg-[#090D14] border-gray-800/80 hover:border-cyan/40"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-20 h-16 rounded-xl border flex items-center justify-center shrink-0 overflow-hidden bg-white ${
                            isLight
                              ? "border-gray-200 shadow-sm"
                              : "border-cyan/30 shadow-[0_0_10px_rgba(45,225,194,0.2)]"
                          }`}>
                            <img
                              src="/nerve-link-obd.png"
                              alt="Nerve Link OBD-II"
                              className="w-full h-full object-contain p-1"
                            />
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#2DE1C2]/10 text-[#2DE1C2] font-bold border border-[#2DE1C2]/20">
                                HSN 8471 • SAC 9983
                              </span>
                            </div>
                            <h3 className={`text-base font-bold mt-1 ${isLight ? "text-gray-900" : "text-white"}`}>
                              {item.name}
                            </h3>
                            <p className="text-xs font-mono text-gray-400 mt-0.5">
                              Dual-Core OBD-II Link + Neural LSTM Cloud Ingestion
                            </p>
                          </div>
                        </div>

                        {/* Price & Quantity Controls */}
                        <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                          <div className={`flex items-center rounded-lg border ${
                            isLight ? "bg-white border-gray-300" : "bg-[#131B26] border-gray-700"
                          }`}>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1.5 text-gray-400 hover:text-white font-mono transition-colors"
                            >
                              -
                            </button>
                            <span className={`px-2 font-mono font-bold text-sm min-w-[32px] text-center ${
                              isLight ? "text-black" : "text-white"
                            }`}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1.5 text-gray-400 hover:text-white font-mono transition-colors"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right">
                            <div className={`font-mono font-black text-lg ${isLight ? "text-black" : "text-white"}`}>
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </div>
                            <div className="text-[11px] font-mono text-[#2DE1C2]">
                              +₹{(item.monthlyPrice! * item.quantity).toLocaleString()}/mo SaaS
                            </div>
                          </div>

                          <button
                            onClick={() => updateQuantity(item.id, 0)}
                            className="p-2 text-gray-500 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* B2B Module Assurance Banner */}
              <div className={`p-5 rounded-xl border flex items-center justify-between gap-4 font-mono text-xs ${
                isLight ? "bg-white border-gray-200 text-gray-700" : "bg-[#0E1520]/60 border-gray-800 text-gray-300"
              }`}>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#2DE1C2] shrink-0" />
                  <span>
                    <strong>Module 3 &amp; 4 Ready:</strong> Auto-transmits ANSI X12 EDI 850 PO upon authorization. GST Input Tax Credit (ITC) applicable under Rule 46.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-1">
              <div className={`p-6 border cyber-chamfer-lg sticky top-8 ${
                isLight ? "bg-white border-gray-200 shadow-md" : "bg-[#0E1520]/90 border-cyan/30 shadow-2xl"
              }`}>
                <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-6">
                  <h2 className={`font-mono text-sm font-bold uppercase tracking-wider ${isLight ? "text-gray-900" : "text-white"}`}>
                    Requisition Summary
                  </h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#2DE1C2]/10 text-[#2DE1C2]">
                    INR • B2B
                  </span>
                </div>

                <div className="space-y-3 mb-6 font-mono text-xs">
                  <div className="flex justify-between text-gray-400">
                    <span>Hardware Procurement</span>
                    <span className={isLight ? "text-black" : "text-white"}>₹{totalUpfront.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Express Surface Logistics</span>
                    <span className="text-[#2DE1C2] font-bold">FREE // BLUEDART</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>CGST (9%) + SGST (9%)</span>
                    <span className={isLight ? "text-black" : "text-white"}>₹{gstAmount.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-800/80 pt-3 flex justify-between font-bold text-sm">
                    <span className={isLight ? "text-gray-900" : "text-white"}>Total Due Today</span>
                    <span className="text-[#2DE1C2] text-lg font-black">₹{totalWithTax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 pt-1">
                    <span>SaaS Predictor (Month 2+)</span>
                    <span className="text-cyan font-bold">₹{totalMonthly.toLocaleString()}/mo</span>
                  </div>
                </div>

                <button
                  onClick={() => router.push("/checkout")}
                  className="w-full py-4 bg-[#2DE1C2] hover:bg-[#25c4a8] text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_25px_rgba(45,225,194,0.4)] flex items-center justify-center gap-2 mb-4 group"
                >
                  <span>Proceed to Encrypted Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="text-center">
                  <p className="text-[10px] font-mono text-gray-500">
                    Secured by 256-Bit SSL • Razorpay B2B Node • Instant GST Invoice
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
