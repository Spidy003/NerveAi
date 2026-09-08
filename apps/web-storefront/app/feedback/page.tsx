"use client";

import { useState, useEffect } from "react";
import { Star, Send, ShieldCheck, ArrowLeft, Sun, Moon, ThumbsUp, MessageSquare, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function FeedbackPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [rating, setRating] = useState(5);
  const [npsScore, setNpsScore] = useState(9);
  const [category, setCategory] = useState("diagnostic-accuracy");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Feedback Logged in Fleet Telemetry DB");
  };

  return (
    <div
      className={`min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-cyber select-none transition-colors duration-300 relative ${
        isLight ? "bg-[#F4F7FA] text-[#0C121A]" : "bg-[#080B10] text-white"
      }`}
    >
      <div className="absolute inset-0 bg-grid-tech opacity-30 pointer-events-none" />

      {/* Top Breadcrumb & Cyber Controls */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-gray-800/80 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/" className={`text-xl font-black tracking-wider ${isLight ? "text-black" : "text-white"}`}>
            NERVE
            <span className={isLight ? "text-[#00897B]" : "text-[#2DE1C2]"}> AI</span>
          </Link>
          <span className="text-gray-500 font-mono text-sm">//</span>
          <span className="font-mono text-xs text-gray-400 tracking-wider">
            [SYS_FLEET_FEEDBACK_V2]
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-[#2DE1C2] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
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

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2DE1C2]/10 border border-[#2DE1C2]/30 text-[#2DE1C2] text-xs font-mono font-bold mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>[ SYSTEM QUALITY &amp; USER EXPERIENCE FEEDBACK ]</span>
          </div>
          <h1 className={`text-3xl sm:text-5xl font-black tracking-tight mb-3 ${isLight ? "text-black" : "text-white"}`}>
            Fleet Operator &amp; Driver Feedback
          </h1>
          <p className="text-sm font-mono text-gray-400 max-w-xl mx-auto leading-relaxed">
            Your telemetry feedback directly optimizes our LSTM neural network weights and depot hardware provisioning cycles.
          </p>
        </div>

        <div className={`p-5 sm:p-8 rounded-2xl border shadow-2xl ${
          isLight ? "bg-white border-gray-200" : "bg-[#0E1520]/90 border-cyan/20"
        }`}>
          {submitted ? (
            <div className="p-10 text-center bg-[#2DE1C2]/10 border border-[#2DE1C2]/30 rounded-2xl">
              <CheckCircle2 className="w-16 h-16 text-[#2DE1C2] mx-auto mb-4" />
              <h3 className={`text-2xl font-black mb-2 ${isLight ? "text-gray-900" : "text-white"}`}>
                Feedback Successfully Transmitted!
              </h3>
              <p className="text-xs font-mono text-gray-400 max-w-md mx-auto mb-6 leading-relaxed">
                Thank you for contributing to Nerve AI telemetry reliability. Your input has been registered with priority SLA tag.
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  href="/store"
                  className="px-6 py-3 bg-[#2DE1C2] hover:bg-[#25c4a8] text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                >
                  Visit Hardware Store
                </Link>
                <Link
                  href="/dashboard"
                  className={`px-6 py-3 border font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all ${
                    isLight ? "border-gray-300 text-gray-800" : "border-gray-700 text-gray-300 hover:border-[#2DE1C2]"
                  }`}
                >
                  Open Fleet Console
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs">
              <div>
                <label className="block text-gray-400 mb-2 font-bold">// 01. OVERALL TELEMETRY SATISFACTION (1-5 STARS):</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setRating(s)}
                      className={`p-3 rounded-lg border transition-all ${
                        rating >= s
                          ? "bg-[#2DE1C2]/20 border-[#2DE1C2] text-[#2DE1C2]"
                          : isLight
                          ? "bg-gray-100 border-gray-300 text-gray-400"
                          : "bg-gray-900 border-gray-800 text-gray-600"
                      }`}
                    >
                      <Star className="w-6 h-6 fill-current" />
                    </button>
                  ))}
                  <span className="text-sm font-bold text-[#2DE1C2] ml-3">
                    {rating === 5 ? "5/5 (Exceptional)" : `${rating}/5 Stars`}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-2 font-bold">// 02. PRIMARY FEEDBACK DOMAIN:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: "diagnostic-accuracy", label: "LSTM Predictive Accuracy" },
                    { id: "hardware-durability", label: "OBD-II CAN-Bus Link Reliability" },
                    { id: "edi-checkout", label: "B2B Checkout & EDI 850 Flow" },
                    { id: "dashboard-hud", label: "Fleet Telemetry Console & HUD" },
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`p-3 rounded-lg border text-xs font-mono transition-all text-left ${
                        category === cat.id
                          ? "bg-[#2DE1C2]/15 border-[#2DE1C2] text-[#2DE1C2] font-bold"
                          : isLight
                          ? "bg-gray-50 border-gray-300 text-gray-600"
                          : "bg-[#090D14] border-gray-800 text-gray-400"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-gray-400 font-bold">// 03. NET PROMOTER SCORE (0-10):</label>
                  <span className="px-2.5 py-0.5 rounded bg-[#2DE1C2]/15 text-[#2DE1C2] font-bold text-xs border border-[#2DE1C2]/30">
                    {npsScore} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={npsScore}
                  onChange={(e) => setNpsScore(Number(e.target.value))}
                  className="w-full accent-[#2DE1C2] h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-1">
                  <span>0 (Not Likely)</span>
                  <span>5 (Neutral)</span>
                  <span>10 (Extremely Likely)</span>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1.5 font-bold">// 04. OPERATIONAL FEEDBACK &amp; COMMENTS:</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your user experience, feature requests for predictive telemetry, or suggestions for logistics integration..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className={`w-full p-4 rounded-xl border outline-none font-sans text-sm ${
                    isLight
                      ? "bg-gray-50 border-gray-300 text-black focus:border-[#00897B]"
                      : "bg-[#090D14] border-gray-700 text-white focus:border-[#2DE1C2]"
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#2DE1C2] hover:bg-[#25c4a8] text-black font-bold font-mono text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(45,225,194,0.4)] flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Telemetry Feedback</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
