"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import CyberMechBackground from "@/components/landing/CyberMechBackground";
import FleetRoiCalculator from "@/components/landing/FleetRoiCalculator";
import { Check, ArrowRight, ShieldCheck, Award, Phone, Send, Sun, Moon, Cpu, Activity, Zap, HardDrive, Calculator, Play } from "lucide-react";

// Client-only dynamic 3D Model import
const AirportTruck3D = dynamic(
  () => import("@/components/landing/AirportTruck3D"),
  { ssr: false }
);

export default function HomePage() {
  const [activeNav, setActiveNav] = useState<"home" | "demo" | "modules" | "calculator" | "contact">("home");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Load saved theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("cyber-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("cyber-theme", nextTheme);
  };

  const isLight = theme === "light";

  // Telemetry Dispatch Form State
  const [formData, setFormData] = useState({
    name: "Delhi Logistics Express",
    email: "dispatch@delhiexpress.in",
    fleetSize: "25 Vehicles",
    notes: "",
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Smooth scroll handler
  const scrollToSection = (id: "home" | "demo" | "modules" | "calculator" | "contact") => {
    setActiveNav(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Scroll spy
  useEffect(() => {
    const sections: ("home" | "demo" | "modules" | "calculator" | "contact")[] = [
      "home",
      "demo",
      "modules",
      "calculator",
      "contact",
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveNav(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 5000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail) return;
    setSubscribeSuccess(true);
    setTimeout(() => {
      setSubscribeSuccess(false);
      setSubscribeEmail("");
    }, 4000);
  };

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => setContactSuccess(false), 4500);
  };

  return (
    <div
      className={`min-h-screen relative font-cyber overflow-x-hidden selection:bg-cyan selection:text-black transition-colors duration-300 ${
        isLight ? "bg-[#F4F7FA] text-[#0C121A]" : "bg-[#07090C] text-white"
      }`}
    >
      {/* Background Ambience */}
      <CyberMechBackground />

      {/* ============================================================ */}
      {/* HEADER / NAVIGATION                                          */}
      {/* ============================================================ */}
      <header
        className={`sticky top-0 z-50 w-full backdrop-blur-md border-b transition-colors ${
          isLight
            ? "border-[#E2E8F0] bg-[#FFFFFF]/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
            : "border-[#16202C]/80 bg-[#07090C]/85 shadow-[0_4px_25px_rgba(0,0,0,0.5)]"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 h-20 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className={`w-9 h-9 border-2 flex items-center justify-center transition-all ${
                isLight
                  ? "border-[#00BFA5] bg-[#E0F7F4] shadow-[0_2px_12px_rgba(0,180,160,0.25)]"
                  : "border-cyan bg-cyan/10 shadow-[0_0_15px_rgba(45,225,194,0.4)] group-hover:bg-cyan/20"
              }`}
            >
              <span className={`font-black text-base ${isLight ? "text-[#00897B]" : "text-cyan"}`}>
                N
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-cyber font-black text-lg tracking-wider">
                NERVE{" "}
                <span className={isLight ? "text-[#00897B]" : "text-cyan"}>
                  AI
                </span>
              </span>
              <span
                className={`font-mono text-[9px] tracking-widest uppercase -mt-1 font-bold ${
                  isLight ? "text-[#556778]" : "text-gray-400"
                }`}
              >
                14-DAY FAILURE PREDICTION
              </span>
            </div>
          </Link>

          {/* Nav Items */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-cyber text-xs tracking-wider">
            {[
              { id: "home", label: "HOME" },
              { id: "demo", label: "VIDEO DEMO" },
              { id: "modules", label: "AI MODULES" },
              { id: "calculator", label: "ROI CALCULATOR" },
              { id: "contact", label: "CONTACT" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id as any)}
                className={`transition-all py-1.5 px-2 border-b-2 font-bold cursor-pointer ${
                  activeNav === item.id
                    ? isLight
                      ? "border-[#00897B] text-[#00897B]"
                      : "border-cyan text-cyan"
                    : isLight
                    ? "border-transparent text-gray-600 hover:text-[#00897B]"
                    : "border-transparent text-white/70 hover:text-cyan hover:border-cyan/40"
                }`}
              >
                // {item.label}
              </button>
            ))}

            <Link
              href="/store"
              className={`transition-colors py-1.5 px-2 font-bold ${
                isLight ? "text-[#00897B] hover:underline" : "text-cyan hover:underline"
              }`}
            >
              // STORE
            </Link>

            <Link
              href="/pricing"
              className={`transition-colors py-1.5 px-2 font-bold ${
                isLight ? "text-[#00897B] hover:underline" : "text-cyan hover:underline"
              }`}
            >
              // PRICING
            </Link>

            <Link
              href="/dashboard"
              className={`transition-colors py-1.5 px-2 font-bold ${
                isLight ? "text-[#00897B] hover:underline" : "text-cyan hover:underline"
              }`}
            >
              // CONSOLE
            </Link>
          </nav>

          {/* Controls: Theme Switcher & Portal Login Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={toggleTheme}
              className={`px-3 sm:px-4 py-2 flex items-center gap-2 font-cyber text-xs uppercase tracking-wider cyber-chamfer-button transition-all cursor-pointer ${
                isLight
                  ? "bg-[#E6F8F5] hover:bg-[#D0F3EC] text-[#00897B] border border-[#00BFA5]/40 shadow-[0_2px_12px_rgba(0,180,160,0.2)] active:scale-95"
                  : "bg-[#141D26] hover:bg-cyan/20 text-cyan border border-cyan/40 shadow-[0_0_12px_rgba(45,225,194,0.2)] active:scale-95"
              }`}
              title={`Switch to ${isLight ? "Dark" : "White"} Mode`}
            >
              {isLight ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#00897B]" />
                  <span className="text-[11px] font-bold">// DARK MODE</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-cyan" />
                  <span className="text-[11px] font-bold">// WHITE MODE</span>
                </>
              )}
            </button>

            <Link
              href="/login"
              className={`px-5 sm:px-8 py-2.5 font-cyber font-black text-xs tracking-widest uppercase transition-all active:scale-95 cyber-chamfer-button cursor-pointer ${
                isLight
                  ? "bg-[#00BFA5] hover:bg-[#00A896] text-black shadow-[0_4px_15px_rgba(0,180,160,0.35)]"
                  : "bg-cyan hover:bg-cyan-glow text-black shadow-[0_0_15px_rgba(45,225,194,0.5)]"
              }`}
            >
              LOGIN
            </Link>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* MAIN SECTIONS                                                */}
      {/* ============================================================ */}
      <main className="relative z-10 w-full flex flex-col">
        
        {/* ========================================================== */}
        {/* SECTION 1: HERO WITH ROTATING 3D MODEL & STOP GUESSING MSG */}
        {/* ========================================================== */}
        <section
          id="home"
          className={`min-h-[calc(100vh-80px)] w-full px-6 sm:px-12 lg:px-16 py-12 sm:py-16 flex items-center justify-center border-b transition-colors ${
            isLight ? "border-[#E2E8F0]" : "border-[#16202C]/80"
          }`}
        >
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Side: 3D Airport Catering Truck Model with Continuous Rotation (100% Transparent, No Background Box) */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start justify-center order-2 lg:order-1">
              <div className="w-full h-[420px] sm:h-[520px] lg:h-[600px] relative flex items-center justify-center bg-transparent">
                <AirportTruck3D theme={theme} autoRotateSpeed={1.4} />
              </div>

              {/* Status decal badges */}
              <div
                className={`flex items-center gap-6 mt-4 font-mono text-[11px] ${
                  isLight ? "text-[#556778]" : "text-gray-400"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full animate-ping ${isLight ? "bg-[#00897B]" : "bg-cyan"}`} />
                  3D CATERING TRUCK TELEMETRY RIG ACTIVE
                </span>
                <span>•</span>
                <span className={isLight ? "text-[#00897B] font-bold" : "text-cyan font-bold"}>
                  14-DAY FAILURE PREDICTION LINK
                </span>
              </div>
            </div>

            {/* Right Side: Headline and Pilot Deployment Form */}
            <div className="lg:col-span-5 flex flex-col justify-center order-1 lg:order-2">
              <div
                className={`inline-flex items-center gap-2 font-mono text-[10px] tracking-widest mb-3 font-bold ${
                  isLight ? "text-[#00897B]" : "text-cyan"
                }`}
              >
                <span className={`w-2 h-2 ${isLight ? "bg-[#00897B]" : "bg-cyan"}`} />
                <span>[ PROTOCOL // TELEMETRY_DISPATCH_V2 ]</span>
              </div>

              {/* Headline with 3D model: Stop guessing engine health. 14-day failure prediction. */}
              <h1
                className={`text-3xl sm:text-4xl xl:text-5xl font-cyber font-black mb-4 leading-tight tracking-wide uppercase transition-colors ${
                  isLight ? "text-[#0C121A]" : "text-white"
                }`}
              >
                Stop guessing engine health.<br />
                <span
                  className={
                    isLight
                      ? "text-[#00897B] drop-shadow-[0_2px_15px_rgba(0,180,160,0.3)]"
                      : "text-cyan drop-shadow-[0_0_20px_rgba(45,225,194,0.5)]"
                  }
                >
                  14-day failure prediction.
                </span>
              </h1>

              <p className="text-xs sm:text-sm font-mono text-gray-400 leading-relaxed mb-4">
                Plug the Nerve Link OBD-II hardware into any commercial fleet vehicle in minutes. Stream live ECU telemetry with neural network Remaining Useful Life (RUL) warnings.
              </p>

              <form onSubmit={handleBooking} className="w-full max-w-lg space-y-4">
                <div className="relative">
                  <span
                    className={`absolute -top-2 left-4 px-2 text-[10px] font-mono tracking-wider z-10 font-bold ${
                      isLight ? "bg-[#F4F7FA] text-[#00897B]" : "bg-[#080B10] text-cyan"
                    }`}
                  >
                    // FLEET OPERATOR / COMPANY
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="ENTER FLEET OPERATOR NAME"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full text-black font-cyber font-bold text-xs px-5 py-4 cyber-input-chamfer outline-none placeholder:text-gray-500 border-2 transition-all ${
                      isLight
                        ? "bg-[#FFFFFF] border-[#D1DCE5] focus:border-[#00BFA5] shadow-sm"
                        : "bg-[#E5E9EC] border-transparent focus:border-cyan"
                    }`}
                  />
                </div>

                <div className="relative">
                  <span
                    className={`absolute -top-2 left-4 px-2 text-[10px] font-mono tracking-wider z-10 font-bold ${
                      isLight ? "bg-[#F4F7FA] text-[#00897B]" : "bg-[#080B10] text-cyan"
                    }`}
                  >
                    // CORPORATE EMAIL
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="ENTER CORPORATE EMAIL"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full text-black font-cyber font-bold text-xs px-5 py-4 cyber-input-chamfer outline-none placeholder:text-gray-500 border-2 transition-all ${
                      isLight
                        ? "bg-[#FFFFFF] border-[#D1DCE5] focus:border-[#00BFA5] shadow-sm"
                        : "bg-[#E5E9EC] border-transparent focus:border-cyan"
                    }`}
                  />
                </div>

                <div className="relative">
                  <span
                    className={`absolute -top-2 left-4 px-2 text-[10px] font-mono tracking-wider z-10 font-bold ${
                      isLight ? "bg-[#F4F7FA] text-[#00897B]" : "bg-[#080B10] text-cyan"
                    }`}
                  >
                    // FLEET SIZE (VEHICLES)
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="E.G. 25 VEHICLES"
                    value={formData.fleetSize}
                    onChange={(e) => setFormData({ ...formData, fleetSize: e.target.value })}
                    className={`w-full text-black font-cyber font-bold text-xs px-5 py-4 cyber-input-chamfer outline-none placeholder:text-gray-500 border-2 transition-all ${
                      isLight
                        ? "bg-[#FFFFFF] border-[#D1DCE5] focus:border-[#00BFA5] shadow-sm"
                        : "bg-[#E5E9EC] border-transparent focus:border-cyan"
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-4 text-black font-cyber font-black text-sm uppercase tracking-widest cyber-chamfer-button transition-all active:scale-[0.99] mt-2 flex items-center justify-center gap-2 cursor-pointer ${
                    isLight
                      ? "bg-[#00BFA5] hover:bg-[#00A896] shadow-[0_8px_25px_rgba(0,180,160,0.35)]"
                      : "bg-cyan hover:bg-cyan-glow shadow-[0_0_25px_rgba(45,225,194,0.5)]"
                  }`}
                >
                  <span>{bookingSuccess ? "✓ DEPLOYMENT CONFIRMED // TELEMETRY LINKED" : "DEPLOY NERVE LINK NOW"}</span>
                  <div className="w-2 h-2 bg-black" />
                </button>
              </form>

              {/* Quick Jump Shortcuts */}
              <div
                className={`mt-6 flex items-center gap-6 text-xs font-mono ${
                  isLight ? "text-[#556778]" : "text-white/80"
                }`}
              >
                <button
                  onClick={() => scrollToSection("demo")}
                  className={`underline transition-colors tracking-widest cursor-pointer ${
                    isLight ? "hover:text-[#00897B]" : "hover:text-cyan"
                  }`}
                >
                  // WATCH DEMO ↓
                </button>
                <button
                  onClick={() => scrollToSection("modules")}
                  className={`underline transition-colors tracking-widest cursor-pointer ${
                    isLight ? "hover:text-[#00897B]" : "hover:text-cyan"
                  }`}
                >
                  // AI MODULES ↓
                </button>
                <button
                  onClick={() => scrollToSection("calculator")}
                  className={`underline transition-colors tracking-widest cursor-pointer ${
                    isLight ? "hover:text-[#00897B]" : "hover:text-cyan"
                  }`}
                >
                  // ROI CALCULATOR ↓
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================== */}
        {/* SECTION 2: LIVE FLEET TELEMETRY VIDEO PLAYER               */}
        {/* ========================================================== */}
        <section
          id="demo"
          className={`w-full px-6 sm:px-12 lg:px-16 py-20 border-b transition-colors ${
            isLight
              ? "border-[#E2E8F0] bg-[#EBF1F5]/80"
              : "border-[#16202C]/80 bg-[#06080D]/80"
          }`}
        >
          <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <div
                className={`font-mono text-xs mb-2 tracking-widest font-bold ${
                  isLight ? "text-[#00897B]" : "text-cyan"
                }`}
              >
                // LIVE HARDWARE &amp; TELEMETRY DEMONSTRATION
              </div>
              <h2
                className={`text-3xl sm:text-4xl lg:text-5xl font-cyber font-black ${
                  isLight ? "text-[#0C121A]" : "text-white"
                }`}
              >
                SEE NERVE AI IN{" "}
                <span className={isLight ? "text-[#00897B]" : "text-cyan"}>
                  ACTION
                </span>
              </h2>
              <p className="text-xs sm:text-sm font-mono text-gray-400 mt-2">
                Watch continuous 60Hz CAN-bus data streaming and autonomous 14-day failure alerts.
              </p>
            </div>

            {/* Video Player Window - Compact Sleek Frame */}
            <div className="w-full max-w-3xl sm:max-w-4xl h-[250px] sm:h-[350px] lg:h-[420px] relative rounded-2xl overflow-hidden border border-cyan/40 shadow-[0_0_35px_rgba(45,225,194,0.25)] bg-black flex items-center justify-center group">
              <video
                src="/fleet-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                controls
                className="w-full h-full object-cover rounded-2xl"
              />
              
              {/* Badge overlay */}
              <div className="absolute top-3.5 left-3.5 z-10 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-cyan/40 text-cyan text-[10px] font-mono font-bold flex items-center gap-2 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-ping" />
                <span>NERVE LINK HARDWARE • LIVE RUNTIME STREAM</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* SECTION 3: AI PREDICTIVE MODULES + COMPARISON TABLE        */}
        {/* ========================================================== */}
        <section
          id="modules"
          className={`w-full px-6 sm:px-12 lg:px-16 py-20 border-b transition-colors ${
            isLight ? "border-[#E2E8F0]" : "border-[#16202C]/80"
          }`}
        >
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <div
                  className={`font-mono text-xs mb-2 tracking-widest font-bold ${
                    isLight ? "text-[#00897B]" : "text-cyan"
                  }`}
                >
                  // LSTM NEURAL ENGINE &amp; CAN-BUS TELEMETRY
                </div>
                <h2
                  className={`text-4xl sm:text-5xl font-cyber font-black ${
                    isLight ? "text-[#0C121A]" : "text-white"
                  }`}
                >
                  AI PREDICTIVE{" "}
                  <span className={isLight ? "text-[#00897B]" : "text-cyan"}>
                    MODULES
                  </span>
                </h2>
              </div>
              <div
                className={`text-xs font-mono ${
                  isLight ? "text-[#768C9E]" : "text-[#8A96A3]"
                }`}
              >
                OBD-II LIVE TELEMETRY // 99.4% PREDICTION ACCURACY
              </div>
            </div>

            {/* TABULAR COMPARISON: TRADITIONAL FLEET CARE vs NERVE AI E-COMMERCE */}
            <div
              className={`w-full my-8 overflow-hidden rounded-2xl border shadow-2xl ${
                isLight
                  ? "bg-white border-gray-200"
                  : "bg-[#0E1520]/95 border-cyan/30"
              }`}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className={`border-b ${isLight ? "border-gray-200" : "border-gray-800"}`}>
                      <th className={`p-4 sm:p-6 w-1/2 font-cyber font-black text-xs sm:text-sm uppercase tracking-wider ${
                        isLight ? "bg-red-50 text-red-600" : "bg-red-950/25 text-red-400"
                      }`}>
                        ✕ TRADITIONAL FLEET CARE
                      </th>
                      <th className={`p-4 sm:p-6 w-1/2 font-cyber font-black text-xs sm:text-sm uppercase tracking-wider ${
                        isLight ? "bg-[#E6F8F5] text-[#00897B]" : "bg-cyan/15 text-cyan"
                      }`}>
                        ✓ NERVE AI E-COMMERCE
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isLight ? "divide-gray-100" : "divide-gray-800/60"}`}>
                    {[
                      {
                        trad: "Fleet owner waits for smoke or a breakdown to react",
                        nerve: "Orders the Nerve Link device online in minutes",
                      },
                      {
                        trad: "Manual diagnose",
                        nerve: "Remote video-call installation no workshop visit",
                      },
                      {
                        trad: "No visibility into engine health until failure occur",
                        nerve: "Live dashboard with 14-day-ahead failure prediction",
                      },
                      {
                        trad: "Fuel waste undetected",
                        nerve: "Real-time fuel & driving alerts sent instantly",
                      },
                      {
                        trad: "Paper records — no digital history",
                        nerve: "Digital health reports & subscription managed online",
                      },
                    ].map((row, idx) => (
                      <tr key={idx} className={isLight ? "hover:bg-gray-50" : "hover:bg-white/[0.02]"}>
                        <td className={`p-4 sm:p-5 flex items-start gap-2.5 ${isLight ? "text-gray-600" : "text-gray-400"}`}>
                          <span className="text-red-500 font-bold shrink-0">✕</span>
                          <span>{row.trad}</span>
                        </td>
                        <td className={`p-4 sm:p-5 font-semibold ${
                          isLight ? "text-gray-900 bg-teal-50/30" : "text-white bg-cyan/[0.03]"
                        }`}>
                          <span className={isLight ? "text-[#00897B] font-bold mr-2" : "text-cyan font-bold mr-2"}>
                            ✓
                          </span>
                          <span>{row.nerve}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* AI Module Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  code: "MOD-01",
                  title: "LSTM Predictive Failure Engine",
                  price: "₹200",
                  period: "/veh/mo",
                  features: [
                    "Battery & alternator failure prediction (14 days ahead)",
                    "Engine thermal anomaly & coolant monitoring",
                    "Remaining Useful Life (RUL) inference scoring",
                    "Automated alert dispatch via Twilio SMS & email",
                  ],
                  desc: "Neural network trained on commercial fleet telemetry to detect catastrophic component failures before they cause highway breakdowns.",
                },
                {
                  code: "MOD-02",
                  title: "Real-Time CAN-Bus Telemetry Link",
                  price: "₹180",
                  period: "/veh/mo",
                  badge: "RECOMMENDED",
                  features: [
                    "2-Second WebSocket live sensor streaming",
                    "Speed, RPM, fuel flow & brake telemetry",
                    "Driver harsh braking & acceleration score",
                    "CAN-bus fault injection testing & diagnostics",
                  ],
                  desc: "High-frequency telemetry ingestion into MongoDB Atlas with sub-second WebSocket dispatch to fleet management consoles.",
                },
                {
                  code: "MOD-03",
                  title: "Automated EDI 850/855 Work Orders",
                  price: "₹150",
                  period: "/veh/mo",
                  features: [
                    "ANSI X12 EDI 850 Purchase Order generation",
                    "EDI 855 Order Acknowledgment tracking",
                    "Automated parts order with authorized depots",
                    "Dedicated Enterprise SLA & custom webhooks",
                  ],
                  desc: "Enterprise supply chain automation. When a failure is predicted, replacement parts and service slots are booked instantly.",
                },
              ].map((c, i) => (
                <div
                  key={i}
                  className={`relative p-6 sm:p-8 cyber-chamfer-lg flex flex-col justify-between transition-all duration-300 hover:translate-y-[-4px] ${
                    c.badge
                      ? isLight
                        ? "bg-[#FFFFFF] border-2 border-[#00BFA5] shadow-[0_12px_35px_rgba(0,180,160,0.2)]"
                        : "bg-[#0E151E] border-2 border-cyan shadow-[0_0_30px_rgba(45,225,194,0.3)]"
                      : isLight
                      ? "bg-[#FFFFFF] border-2 border-[#DDE5ED] hover:border-[#00BFA5]/60 shadow-[0_6px_20px_rgba(0,0,0,0.04)]"
                      : "bg-[#0A0E14] border-2 border-[#1E2633] hover:border-cyan/50"
                  }`}
                >
                  {c.badge && (
                    <div
                      className={`absolute top-0 right-8 -translate-y-1/2 px-3 py-1 font-cyber font-black text-[9px] tracking-widest uppercase text-black ${
                        isLight ? "bg-[#00BFA5]" : "bg-cyan"
                      }`}
                    >
                      {c.badge}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-xs font-mono tracking-widest font-bold ${
                          isLight ? "text-[#00897B]" : "text-cyan"
                        }`}
                      >
                        {c.code}
                      </span>
                      <span
                        className={`text-[10px] font-mono ${
                          isLight ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        AI ENGINE
                      </span>
                    </div>

                    <h3
                      className={`text-xl font-cyber font-black mt-1 mb-3 ${
                        isLight ? "text-[#0C121A]" : "text-white"
                      }`}
                    >
                      {c.title}
                    </h3>
                    <p
                      className={`text-xs font-mono leading-relaxed mb-6 ${
                        isLight ? "text-[#556778]" : "text-[#8A96A3]"
                      }`}
                    >
                      {c.desc}
                    </p>

                    <ul
                      className={`space-y-2.5 font-mono text-xs mb-8 ${
                        isLight ? "text-[#2C3B49]" : "text-[#BACAD6]"
                      }`}
                    >
                      {c.features.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span
                            className={`font-bold ${
                              isLight ? "text-[#00897B]" : "text-cyan"
                            }`}
                          >
                            ✓
                          </span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className={`pt-6 border-t flex items-center justify-between ${
                      isLight ? "border-[#E2E8F0]" : "border-[#1E2633]"
                    }`}
                  >
                    <div>
                      <div
                        className={`text-2xl font-cyber font-black ${
                          isLight ? "text-[#00897B]" : "text-cyan"
                        }`}
                      >
                        {c.price}
                        <span className="text-xs font-normal text-gray-400 font-mono">
                          {c.period}
                        </span>
                      </div>
                      <div
                        className={`text-[10px] font-mono ${
                          isLight ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        SAAS SUBSCRIPTION
                      </div>
                    </div>
                    <Link
                      href="/pricing"
                      className={`px-6 py-2.5 text-black font-cyber font-black text-xs uppercase tracking-wider cyber-chamfer-button transition-all cursor-pointer ${
                        isLight
                          ? "bg-[#00BFA5] hover:bg-[#00A896] shadow-[0_4px_15px_rgba(0,180,160,0.3)]"
                          : "bg-cyan hover:bg-cyan-glow"
                      }`}
                    >
                      VIEW PLAN
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* SECTION 4: ROI CALCULATOR (REPLACES STATIC PRICING SECTION) */}
        {/* ========================================================== */}
        <section
          id="calculator"
          className={`w-full px-6 sm:px-12 lg:px-16 py-20 border-b transition-colors ${
            isLight
              ? "border-[#E2E8F0] bg-[#EBF1F5]/80"
              : "border-[#16202C]/80 bg-[#06080D]/70"
          }`}
        >
          <div className="w-full max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 gap-4">
              <div>
                <div
                  className={`font-mono text-xs mb-2 tracking-widest font-bold ${
                    isLight ? "text-[#00897B]" : "text-cyan"
                  }`}
                >
                  // E-BUSINESS FINANCIAL STRATEGY &amp; ROI SIMULATOR
                </div>
                <h2
                  className={`text-4xl sm:text-5xl font-cyber font-black ${
                    isLight ? "text-[#0C121A]" : "text-white"
                  }`}
                >
                  FLEET{" "}
                  <span className={isLight ? "text-[#00897B]" : "text-cyan"}>
                    SAVINGS SIMULATOR
                  </span>
                </h2>
              </div>
              <div
                className={`text-xs font-mono ${
                  isLight ? "text-[#768C9E]" : "text-[#8A96A3]"
                }`}
              >
                HARDWARE: ₹1,499 ONE-TIME // RECURRING SAAS FROM ₹150/MO
              </div>
            </div>

            {/* Interactive B2B ROI Calculator Component */}
            <FleetRoiCalculator isLight={isLight} />
          </div>
        </section>

        {/* ========================================================== */}
        {/* SECTION 5: SUBSCRIBE // FLEET TELEMETRY INTELLIGENCE BRIEF */}
        {/* ========================================================== */}
        <section
          id="subscribe"
          className={`w-full px-6 sm:px-12 lg:px-16 py-20 border-b transition-colors ${
            isLight
              ? "border-[#E2E8F0] bg-[#EBF1F5]/80"
              : "border-[#16202C]/80 bg-[#07090F]/70"
          }`}
        >
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
            <div
              className={`w-full max-w-xl flex flex-col items-center text-center px-8 py-10 cyber-chamfer-lg transition-colors ${
                isLight
                  ? "bg-[#FFFFFF] border-2 border-[#00BFA5]/40 shadow-[0_12px_35px_rgba(0,180,160,0.18)]"
                  : "bg-[#0E151E] border-2 border-cyan/40 shadow-[0_0_35px_rgba(45,225,194,0.25)]"
              }`}
            >
              <h2
                className={`text-4xl sm:text-5xl font-cyber font-black mb-2 tracking-wider ${
                  isLight ? "text-[#00897B]" : "text-cyan"
                }`}
              >
                SUBSCRIBE
              </h2>
              <p
                className={`text-xs font-mono font-bold tracking-widest mb-6 uppercase ${
                  isLight ? "text-[#556778]" : "text-[#8A96A3]"
                }`}
              >
                RECEIVE PREDICTIVE FLEET TELEMETRY LOGS &amp; INCIDENT REPORTS
              </p>

              <form onSubmit={handleSubscribe} className="w-full space-y-4">
                <input
                  type="email"
                  required
                  placeholder="ENTER CORPORATE EMAIL"
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  className={`w-full text-black font-cyber font-bold text-xs px-5 py-4 cyber-input-chamfer outline-none placeholder:text-gray-500 text-center border-2 transition-all ${
                    isLight
                      ? "bg-[#F8FAFC] border-[#D1DCE5] focus:border-[#00BFA5]"
                      : "bg-[#E5E9EC] border-transparent focus:border-cyan"
                  }`}
                />
                <button
                  type="submit"
                  className={`w-full py-4 text-black font-cyber font-black text-xs uppercase tracking-widest cyber-chamfer-button transition-all cursor-pointer ${
                    isLight
                      ? "bg-[#00BFA5] hover:bg-[#00A896] shadow-[0_6px_20px_rgba(0,180,160,0.3)]"
                      : "bg-cyan hover:bg-cyan-glow shadow-[0_0_20px_rgba(45,225,194,0.5)]"
                  }`}
                >
                  {subscribeSuccess ? "✓ SUBSCRIBED TO TELEMETRY DISPATCH" : "SUBSCRIBE TO FLEET INTELLIGENCE"}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* SECTION 6: CONTACT // 24/7 FLEET COMMAND DESK              */}
        {/* ========================================================== */}
        <section
          id="contact"
          className="w-full px-6 sm:px-12 lg:px-16 py-20"
        >
          <div className="w-full max-w-6xl mx-auto">
            <div
              className={`font-mono text-xs mb-2 tracking-widest font-bold ${
                isLight ? "text-[#00897B]" : "text-cyan"
              }`}
            >
              // 24/7 FLEET OPERATIONS &amp; HARDWARE SUPPORT
            </div>
            <h2
              className={`text-4xl sm:text-5xl font-cyber font-black mb-8 ${
                isLight ? "text-[#0C121A]" : "text-white"
              }`}
            >
              CONTACT{" "}
              <span className={isLight ? "text-[#00897B]" : "text-cyan"}>
                DESK
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono">
              {/* Left Column: Direct Phone Dispatch */}
              <div className="space-y-6">
                <div
                  className={`p-6 cyber-chamfer ${
                    isLight
                      ? "bg-[#FFFFFF] border-2 border-[#DDE5ED] shadow-[0_6px_20px_rgba(0,0,0,0.04)]"
                      : "bg-[#0E151E] border-2 border-cyan/30"
                  }`}
                >
                  <div
                    className={`text-xs font-bold mb-2 ${
                      isLight ? "text-[#00897B]" : "text-cyan"
                    }`}
                  >
                    // 24/7 FLEET DISPATCH HOTLINE
                  </div>
                  <div
                    className={`text-3xl font-cyber font-black tracking-wider ${
                      isLight ? "text-[#0C121A]" : "text-white"
                    }`}
                  >
                    1800 454 356
                  </div>
                  <div
                    className={`text-xs mt-2 ${
                      isLight ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    Toll-free across all Indian freight sectors • Dedicated hardware support team
                  </div>
                </div>

                <div
                  className={`p-6 cyber-chamfer ${
                    isLight
                      ? "bg-[#FFFFFF] border-2 border-[#DDE5ED] shadow-[0_6px_20px_rgba(0,0,0,0.04)]"
                      : "bg-[#0E151E] border-2 border-cyan/30"
                  }`}
                >
                  <div
                    className={`text-xs font-bold mb-2 ${
                      isLight ? "text-[#00897B]" : "text-cyan"
                    }`}
                  >
                    // EMERGENCY BREAKDOWN RESPONSE
                  </div>
                  <div
                    className={`text-xl font-bold tracking-wider ${
                      isLight ? "text-[#0C121A]" : "text-white"
                    }`}
                  >
                    +91 98765 43210
                  </div>
                  <div
                    className={`text-xs mt-2 ${
                      isLight ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    24/7 instant technician dispatch &amp; remote ECU diagnostics stream
                  </div>
                </div>

                <div
                  className={`p-6 cyber-chamfer ${
                    isLight
                      ? "bg-[#FFFFFF] border-2 border-[#DDE5ED] shadow-[0_6px_20px_rgba(0,0,0,0.04)]"
                      : "bg-[#0E151E] border-2 border-cyan/30"
                  }`}
                >
                  <div
                    className={`text-xs font-bold mb-2 ${
                      isLight ? "text-[#00897B]" : "text-cyan"
                    }`}
                  >
                    // NERVE AI HEADQUARTERS
                  </div>
                  <div
                    className={`text-sm font-bold ${
                      isLight ? "text-[#0C121A]" : "text-white"
                    }`}
                  >
                    Nerve AI Platform, Cyber City Hub, Sector 24
                  </div>
                  <div
                    className={`text-xs mt-1 ${
                      isLight ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    Gurugram, Haryana 122002 • India
                  </div>
                </div>
              </div>

              {/* Right Column: Direct Message Transmission Form */}
              <form
                onSubmit={handleContact}
                className={`p-8 cyber-chamfer space-y-4 ${
                  isLight
                    ? "bg-[#FFFFFF] border-2 border-[#00BFA5]/40 shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
                    : "bg-[#0E151E] border-2 border-cyan/40 shadow-[0_0_25px_rgba(45,225,194,0.15)]"
                }`}
              >
                <div
                  className={`text-xs font-cyber font-bold mb-2 ${
                    isLight ? "text-[#0C121A]" : "text-white"
                  }`}
                >
                  // TELEMETRY TRANSMISSION CONSOLE
                </div>
                <input
                  type="text"
                  required
                  placeholder="FLEET OPERATOR NAME / CALLSIGN"
                  className={`w-full text-black font-cyber font-bold text-xs p-4 cyber-input-chamfer outline-none placeholder:text-gray-500 border-2 transition-all ${
                    isLight
                      ? "bg-[#F8FAFC] border-[#D1DCE5] focus:border-[#00BFA5]"
                      : "bg-[#E5E9EC] border-transparent focus:border-cyan"
                  }`}
                />
                <input
                  type="email"
                  required
                  placeholder="CORPORATE EMAIL"
                  className={`w-full text-black font-cyber font-bold text-xs p-4 cyber-input-chamfer outline-none placeholder:text-gray-500 border-2 transition-all ${
                    isLight
                      ? "bg-[#F8FAFC] border-[#D1DCE5] focus:border-[#00BFA5]"
                      : "bg-[#E5E9EC] border-transparent focus:border-cyan"
                  }`}
                />
                <textarea
                  rows={4}
                  required
                  placeholder="TRANSMIT FLEET INQUIRY OR DEPLOYMENT SPECIFICATIONS..."
                  className={`w-full text-black font-cyber font-bold text-xs p-4 cyber-input-chamfer outline-none placeholder:text-gray-500 border-2 transition-all ${
                    isLight
                      ? "bg-[#F8FAFC] border-[#D1DCE5] focus:border-[#00BFA5]"
                      : "bg-[#E5E9EC] border-transparent focus:border-cyan"
                  }`}
                />
                <button
                  type="submit"
                  className={`w-full py-4 text-black font-cyber font-black text-xs uppercase tracking-widest cyber-chamfer-button transition-all cursor-pointer ${
                    isLight
                      ? "bg-[#00BFA5] hover:bg-[#00A896] shadow-[0_6px_20px_rgba(0,180,160,0.3)]"
                      : "bg-cyan hover:bg-cyan-glow shadow-[0_0_20px_rgba(45,225,194,0.5)]"
                  }`}
                >
                  {contactSuccess ? "✓ TRANSMISSION DISPATCHED" : "SEND TRANSMISSION"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================================ */}
      {/* FOOTER                                                       */}
      {/* ============================================================ */}
      <footer
        className={`relative z-30 w-full px-6 sm:px-12 lg:px-16 py-6 border-t flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono transition-colors ${
          isLight
            ? "border-[#E2E8F0] bg-[#FFFFFF] text-[#556778] shadow-[0_-4px_20px_rgba(0,0,0,0.03)]"
            : "border-[#16202C] bg-[#070A0E] text-[#8A96A3]"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-2.5 h-2.5 animate-pulse ${
              isLight ? "bg-[#00897B]" : "bg-cyan"
            }`}
          />
          <span
            className={`font-cyber tracking-widest text-[11px] ${
              isLight ? "text-[#0C121A] font-bold" : "text-white"
            }`}
          >
            // NERVE AI • 14-DAY PREDICTIVE FLEET PLATFORM
          </span>
        </div>

        <div
          className={`flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-cyber text-[10px] tracking-wider uppercase ${
            isLight ? "text-[#556778]" : "text-white/70"
          }`}
        >
          <button
            onClick={() => scrollToSection("home")}
            className={`transition-colors cursor-pointer ${
              isLight ? "hover:text-[#00897B]" : "hover:text-cyan"
            }`}
          >
            // HOME
          </button>
          <button
            onClick={() => scrollToSection("demo")}
            className={`transition-colors cursor-pointer ${
              isLight ? "hover:text-[#00897B]" : "hover:text-cyan"
            }`}
          >
            // VIDEO DEMO
          </button>
          <button
            onClick={() => scrollToSection("modules")}
            className={`transition-colors cursor-pointer ${
              isLight ? "hover:text-[#00897B]" : "hover:text-cyan"
            }`}
          >
            // AI MODULES
          </button>
          <button
            onClick={() => scrollToSection("calculator")}
            className={`transition-colors cursor-pointer ${
              isLight ? "hover:text-[#00897B]" : "hover:text-cyan"
            }`}
          >
            // ROI CALCULATOR
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className={`transition-colors cursor-pointer ${
              isLight ? "hover:text-[#00897B]" : "hover:text-cyan"
            }`}
          >
            // CONTACT
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`px-3 py-1 text-[10px] font-cyber tracking-wider uppercase cyber-chamfer-button transition-all cursor-pointer ${
              isLight
                ? "bg-[#E6F8F5] text-[#00897B] border border-[#00BFA5]/30 font-bold"
                : "bg-[#141D26] text-cyan border border-cyan/30"
            }`}
          >
            {isLight ? "ACTIVE: WHITE MODE" : "ACTIVE: DARK MODE"}
          </button>
          <div
            className={`font-bold tracking-widest font-cyber text-[11px] ${
              isLight ? "text-[#00897B]" : "text-cyan"
            }`}
          >
            [ {isLight ? "CYBER ALABASTER" : "TURQUOISE // CHARCOAL"} ]
          </div>
        </div>
      </footer>
    </div>
  );
}
