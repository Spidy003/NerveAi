"use client";

import { useState, useEffect } from "react";
import PricingCard from "@/components/storefront/PricingCard";
import Link from "next/link";
import { ArrowRight, Calculator, CheckCircle2, TrendingUp, ShieldCheck, Zap, ArrowLeft, Sun, Moon } from "lucide-react";

export default function PricingPage() {
  const [vehicles, setVehicles] = useState(20);
  const [fuelSpend, setFuelSpend] = useState(60000);
  const [downtimeDays, setDowntimeDays] = useState(8);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

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

  // Financial model logic (E-Business Value Proposition)
  const fuelSavingsMonthly = fuelSpend * vehicles * 0.06; // 6% fuel savings via speed & idle monitoring
  const repairSavingsMonthly = vehicles * 2200; // ₹2,200/mo prevented catastrophic failures via LSTM RUL
  const downtimeSavingsMonthly = Math.round((downtimeDays * 8500 * (vehicles / 10)) / 12); // ₹8,500/day commercial idle cost
  const totalMonthlySavings = Math.round(fuelSavingsMonthly + repairSavingsMonthly + downtimeSavingsMonthly);

  // Cost structure
  const hardwareOneTime = vehicles * 1499;
  const saasMonthlyPerVeh = vehicles >= 20 ? 150 : vehicles >= 6 ? 180 : 200;
  const saasMonthlyTotal = vehicles * saasMonthlyPerVeh;
  const netMonthlyProfit = totalMonthlySavings - saasMonthlyTotal;

  // Payback period in months
  const paybackMonths = Math.max(0.5, Number((hardwareOneTime / netMonthlyProfit).toFixed(1)));
  const annualROI = Math.round(((netMonthlyProfit * 12 - hardwareOneTime) / hardwareOneTime) * 100);

  return (
    <div
      className={`min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-cyber select-none transition-colors duration-300 relative ${
        isLight ? "bg-[#F4F7FA] text-[#0C121A]" : "bg-[#080B10] text-white"
      }`}
    >
      <div className="absolute inset-0 bg-grid-tech opacity-30 pointer-events-none" />

      {/* Top Breadcrumb & Cyber Controls */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-gray-800/80 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/" className={`text-xl font-black tracking-wider ${isLight ? "text-black" : "text-white"}`}>
            NERVE
            <span className={isLight ? "text-[#00897B]" : "text-[#2DE1C2]"}> AI</span>
          </Link>
          <span className="text-gray-500 font-mono text-sm">//</span>
          <span className="font-mono text-xs text-gray-400 tracking-wider">
            [SYS_PRICING_FIN_V3]
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <Link
            href="/store"
            className="flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-[#2DE1C2] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Telemetry Hardware Store
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

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Banner */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2DE1C2]/10 border border-[#2DE1C2]/30 text-[#2DE1C2] text-xs font-mono font-bold mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>[ MODULE 2: E-BUSINESS FINANCIAL STRATEGY &amp; PRICING ]</span>
          </div>
          <h1 className={`text-4xl md:text-6xl font-black tracking-tight mb-4 ${isLight ? "text-black" : "text-white"}`}>
            Transparent Pricing for Every Fleet
          </h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed font-mono">
            Hardware: <span className="text-[#2DE1C2] font-bold">₹1,499</span> one-time per vehicle.
            Predictive LSTM Telemetry SaaS from <span className="text-[#2DE1C2] font-bold">₹150/month</span>. Zero hidden integration fees.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <PricingCard
            name="Starter"
            price="₹200"
            description="1-5 Commercial Vehicles"
            isLight={isLight}
            features={[
              "Predictive Maintenance LSTM Alerts",
              "Live Telemetry Console (Speed, RPM, Temp)",
              "Basic Failure Probability Reports",
              "Twilio SMS & Email Breakdown Alerts",
            ]}
          />
          <PricingCard
            name="Business"
            price="₹180"
            description="6-20 Commercial Vehicles"
            highlighted={true}
            isLight={isLight}
            features={[
              "Everything in Starter plan",
              "Advanced LSTM Remaining Useful Life (RUL)",
              "Driver Behavior Scoring & Fuel Waste Analytics",
              "Priority Service Slot Reservation",
              "Multi-Depot Fleet Grouping",
            ]}
          />
          <PricingCard
            name="Enterprise"
            price="₹150"
            description="20+ High-Volume Vehicles"
            isLight={isLight}
            features={[
              "Everything in Business plan",
              "Automated ANSI X12 EDI (850/855) Integration",
              "Direct ERP & Telematics Webhooks",
              "Dedicated Fleet Operations Manager",
              "99.9% Sensor Uptime SLA Guarantee",
            ]}
          />
        </div>

        {/* Interactive B2B ROI & Savings Calculator (Module 2 Target) */}
        <div className={`p-4 sm:p-8 lg:p-12 rounded-2xl border shadow-2xl relative overflow-hidden mb-16 ${
          isLight ? "bg-white border-gray-200" : "bg-[#0E1520]/90 border-cyan/30"
        }`}>
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2DE1C2]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 pb-6 border-b border-gray-800/80 gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#2DE1C2] font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE B2B FLEET ROI CALCULATOR</span>
              </div>
              <h2 className={`text-2xl sm:text-3xl font-black ${isLight ? "text-black" : "text-white"}`}>
                Simulate Your Predictive Maintenance Savings
              </h2>
            </div>
            <span className="px-3.5 py-1.5 rounded-lg bg-[#2DE1C2]/15 text-[#2DE1C2] text-xs font-mono font-bold border border-[#2DE1C2]/30 self-start sm:self-center">
              ESTIMATED PAYBACK: {paybackMonths} MO
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Sliders */}
            <div className="lg:col-span-6 space-y-6">
              {/* Slider 1: Fleet Size */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider font-bold text-gray-400">
                    Fleet Size (Commercial Trucks / Vans)
                  </label>
                  <span className="px-2.5 py-1 rounded bg-[#2DE1C2]/15 text-[#2DE1C2] font-mono font-bold text-xs border border-[#2DE1C2]/30">
                    {vehicles} Vehicles
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={vehicles}
                  onChange={(e) => setVehicles(Number(e.target.value))}
                  className="w-full accent-[#2DE1C2] h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-gray-500 font-mono mt-1">
                  <span>1 Unit</span>
                  <span>50 Units</span>
                  <span>100 Units</span>
                </div>
              </div>

              {/* Slider 2: Fuel Spend */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider font-bold text-gray-400">
                    Avg Monthly Fuel Spend (Per Vehicle)
                  </label>
                  <span className="px-2.5 py-1 rounded bg-[#2DE1C2]/15 text-[#2DE1C2] font-mono font-bold text-xs border border-[#2DE1C2]/30">
                    ₹{fuelSpend.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="150000"
                  step="5000"
                  value={fuelSpend}
                  onChange={(e) => setFuelSpend(Number(e.target.value))}
                  className="w-full accent-[#2DE1C2] h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-gray-500 font-mono mt-1">
                  <span>₹10,000</span>
                  <span>₹75,000</span>
                  <span>₹1,50,000</span>
                </div>
              </div>

              {/* Slider 3: Breakdown Days Avoided */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider font-bold text-gray-400">
                    Breakdown Downtime Days Avoided / Yr
                  </label>
                  <span className="px-2.5 py-1 rounded bg-[#2DE1C2]/15 text-[#2DE1C2] font-mono font-bold text-xs border border-[#2DE1C2]/30">
                    {downtimeDays} Days
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="25"
                  value={downtimeDays}
                  onChange={(e) => setDowntimeDays(Number(e.target.value))}
                  className="w-full accent-[#2DE1C2] h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-gray-500 font-mono mt-1">
                  <span>2 Days</span>
                  <span>12 Days</span>
                  <span>25 Days</span>
                </div>
              </div>

              {/* Key Assumptions Note for Examiner */}
              <div className={`p-4 rounded-xl border text-xs font-mono leading-relaxed ${
                isLight ? "bg-gray-50 border-gray-200 text-gray-600" : "bg-[#090D14] border-gray-800 text-gray-400"
              }`}>
                💡 <strong className={isLight ? "text-gray-900" : "text-gray-200"}>E-Business Financial Model:</strong> 6% fuel savings via eco-telemetry + ₹2,200/veh prevented catastrophic highway repairs + ₹8,500/day freight loss avoided.
              </div>
            </div>

            {/* Right Column: Financial Impact Card */}
            <div className={`lg:col-span-6 p-6 sm:p-8 rounded-2xl border flex flex-col justify-between ${
              isLight ? "bg-gray-50 border-gray-200" : "bg-[#090D14] border-cyan/30"
            }`}>
              <div>
                <h3 className="text-xs font-mono tracking-wider text-[#2DE1C2] font-bold uppercase mb-4">
                  // ANNUAL FINANCIAL PROJECTIONS
                </h3>

                {/* Main Metric */}
                <div className={`mb-6 p-5 rounded-xl border ${
                  isLight ? "bg-white border-gray-200" : "bg-[#04060A] border-cyan/40"
                }`}>
                  <span className="text-xs text-gray-400 font-mono block mb-1">
                    NET ESTIMATED MONTHLY SAVINGS
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-[#2DE1C2] font-mono">
                    ₹{netMonthlyProfit.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-gray-500 font-mono">
                    ₹{(netMonthlyProfit * 12).toLocaleString()} annual bottom-line recovery
                  </span>
                </div>

                {/* Sub Metrics Breakdown */}
                <div className="grid grid-cols-2 gap-3 font-mono text-xs mb-6">
                  <div className={`p-3 rounded-lg border ${
                    isLight ? "bg-white border-gray-200" : "bg-black/40 border-gray-800"
                  }`}>
                    <span className="text-gray-400 text-[11px] block">Payback Period</span>
                    <span className={`text-lg font-bold ${isLight ? "text-black" : "text-white"}`}>
                      {paybackMonths} Months
                    </span>
                  </div>
                  <div className={`p-3 rounded-lg border ${
                    isLight ? "bg-white border-gray-200" : "bg-black/40 border-gray-800"
                  }`}>
                    <span className="text-gray-400 text-[11px] block">First-Year Net ROI</span>
                    <span className="text-lg font-bold text-[#2DE1C2]">
                      {annualROI}%
                    </span>
                  </div>
                  <div className={`p-3 rounded-lg border ${
                    isLight ? "bg-white border-gray-200" : "bg-black/40 border-gray-800"
                  }`}>
                    <span className="text-gray-400 text-[11px] block">Hardware Investment</span>
                    <span className={`text-sm font-bold ${isLight ? "text-gray-800" : "text-gray-200"}`}>
                      ₹{hardwareOneTime.toLocaleString()}
                    </span>
                  </div>
                  <div className={`p-3 rounded-lg border ${
                    isLight ? "bg-white border-gray-200" : "bg-black/40 border-gray-800"
                  }`}>
                    <span className="text-gray-400 text-[11px] block">Recurring SaaS</span>
                    <span className={`text-sm font-bold ${isLight ? "text-gray-800" : "text-gray-200"}`}>
                      ₹{saasMonthlyTotal.toLocaleString()}/mo
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href="/store"
                className="w-full py-4 bg-[#2DE1C2] hover:bg-[#25c4a8] text-black font-bold font-mono text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(45,225,194,0.4)] cursor-pointer"
              >
                <span>DEPLOY {vehicles} NERVE HARDWARE LINKS NOW</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
