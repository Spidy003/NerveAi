"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import CyberMechBackground from "@/components/landing/CyberMechBackground";
import { Check, ArrowRight, ShieldCheck, MapPin, Award, Phone, Send, Search, Sun, Moon, Cpu, Activity, Zap, HardDrive } from "lucide-react";

// Dynamic 3D Model Imports (Client-only WebGL)
const MercedesCar3D = dynamic(
  () => import("@/components/landing/MercedesCar3D"),
  { ssr: false }
);

const MercedesCockpit3D = dynamic(
  () => import("@/components/landing/MercedesCockpit3D"),
  { ssr: false }
);

export default function HomePage() {
  const [activeNav, setActiveNav] = useState<"home" | "modules" | "depots" | "pricing" | "contact">("home");
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
    depot: "New Delhi (Central)",
    fleetSize: "25 Vehicles",
    notes: "",
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Smooth scroll handler
  const scrollToSection = (id: "home" | "modules" | "depots" | "pricing" | "contact") => {
    setActiveNav(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Scroll spy to update active navbar item as user scrolls
  useEffect(() => {
    const sections: ("home" | "modules" | "depots" | "pricing" | "contact")[] = [
      "home",
      "modules",
      "depots",
      "pricing",
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

  // Fleet Service Depots across Indian Freight Corridors
  const allDepots = [
    { city: "NEW DELHI (CENTRAL)", address: "Connaught Place, Barakhamba Logistics Hub", phone: "+91 11 4543 5601", status: "ONLINE", slots: "14 Technicians On-Duty" },
    { city: "GURUGRAM (FREIGHT BAY)", address: "DLF CyberHub & NH-48 Express Terminal", phone: "+91 124 4543 5602", status: "ONLINE", slots: "8 Technicians On-Duty" },
    { city: "BENGALURU (TECH CORRIDOR)", address: "Outer Ring Road, Bellandur Freight Depot", phone: "+91 80 4543 5603", status: "ONLINE", slots: "19 Technicians On-Duty" },
    { city: "MUMBAI (PORT TERMINAL)", address: "Bandra Kurla Complex, JNPT Logistics Link", phone: "+91 22 4543 5604", status: "ONLINE", slots: "6 Technicians On-Duty" },
  ];

  const filteredDepots = searchQuery.trim()
    ? allDepots.filter(
        (b) =>
          b.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allDepots;

  return (
    <div
      className={`relative min-h-screen w-full flex flex-col overflow-x-hidden font-cyber select-none transition-colors duration-300 ${
        isLight ? "bg-[#F4F7FA] text-[#0C121A]" : "bg-[#080B10] text-white"
      }`}
    >
      {/* ============================================================ */}
      {/* RETRO CYBER HUD MECH BACKGROUND                              */}
      {/* ============================================================ */}
      <CyberMechBackground theme={theme} />

      {/* ============================================================ */}
      {/* STICKY TOP NAVBAR                                            */}
      {/* ============================================================ */}
      <header
        className={`sticky top-0 z-50 w-full px-6 sm:px-12 lg:px-16 py-3 border-b backdrop-blur-md transition-colors duration-300 ${
          isLight
            ? "bg-[#FFFFFF]/95 border-[#00BFA5]/25 shadow-[0_4px_25px_rgba(0,0,0,0.06)]"
            : "bg-[#080B10]/95 border-cyan/20"
        }`}
      >
        <div className="w-full flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex flex-col text-left group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span
                className={`font-cyber font-black tracking-wider text-3xl sm:text-4xl transition-colors ${
                  isLight
                    ? "text-[#0C121A] drop-shadow-[0_2px_10px_rgba(0,180,160,0.3)]"
                    : "text-white drop-shadow-[0_0_15px_rgba(45,225,194,0.6)]"
                }`}
              >
                NERVE
                <span className={isLight ? "text-[#00897B]" : "text-cyan"}>
                  {" "}AI
                </span>
              </span>
              <div className="hidden sm:flex items-center gap-1">
                <div className={`w-2 h-4 ${isLight ? "bg-[#00897B]" : "bg-cyan"}`} />
              </div>
            </div>
            <span
              className={`font-mono text-[8px] sm:text-[9px] tracking-[0.3em] uppercase -mt-0.5 font-bold ${
                isLight ? "text-[#00897B]" : "text-[#00D9B5]"
              }`}
            >
              PREDICTIVE FLEET AI &amp; TELEMETRY
            </span>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-cyber tracking-widest">
            {(
              [
                { id: "home", label: "HOME" },
                { id: "modules", label: "AI MODULES" },
                { id: "depots", label: "DEPOTS" },
                { id: "contact", label: "CONTACT" },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-all py-1.5 px-2 border-b-2 font-bold cursor-pointer uppercase ${
                  activeNav === item.id
                    ? isLight
                      ? "text-[#00897B] border-[#00897B] drop-shadow-[0_2px_8px_rgba(0,180,160,0.4)]"
                      : "text-cyan border-cyan drop-shadow-[0_0_10px_#2DE1C2]"
                    : isLight
                    ? "border-transparent text-[#556778] hover:text-[#00897B] hover:border-[#00897B]/40"
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
            {/* THEME TOGGLE BUTTON */}
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

            {/* Portal Login Button */}
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
      {/* ALL SECTIONS STACKED WITH CONTINUOUS SCROLL                 */}
      {/* ============================================================ */}
      <main className="relative z-10 w-full flex flex-col">
        
        {/* ========================================================== */}
        {/* SECTION 1: HOME // HERO APPOINTMENT & 3D CAR                */}
        {/* ========================================================== */}
        <section
          id="home"
          className={`min-h-[calc(100vh-80px)] w-full px-6 sm:px-12 lg:px-16 py-12 sm:py-16 flex items-center justify-center border-b transition-colors ${
            isLight ? "border-[#E2E8F0]" : "border-[#16202C]/80"
          }`}
        >
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Side: Glowing Circular START NOW Dial + 3D Mercedes AMG One */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start justify-center order-2 lg:order-1 -ml-2 lg:-ml-8 xl:-ml-14">
              <button
                onClick={() => scrollToSection("modules")}
                className={`relative flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 mb-2 ml-4 lg:ml-12 hover:scale-105 transition-transform cursor-pointer group ${
                  isLight
                    ? "border-[#00BFA5] bg-[#FFFFFF] shadow-[0_8px_25px_rgba(0,180,160,0.25)]"
                    : "border-cyan bg-[#070B0F] shadow-[0_0_25px_rgba(45,225,194,0.6)]"
                }`}
              >
                <span
                  className={`font-cyber text-[10px] font-black text-center leading-tight tracking-widest ${
                    isLight ? "text-[#00897B]" : "text-cyan group-hover:drop-shadow-[0_0_8px_#2DE1C2]"
                  }`}
                >
                  START<br />NOW
                </span>
                <span
                  className={`absolute -inset-1 rounded-full border ${
                    isLight ? "border-[#00BFA5]/50" : "border-cyan/50"
                  } animate-spin-slow`}
                />
              </button>

              {/* 3D Car Model: Visible on Tablet & Desktop, Hidden on Mobile for optimal performance */}
              <div className="hidden md:flex w-full max-w-[1000px] xl:max-w-[1200px] h-[540px] sm:h-[620px] lg:h-[700px] items-center justify-center relative">
                <MercedesCar3D theme={theme} autoRotateSpeed={1.0} />
              </div>

              {/* Mobile Performance Showcase Card (Replacing heavy 3D on phones) */}
              <div className="flex md:hidden w-full p-4 rounded-2xl border border-cyan/30 bg-black/75 my-4 flex-col items-center text-center shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#2DE1C2] animate-ping" />
                  <span className="font-mono text-xs text-[#2DE1C2] font-bold uppercase tracking-widest">
                    NERVE AI // FLEET TELEMETRY NODE
                  </span>
                </div>
                <div className="text-lg font-black font-cyber tracking-tight text-white mb-1">
                  MERCEDES AMG ONE // CAN-BUS 60HZ
                </div>
                <div className="text-xs font-mono text-gray-400">
                  Real-time LSTM Neural Edge Analytics • 100% Mobile Optimized
                </div>
              </div>

              {/* Status decal badges */}
              <div
                className={`flex items-center gap-6 mt-1 font-mono text-[10px] ml-4 lg:ml-12 ${
                  isLight ? "text-[#556778]" : "text-gray-400"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full animate-ping ${isLight ? "bg-[#00897B]" : "bg-cyan"}`} />
                  CAN-BUS TELEMETRY ONLINE
                </span>
                <span>•</span>
                <span className={isLight ? "text-[#00897B]" : "text-cyan"}>
                  LSTM NEURAL PREDICTIVE ENGINE ACTIVE
                </span>
              </div>
            </div>

            {/* Right Side: Telemetry Pilot Deployment Form */}
            <div className="lg:col-span-5 flex flex-col justify-center order-1 lg:order-2">
              <div
                className={`inline-flex items-center gap-2 font-mono text-[10px] tracking-widest mb-3 font-bold ${
                  isLight ? "text-[#00897B]" : "text-cyan"
                }`}
              >
                <span className={`w-2 h-2 ${isLight ? "bg-[#00897B]" : "bg-cyan"}`} />
                <span>[ PROTOCOL // TELEMETRY_DISPATCH_V2 ]</span>
              </div>

              <h1
                className={`text-4xl sm:text-5xl xl:text-6xl font-cyber font-black mb-4 leading-tight tracking-wide uppercase transition-colors ${
                  isLight ? "text-[#0C121A]" : "text-white"
                }`}
              >
                PREDICT FLEET BREAKDOWNS.<br />
                <span
                  className={
                    isLight
                      ? "text-[#00897B] drop-shadow-[0_2px_15px_rgba(0,180,160,0.3)]"
                      : "text-cyan drop-shadow-[0_0_20px_rgba(45,225,194,0.5)]"
                  }
                >
                  STREAM LIVE TELEMETRY NOW!
                </span>
              </h1>

              <form onSubmit={handleBooking} className="w-full max-w-lg space-y-4 mt-2">
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
                    // CONTACT ROUTE
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <span
                      className={`absolute -top-2 left-4 px-2 text-[10px] font-mono tracking-wider z-10 font-bold ${
                        isLight ? "bg-[#F4F7FA] text-[#00897B]" : "bg-[#080B10] text-cyan"
                      }`}
                    >
                      // DEPOT / CITY
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="HUB / CITY"
                      value={formData.depot}
                      onChange={(e) => setFormData({ ...formData, depot: e.target.value })}
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
                      // FLEET SIZE
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
                className={`mt-8 flex items-center gap-8 text-xs font-mono ${
                  isLight ? "text-[#556778]" : "text-white/80"
                }`}
              >
                <button
                  onClick={() => scrollToSection("modules")}
                  className={`underline transition-colors tracking-widest cursor-pointer ${
                    isLight ? "hover:text-[#00897B]" : "hover:text-cyan"
                  }`}
                >
                  // AI MODULES ↓
                </button>
                <button
                  onClick={() => scrollToSection("depots")}
                  className={`underline transition-colors tracking-widest cursor-pointer ${
                    isLight ? "hover:text-[#00897B]" : "hover:text-cyan"
                  }`}
                >
                  // DEPOT COVERAGE ↓
                </button>
                <Link
                  href="/store"
                  className={`underline transition-colors tracking-widest cursor-pointer ${
                    isLight ? "hover:text-[#00897B]" : "hover:text-cyan"
                  }`}
                >
                  // HARDWARE STORE →
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================== */}
        {/* SECTION 2: 3D COCKPIT // IN-CABIN TELEMETRY SCAN           */}
        {/* ========================================================== */}
        <section
          id="search-showcase"
          className={`w-full px-6 sm:px-12 lg:px-16 py-20 border-b transition-colors ${
            isLight
              ? "border-[#E2E8F0] bg-[#EBF1F5]/80"
              : "border-[#16202C]/80 bg-[#06080D]/70"
          }`}
        >
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Side: Depot Search Box */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div
                className={`font-mono text-xs tracking-widest mb-2 font-bold ${
                  isLight ? "text-[#00897B]" : "text-cyan"
                }`}
              >
                // GEOLOCATION ROUTER
              </div>
              <h2
                className={`text-4xl sm:text-5xl font-cyber font-black mb-6 leading-tight tracking-wide uppercase ${
                  isLight ? "text-[#0C121A]" : "text-white"
                }`}
              >
                CONNECT YOUR FLEET TO NERVE AI<br />
                <span
                  className={
                    isLight
                      ? "text-[#00897B] drop-shadow-[0_2px_12px_rgba(0,180,160,0.3)]"
                      : "text-cyan drop-shadow-[0_0_20px_rgba(45,225,194,0.4)]"
                  }
                >
                  DEPLOY PREDICTIVE HARDWARE NOW!
                </span>
              </h2>

              <div
                className={`flex w-full max-w-md cyber-input-chamfer overflow-hidden ${
                  isLight
                    ? "bg-[#FFFFFF] border-2 border-[#D1DCE5] shadow-[0_6px_20px_rgba(0,0,0,0.06)]"
                    : "bg-[#E5E9EC] shadow-[0_0_20px_rgba(0,0,0,0.6)]"
                }`}
              >
                <input
                  type="text"
                  placeholder="DEPOT OR LOGISTICS HUB (DELHI, MUMBAI...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-black font-cyber font-bold text-xs px-5 py-4 outline-none placeholder:text-gray-500"
                />
                <button
                  onClick={() => scrollToSection("depots")}
                  className={`px-6 sm:px-8 text-black font-cyber font-black text-xs uppercase tracking-widest transition-all cursor-pointer ${
                    isLight
                      ? "bg-[#00BFA5] hover:bg-[#00A896]"
                      : "bg-cyan hover:bg-cyan-glow"
                  }`}
                >
                  SEARCH
                </button>
              </div>

              <div className="mt-8 space-y-3 font-mono">
                <div
                  className={`text-lg font-bold tracking-wider flex items-center gap-2 ${
                    isLight ? "text-[#0C121A]" : "text-white"
                  }`}
                >
                  <span className={`font-cyber ${isLight ? "text-[#00897B]" : "text-cyan"}`}>
                    // CALL DISPATCH:
                  </span>
                  <a
                    href="tel:1800454356"
                    className={`hover:underline transition-colors ${
                      isLight ? "text-[#00897B]" : "text-white"
                    }`}
                  >
                    1800 454 356
                  </a>
                </div>
                <div
                  className={`flex items-center gap-8 text-xs ${
                    isLight ? "text-[#556778]" : "text-white/80"
                  }`}
                >
                  <button
                    onClick={() => scrollToSection("modules")}
                    className={`underline transition-colors tracking-widest cursor-pointer ${
                      isLight ? "hover:text-[#00897B]" : "hover:text-cyan"
                    }`}
                  >
                    // ALL AI MODULES
                  </button>
                  <button
                    onClick={() => scrollToSection("pricing")}
                    className={`underline transition-colors tracking-widest cursor-pointer ${
                      isLight ? "hover:text-[#00897B]" : "hover:text-cyan"
                    }`}
                  >
                    // FLEET PRICING
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side: 3D Mercedes Cockpit with Inside View + "LET'S GO!" Decal */}
            <div className="lg:col-span-7 relative flex items-center justify-center pt-8 lg:pt-0">
              <button
                onClick={() => scrollToSection("modules")}
                className={`absolute -top-6 right-8 z-20 flex flex-col items-center justify-center w-16 h-16 rounded-full border-2 cursor-pointer hover:scale-105 transition-transform group ${
                  isLight
                    ? "border-[#00BFA5] bg-[#FFFFFF] shadow-[0_6px_20px_rgba(0,180,160,0.25)]"
                    : "border-cyan bg-[#070B0F] shadow-[0_0_20px_rgba(45,225,194,0.5)]"
                }`}
              >
                <span
                  className={`font-cyber text-[9px] font-black text-center leading-tight tracking-widest ${
                    isLight ? "text-[#00897B]" : "text-cyan group-hover:drop-shadow-[0_0_8px_#2DE1C2]"
                  }`}
                >
                  START<br />NOW
                </span>
              </button>

              {/* 3D Cockpit Model: Visible on Tablet & Desktop, Hidden on Mobile */}
              <div className="hidden md:flex w-full max-w-[800px] h-[460px] sm:h-[520px] items-center justify-center relative">
                <MercedesCockpit3D theme={theme} />
              </div>

              {/* Mobile Performance Cockpit Badge (Lightweight for phones) */}
              <div className="flex md:hidden w-full p-4 rounded-2xl border border-cyan/30 bg-black/75 my-4 flex-col items-center text-center shadow-lg">
                <span className="font-mono text-xs text-[#2DE1C2] font-bold uppercase tracking-widest mb-1">
                  // COCKPIT INSTRUMENTATION
                </span>
                <span className="text-lg font-black font-cyber text-white">
                  CAN-BUS DIGITAL DIAGNOSTICS
                </span>
              </div>

              <div
                className={`absolute right-0 -bottom-8 font-cyber text-4xl sm:text-5xl lg:text-6xl font-black tracking-widest italic select-none pointer-events-none ${
                  isLight
                    ? "text-[#00897B] drop-shadow-[0_4px_25px_rgba(0,180,160,0.4)]"
                    : "text-cyan drop-shadow-[0_0_30px_rgba(45,225,194,0.9)]"
                }`}
              >
                LET&apos;S GO!
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================== */}
        {/* SECTION 3: AI MODULES // PREDICTIVE TELEMETRY SUITE         */}
        {/* ========================================================== */}
        <section
          id="modules"
          className={`w-full px-6 sm:px-12 lg:px-16 py-20 border-b transition-colors ${
            isLight ? "border-[#E2E8F0]" : "border-[#16202C]/80"
          }`}
        >
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  code: "MOD-01",
                  title: "LSTM Predictive Failure Engine",
                  price: "₹200",
                  period: "/veh/mo",
                  features: [
                    "Battery & alternator failure prediction (72h ahead)",
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
        {/* SECTION 4: DEPOTS // SERVICE HUBS & HARDWARE INSTALLATION  */}
        {/* ========================================================== */}
        <section
          id="depots"
          className={`w-full px-6 sm:px-12 lg:px-16 py-20 border-b transition-colors ${
            isLight
              ? "border-[#E2E8F0] bg-[#EBF1F5]/80"
              : "border-[#16202C]/80 bg-[#07090F]/70"
          }`}
        >
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <div
                  className={`font-mono text-xs mb-2 tracking-widest font-bold ${
                    isLight ? "text-[#00897B]" : "text-cyan"
                  }`}
                >
                  // INDIAN FREIGHT CORRIDORS &amp; SERVICE HUBS
                </div>
                <h2
                  className={`text-4xl sm:text-5xl font-cyber font-black ${
                    isLight ? "text-[#0C121A]" : "text-white"
                  }`}
                >
                  SERVICE{" "}
                  <span className={isLight ? "text-[#00897B]" : "text-cyan"}>
                    DEPOTS
                  </span>
                </h2>
              </div>
              <div
                className={`text-xs font-mono ${
                  isLight ? "text-[#00897B] font-bold" : "text-cyan"
                }`}
              >
                {filteredDepots.length} HUBS OPERATIONAL // 100% NETWORK UPTIME
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
              {filteredDepots.map((b, i) => (
                <div
                  key={i}
                  className={`p-6 cyber-chamfer transition-all duration-300 flex flex-col justify-between ${
                    isLight
                      ? "bg-[#FFFFFF] border-2 border-[#DDE5ED] hover:border-[#00BFA5] shadow-[0_6px_20px_rgba(0,0,0,0.04)]"
                      : "bg-[#0E151E] border-2 border-cyan/30 hover:border-cyan"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-sm font-cyber font-bold ${
                          isLight ? "text-[#0C121A]" : "text-white"
                        }`}
                      >
                        {b.city}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          isLight
                            ? "bg-[#E0F7F4] text-[#00897B]"
                            : "bg-cyan/20 text-cyan"
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>
                    <p
                      className={`text-xs mb-4 min-h-[36px] ${
                        isLight ? "text-[#556778]" : "text-[#8A96A3]"
                      }`}
                    >
                      {b.address}
                    </p>
                    <div
                      className={`text-xs font-bold mb-2 flex items-center gap-1.5 ${
                        isLight ? "text-[#00897B]" : "text-cyan"
                      }`}
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {b.phone}
                    </div>
                    <div
                      className={`text-[10px] mb-6 font-bold ${
                        isLight ? "text-[#00897B]" : "text-cyan"
                      }`}
                    >
                      // {b.slots}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, depot: b.city }));
                      scrollToSection("home");
                    }}
                    className={`w-full py-2.5 text-xs font-cyber font-bold cyber-chamfer-button transition-all cursor-pointer ${
                      isLight
                        ? "bg-[#E6F8F5] hover:bg-[#00BFA5] text-[#00897B] hover:text-black border border-[#00BFA5]/30 shadow-sm"
                        : "bg-[#141D26] hover:bg-cyan hover:text-black text-cyan"
                    }`}
                  >
                    SELECT DEPOT
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* SECTION 5: PRICING // FLEET SAAS TIERS                     */}
        {/* ========================================================== */}
        <section
          id="pricing"
          className={`w-full px-6 sm:px-12 lg:px-16 py-20 border-b transition-colors ${
            isLight ? "border-[#E2E8F0]" : "border-[#16202C]/80"
          }`}
        >
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <div
                  className={`font-mono text-xs mb-2 tracking-widest font-bold ${
                    isLight ? "text-[#00897B]" : "text-cyan"
                  }`}
                >
                  // TRANSPARENT HARDWARE &amp; SAAS PLANS
                </div>
                <h2
                  className={`text-4xl sm:text-5xl font-cyber font-black ${
                    isLight ? "text-[#0C121A]" : "text-white"
                  }`}
                >
                  FLEET{" "}
                  <span className={isLight ? "text-[#00897B]" : "text-cyan"}>
                    PRICING
                  </span>
                </h2>
              </div>
              <div
                className={`text-xs font-mono ${
                  isLight ? "text-[#768C9E]" : "text-[#8A96A3]"
                }`}
              >
                HARDWARE: ₹1,499 ONE-TIME // MONTHLY SAAS PER VEHICLE
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  tier: "TIER 01",
                  name: "STARTER",
                  price: "₹200",
                  period: "/veh/mo",
                  desc: "Ideal for 1-5 vehicles getting started with predictive alerts.",
                  feats: [
                    "Predictive maintenance failure alerts",
                    "Live telemetry console",
                    "Standard weekly failure reports",
                    "Email & SMS incident support",
                  ],
                },
                {
                  tier: "TIER 02",
                  name: "BUSINESS",
                  price: "₹180",
                  period: "/veh/mo",
                  featured: true,
                  desc: "Designed for commercial fleets of 6-20 trucks and transport vans.",
                  feats: [
                    "Everything in Starter plan",
                    "Advanced LSTM predictive analytics",
                    "Driver behavior scoring & speed tracking",
                    "Priority technician dispatch",
                    "Multi-depot dashboard access",
                  ],
                },
                {
                  tier: "TIER 03",
                  name: "ENTERPRISE",
                  price: "₹150",
                  period: "/veh/mo",
                  desc: "High-volume logistics operators with 20+ commercial vehicles.",
                  feats: [
                    "Everything in Business plan",
                    "Automated EDI 850/855 integration",
                    "Custom REST API & Webhooks",
                    "Dedicated fleet account manager",
                    "99.9% Telemetry SLA guarantee",
                  ],
                },
              ].map((m, i) => (
                <div
                  key={i}
                  className={`p-8 cyber-chamfer-lg flex flex-col justify-between transition-all duration-300 hover:translate-y-[-4px] ${
                    m.featured
                      ? isLight
                        ? "bg-[#FFFFFF] border-2 border-[#00BFA5] shadow-[0_14px_35px_rgba(0,180,160,0.22)]"
                        : "bg-[#0E151E] border-2 border-cyan shadow-[0_0_35px_rgba(45,225,194,0.35)]"
                      : isLight
                      ? "bg-[#FFFFFF] border-2 border-[#DDE5ED] hover:border-[#00BFA5]/60 shadow-[0_6px_20px_rgba(0,0,0,0.04)]"
                      : "bg-[#0A0E14] border-2 border-[#1E2633] hover:border-cyan/40"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-xs font-mono tracking-wider font-bold ${
                          isLight ? "text-[#00897B]" : "text-cyan"
                        }`}
                      >
                        {m.tier}
                      </span>
                      {m.featured && (
                        <span
                          className={`text-[9px] font-cyber px-2 py-0.5 text-black font-black uppercase ${
                            isLight ? "bg-[#00BFA5]" : "bg-cyan"
                          }`}
                        >
                          POPULAR
                        </span>
                      )}
                    </div>

                    <h3
                      className={`text-2xl font-cyber font-black mt-1 mb-2 ${
                        isLight ? "text-[#0C121A]" : "text-white"
                      }`}
                    >
                      {m.name}
                    </h3>
                    <p
                      className={`text-xs font-mono mb-6 ${
                        isLight ? "text-[#556778]" : "text-[#8A96A3]"
                      }`}
                    >
                      {m.desc}
                    </p>

                    <div
                      className={`text-4xl font-cyber font-black mb-6 ${
                        isLight ? "text-[#00897B]" : "text-cyan"
                      }`}
                    >
                      {m.price}
                      <span
                        className={`text-xs font-mono font-normal ${
                          isLight ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        {m.period}
                      </span>
                    </div>

                    <ul
                      className={`space-y-3 font-mono text-xs mb-8 ${
                        isLight ? "text-[#2C3B49]" : "text-[#BACAD6]"
                      }`}
                    >
                      {m.feats.map((f, idx) => (
                        <li key={idx} className="flex items-center gap-2">
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

                  <Link
                    href="/store"
                    className={`w-full py-3.5 text-black font-cyber font-black text-xs uppercase tracking-wider cyber-chamfer-button transition-all cursor-pointer text-center block ${
                      isLight
                        ? "bg-[#00BFA5] hover:bg-[#00A896] shadow-[0_6px_20px_rgba(0,180,160,0.3)]"
                        : "bg-cyan hover:bg-cyan-glow shadow-[0_0_15px_rgba(45,225,194,0.4)]"
                    }`}
                  >
                    DEPLOY HARDWARE LINK
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* SECTION 6: SUBSCRIBE // FLEET TELEMETRY INTELLIGENCE BRIEF */}
        {/* ========================================================== */}
        <section
          id="subscribe"
          className={`w-full px-6 sm:px-12 lg:px-16 py-20 border-b transition-colors ${
            isLight
              ? "border-[#E2E8F0] bg-[#EBF1F5]/80"
              : "border-[#16202C]/80 bg-[#06080D]/70"
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

              <button
                onClick={() => scrollToSection("home")}
                className={`mt-8 flex flex-col items-center justify-center w-16 h-16 rounded-full border-2 cursor-pointer hover:scale-105 transition-transform group ${
                  isLight
                    ? "border-[#00BFA5] bg-[#FFFFFF] shadow-[0_6px_20px_rgba(0,180,160,0.25)]"
                    : "border-cyan bg-[#070B0F] shadow-[0_0_20px_rgba(45,225,194,0.5)]"
                }`}
              >
                <span
                  className={`font-cyber text-[9px] font-black text-center leading-tight tracking-widest ${
                    isLight ? "text-[#00897B]" : "text-cyan group-hover:drop-shadow-[0_0_8px_#2DE1C2]"
                  }`}
                >
                  START<br />NOW
                </span>
              </button>
            </div>

          </div>
        </section>

        {/* ========================================================== */}
        {/* SECTION 7: CONTACT // 24/7 FLEET COMMAND DESK              */}
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
        {/* Status Indicator */}
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
            // NERVE AI • PREDICTIVE FLEET MAINTENANCE PLATFORM
          </span>
        </div>

        {/* Quick Nav Anchors */}
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
            onClick={() => scrollToSection("modules")}
            className={`transition-colors cursor-pointer ${
              isLight ? "hover:text-[#00897B]" : "hover:text-cyan"
            }`}
          >
            // AI MODULES
          </button>
          <button
            onClick={() => scrollToSection("depots")}
            className={`transition-colors cursor-pointer ${
              isLight ? "hover:text-[#00897B]" : "hover:text-cyan"
            }`}
          >
            // DEPOTS
          </button>
          <button
            onClick={() => scrollToSection("pricing")}
            className={`transition-colors cursor-pointer ${
              isLight ? "hover:text-[#00897B]" : "hover:text-cyan"
            }`}
          >
            // PRICING
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

        {/* Mode Indicator / Palette Decal */}
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
