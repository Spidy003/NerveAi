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
  Download 
} from "lucide-react";

export function NeumorphicUiKit() {
  // Navigation active tab
  const [activeNav, setActiveNav] = useState<"home" | "calendar" | "notification" | "settings">("home");
  
  // Toggle Switch state
  const [toggleOn, setToggleOn] = useState(true);

  // Slider state
  const [sliderValue, setSliderValue] = useState(71);

  // Timeline year state
  const [activeYear, setActiveYear] = useState("2019");

  // Login inputs
  const [loginEmail, setLoginEmail] = useState("username@mail.com");
  const [loginPassword, setLoginPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);

  // Category dropdown state
  const [category, setCategory] = useState("Select Category");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  // Mountain chart mini slider
  const [mountainSlider, setMountainSlider] = useState(65);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 space-y-8">
      {/* Theme Header Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 neu-flat p-6 rounded-3xl">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-blue-600 animate-ping" />
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Neumorphic Design System &amp; UI Kit</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Pixel-perfect soft UI extrusion, dual light/dark drop-shadows, inset wells, and vibrant royal blue accents.
          </p>
        </div>
        <div className="neu-inset px-4 py-2 rounded-full text-xs font-semibold text-blue-600 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          Live Interactive Elements
        </div>
      </div>

      {/* Main Showcase Grid mirroring the exact Reference Image layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Login Card & Pill Action Buttons */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Login Card (Exact match to reference image with Nerve AI content) */}
          <div className="neu-flat p-8 rounded-3xl space-y-6 transition-all">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-700 tracking-wide">Portal Login</h2>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 uppercase">
                Nerve AI
              </span>
            </div>

            <div className="space-y-4">
              {/* Username field */}
              <div className="neu-inset rounded-2xl px-4 py-3 flex items-center justify-between">
                <input
                  type="text"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@nerveai.com"
                  className="bg-transparent text-sm text-slate-700 w-full focus:outline-none placeholder-slate-400 font-medium"
                />
                <Mail className="w-4 h-4 text-slate-400 ml-2 shrink-0" />
              </div>

              {/* Password field */}
              <div className="neu-inset rounded-2xl px-4 py-3 flex items-center justify-between">
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

            {/* Sign Up pill button */}
            <div className="pt-2">
              <button
                type="button"
                className="w-full neu-btn-primary py-3.5 rounded-full font-semibold text-sm tracking-wide flex items-center justify-center cursor-pointer"
              >
                Sign In to Console
              </button>
            </div>
          </div>

          {/* Card 2: Neumorphic Pill Action Buttons (Exact match to reference image left-bottom) */}
          <div className="neu-flat p-6 rounded-3xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Fleet Action Pills</h3>

            {/* + Add Vehicle button */}
            <button
              type="button"
              className="w-full neu-btn px-4 py-3 rounded-full flex items-center gap-3 text-slate-600 font-medium text-sm group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform">
                <Plus className="w-4 h-4" />
              </div>
              <span className="group-hover:text-blue-600 transition-colors">Add Vehicle Node</span>
            </button>

            {/* Share button */}
            <button
              type="button"
              className="w-full neu-btn px-6 py-3.5 rounded-full flex items-center gap-4 text-slate-600 font-medium text-sm hover:text-blue-600 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-slate-500" />
              <span>Share Telemetry Stream</span>
            </button>

            {/* Select Category dropdown pill */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="w-full neu-btn px-6 py-3.5 rounded-full flex items-center justify-between text-slate-600 font-medium text-sm hover:text-blue-600 transition-colors cursor-pointer"
              >
                <span>{category}</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 right-0 top-full mt-2 neu-flat rounded-2xl p-2 z-20 space-y-1">
                  {["Fleet Diagnostics", "Energy Optimization", "Maintenance Alerts", "CAN Telemetry"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategory(cat);
                        setIsCategoryOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs rounded-xl hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-medium transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Download button */}
            <button
              type="button"
              className="w-full neu-btn px-4 py-3 rounded-full flex items-center gap-3 text-slate-600 font-medium text-sm group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
                <Download className="w-3.5 h-3.5" />
              </div>
              <span className="group-hover:text-blue-600 transition-colors">Download Report</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Nav Icons, Sparkline, Switch, Range Slider, Donut & Area Charts, Timeline */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Row 1: Top 4 Square Icon Buttons (Home, Calendar, Notification, Setting) */}
          <div className="flex flex-wrap items-center justify-between gap-4 neu-flat p-4 rounded-3xl">
            {[
              { id: "home", label: "Home", icon: Home },
              { id: "calendar", label: "Calender", icon: CalendarIcon },
              { id: "notification", label: "Notification", icon: Bell },
              { id: "settings", label: "Setting", icon: Settings },
            ].map((tab) => {
              const isActive = activeNav === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveNav(tab.id as any)}
                  className={`flex flex-col items-center justify-center w-24 h-24 rounded-2xl transition-all cursor-pointer ${
                    isActive ? "neu-inset scale-95" : "neu-btn hover:scale-105"
                  }`}
                >
                  <Icon className={`w-6 h-6 mb-2 transition-colors ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                  <span className={`text-xs font-semibold ${isActive ? "text-blue-600" : "text-slate-400"}`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Row 2: Sparkline Card & Toggle Switch */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Last 7 days Sparkline Card */}
            <div className="md:col-span-8 neu-flat p-6 rounded-3xl flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">Last 7 days</span>
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <span className="text-blue-600 font-bold">▲</span> +22,12
                </span>
              </div>

              {/* Smooth curved SVG chart line with peak dot */}
              <div className="h-20 w-full mt-4 flex items-center">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 320 60" preserveAspectRatio="none">
                  <path
                    d="M 0,38 Q 40,25 70,35 T 140,28 T 210,38 T 260,10 T 320,35"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  {/* Glowing Marker Dot */}
                  <circle cx="260" cy="10" r="5" fill="#2563EB" stroke="#E6ECF5" strokeWidth="2.5" />
                </svg>
              </div>
            </div>

            {/* Neumorphic ON/OFF Toggle Switch */}
            <div className="md:col-span-4 neu-flat p-6 rounded-3xl flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Toggle State</span>
              
              <button
                type="button"
                onClick={() => setToggleOn(!toggleOn)}
                className="w-28 h-14 neu-inset rounded-2xl p-1.5 flex items-center transition-all cursor-pointer relative"
              >
                {/* Switch knob */}
                <div
                  className={`h-full w-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    toggleOn 
                      ? "translate-x-11 neu-btn-primary" 
                      : "translate-x-0 neu-btn"
                  }`}
                >
                  {toggleOn ? (
                    <span className="text-xs font-bold tracking-wider text-white">ON</span>
                  ) : (
                    <span className="text-xs font-bold tracking-wider text-slate-500">OFF</span>
                  )}
                </div>

                {/* Vertical Ridges on the inactive side */}
                <div
                  className={`absolute flex gap-1 pointer-events-none transition-opacity ${
                    toggleOn ? "left-4 opacity-50" : "right-4 opacity-50"
                  }`}
                >
                  <div className="w-0.5 h-5 bg-slate-300 rounded-full" />
                  <div className="w-0.5 h-5 bg-slate-300 rounded-full" />
                  <div className="w-0.5 h-5 bg-slate-300 rounded-full" />
                </div>
              </button>
            </div>
          </div>

          {/* Row 3: Neumorphic Range Slider with Tooltip */}
          <div className="neu-flat p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span className="text-slate-400">Optimization Parameter</span>
              <span className="text-base text-slate-800 font-extrabold">{sliderValue}%</span>
            </div>

            <div className="relative pt-6 pb-2">
              {/* Floating Tooltip */}
              <div 
                className="absolute -top-3 neu-flat px-3 py-1 rounded-xl text-[11px] text-slate-500 pointer-events-none transition-all duration-75 shadow-sm"
                style={{ left: `calc(${sliderValue}% - 50px)` }}
              >
                <span className="font-semibold text-blue-600">{sliderValue}%</span> threshold
              </div>

              {/* Slider Track */}
              <div className="relative w-full h-3.5 neu-inset rounded-full overflow-hidden flex items-center">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-75"
                  style={{ width: `${sliderValue}%` }}
                />
              </div>

              {/* Native transparent range input layered on top */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                className="absolute inset-x-0 bottom-0 w-full h-8 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Row 4: Donut Progress Chart & Mountain Area Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card: Circular Donut Progress Chart */}
            <div className="neu-flat p-6 rounded-3xl space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  ENERGY SAVINGS INDEX
                </span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-2xl font-black text-slate-800">$4,891.22</span>
                  <span className="text-xs font-bold text-slate-600 flex items-center gap-0.5">
                    <span className="text-blue-600 font-bold">▲</span> 75%
                  </span>
                </div>
              </div>

              {/* Circular 3D Donut Gauge */}
              <div className="flex justify-center items-center py-2">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                    {/* Background track */}
                    <circle
                      cx="60"
                      cy="60"
                      r="48"
                      stroke="#dbe3ee"
                      strokeWidth="8"
                      fill="transparent"
                      strokeLinecap="round"
                    />
                    {/* Active progress arc */}
                    <circle
                      cx="60"
                      cy="60"
                      r="48"
                      stroke="#2563EB"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 48}
                      strokeDashoffset={2 * Math.PI * 48 * (1 - 0.75)}
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* 3D Extruded Center Dial */}
                  <div className="absolute w-24 h-24 neu-flat rounded-full flex flex-col items-center justify-center">
                    <span className="text-xl font-black text-slate-800">75%</span>
                    <span className="text-[10px] text-slate-400 font-semibold">EFFICIENCY</span>
                  </div>
                </div>
              </div>

              {/* Legend dots */}
              <div className="space-y-1.5 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="text-slate-500">Baseline consumption model</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <span className="text-slate-700 font-semibold">Optimized regenerative fleet load</span>
                </div>
              </div>
            </div>

            {/* Card: Mountain Peak Area Chart */}
            <div className="neu-flat p-6 rounded-3xl space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-2xl font-black text-slate-800">2201</span>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                  Telemetry data packets received per second across nodes
                </p>
              </div>

              {/* Mountain layered SVG curves */}
              <div className="h-36 w-full relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 240 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="bluePeak" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="grayPeak" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>

                  {/* Background Slate Mountain Peak */}
                  <path
                    d="M 10,120 L 30,90 L 50,70 L 70,85 L 95,50 L 125,95 L 160,60 L 190,100 L 230,120 Z"
                    fill="url(#grayPeak)"
                  />

                  {/* Foreground Blue Mountain Peak */}
                  <path
                    d="M 10,120 L 40,80 L 75,95 L 110,65 L 140,85 L 180,15 L 215,80 L 230,120 Z"
                    fill="url(#bluePeak)"
                  />

                  {/* Data Marker Dot at top peak */}
                  <circle cx="180" cy="15" r="4" fill="#1E293B" stroke="#FFFFFF" strokeWidth="2" />
                </svg>
              </div>

              {/* Sub-slider control */}
              <div className="relative pt-2">
                <div className="w-full h-2 neu-inset rounded-full flex items-center">
                  <div 
                    className="h-full bg-blue-600 rounded-full" 
                    style={{ width: `${mountainSlider}%` }} 
                  />
                  <div className="w-4 h-4 neu-btn rounded-full bg-white border border-slate-200 -ml-2 shrink-0 shadow-sm" />
                </div>
              </div>
            </div>

          </div>

          {/* Row 5: Timeline / Stepper Bar (Exact match to reference image bottom) */}
          <div className="neu-flat p-6 rounded-3xl">
            <div className="flex items-center justify-between relative px-2 md:px-8">
              {/* Connecting sunken track */}
              <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-2 neu-inset rounded-full z-0" />

              {["2019", "2020", "2021", "2022"].map((year) => {
                const isActive = activeYear === year;
                return (
                  <div key={year} className="relative z-10 flex flex-col items-center">
                    {/* Node circle on the line */}
                    <div 
                      className={`w-4 h-4 rounded-full mb-3 flex items-center justify-center transition-all ${
                        isActive ? "bg-blue-600 ring-4 ring-blue-100" : "neu-flat bg-slate-300"
                      }`}
                    />

                    {/* Button pill */}
                    <button
                      type="button"
                      onClick={() => setActiveYear(year)}
                      className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive 
                          ? "neu-btn-primary scale-105" 
                          : "neu-btn text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {year}
                    </button>
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
