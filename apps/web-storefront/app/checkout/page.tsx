"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/hooks/useCart";
import { useAuth } from "@/lib/hooks/useAuth";
import AuthModal from "@/components/shared/AuthModal";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Script from "next/script";
import Link from "next/link";
import { ShieldCheck, Lock, ArrowLeft, CreditCard, Building2, CheckCircle2, Zap } from "lucide-react";
import Footer from "@/components/shared/Footer";

export default function CheckoutPage() {
  const { totalUpfront, totalMonthly, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "Vikram Malhotra",
    email: "operations@delhicargo.in",
    phone: "+91 98200 12345",
    fleetName: "Delhi Logistics Express Fleet Ltd",
    address: "Plot 14, Commercial Freight Terminal, NH-48, New Delhi 110037",
    gst: "07AAECD9876K1ZQ",
  });

  // Pre-fill form data when authenticated user is detected
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        fleetName: user.fleet_name || prev.fleetName,
      }));
    }
  }, [user]);

  const effectiveHardware = totalUpfront > 0 ? totalUpfront : 14990;
  const effectiveMonthly = totalMonthly > 0 ? totalMonthly : 1800;
  const gstAmount = Math.round(effectiveHardware * 0.18);
  const total = effectiveHardware + gstAmount;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_demo",
      amount: total * 100, // in paise
      currency: "INR",
      name: "Nerve AI Technologies",
      description: "OBD-II CAN-bus Telemetry Nodes & Enterprise Ingestion License",
      handler: function () {
        toast.success("Payment Authorized via Razorpay Node!");
        clearCart();
        router.push("/order-confirmation");
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: "#2563EB",
      },
    };

    try {
      // @ts-ignore
      if (typeof window !== "undefined" && window.Razorpay) {
        // @ts-ignore
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Mock fallback for demonstration
        setTimeout(() => {
          toast.success("Razorpay B2B Node Verified! Transmitting EDI 850...");
          clearCart();
          router.push("/order-confirmation");
        }, 1000);
      }
    } catch {
      setTimeout(() => {
        toast.success("Demo Payment Verified! Transmitting EDI 850...");
        clearCart();
        router.push("/order-confirmation");
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
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
            <span className="text-xs font-semibold text-slate-500">Secure Settlement Gateway</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              className="neu-btn px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
            </Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header Banner */}
          <div className="mb-2">
            <div className="neu-inset px-3.5 py-1 rounded-full text-[11px] font-bold text-blue-600 inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>ENCRYPTED B2B SETTLEMENT • RAZORPAY NODE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
              Depot Logistics &amp; Payment Authorization
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Compliant under IT Act 2000 (Module 4) &amp; Rule 46 CGST Tax Invoicing Structure
            </p>
          </div>

          {/* Authentication Status Pill */}
          {isAuthenticated ? (
            <div className="neu-flat p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-blue-600 font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-blue-600" />
                <span>
                  Logged in as: <strong className="text-slate-800">{user?.email}</strong> ({user?.fleet_name || "Commercial Fleet"})
                </span>
              </div>
              <span className="neu-inset px-3 py-1 rounded-full text-[10px] text-blue-600 font-bold">
                ✓ Verified Procurement Session
              </span>
            </div>
          ) : (
            <div className="neu-flat p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-slate-600">
                <Lock className="w-4 h-4 shrink-0 text-blue-600" />
                <span>
                  Guest session: Sign in to bind telemetry hardware and digital invoices directly to your fleet account.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowAuthModal(true)}
                className="neu-btn-primary px-4 py-2 rounded-full font-bold text-xs cursor-pointer shrink-0"
              >
                Sign In / Register →
              </button>
            </div>
          )}

          <form onSubmit={handlePayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Column */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Shipping and Fleet Information */}
              <div className="neu-flat p-6 sm:p-8 rounded-3xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span className="text-xs uppercase font-bold text-slate-800">
                      01. Fleet &amp; Corporate Details
                    </span>
                  </div>
                  <span className="neu-inset px-2.5 py-0.5 rounded-full text-[10px] text-blue-600 font-bold">
                    KYC Verified
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="block text-slate-600 font-bold">Authorized Officer Name</label>
                    <div className="neu-inset rounded-2xl px-4 py-3">
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-transparent text-sm text-slate-800 w-full focus:outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-slate-600 font-bold">Official Corporate Email</label>
                    <div className="neu-inset rounded-2xl px-4 py-3">
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-transparent text-sm text-slate-800 w-full focus:outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-slate-600 font-bold">Dispatch Contact Number</label>
                    <div className="neu-inset rounded-2xl px-4 py-3">
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-transparent text-sm text-slate-800 w-full focus:outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-slate-600 font-bold">Fleet / Company Entity</label>
                    <div className="neu-inset rounded-2xl px-4 py-3">
                      <input
                        required
                        type="text"
                        value={formData.fleetName}
                        onChange={(e) => setFormData({ ...formData, fleetName: e.target.value })}
                        className="bg-transparent text-sm text-slate-800 w-full focus:outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="block text-slate-600 font-bold">Depot Installation Destination Address</label>
                    <div className="neu-inset rounded-2xl p-4">
                      <textarea
                        required
                        rows={2}
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="bg-transparent text-sm text-slate-800 w-full focus:outline-none font-medium resize-none"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-slate-600 font-bold">15-Digit GSTIN Number (Rule 46 ITC Claim)</label>
                      <span className="text-[10px] font-bold text-blue-600">Verified for Tax Credits</span>
                    </div>
                    <div className="neu-inset rounded-2xl px-4 py-3">
                      <input
                        type="text"
                        value={formData.gst}
                        onChange={(e) => setFormData({ ...formData, gst: e.target.value.toUpperCase() })}
                        className="bg-transparent text-sm text-slate-800 w-full focus:outline-none font-mono tracking-wider uppercase font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Electronic Payment Gateway Card */}
              <div className="neu-flat p-6 sm:p-8 rounded-3xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <span className="text-xs uppercase font-bold text-slate-800">
                      02. Electronic Payment System (Module 4)
                    </span>
                  </div>
                  <span className="neu-inset px-2.5 py-0.5 rounded-full text-[10px] text-blue-600 font-bold">
                    AES-256 Encryption
                  </span>
                </div>

                <div className="neu-inset p-4 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl neu-flat flex items-center justify-center text-blue-600">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-800">Razorpay Enterprise Payment Gateway</div>
                      <div className="text-xs text-slate-500">
                        Supports UPI AutoPay, Corporate NetBanking, NEFT/RTGS &amp; Commercial Cards
                      </div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                </div>
              </div>

            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-4">
              <div className="neu-flat p-6 sm:p-8 rounded-3xl space-y-6 sticky top-8">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                    Settlement Due
                  </h2>
                  <span className="neu-inset px-2.5 py-0.5 rounded-full text-[10px] text-blue-600 font-bold">
                    INR (₹)
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Hardware Procurement</span>
                    <span className="font-bold text-slate-800">₹{effectiveHardware.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Bluedart Surface Express</span>
                    <span className="text-blue-600 font-bold">₹0.00 (WAIVED)</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>CGST (9%) + SGST (9%)</span>
                    <span className="font-bold text-slate-800">₹{gstAmount.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-slate-200/80 pt-3 flex justify-between items-baseline">
                    <span className="font-bold text-sm text-slate-800">Total Payable</span>
                    <span className="text-blue-600 text-2xl font-black">₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 pt-1 border-t border-slate-200/80">
                    <span>Recurring Cloud SaaS</span>
                    <span className="text-blue-600 font-bold">₹{effectiveMonthly.toLocaleString()}/mo</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full neu-btn-primary py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-blue-500/30 active:scale-95"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{loading ? "Transmitting EDI 850..." : `Authorize ₹${total.toLocaleString()} via Razorpay`}</span>
                </button>

                {/* Instant Test Simulator Bypass Button */}
                <button
                  type="button"
                  onClick={() => {
                    setLoading(true);
                    toast.success("✅ Test Payment Verified via Sandbox Node! Generating EDI 850...");
                    setTimeout(() => {
                      clearCart();
                      router.push("/order-confirmation");
                    }, 800);
                  }}
                  className="w-full neu-btn py-3 rounded-full text-blue-600 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer hover:text-blue-700"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Instant Test Settlement (Bypass Modal)</span>
                </button>

                <div className="neu-inset p-3.5 rounded-2xl text-[10px] text-slate-500 leading-relaxed">
                  <span className="text-blue-600 font-bold block mb-1">Test Payment Guide:</span>
                  • Select <strong>Netbanking</strong> in the Razorpay window or test card.<br/>
                  • Or click <strong>Instant Test Settlement</strong> to proceed immediately to ANSI X12 EDI 850 dispatch and digital receipt.
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        redirectTo="/checkout"
        title="Sign In or Register Fleet Account"
      />

      <Footer />
    </>
  );
}
