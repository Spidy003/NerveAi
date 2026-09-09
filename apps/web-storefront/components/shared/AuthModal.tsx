"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Lock, ShieldCheck, ArrowRight, UserPlus, LogIn, Building2, Mail, Phone, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/lib/hooks/useAuth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectTo?: string;
  onSuccess?: () => void;
  defaultMode?: "login" | "register";
  title?: string;
}

export default function AuthModal({
  isOpen,
  onClose,
  redirectTo = "/checkout",
  onSuccess,
  defaultMode = "login",
  title = "Sign In to Complete Procurement",
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fleetName, setFleetName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, register } = useAuth();
  const router = useRouter();

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please provide both email and password.");
      return;
    }

    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      toast.success("Authentication successful // Moving to checkout...");
      onClose();
      if (onSuccess) onSuccess();
      router.push(redirectTo);
    } else {
      toast.error(result.error || "Login failed. Check your credentials.");
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !fleetName) {
      toast.error("Please fill in all required company fields.");
      return;
    }

    setIsSubmitting(true);
    const result = await register(email, password, fleetName, phone || "+91 98000 00000");
    setIsSubmitting(false);

    if (result.success) {
      toast.success("Account registered & authenticated // Moving to checkout...");
      onClose();
      if (onSuccess) onSuccess();
      router.push(redirectTo);
    } else {
      toast.error(result.error || "Registration failed. Try again.");
    }
  };

  const handleQuickDemoLogin = async () => {
    setIsSubmitting(true);
    const result = await login("fleet.commander@nerveai.io", "DemoPassword123!");
    setIsSubmitting(false);
    if (result.success) {
      toast.success("Instant Fleet Demo Session Linked // Moving to checkout...");
      onClose();
      if (onSuccess) onSuccess();
      router.push(redirectTo);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-2xl border-2 border-cyan/40 bg-[#0A0E17] text-white shadow-[0_0_50px_rgba(45,225,194,0.25)] overflow-hidden font-cyber p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Badge */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan animate-ping" />
            <span className="font-mono text-xs font-bold tracking-widest text-cyan uppercase">
              // AUTHENTICATION PROTOCOL
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800/60 transition-colors"
            title="Close window"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Title */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-1">
            {title}
          </h2>
          <p className="text-xs font-mono text-gray-400">
            {mode === "login"
              ? "Sign in with your enterprise fleet account to proceed directly to checkout."
              : "Register your commercial fleet account first, then proceed immediately to checkout."}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-black/60 rounded-xl border border-gray-800 mb-6 font-mono text-xs font-bold">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mode === "login"
                ? "bg-cyan text-black shadow-[0_0_15px_rgba(45,225,194,0.4)]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>1. SIGN IN</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mode === "register"
                ? "bg-cyan text-black shadow-[0_0_15px_rgba(45,225,194,0.4)]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>2. REGISTER FIRST</span>
          </button>
        </div>

        {/* Form Body */}
        {mode === "login" ? (
          /* ======================================================== */
          /* LOGIN FORM                                               */
          /* ======================================================== */
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                // Corporate Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="dispatch@delhicargo.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#111722] border border-gray-700 focus:border-cyan text-white text-xs font-mono px-4 py-3 rounded-xl outline-none transition-colors"
                />
                <Mail className="w-4 h-4 text-gray-500 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                // Security Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#111722] border border-gray-700 focus:border-cyan text-white text-xs font-mono px-4 py-3 rounded-xl outline-none transition-colors"
                />
                <Lock className="w-4 h-4 text-gray-500 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 mt-2 bg-cyan hover:bg-cyan-glow text-black font-cyber font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(45,225,194,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? "AUTHENTICATING..." : "SIGN IN & PROCEED TO CHECKOUT"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick Demo Bypass */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                disabled={isSubmitting}
                className="w-full py-2.5 bg-[#141C2B] hover:bg-[#1A2538] border border-cyan/30 text-cyan text-xs font-mono font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>⚡ ONE-CLICK DEMO FLEET LOGIN &amp; BUY</span>
              </button>
            </div>

            <div className="text-center pt-2 font-mono text-xs text-gray-400">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("register")}
                className="text-cyan underline font-bold hover:text-cyan-glow cursor-pointer ml-1"
              >
                Register First →
              </button>
            </div>
          </form>
        ) : (
          /* ======================================================== */
          /* REGISTER FIRST FORM                                      */
          /* ======================================================== */
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-1">
                // Fleet / Company Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Delhi Logistics Express Ltd"
                  value={fleetName}
                  onChange={(e) => setFleetName(e.target.value)}
                  className="w-full bg-[#111722] border border-gray-700 focus:border-cyan text-white text-xs font-mono px-4 py-2.5 rounded-xl outline-none transition-colors"
                />
                <Building2 className="w-4 h-4 text-gray-500 absolute right-3.5 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-1">
                // Corporate Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="procurement@delhicargo.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#111722] border border-gray-700 focus:border-cyan text-white text-xs font-mono px-4 py-2.5 rounded-xl outline-none transition-colors"
                />
                <Mail className="w-4 h-4 text-gray-500 absolute right-3.5 top-3 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-1">
                  // Phone / WhatsApp
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="+91 98200 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#111722] border border-gray-700 focus:border-cyan text-white text-xs font-mono px-4 py-2.5 rounded-xl outline-none transition-colors"
                  />
                  <Phone className="w-3.5 h-3.5 text-gray-500 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-1">
                  // Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#111722] border border-gray-700 focus:border-cyan text-white text-xs font-mono px-4 py-2.5 rounded-xl outline-none transition-colors"
                  />
                  <Lock className="w-3.5 h-3.5 text-gray-500 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 mt-2 bg-cyan hover:bg-cyan-glow text-black font-cyber font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(45,225,194,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? "PROVISIONING..." : "REGISTER ACCOUNT & MOVE TO CHECKOUT"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-1 font-mono text-xs text-gray-400">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-cyan underline font-bold hover:text-cyan-glow cursor-pointer ml-1"
              >
                Sign In Instead →
              </button>
            </div>
          </form>
        )}

        {/* Security Footer Decal */}
        <div className="mt-6 pt-4 border-t border-gray-800/80 flex items-center justify-between text-[10px] font-mono text-gray-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan" />
            <span>256-BIT ENCRYPTED TELEMETRY SESSION</span>
          </div>
          <span>ISO 27001 COMPLIANT</span>
        </div>
      </div>
    </div>
  );
}
