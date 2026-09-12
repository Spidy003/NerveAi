"use client";

import { useState } from "react";
import { Star, Send, ArrowLeft, MessageSquare, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import Footer from "@/components/shared/Footer";

export default function FeedbackPage() {
  const [rating, setRating] = useState(5);
  const [npsScore, setNpsScore] = useState(9);
  const [category, setCategory] = useState("diagnostic-accuracy");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Feedback Logged in Fleet Telemetry DB");
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans bg-[#E6ECF5] text-slate-800 select-none relative">
      
      {/* Top Header & Breadcrumb */}
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 neu-flat px-6 py-4 rounded-full">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-lg font-black tracking-tight text-slate-800 flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl neu-flat flex items-center justify-center text-blue-600 font-extrabold text-sm">
              N
            </div>
            <span>NERVE <span className="text-blue-600">AI</span></span>
          </Link>
          <span className="text-slate-300">•</span>
          <span className="text-xs font-semibold text-slate-500">Fleet Telemetry Feedback</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="neu-btn px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <Link
            href="/dashboard"
            className="neu-btn-primary px-5 py-2 rounded-full text-xs font-bold tracking-wide"
          >
            Fleet Console
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Title */}
        <div className="text-center space-y-3">
          <div className="neu-inset px-4 py-1.5 rounded-full text-xs font-bold text-blue-600 inline-flex items-center gap-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>SYSTEM QUALITY &amp; USER EXPERIENCE FEEDBACK</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-800">
            Fleet Operator &amp; Driver Feedback
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Your telemetry feedback directly optimizes our LSTM neural network weights and depot hardware provisioning cycles.
          </p>
        </div>

        {/* Form Container */}
        <div className="neu-flat p-6 sm:p-10 rounded-3xl">
          {submitted ? (
            <div className="neu-inset p-10 text-center rounded-2xl space-y-4">
              <CheckCircle2 className="w-16 h-16 text-blue-600 mx-auto" />
              <h3 className="text-2xl font-black text-slate-800">
                Feedback Successfully Transmitted!
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                Thank you for contributing to Nerve AI telemetry reliability. Your input has been registered with priority SLA tag.
              </p>
              <div className="flex justify-center gap-4 pt-4">
                <Link
                  href="/store"
                  className="neu-btn-primary px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider"
                >
                  Visit Hardware Store
                </Link>
                <Link
                  href="/dashboard"
                  className="neu-btn px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider text-slate-700"
                >
                  Open Fleet Console
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              <div>
                <label className="block text-slate-700 mb-2.5 font-bold uppercase tracking-wider">
                  1. Overall Telemetry Satisfaction (1-5 Stars):
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setRating(s)}
                      className={`p-3 rounded-2xl transition-all cursor-pointer ${
                        rating >= s
                          ? "neu-flat text-amber-500 scale-105"
                          : "neu-inset text-slate-400"
                      }`}
                    >
                      <Star className="w-6 h-6 fill-current" />
                    </button>
                  ))}
                  <span className="text-sm font-bold text-blue-600 ml-3">
                    {rating === 5 ? "5/5 (Exceptional)" : `${rating}/5 Stars`}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-2.5 font-bold uppercase tracking-wider">
                  2. Primary Feedback Domain:
                </label>
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
                      className={`p-3.5 rounded-2xl text-xs transition-all text-left cursor-pointer ${
                        category === cat.id
                          ? "neu-inset text-blue-600 font-bold"
                          : "neu-btn text-slate-600"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-slate-700 font-bold uppercase tracking-wider">
                    3. Net Promoter Score (0-10):
                  </label>
                  <span className="neu-inset px-3 py-1 rounded-full text-blue-600 font-bold text-xs">
                    {npsScore} / 10
                  </span>
                </div>
                <div className="neu-inset p-3 rounded-2xl">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={npsScore}
                    onChange={(e) => setNpsScore(Number(e.target.value))}
                    className="w-full accent-blue-600 h-2 bg-transparent rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-semibold mt-2">
                    <span>0 (Not Likely)</span>
                    <span>5 (Neutral)</span>
                    <span>10 (Extremely Likely)</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1.5 font-bold uppercase tracking-wider">
                  4. Operational Feedback &amp; Comments:
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your user experience, feature requests for predictive telemetry, or suggestions for logistics integration..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full neu-inset text-slate-800 placeholder-slate-400 p-4 rounded-2xl outline-none font-sans text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 neu-btn-primary rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/25 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Submit Telemetry Feedback</span>
              </button>
            </form>
          )}
        </div>

      </div>

      <Footer />
    </div>
  );
}
