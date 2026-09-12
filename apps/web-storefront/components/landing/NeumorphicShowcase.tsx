"use client";

import React, { useState } from "react";
import {
  Home,
  Calendar as CalendarIcon,
  Bell,
  Settings,
  Mail,
  Eye,
  EyeOff,
  Plus,
  Share2,
  ChevronDown,
  Download,
  Activity,
  Zap,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

export default function NeumorphicShowcase() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<"home" | "calendar" | "bell" | "settings">("home");

  // Toggle Switch state
  const [toggleOn, setToggleOn] = useState(true);

  // Slider state
  const [sliderValue, setSliderValue] = useState(71);

  // Timeline year state
  const [activeYear, setActiveYear] = useState("2019");

  // Login inputs
  const [loginEmail, setLoginEmail] = useState("dispatch@delhiexpress.in");
  const [loginPassword, setLoginPassword] = useState("fleetSecure2026");
  const [showPassword, setShowPassword] = useState(false);

  // Category dropdown state
  const [category, setCategory] = useState("Airport Catering Truck");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  // Mountain chart mini slider
  const [mountainSlider, setMountainSlider] = useState(65);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 neu-flat p-6 sm:p-8 rounded-3xl">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-blue-600 animate-pulse" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              Neumorphic Fleet Telemetry Console
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-sans">
            Tactile Soft UI design system with dual light/dark drop-shadows, inset sensor wells, and royal blue accents.
          </p>
        </div>
        <div className="neu-inset px-4 py-2 rounded-full text-xs font-semibold text-blue-600 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          Live Interactive Sensors
        </div>
      </div>

      {/* Main Grid Mirroring the Reference Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ============================================================ */}
        {/* LEFT COLUMN: Login Card & Action Pills                       */}
        {/* ============================================================ */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Neumorphic Login Card (Exact match to reference image) */}
          <div className="neu-flat p-7 sm:p-8 rounded-3xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-slate-800">Login</h3>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                PORTAL
              </span>
            </div>

            <div className="space-y-4">
              {/* Email Underline Field */}
              <div className="flex items-center justify-between border-b-2 border-slate-300 pb-1.5 focus-within:border-blue-600 transition-colors">
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="username@mail.com"
                  className="bg-transparent text-sm text-slate-700 w-full focus:outline-none placeholder-slate-400 font-medium"
                />
                <Mail className="w-4 h-4 text-slate-400 ml-2 shrink-0" />
              </div>

              {/* Password Underline Field */}
              <div className="flex items-center justify-between border-b-2 border-slate-300 pb-1.5 focus-within:border-blue-600 transition-colors">
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="bg-transparent text-sm text-slate-700 w-full focus:outline-none placeholder-slate-400 font-medium tracking-wider"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 ml-2 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex justify-start pt-1">
                <a
                  href="#forgot"
                  onClick={(e) => e.preventDefault()}
                  className="text-xs text-slate-400 hover:text-blue-600 underline font-medium transition-colors"
                >
                  Forget Password?
                </a>
              </div>
            </div>

            {/* Sign Up / Sign In Button */}
            <div className="pt-2">
              <button
                type="button"
                className="w-full neu-btn-primary py-3.5 rounded-full font-semibold text-sm tracking-wide flex items-center justify-center cursor-pointer active:scale-[0.98]"
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Card 2: Neumorphic Action Pills (Add Vehicle, Share, Category, Download) */}
          <div className="neu-flat p-6 rounded-3xl space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Vehicle Actions
            </h4>

            {/* Add Vehicle Button */}
            <button
              type="button"
              className="w-full neu-btn px-4 py-3 rounded-full flex items-center gap-3 text-slate-700 font-medium text-sm group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform">
                <Plus className="w-4 h-4" />
              </div>
              <span className="text-slate-600">Add Vehicle</span>
            </button>

            {/* Share Telemetry Button */}
            <button
              type="button"
              className="w-full neu-btn px-4 py-3 rounded-full flex items-center gap-3 text-slate-600 font-medium text-sm group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-slate-500">
                <Share2 className="w-4 h-4" />
              </div>
              <span>Share Telemetry</span>
            </button>

            {/* Category Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="w-full neu-btn px-4 py-3 rounded-full flex items-center justify-between text-slate-600 font-medium text-sm cursor-pointer"
              >
                <span className="truncate">{category}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} />
              </button>

              {isCategoryOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 neu-flat p-2 rounded-2xl z-20 space-y-1">
                  {[
                    "Airport Catering Truck",
                    "Cargo Freight Van",
                    "Electric Terminal Tractor",
                    "Ground Power Unit",
                  ].map((cat) => (
                    <div
                      key={cat}
                      onClick={() => {
                        setCategory(cat);
                        setIsCategoryOpen(false);
                      }}
                      className="px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Download Diagnostics Pill */}
            <button
              type="button"
              className="w-full neu-btn px-4 py-3 rounded-full flex items-center gap-3 text-slate-600 font-medium text-sm group cursor-pointer"
            >
              <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white">
                <Download className="w-3.5 h-3.5" />
              </div>
              <span>Download Logs</span>
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: Dashboard Widgets & Controls                   */}
        {/* ============================================================ */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Top Row: Squircle Navigation Icons (Home, Calendar, Notification, Settings) */}
          <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-6">
            {[
              { id: "home", icon: Home, label: "Home", active: activeTab === "home" },
              { id: "calendar", icon: CalendarIcon, label: "Calendar", active: activeTab === "calendar" },
              { id: "bell", icon: Bell, label: "Notification", active: activeTab === "bell" },
              { id: "settings", icon: Settings, label: "Setting", active: activeTab === "settings" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all ${
                    item.active
                      ? "neu-flat text-blue-600"
                      : "neu-btn text-slate-500 hover:text-slate-700"
                  }`}
                  title={item.label}
                >
                  <Icon className={`w-5 h-5 ${item.active ? "text-blue-600" : "text-slate-500"}`} />
                  <span className="text-[9px] font-medium mt-0.5 text-slate-500">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Middle Row 1: Sparkline Card & Toggle Switch */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            
            {/* Sparkline Graph Card: Last 7 days +22,32% */}
            <div className="sm:col-span-8 neu-flat p-4 sm:p-6 rounded-3xl flex items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-400 font-medium">Last 7 days</div>
                <div className="flex items-center gap-1 text-slate-700 font-bold text-sm mt-0.5">
                  <span className="text-blue-600 text-xs">▲</span>
                  <span>+22,32%</span>
                </div>
              </div>

              {/* Smooth Blue Wave SVG */}
              <div className="flex-1 max-w-[240px] h-12 relative flex items-center">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 200 50">
                  <path
                    d="M 0,35 Q 25,35 45,25 T 90,30 T 135,12 T 175,28 T 200,10"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Glowing peak point */}
                  <circle cx="135" cy="12" r="4.5" fill="#2563EB" />
                  <circle cx="135" cy="12" r="8" fill="#2563EB" opacity="0.25" />
                </svg>
              </div>
            </div>

            {/* Toggle Switch [ON / OFF] matching reference image */}
            <div className="sm:col-span-4 neu-flat p-4 rounded-3xl flex items-center justify-center">
              <div
                onClick={() => setToggleOn(!toggleOn)}
                className="w-24 h-12 rounded-2xl neu-inset p-1.5 flex items-center cursor-pointer transition-colors relative"
              >
                {/* Sliding Knob */}
                <div
                  className={`w-11 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-md transition-all duration-300 ${
                    toggleOn
                      ? "translate-x-10 bg-blue-600 text-white shadow-blue-500/40"
                      : "translate-x-0 neu-flat text-slate-400"
                  }`}
                >
                  {toggleOn ? "ON" : "OFF"}
                </div>
              </div>
            </div>
          </div>

          {/* Middle Row 2: Neumorphic Slider Bar (71%) */}
          <div className="neu-flat p-6 rounded-3xl space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600">
              <span>Fleet Velocity Governor</span>
              <span className="text-blue-600 font-extrabold text-sm">{sliderValue}%</span>
            </div>

            <div className="relative flex items-center">
              {/* Inset Grooved Track */}
              <div className="w-full h-4 rounded-full neu-inset relative overflow-hidden flex items-center">
                {/* Royal Blue Progress Fill */}
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all"
                  style={{ width: `${sliderValue}%` }}
                />
              </div>

              {/* Slider Input Native Overlay */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer h-6"
              />

              {/* Round Neumorphic Thumb */}
              <div
                className="absolute pointer-events-none w-6 h-6 rounded-full neu-flat flex items-center justify-center -ml-3"
                style={{ left: `${sliderValue}%` }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              </div>
            </div>

            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>0 km/h (Stationary)</span>
              <span>Ramp Safe: 45 km/h</span>
              <span>Highway: 80 km/h</span>
            </div>
          </div>

          {/* Middle Row 3: Circular Dial & Mountain Area Chart Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
            
            {/* Card 1: 75% Circular Dial Gauge (Exact Match to Reference Image) */}
            <div className="sm:col-span-7 neu-flat p-6 rounded-3xl space-y-4">
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                BATTERY HEALTH &amp; EFFICIENCY
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-black text-slate-800 tracking-tight">
                    $4,891.22
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <span className="text-blue-600">▲</span>
                    <span>75ec</span>
                  </div>
                </div>

                {/* Circular Gauge Structure */}
                <div className="relative w-32 h-32 flex items-center justify-center">
                  {/* Outer SVG Track & Arcs */}
                  <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                    {/* Background Inset Circle */}
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="#CBD5E1"
                      strokeWidth="6"
                      opacity="0.4"
                    />
                    {/* Gray Secondary Arc */}
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="#94A3B8"
                      strokeWidth="6"
                      strokeDasharray="289"
                      strokeDashoffset="120"
                      strokeLinecap="round"
                    />
                    {/* Royal Blue Progress Arc (75%) */}
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="6"
                      strokeDasharray="289"
                      strokeDashoffset="72"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Inner Convex Neumorphic Knob */}
                  <div className="absolute w-20 h-20 rounded-full neu-flat flex flex-col items-center justify-center">
                    <span className="text-lg font-black text-slate-800">75%</span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase">HEALTH</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2 border-t border-slate-200/80 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                  <span>Cycle Life</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <span>State of Charge</span>
                </div>
              </div>
            </div>

            {/* Card 2: Mountain Chart Widget (2201) */}
            <div className="sm:col-span-5 neu-flat p-6 rounded-3xl flex flex-col justify-between space-y-4">
              <div>
                <div className="text-2xl font-black text-slate-800">2201</div>
                <div className="text-xs text-slate-400">ECU Sensor Telemetry Stream</div>
              </div>

              {/* Mountain Shape SVG Chart */}
              <div className="h-24 w-full relative flex items-end">
                <svg className="w-full h-full" viewBox="0 0 160 80" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="mountain-blue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#2563EB" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="mountain-gray" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>

                  {/* Background Gray Hill */}
                  <path
                    d="M 0,80 L 15,65 L 40,70 L 65,45 L 90,60 L 120,40 L 145,55 L 160,80 Z"
                    fill="url(#mountain-gray)"
                  />
                  {/* Foreground Blue Mountain Peaks */}
                  <path
                    d="M 0,80 L 20,55 L 45,72 L 75,30 L 105,65 L 130,10 L 155,45 L 160,80 Z"
                    fill="url(#mountain-blue)"
                  />
                  {/* Top Line */}
                  <path
                    d="M 0,80 L 20,55 L 45,72 L 75,30 L 105,65 L 130,10 L 155,45 L 160,80"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Peak Marker Point */}
                  <circle cx="130" cy="10" r="3.5" fill="#2563EB" />
                </svg>
              </div>

              {/* Mini Slider Bar below Mountain Chart */}
              <div className="relative flex items-center">
                <div className="w-full h-2 rounded-full neu-inset relative overflow-hidden flex items-center">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all"
                    style={{ width: `${mountainSlider}%` }}
                  />
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={mountainSlider}
                  onChange={(e) => setMountainSlider(Number(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer h-4"
                />
                <div
                  className="absolute pointer-events-none w-4 h-4 rounded-full neu-flat flex items-center justify-center -ml-2"
                  style={{ left: `${mountainSlider}%` }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Timeline Stepper (2019 - 2022) */}
          <div className="neu-flat p-6 rounded-3xl">
            <div className="relative flex items-center justify-between px-4 sm:px-8 py-2">
              {/* Connecting Track Line */}
              <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1.5 neu-inset rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all"
                  style={{
                    width:
                      activeYear === "2019"
                        ? "10%"
                        : activeYear === "2020"
                        ? "40%"
                        : activeYear === "2021"
                        ? "70%"
                        : "100%",
                  }}
                />
              </div>

              {["2019", "2020", "2021", "2022"].map((year) => {
                const isActive = activeYear === year;
                return (
                  <div
                    key={year}
                    onClick={() => setActiveYear(year)}
                    className="relative z-10 flex flex-col items-center cursor-pointer group"
                  >
                    {/* Dot on Line */}
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-blue-600 shadow-md shadow-blue-500/40"
                          : "neu-flat group-hover:scale-110"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isActive ? "bg-white" : "bg-blue-600"
                        }`}
                      />
                    </div>

                    {/* Year Label / Badge */}
                    <div className="mt-3">
                      {isActive ? (
                        <div className="px-3 py-1 rounded-full bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/30">
                          {year}
                        </div>
                      ) : (
                        <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-700">
                          {year}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
