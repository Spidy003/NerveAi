"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, Mail, Phone, Lock, KeyRound, ArrowRight, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ email: "", password: "", fleetName: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState("/dashboard");
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const r = params.get("redirect");
      if (r) setRedirect(r);
    }
  }, []);

  const handleDemoLogin = () => {
    document.cookie = "nerve_demo_session=active; path=/; max-age=86400; SameSite=Lax";
    localStorage.setItem(
      "nerve_demo_user",
      JSON.stringify({ email: "fleet.commander@nerveai.io", role: "Fleet Director" })
    );
    toast.success("Demo Authorization Verified! Proceeding...");
    router.push(redirect);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          fleet_name: formData.fleetName,
          phone: formData.phone,
        },
      },
    });
    setLoading(false);

    if (error) {
      if (
        error.message.toLowerCase().includes("rate limit") ||
        error.message.toLowerCase().includes("email")
      ) {
        toast.error(`${error.message} — Switching to instant demo session!`);
        handleDemoLogin();
      } else {
        toast.error(error.message);
      }
    } else {
      toast.success("Fleet account provisioned successfully!");
      router.push(redirect);
    }
  };

  return (
    <div className="min-h-screen bg-[#E6ECF5] text-slate-800 flex flex-col justify-between p-4 sm:p-8 font-sans select-none relative overflow-hidden">
      
      {/* Top Bar with Brand & Back Navigation */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between py-2">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl neu-flat flex items-center justify-center group-hover:scale-105 transition-transform">
            <span className="font-extrabold text-lg text-blue-600">N</span>
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-800">
            NERVE <span className="text-blue-600">AI</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="neu-btn px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            ← Sign In Instead
          </Link>
        </div>
      </div>

      {/* Main Register Card (Neumorphic Soft UI matching Theme) */}
      <div className="w-full max-w-lg mx-auto my-auto py-6">
        <div className="neu-flat p-8 sm:p-10 rounded-3xl space-y-6">
          
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Register Fleet
            </h1>
            <span className="neu-inset px-3 py-1 rounded-full text-[10px] font-bold text-blue-600 uppercase">
              Enterprise Provisioning
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Provision your commercial enterprise fleet for predictive telematics and automated EDI workflows.
          </p>

          {/* Evaluator / Viva Demo Access Pill Button */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full neu-btn py-3 px-4 rounded-full text-slate-700 font-bold text-xs flex items-center justify-center gap-2 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <KeyRound className="w-4 h-4 text-blue-600" />
            <span>One-Click Evaluator Demo Access</span>
          </button>

          <form onSubmit={handleRegister} className="space-y-4 pt-1">
            
            {/* Enterprise / Fleet Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Fleet / Enterprise Name</label>
              <div className="neu-inset rounded-2xl px-4 py-3 flex items-center justify-between">
                <input
                  required
                  type="text"
                  placeholder="e.g. Raj Logistics Express"
                  value={formData.fleetName}
                  onChange={(e) => setFormData({ ...formData, fleetName: e.target.value })}
                  className="bg-transparent text-sm text-slate-700 w-full focus:outline-none placeholder-slate-400 font-medium"
                />
                <Building2 className="w-4 h-4 text-slate-400 ml-2 shrink-0" />
              </div>
            </div>

            {/* Corporate Email */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Corporate Route (Email)</label>
              <div className="neu-inset rounded-2xl px-4 py-3 flex items-center justify-between">
                <input
                  required
                  type="email"
                  placeholder="dispatch@rajlogistics.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-transparent text-sm text-slate-700 w-full focus:outline-none placeholder-slate-400 font-medium"
                />
                <Mail className="w-4 h-4 text-slate-400 ml-2 shrink-0" />
              </div>
            </div>

            {/* Phone & Password Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Telemetry Contact (Phone)</label>
                <div className="neu-inset rounded-2xl px-4 py-3 flex items-center justify-between">
                  <input
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-transparent text-sm text-slate-700 w-full focus:outline-none placeholder-slate-400 font-medium"
                  />
                  <Phone className="w-4 h-4 text-slate-400 ml-2 shrink-0" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Access Key (Password)</label>
                <div className="neu-inset rounded-2xl px-4 py-3 flex items-center justify-between">
                  <input
                    required
                    type="password"
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="bg-transparent text-sm text-slate-700 w-full focus:outline-none placeholder-slate-400 font-medium tracking-wider"
                  />
                  <Lock className="w-4 h-4 text-slate-400 ml-2 shrink-0" />
                </div>
              </div>
            </div>

            {/* Primary Blue Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full neu-btn-primary py-4 rounded-full font-bold text-sm tracking-wide flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] shadow-md shadow-blue-500/30"
              >
                <span>{loading ? "Provisioning Account..." : "Provision Fleet Account"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="pt-4 border-t border-slate-200/80 text-center text-xs text-slate-500">
            <span>Already have a fleet account? </span>
            <Link
              href={`/login${redirect !== "/dashboard" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}
              className="font-bold text-blue-600 hover:underline ml-1"
            >
              Operator Sign In →
            </Link>
          </div>

        </div>
      </div>

      {/* Footer Info */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between text-[11px] text-slate-400 py-2">
        <span>Compliance: ANSI X12 EDI Ready • ISO 27001 Cloud Security</span>
        <span>Nerve AI Platform • Soft UI Neumorphic Theme</span>
      </div>

    </div>
  );
}
