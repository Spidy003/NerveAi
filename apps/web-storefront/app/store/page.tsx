"use client";

import { useState } from "react";
import { Star, Shield, Cpu, Zap, Plus, Minus, Check, ArrowRight, ShoppingBag, Radio } from "lucide-react";
import { useCart } from "@/lib/hooks/useCart";
import { useAuth } from "@/lib/hooks/useAuth";
import AuthModal from "@/components/shared/AuthModal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/shared/Footer";

export default function StorePage() {
  const [quantity, setQuantity] = useState(10);
  const [fleetSize, setFleetSize] = useState("6-20");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { addItem, items } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

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
  };

  const handleBuyNow = () => {
    addItem({
      id: "nerve-link-v1",
      name: "Nerve Link OBD-II Telemetry Device",
      price: hardwarePrice,
      monthlyPrice: monthlyPrice,
      quantity: quantity,
    });
    if (isAuthenticated) {
      router.push("/checkout");
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans bg-[#E6ECF5] text-slate-800 select-none relative">
      
      {/* Top Header & Breadcrumb */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12 neu-flat px-6 py-4 rounded-full">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-lg font-black tracking-tight text-slate-800 flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl neu-flat flex items-center justify-center text-blue-600 font-extrabold text-sm">
              N
            </div>
            <span>NERVE <span className="text-blue-600">AI</span></span>
          </Link>
          <span className="text-slate-300">•</span>
          <span className="text-xs font-semibold text-slate-500">Hardware Telemetry Store</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="neu-btn px-5 py-2.5 rounded-full text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-blue-600" />
            <span>Cart ({items.length})</span>
          </Link>
          <Link
            href="/dashboard"
            className="neu-btn-primary px-5 py-2.5 rounded-full text-xs font-bold tracking-wide"
          >
            Console
          </Link>
        </div>
      </div>

      {/* Main Product Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Product Photo & Specs Display */}
        <div className="lg:col-span-6 space-y-6">
          <div className="neu-flat p-6 sm:p-8 rounded-3xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 text-xs font-bold">
              <span className="neu-inset px-3 py-1 rounded-full text-blue-600">
                MODEL: NERVE LINK OBD-II
              </span>
              <span className="text-slate-400">
                J1962 / CAN-BUS
              </span>
            </div>

            {/* Product Image Frame */}
            <div className="neu-inset p-4 rounded-2xl flex items-center justify-center bg-[#E6ECF5]">
              <img
                src="/nerve-link-obd.png"
                alt="NERVE LINK OBD-II DEVICE"
                className="w-full max-h-[360px] object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex items-center justify-between pt-2 text-xs font-medium text-slate-500">
              <span>ARM Cortex-M4 • Dual CAN ISO 15765-4</span>
              <span className="text-blue-600 font-bold">Plug &amp; Play</span>
            </div>
          </div>

          {/* Quick Specs 3 Cards */}
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div className="neu-flat p-4 rounded-2xl text-center">
              <span className="text-slate-400 text-[10px] block font-medium">INSTALL TIME</span>
              <span className="font-bold text-slate-800 text-sm mt-0.5 block">~10 MINS</span>
            </div>
            <div className="neu-flat p-4 rounded-2xl text-center">
              <span className="text-slate-400 text-[10px] block font-medium">WARRANTY</span>
              <span className="font-bold text-blue-600 text-sm mt-0.5 block">3 YR SWAP</span>
            </div>
            <div className="neu-flat p-4 rounded-2xl text-center">
              <span className="text-slate-400 text-[10px] block font-medium">SAMPLING</span>
              <span className="font-bold text-slate-800 text-sm mt-0.5 block">2-SEC 60HZ</span>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Purchase Configuration */}
        <div className="lg:col-span-6 neu-flat p-8 sm:p-10 rounded-3xl space-y-6">
          <div>
            <div className="neu-inset px-3.5 py-1 rounded-full text-[11px] font-bold text-blue-600 inline-block mb-3">
              ★ 4.9/5 RATING • 5,000+ COMMERCIAL FLEETS CONNECTED
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
              Nerve Link OBD-II Device
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-2">
              Plug-and-play predictive fleet telemetry hardware. Connects directly to commercial J1962 ports to stream real-time CAN-bus engine health and 14-day failure alerts.
            </p>
          </div>

          {/* Price Box */}
          <div className="neu-inset p-5 rounded-2xl space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-extrabold text-blue-600 tracking-tight">
                ₹{hardwarePrice.toLocaleString()}
              </span>
              <span className="text-xs font-medium text-slate-500">one-time hardware price</span>
            </div>
            <div className="text-xs font-semibold text-slate-600">
              + ₹{monthlyPrice}/vehicle/month SaaS telemetry subscription
            </div>
          </div>

          {/* Fleet Size Tier Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Select Fleet Tier (Impacts SaaS Pricing)
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
                  className={`py-3 px-2 rounded-2xl text-xs font-bold transition-all cursor-pointer text-center ${
                    fleetSize === tier.size
                      ? "neu-inset text-blue-600"
                      : "neu-btn text-slate-600 hover:text-slate-800"
                  }`}
                >
                  <div>{tier.size} Trucks</div>
                  <div className="text-[10px] font-normal opacity-80 mt-0.5">{tier.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Hardware Units Required
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center neu-inset rounded-full p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-full neu-btn flex items-center justify-center text-slate-600 font-bold hover:text-blue-600 cursor-pointer"
                >
                  -
                </button>
                <span className="w-14 text-center font-bold text-slate-800 text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-full neu-btn flex items-center justify-center text-slate-600 font-bold hover:text-blue-600 cursor-pointer"
                >
                  +
                </button>
              </div>
              <div className="text-xs text-slate-500">
                Total Upfront: <strong className="text-blue-600 font-bold text-sm">₹{(quantity * hardwarePrice).toLocaleString()}</strong>
              </div>
            </div>
          </div>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={handleBuyNow}
              className="flex-1 neu-btn-primary py-4 rounded-full font-bold text-xs uppercase tracking-wider cursor-pointer active:scale-95 shadow-md shadow-blue-500/30 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Buy Now // Checkout</span>
            </button>

            <button
              onClick={handleAddToCart}
              className="neu-btn py-4 px-6 rounded-full font-bold text-xs uppercase tracking-wider text-slate-700 hover:text-blue-600 cursor-pointer flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          </div>

          <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>GST B2B Tax Invoicing Available</span>
            <span>ANSI X12 EDI 850/855 Compliant</span>
          </div>
        </div>

      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        redirectTo="/checkout"
        title="Sign In or Register to Buy"
      />

      <Footer />
    </div>
  );
}
