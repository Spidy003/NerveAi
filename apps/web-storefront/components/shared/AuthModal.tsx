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
      toast.success("Authentication successful • Moving to checkout...");
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
      toast.success("Account registered & authenticated • Moving to checkout...");
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
      toast.success("Instant Fleet Demo Session Linked • Moving to checkout...");
      onClose();
      if (onSuccess) onSuccess();
      router.push(redirectTo);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg neu-flat bg-[#E6ECF5] text-slate-800 rounded-3xl p-6 sm:p-8 font-sans border border-white/60"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Badge */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
              Authentication Portal
            </span>
          </div>
          <button
            onClick={onClose}
            className="neu-btn p-2 rounded-full text-slate-500 hover:text-slate-800 transition-colors"
            title="Close window"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Title */}
        <div className="mb-6 text-center">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-800 mb-1">
            {title}
          </h2>
          <p className="text-xs text-slate-500">
            {mode === "login"
              ? "Sign in with your enterprise fleet account to proceed directly to checkout."
              : "Register your commercial fleet account first, then proceed immediately to checkout."}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1.5 neu-inset rounded-full mb-6 text-xs font-bold">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`py-2.5 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mode === "login"
                ? "neu-flat text-blue-600 font-extrabold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>1. Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`py-2.5 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mode === "register"
                ? "neu-flat text-blue-600 font-extrabold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>2. Register First</span>
          </button>
        </div>

        {/* Form Body */}
        {mode === "login" ? (
          /* ======================================================== */
          /* LOGIN FORM                                               */
          /* ======================================================== */
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Corporate Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="dispatch@delhicargo.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full neu-inset text-slate-800 placeholder-slate-400 text-xs px-4 py-3 rounded-xl outline-none"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Security Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full neu-inset text-slate-800 placeholder-slate-400 text-xs px-4 py-3 rounded-xl outline-none"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 mt-2 neu-btn-primary rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-95"
            >
              <span>{isSubmitting ? "Authenticating..." : "Sign In & Proceed to Checkout"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick Demo Bypass */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                disabled={isSubmitting}
                className="w-full py-3 neu-btn text-blue-600 rounded-full text-xs font-bold flex items-center justify-center gap-2 cursor-pointer hover:text-blue-700 active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>One-Click Demo Fleet Login &amp; Buy</span>
              </button>
            </div>

            <div className="text-center pt-2 text-xs text-slate-500">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("register")}
                className="text-blue-600 underline font-bold hover:text-blue-700 cursor-pointer ml-1"
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
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Fleet / Company Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Delhi Logistics Express Ltd"
                  value={fleetName}
                  onChange={(e) => setFleetName(e.target.value)}
                  className="w-full neu-inset text-slate-800 placeholder-slate-400 text-xs px-4 py-2.5 rounded-xl outline-none"
                />
                <Building2 className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Corporate Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="procurement@delhicargo.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full neu-inset text-slate-800 placeholder-slate-400 text-xs px-4 py-2.5 rounded-xl outline-none"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Phone / WhatsApp
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="+91 98200 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full neu-inset text-slate-800 placeholder-slate-400 text-xs px-4 py-2.5 rounded-xl outline-none"
                  />
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full neu-inset text-slate-800 placeholder-slate-400 text-xs px-4 py-2.5 rounded-xl outline-none"
                  />
                  <Lock className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 mt-2 neu-btn-primary rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-95"
            >
              <span>{isSubmitting ? "Provisioning..." : "Register Account & Move to Checkout"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-1 text-xs text-slate-500">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-blue-600 underline font-bold hover:text-blue-700 cursor-pointer ml-1"
              >
                Sign In Instead →
              </button>
            </div>
          </form>
        )}

        {/* Security Footer Decal */}
        <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>256-Bit Encrypted Session</span>
          </div>
          <span>ISO 27001 Compliant</span>
        </div>
      </div>
    </div>
  );
}
