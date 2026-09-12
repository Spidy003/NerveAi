"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import CyberMechBackground from "@/components/landing/CyberMechBackground";
import FleetRoiCalculator from "@/components/landing/FleetRoiCalculator";
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Award,
  Phone,
  Send,
  Cpu,
  Activity,
  Zap,
  HardDrive,
  Calculator,
  Play,
  Layers,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

// Client-only dynamic 3D Model import
const AirportTruck3D = dynamic(
  () => import("@/components/landing/AirportTruck3D"),
  { ssr: false }
);

export default function HomePage() {
  const [activeNav, setActiveNav] = useState<"home" | "demo" | "modules" | "calculator" | "contact">("home");

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
    <div className="min-h-screen relative font-sans text-slate-800 bg-[#E6ECF5] overflow-x-hidden selection:bg-blue-600 selection:text-white">
      {/* Neumorphic Ambient Lighting Canvas */}
      <CyberMechBackground theme="light" />

      {/* ============================================================ */}
      {/* HEADER / NAVIGATION (Floating Neumorphic Pill)               */}
      {/* ============================================================ */}
      <header className="sticky top-4 z-50 w-full px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="neu-flat rounded-full px-6 py-3.5 flex items-center justify-between transition-all">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl neu-flat flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-lg text-blue-600">N</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-slate-800">
                NERVE <span className="text-blue-600">AI</span>
              </span>
              <span className="text-[9px] tracking-wider uppercase font-semibold text-slate-400 -mt-1">
                14-Day Failure Prediction
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-2 font-medium text-xs text-slate-600">
            {[
              { id: "home", label: "Home" },
              { id: "demo", label: "Video Demo" },
              { id: "modules", label: "AI Modules" },
              { id: "calculator", label: "ROI Simulator" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id as any)}
                className={`px-3.5 py-2 rounded-full transition-all cursor-pointer ${
                  activeNav === item.id
                    ? "neu-inset text-blue-600 font-bold"
                    : "hover:text-blue-600 text-slate-600"
                }`}
              >
                {item.label}
              </button>
            ))}

            <Link
              href="/store"
              className="px-3.5 py-2 rounded-full hover:text-blue-600 transition-colors"
            >
              Store
            </Link>
            <Link
              href="/pricing"
              className="px-3.5 py-2 rounded-full hover:text-blue-600 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/dashboard"
              className="px-3.5 py-2 rounded-full text-blue-600 font-bold hover:underline"
            >
              Console
            </Link>
          </nav>

          {/* Action Button: Sign Up / Login Pill */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="neu-btn-primary px-6 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all active:scale-95 cursor-pointer shadow-md"
            >
              Portal Login
            </Link>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* MAIN CONTENT                                                 */}
      {/* ============================================================ */}
      <main className="relative z-10 w-full flex flex-col pt-8 sm:pt-12 space-y-24">
        
        {/* ========================================================== */}
        {/* SECTION 1: HERO (3D TRUCK PODIUM & NEUMORPHIC DISPATCH)    */}
        {/* ========================================================== */}
        <section
          id="home"
          className="w-full px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto min-h-[calc(100vh-140px)] flex items-center"
        >
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Side: 3D Airport Catering Truck Model */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center order-2 lg:order-1">
              <div className="w-full max-w-[560px] h-[440px] sm:h-[520px] relative flex items-center justify-center">
                {/* 3D WebGL Canvas */}
                <div className="relative z-10 w-full h-full">
                  <AirportTruck3D theme="light" autoRotateSpeed={1.4} />
                </div>
              </div>

              {/* Status Decal Pill */}
              <div className="neu-flat px-5 py-2 rounded-full flex items-center gap-3 text-xs font-medium text-slate-600 mt-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                <span>3D Airport Catering Truck Digital Twin</span>
                <span className="text-slate-300">•</span>
                <span className="text-blue-600 font-bold">14-Day RUL Prediction</span>
              </div>
            </div>

            {/* Right Side: Headline & Neumorphic Dispatch Card */}
            <div className="lg:col-span-5 flex flex-col justify-center order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 neu-inset px-3.5 py-1.5 rounded-full text-xs font-bold text-blue-600 self-start">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>TELEMETRY DISPATCH PROTOCOL</span>
              </div>

              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
                Stop guessing engine health.
                <span className="block text-blue-600 mt-1">
                  14-day failure prediction.
                </span>
              </h1>

              <p className="text-sm text-slate-500 leading-relaxed font-normal">
                Plug the Nerve Link OBD-II hardware into any commercial fleet vehicle in minutes. Stream 60Hz live CAN-bus telemetry with neural network Remaining Useful Life (RUL) predictions.
              </p>

              {/* Neumorphic Dispatch Form Card */}
              <div className="neu-flat p-6 sm:p-8 rounded-3xl space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Instant Fleet Pilot Deployment
                </h3>

                <form onSubmit={handleBooking} className="space-y-4">
                  {/* Company Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Company / Fleet Operator</label>
                    <div className="neu-inset rounded-2xl px-4 py-3">
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Delhi Logistics Express"
                        className="bg-transparent text-sm text-slate-700 w-full focus:outline-none placeholder-slate-400 font-medium"
                      />
                    </div>
                  </div>

                  {/* Corporate Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Corporate Dispatch Email</label>
                    <div className="neu-inset rounded-2xl px-4 py-3">
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="dispatch@delhiexpress.in"
                        className="bg-transparent text-sm text-slate-700 w-full focus:outline-none placeholder-slate-400 font-medium"
                      />
                    </div>
                  </div>

                  {/* Fleet Size */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Active Fleet Size</label>
                    <div className="neu-inset rounded-2xl px-4 py-3">
                      <input
                        type="text"
                        required
                        value={formData.fleetSize}
                        onChange={(e) => setFormData({ ...formData, fleetSize: e.target.value })}
                        placeholder="e.g. 25 Commercial Vehicles"
                        className="bg-transparent text-sm text-slate-700 w-full focus:outline-none placeholder-slate-400 font-medium"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full neu-btn-primary py-4 rounded-full font-bold text-sm tracking-wide flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] shadow-md shadow-blue-500/30"
                  >
                    <span>{bookingSuccess ? "✓ DEPLOYMENT CONFIRMED // TELEMETRY LINKED" : "Deploy Nerve Link Now"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Quick Navigation Shortcuts */}
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 pt-1">
                <button
                  onClick={() => scrollToSection("demo")}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Watch Video ↓
                </button>
                <span>•</span>
                <button
                  onClick={() => scrollToSection("calculator")}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  ROI Simulator ↓
                </button>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================== */}
        {/* SECTION 2: LIVE FLEET TELEMETRY VIDEO PLAYER               */}
        {/* ========================================================== */}
        <section id="demo" className="w-full px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
          <div className="neu-flat p-6 sm:p-10 rounded-3xl flex flex-col items-center">
            
            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="neu-inset px-4 py-1.5 rounded-full text-xs font-bold text-blue-600 inline-block mb-3">
                LIVE HARDWARE &amp; TELEMETRY DEMONSTRATION
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
                See Nerve AI in <span className="text-blue-600">Action</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                Watch 60Hz continuous CAN-bus streaming with autonomous 14-day failure alerts on live vehicles.
              </p>
            </div>

            {/* Video Player Card Frame */}
            <div className="w-full max-w-4xl h-[260px] sm:h-[400px] lg:h-[460px] relative rounded-3xl overflow-hidden neu-inset p-3 bg-black flex items-center justify-center group">
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
              <div className="absolute top-6 left-6 z-10 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-2 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                <span>Nerve Link Hardware • Live Runtime Stream</span>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================== */}
        {/* SECTION 4: AI PREDICTIVE MODULES + COMPARISON TABLE        */}
        {/* ========================================================== */}
        <section id="modules" className="w-full px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="neu-inset px-4 py-1.5 rounded-full text-xs font-bold text-blue-600 inline-block mb-2">
                LSTM NEURAL ENGINE &amp; CAN-BUS TELEMETRY
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight">
                AI Predictive <span className="text-blue-600">Modules</span>
              </h2>
            </div>
            <div className="neu-inset px-4 py-2 rounded-full text-xs font-semibold text-slate-600">
              OBD-II Telemetry • 99.4% Accuracy
            </div>
          </div>

          {/* TABULAR COMPARISON: TRADITIONAL FLEET CARE vs NERVE AI */}
          <div className="neu-flat rounded-3xl overflow-hidden p-2 sm:p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200/80">
                    <th className="p-4 sm:p-6 w-1/2 font-bold text-xs uppercase tracking-wider text-rose-600 bg-rose-50/50 rounded-2xl">
                      ✕ Traditional Reactive Fleet Care
                    </th>
                    <th className="p-4 sm:p-6 w-1/2 font-bold text-xs uppercase tracking-wider text-blue-600 bg-blue-50/50 rounded-2xl">
                      ✓ Nerve AI Predictive Intelligence
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60">
                  {[
                    {
                      trad: "Fleet owner waits for engine smoke or highway breakdown to react",
                      nerve: "Orders the Nerve Link OBD-II hardware online in minutes",
                    },
                    {
                      trad: "Manual garage diagnostics with 2-3 days downtime",
                      nerve: "Self-install in under 5 minutes with immediate live stream",
                    },
                    {
                      trad: "Zero visibility into battery/alternator health before catastrophic failure",
                      nerve: "Live dashboard with 14-day Remaining Useful Life (RUL) warnings",
                    },
                    {
                      trad: "Excessive idling & harsh braking fuel wastage unnoticed",
                      nerve: "Real-time driver scoring and instantaneous efficiency alerts",
                    },
                    {
                      trad: "Paper maintenance logs lost across disparate maintenance sheds",
                      nerve: "Cloud telemetry records, automated EDI 850 parts orders & digital reports",
                    },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 sm:p-5 flex items-start gap-2.5 text-slate-600">
                        <span className="text-rose-500 font-bold shrink-0">✕</span>
                        <span>{row.trad}</span>
                      </td>
                      <td className="p-4 sm:p-5 font-semibold text-slate-800">
                        <span className="text-blue-600 font-bold mr-2">✓</span>
                        <span>{row.nerve}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Module Cards (3 Neumorphic Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                code: "MOD-01",
                title: "LSTM Failure Prediction Engine",
                price: "₹200",
                period: "/veh/mo",
                features: [
                  "Battery & alternator failure prediction (14 days ahead)",
                  "Engine thermal anomaly & coolant monitoring",
                  "Remaining Useful Life (RUL) inference scoring",
                  "Automated alert dispatch via SMS & Email",
                ],
                desc: "Neural network trained on commercial fleet telemetry to detect catastrophic component failures before they cause highway breakdowns.",
              },
              {
                code: "MOD-02",
                title: "Real-Time CAN-Bus Telemetry Link",
                price: "₹180",
                period: "/veh/mo",
                badge: "MOST POPULAR",
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
                className="neu-flat p-7 sm:p-8 rounded-3xl flex flex-col justify-between space-y-6 relative group hover:-translate-y-1 transition-transform"
              >
                {c.badge && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 px-3.5 py-1 rounded-full bg-blue-600 text-white font-bold text-[10px] tracking-wider uppercase shadow-md shadow-blue-500/30">
                    {c.badge}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 tracking-wider">
                      {c.code}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      AI ENGINE
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 leading-snug">
                    {c.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {c.desc}
                  </p>

                  <ul className="space-y-2.5 text-xs text-slate-600 pt-2">
                    {c.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-slate-200/80 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-black text-slate-800">
                      {c.price}
                      <span className="text-xs font-normal text-slate-400 font-sans ml-1">
                        {c.period}
                      </span>
                    </div>
                    <div className="text-[10px] font-semibold text-slate-400 uppercase">
                      SaaS Subscription
                    </div>
                  </div>

                  <Link
                    href="/pricing"
                    className="neu-btn-primary px-5 py-2.5 rounded-full font-bold text-xs tracking-wide cursor-pointer active:scale-95 shadow-md shadow-blue-500/20"
                  >
                    View Plan
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ========================================================== */}
        {/* SECTION 5: ROI CALCULATOR                                  */}
        {/* ========================================================== */}
        <section id="calculator" className="w-full px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
          <FleetRoiCalculator isLight={true} />
        </section>

        {/* ========================================================== */}
        {/* SECTION 6: SUBSCRIBE (TELEMETRY INTELLIGENCE BRIEF)        */}
        {/* ========================================================== */}
        <section id="subscribe" className="w-full px-4 sm:px-8 lg:px-12 max-w-4xl mx-auto">
          <div className="neu-flat p-8 sm:p-12 rounded-3xl text-center space-y-6">
            <div className="neu-inset px-4 py-1.5 rounded-full text-xs font-bold text-blue-600 inline-block">
              WEEKLY FLEET INTELLIGENCE
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
              Subscribe to Fleet Telemetry Logs
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
              Receive predictive maintenance whitepapers, CAN-bus protocol breakdowns, and fleet case studies directly to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="max-w-md mx-auto space-y-3">
              <div className="neu-inset rounded-full px-5 py-3.5 flex items-center">
                <input
                  type="email"
                  required
                  placeholder="Enter your corporate email"
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  className="bg-transparent text-sm text-slate-700 w-full focus:outline-none placeholder-slate-400 font-medium text-center"
                />
              </div>

              <button
                type="submit"
                className="w-full neu-btn-primary py-3.5 rounded-full font-bold text-xs uppercase tracking-wider cursor-pointer active:scale-95 shadow-md shadow-blue-500/30"
              >
                {subscribeSuccess ? "✓ Subscribed to Fleet Dispatch" : "Subscribe to Intelligence"}
              </button>
            </form>
          </div>
        </section>

        {/* ========================================================== */}
        {/* SECTION 7: CONTACT // 24/7 COMMAND DESK                   */}
        {/* ========================================================== */}
        <section id="contact" className="w-full px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
          <div className="space-y-8">
            <div>
              <div className="neu-inset px-4 py-1.5 rounded-full text-xs font-bold text-blue-600 inline-block mb-2">
                24/7 FLEET OPERATIONS &amp; HARDWARE SUPPORT
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
                Contact <span className="text-blue-600">Operations Desk</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Column: Direct Phone & Hotline Cards */}
              <div className="space-y-6">
                <div className="neu-flat p-6 rounded-3xl space-y-2">
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    24/7 Toll-Free Fleet Hotline
                  </div>
                  <div className="text-3xl font-extrabold text-slate-800">
                    1800 454 356
                  </div>
                  <p className="text-xs text-slate-500">
                    Dedicated support across all commercial Indian freight corridors.
                  </p>
                </div>

                <div className="neu-flat p-6 rounded-3xl space-y-2">
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    Emergency Breakdown Response
                  </div>
                  <div className="text-xl font-bold text-slate-800">
                    +91 98765 43210
                  </div>
                  <p className="text-xs text-slate-500">
                    Instant technician dispatch &amp; remote ECU diagnostics stream.
                  </p>
                </div>

                <div className="neu-flat p-6 rounded-3xl space-y-2">
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    Nerve AI Headquarters
                  </div>
                  <div className="text-sm font-bold text-slate-800">
                    Nerve AI Platform, Cyber City Hub, Sector 24
                  </div>
                  <p className="text-xs text-slate-500">
                    Gurugram, Haryana 122002 • India
                  </p>
                </div>
              </div>

              {/* Right Column: Contact Transmission Form */}
              <form onSubmit={handleContact} className="neu-flat p-8 rounded-3xl space-y-4">
                <h3 className="text-sm font-bold text-slate-800">
                  Transmit Fleet Inquiry
                </h3>

                <div className="neu-inset rounded-2xl px-4 py-3">
                  <input
                    type="text"
                    required
                    placeholder="Fleet Operator Name / Callsign"
                    className="bg-transparent text-xs text-slate-700 w-full focus:outline-none placeholder-slate-400 font-medium"
                  />
                </div>

                <div className="neu-inset rounded-2xl px-4 py-3">
                  <input
                    type="email"
                    required
                    placeholder="Corporate Dispatch Email"
                    className="bg-transparent text-xs text-slate-700 w-full focus:outline-none placeholder-slate-400 font-medium"
                  />
                </div>

                <div className="neu-inset rounded-2xl p-4">
                  <textarea
                    rows={4}
                    required
                    placeholder="Transmit fleet inquiry, truck count, or deployment specifications..."
                    className="bg-transparent text-xs text-slate-700 w-full focus:outline-none placeholder-slate-400 font-medium resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full neu-btn-primary py-4 rounded-full font-bold text-xs uppercase tracking-wider cursor-pointer active:scale-95 shadow-md shadow-blue-500/30"
                >
                  {contactSuccess ? "✓ Transmission Dispatched" : "Send Transmission"}
                </button>
              </form>

            </div>
          </div>
        </section>

      </main>

      {/* ============================================================ */}
      {/* FOOTER (Neumorphic Bar)                                      */}
      {/* ============================================================ */}
      <footer className="relative z-20 w-full mt-24 border-t border-slate-200/80 bg-[#E6ECF5] py-8 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="font-bold text-slate-800">
              NERVE AI • 14-Day Predictive Fleet Platform
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
            <button onClick={() => scrollToSection("home")} className="hover:text-blue-600 transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection("demo")} className="hover:text-blue-600 transition-colors">
              Video Demo
            </button>
            <button onClick={() => scrollToSection("modules")} className="hover:text-blue-600 transition-colors">
              AI Modules
            </button>
            <button onClick={() => scrollToSection("calculator")} className="hover:text-blue-600 transition-colors">
              ROI Calculator
            </button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-blue-600 transition-colors">
              Contact
            </button>
          </div>

          <div className="neu-inset px-4 py-1.5 rounded-full text-[11px] font-semibold text-blue-600">
            Neumorphic Soft UI Theme Active
          </div>

        </div>
      </footer>
    </div>
  );
}
