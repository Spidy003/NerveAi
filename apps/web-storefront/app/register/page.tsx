"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Activity, ShieldCheck, ArrowRight, Sun, Moon, KeyRound } from "lucide-react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ email: "", password: "", fleetName: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [redirect, setRedirect] = useState("/dashboard");
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const saved = localStorage.getItem("cyber-theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const r = params.get("redirect");
      if (r) setRedirect(r);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("cyber-theme", next);
  };

  const isLight = theme === "light";

  const handleDemoLogin = () => {
    document.cookie = "nerve_demo_session=active; path=/; max-age=86400; SameSite=Lax";
    localStorage.setItem("nerve_demo_user", JSON.stringify({ email: "fleet.commander@nerveai.io", role: "Fleet Director" }));
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
          phone: formData.phone
        }
      }
    });
    setLoading(false);
    
    if (error) {
      if (error.message.toLowerCase().includes("rate limit") || error.message.toLowerCase().includes("email")) {
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
    <div
      className={`min-h-screen flex flex-col justify-between p-4 sm:p-8 lg:p-12 relative overflow-hidden font-cyber select-none transition-colors duration-300 ${
        isLight ? "bg-[#F4F7FA] text-[#0C121A]" : "bg-[#080B10] text-white"
      }`}
    >
      <div className="absolute inset-0 bg-grid-tech opacity-30 pointer-events-none" />

      {/* Top Bar with Brand & Theme Switcher */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-black tracking-wider text-white">
            NERVE
            <span className={isLight ? "text-[#00897B]" : "text-cyan"}>
              {" "}AI
            </span>
          </span>
          <div className={`w-2 h-4 ${isLight ? "bg-[#00897B]" : "bg-cyan"}`} />
        </Link>

        <div className="flex items-center gap-3">
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
            href="/login"
            className={`font-mono text-xs hover:underline ${
              isLight ? "text-[#556778]" : "text-gray-400"
            }`}
          >
            // LOGIN
          </Link>
        </div>
      </div>

      {/* Center Auth Card */}
      <div className="relative z-10 w-full max-w-lg mx-auto my-auto py-6">
        <div
          className={`p-5 sm:p-8 lg:p-10 rounded-2xl border-2 transition-all ${
            isLight
              ? "bg-white border-[#00BFA5]/40 shadow-[0_12px_35px_rgba(0,180,160,0.18)]"
              : "bg-[#0E151E] border-cyan/40 shadow-[0_0_35px_rgba(45,225,194,0.2)]"
          }`}
        >
          <div className="flex items-center justify-between mb-6 border-b pb-4 border-gray-800">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full animate-ping ${isLight ? "bg-[#00897B]" : "bg-cyan"}`} />
              <span className={`font-mono text-[10px] tracking-widest font-bold ${isLight ? "text-[#00897B]" : "text-cyan"}`}>
                [ PROVISION // FLEET_ACCOUNT_V2 ]
              </span>
            </div>
            <span className="font-mono text-[10px] text-gray-500">RLS POSTGRES</span>
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-black tracking-tight mb-2 uppercase">
              REGISTER FLEET
            </h1>
            <p className={`text-xs font-mono ${isLight ? "text-[#556778]" : "text-gray-400"}`}>
              Provision your enterprise company for predictive telematics.
            </p>
          </div>

          {/* One-Click Demo Access for Evaluation / Viva */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-3.5 px-4 rounded-xl bg-[#2DE1C2] hover:bg-[#25c4a8] text-black font-mono text-xs font-bold uppercase tracking-wider mb-6 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(45,225,194,0.4)] transition-all cursor-pointer"
          >
            <KeyRound className="w-4 h-4" />
            <span>⚡ ONE-CLICK DEMO ACCESS (BYPASS RATE LIMIT)</span>
          </button>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="relative">
              <span
                className={`absolute -top-2 left-4 px-2 text-[10px] font-mono tracking-wider z-10 font-bold ${
                  isLight ? "bg-white text-[#00897B]" : "bg-[#0E151E] text-cyan"
                }`}
              >
                // FLEET / ENTERPRISE NAME
              </span>
              <input
                required
                type="text"
                placeholder="E.G. RAJ LOGISTICS EXPRESS"
                onChange={(e) => setFormData({ ...formData, fleetName: e.target.value })}
                className={`w-full text-black font-cyber font-bold text-xs px-5 py-4 cyber-input-chamfer outline-none placeholder:text-gray-500 border-2 transition-all ${
                  isLight
                    ? "bg-[#F8FAFC] border-[#D1DCE5] focus:border-[#00BFA5]"
                    : "bg-[#E5E9EC] border-transparent focus:border-cyan"
                }`}
              />
            </div>

            <div className="relative">
              <span
                className={`absolute -top-2 left-4 px-2 text-[10px] font-mono tracking-wider z-10 font-bold ${
                  isLight ? "bg-white text-[#00897B]" : "bg-[#0E151E] text-cyan"
                }`}
              >
                // CORPORATE ROUTE (EMAIL)
              </span>
              <input
                required
                type="email"
                placeholder="dispatch@rajlogistics.in"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full text-black font-cyber font-bold text-xs px-5 py-4 cyber-input-chamfer outline-none placeholder:text-gray-500 border-2 transition-all ${
                  isLight
                    ? "bg-[#F8FAFC] border-[#D1DCE5] focus:border-[#00BFA5]"
                    : "bg-[#E5E9EC] border-transparent focus:border-cyan"
                }`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <span
                  className={`absolute -top-2 left-4 px-2 text-[10px] font-mono tracking-wider z-10 font-bold ${
                    isLight ? "bg-white text-[#00897B]" : "bg-[#0E151E] text-cyan"
                  }`}
                >
                  // TELEMETRY CONTACT (PHONE)
                </span>
                <input
                  required
                  type="tel"
                  placeholder="+91 98765 43210"
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full text-black font-cyber font-bold text-xs px-5 py-4 cyber-input-chamfer outline-none placeholder:text-gray-500 border-2 transition-all ${
                    isLight
                      ? "bg-[#F8FAFC] border-[#D1DCE5] focus:border-[#00BFA5]"
                      : "bg-[#E5E9EC] border-transparent focus:border-cyan"
                  }`}
                />
              </div>

              <div className="relative">
                <span
                  className={`absolute -top-2 left-4 px-2 text-[10px] font-mono tracking-wider z-10 font-bold ${
                    isLight ? "bg-white text-[#00897B]" : "bg-[#0E151E] text-cyan"
                  }`}
                >
                  // ACCESS KEY (PASSWORD)
                </span>
                <input
                  required
                  type="password"
                  placeholder="••••••••••••"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full text-black font-cyber font-bold text-xs px-5 py-4 cyber-input-chamfer outline-none placeholder:text-gray-500 border-2 transition-all ${
                    isLight
                      ? "bg-[#F8FAFC] border-[#D1DCE5] focus:border-[#00BFA5]"
                      : "bg-[#E5E9EC] border-transparent focus:border-cyan"
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 text-black font-cyber font-black text-xs uppercase tracking-widest cyber-chamfer-button transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 ${
                isLight
                  ? "bg-[#00BFA5] hover:bg-[#00A896] shadow-[0_6px_20px_rgba(0,180,160,0.3)]"
                  : "bg-cyan hover:bg-cyan-glow shadow-[0_0_20px_rgba(45,225,194,0.5)]"
              }`}
            >
              <span>{loading ? "PROVISIONING ACCOUNT..." : "PROVISION FLEET ACCOUNT"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-800 text-center font-mono text-xs">
            <span className="text-gray-500">ALREADY HAVE ACCOUNT? </span>
            <Link
              href={`/login${redirect !== "/dashboard" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}
              className={`font-bold hover:underline ml-1 ${
                isLight ? "text-[#00897B]" : "text-cyan"
              }`}
            >
              OPERATOR SIGN IN →
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Footer Telemetry Decal */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between text-[10px] font-mono text-gray-500 border-t border-gray-800/60 pt-4">
        <span>COMPLIANCE: ANSI X12 EDI READY • ISO 27001 CLOUD SECURITY</span>
        <span>NERVE AI PLATFORM V2.4</span>
      </div>
    </div>
  );
}
