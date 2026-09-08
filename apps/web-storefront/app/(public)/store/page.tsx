"use client";

import { useState, useEffect } from "react";
import { Star, Shield, Cpu, Zap, Plus, Minus, Check, ArrowRight, Sun, Moon, ShoppingBag, Radio } from "lucide-react";
import { useCart } from "@/lib/hooks/useCart";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function StorePage() {
  const [quantity, setQuantity] = useState(10);
  const [fleetSize, setFleetSize] = useState("6-20");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const { addItem, items } = useCart();
  const router = useRouter();

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

  const hardwarePrice = 1499;
  const monthlyPrice = fleetSize === "20+" ? 150 : fleetSize === "6-20" ? 180 : 200;

  const handleAddToCart = () => {
    addItem({
      id: "nerve-link-v1",
      name: "Nerve Link OBD-II Telemetry Device",
      price: hardwarePrice,
      monthlyPrice: monthlyPrice,
      quantity: quantity,
    });
    toast.success("Added to telemetry cart");
    router.push("/cart");
  };

  return (
    <div
      className={`min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-cyber select-none transition-colors duration-300 relative ${
        isLight ? "bg-[#F4F7FA] text-[#0C121A]" : "bg-[#080B10] text-white"
      }`}
    >
      <div className="absolute inset-0 bg-grid-tech opacity-30 pointer-events-none" />

      {/* Top Breadcrumb Header */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12 border-b border-gray-800/80 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-xl font-black tracking-wider text-white">
            NERVE
            <span className={isLight ? "text-[#00897B]" : "text-cyan"}>
              {" "}AI
            </span>
          </Link>
          <span className="text-gray-500 font-mono text-xs">// HARDWARE STORE</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <button
            onClick={toggleTheme}
            className={`px-3 py-1.5 flex items-center gap-2 font-mono text-[11px] uppercase cyber-chamfer-button transition-all cursor-pointer ${
              isLight
                ? "bg-white text-[#00897B] border border-[#00BFA5]/40 shadow-sm"
                : "bg-[#141D26] text-cyan border border-cyan/40"
            }`}
          >
            {isLight ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            <span>{isLight ? "DARK MODE" : "WHITE MODE"}</span>
          </button>

          <Link
            href="/cart"
            className={`flex items-center gap-2 px-4 py-2 font-mono text-xs font-bold cyber-chamfer-button border transition-all ${
              isLight
                ? "bg-white text-[#00897B] border-[#00BFA5]/40 shadow-sm"
                : "bg-cyan/15 text-cyan border-cyan/30 hover:border-cyan"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>CART ({items.length})</span>
          </Link>
        </div>
      </div>

      {/* Main Product Layout */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Real Hardware Product Photo & Telemetry Display */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div
            className={`w-full rounded-2xl cyber-chamfer-lg relative border-2 p-3 sm:p-4 flex flex-col items-center justify-center overflow-hidden transition-all group ${
              isLight
                ? "bg-white border-[#00BFA5]/40 shadow-[0_12px_35px_rgba(0,180,160,0.15)]"
                : "bg-[#0E151E] border-cyan/40 shadow-[0_0_40px_rgba(45,225,194,0.18)]"
            }`}
          >
            {/* Top Corner Decal */}
            <div className="w-full flex items-center justify-between px-3 py-2 border-b border-gray-800/60 mb-2 font-mono text-[10px]">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full animate-ping ${isLight ? "bg-[#00897B]" : "bg-cyan"}`} />
                <span className={isLight ? "text-[#00897B] font-bold" : "text-cyan font-bold"}>
                  [ MODEL: NERVE LINK OBD-II ]
                </span>
              </div>
              <div className="text-gray-500 font-bold">
                J1962 / CAN-BUS / GPS
              </div>
            </div>

            {/* High-Resolution Product Image */}
            <div className="relative w-full rounded-xl overflow-hidden bg-white shadow-inner flex items-center justify-center">
              <img
                src="/nerve-link-obd.png"
                alt="NERVE LINK OBD-II DEVICE - Plug-and-play predictive fleet telemetry hardware"
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>

            {/* Bottom Telemetry Spec Bar */}
            <div className="w-full flex items-center justify-between px-3 pt-3 mt-2 border-t border-gray-800/60 font-mono text-[10px] text-gray-400">
              <span>ARM CORTEX-M4 • DUAL CAN-BUS ISO 15765-4</span>
              <span className="text-[#00C896] font-bold">PLUG &amp; PLAY</span>
            </div>
          </div>

          {/* Quick Specs Grid */}
          <div className="w-full grid grid-cols-3 gap-4 mt-4 font-mono text-xs">
            <div className={`p-4 rounded-xl border text-center ${isLight ? "bg-white border-[#D1DCE5]" : "bg-[#0E151E] border-gray-800"}`}>
              <span className="text-gray-500 text-[10px] block">INSTALL TIME</span>
              <span className="font-bold text-white text-sm">~10 MINS</span>
            </div>
            <div className={`p-4 rounded-xl border text-center ${isLight ? "bg-white border-[#D1DCE5]" : "bg-[#0E151E] border-gray-800"}`}>
              <span className="text-gray-500 text-[10px] block">WARRANTY</span>
              <span className="font-bold text-[#00C896] text-sm">3 YR REPLACEMENT</span>
            </div>
            <div className={`p-4 rounded-xl border text-center ${isLight ? "bg-white border-[#D1DCE5]" : "bg-[#0E151E] border-gray-800"}`}>
              <span className="text-gray-500 text-[10px] block">SAMPLING RATE</span>
              <span className="font-bold text-cyan text-sm">2-SECOND STREAM</span>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Purchase Configuration */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold ${isLight ? "bg-[#00897B]/15 text-[#00897B]" : "bg-cyan/15 text-cyan"}`}>
                ★ 4.9/5 RATING • 5,000+ INDIAN FLEET VEHICLES CONNECTED
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4 leading-tight">
              Nerve Link OBD-II Device
            </h1>

            <p className={`text-sm font-mono leading-relaxed mb-8 ${isLight ? "text-[#556778]" : "text-gray-400"}`}>
              Plug-and-play predictive fleet telemetry hardware. Connects to standard J1962 commercial vehicle diagnostic ports to stream high-frequency CAN-bus sensor telemetry to the Nerve AI LSTM engine.
            </p>

            {/* Price Display */}
            <div className="p-6 rounded-2xl border mb-8 bg-[#0C1017] border-cyan/30">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-extrabold text-cyan font-mono">
                  ₹{hardwarePrice.toLocaleString()}
                </span>
                <span className="text-sm font-mono text-gray-400">One-time hardware unit price</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs mt-3 text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C896]" />
                <span>+ ₹{monthlyPrice}/vehicle/month SaaS telemetry subscription</span>
              </div>
            </div>

            {/* Fleet Size Tier Selector */}
            <div className="space-y-3 mb-8 font-mono">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300">
                // SELECT FLEET TIER (IMPACTS SAAS PRICING)
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { size: "1-5", label: "Starter (₹200/mo)" },
                  { size: "6-20", label: "Business (₹180/mo)" },
                  { size: "20+", label: "Enterprise (₹150/mo)" },
                ].map((tier) => (
                  <button
                    key={tier.size}
                    onClick={() => setFleetSize(tier.size)}
                    className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                      fleetSize === tier.size
                        ? isLight
                          ? "bg-[#00897B] text-white border-[#00897B] shadow-sm"
                          : "bg-cyan text-black border-cyan shadow-[0_0_15px_#2DE1C2]"
                        : isLight
                        ? "bg-white text-[#556778] border-[#D1DCE5] hover:border-[#00897B]"
                        : "bg-[#0E151E] text-gray-400 border-gray-800 hover:border-gray-700"
                    }`}
                  >
                    <div>{tier.size} Trucks</div>
                    <div className="text-[10px] font-normal opacity-85 mt-0.5">{tier.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3 mb-8 font-mono">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300">
                // HARDWARE UNITS REQUIRED
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-[#0C1017] border border-gray-700 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-gray-400 hover:text-white transition-colors cursor-pointer text-base"
                  >
                    -
                  </button>
                  <span className="w-16 text-center font-bold font-mono text-white text-base">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-gray-400 hover:text-white transition-colors cursor-pointer text-base"
                  >
                    +
                  </button>
                </div>
                <div className="text-xs font-mono text-gray-400">
                  Total Upfront: <strong className="text-cyan font-bold text-sm">₹{(quantity * hardwarePrice).toLocaleString()}</strong>
                </div>
              </div>
            </div>

            {/* Add to Cart CTA */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 text-black font-cyber font-black text-sm uppercase tracking-widest cyber-chamfer-button transition-all cursor-pointer flex items-center justify-center gap-2 ${
                isLight
                  ? "bg-[#00BFA5] hover:bg-[#00A896] shadow-[0_8px_25px_rgba(0,180,160,0.35)]"
                  : "bg-cyan hover:bg-cyan-glow shadow-[0_0_25px_rgba(45,225,194,0.5)]"
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>PROCEED TO PROCUREMENT CART</span>
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800/80 flex items-center justify-between text-xs font-mono text-gray-500">
            <span>GST B2B TAX INVOICING AVAILABLE</span>
            <span>EDI 850/855 COMPLIANT</span>
          </div>
        </div>

      </div>
    </div>
  );
}
