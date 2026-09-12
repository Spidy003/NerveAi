"use client";

import React, { useState } from "react";
import { Calculator, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface RoiCalculatorProps {
  isLight?: boolean;
}

export default function FleetRoiCalculator({ isLight = true }: RoiCalculatorProps) {
  const [vehicles, setVehicles] = useState(20);
  const [fuelSpend, setFuelSpend] = useState(60000);
  const [downtimeDays, setDowntimeDays] = useState(8);

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
    <div className="w-full neu-flat p-6 sm:p-10 rounded-3xl relative select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-slate-200/80 gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-sans text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-4 h-4" />
            <span>INTERACTIVE B2B FLEET ROI SIMULATOR</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Predictive Maintenance Savings Calculator
          </h2>
        </div>
        <div className="neu-inset px-4 py-2 rounded-full text-xs font-bold text-blue-600 self-start sm:self-center flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          ESTIMATED PAYBACK: {paybackMonths} MO
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Sliders */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Slider 1: Fleet Size */}
          <div className="neu-flat p-5 rounded-2xl space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Fleet Size (Commercial Trucks / Vans)
              </label>
              <span className="neu-inset px-3 py-1 rounded-full text-blue-600 font-bold text-xs">
                {vehicles} Vehicles
              </span>
            </div>

            <div className="relative flex items-center">
              {/* Inset Grooved Track */}
              <div className="w-full h-3 rounded-full neu-inset relative overflow-hidden flex items-center">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all"
                  style={{ width: `${(vehicles / 100) * 100}%` }}
                />
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={vehicles}
                onChange={(e) => setVehicles(Number(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer h-5"
              />
              <div
                className="absolute pointer-events-none w-5 h-5 rounded-full neu-flat flex items-center justify-center -ml-2.5"
                style={{ left: `${(vehicles / 100) * 100}%` }}
              >
                <div className="w-2 h-2 rounded-full bg-blue-600" />
              </div>
            </div>

            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>1 Unit</span>
              <span>50 Units</span>
              <span>100 Units</span>
            </div>
          </div>

          {/* Slider 2: Fuel Spend */}
          <div className="neu-flat p-5 rounded-2xl space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Avg Monthly Fuel Spend (Per Vehicle)
              </label>
              <span className="neu-inset px-3 py-1 rounded-full text-blue-600 font-bold text-xs">
                ₹{fuelSpend.toLocaleString()}
              </span>
            </div>

            <div className="relative flex items-center">
              <div className="w-full h-3 rounded-full neu-inset relative overflow-hidden flex items-center">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all"
                  style={{ width: `${((fuelSpend - 10000) / 140000) * 100}%` }}
                />
              </div>
              <input
                type="range"
                min="10000"
                max="150000"
                step="5000"
                value={fuelSpend}
                onChange={(e) => setFuelSpend(Number(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer h-5"
              />
              <div
                className="absolute pointer-events-none w-5 h-5 rounded-full neu-flat flex items-center justify-center -ml-2.5"
                style={{ left: `${((fuelSpend - 10000) / 140000) * 100}%` }}
              >
                <div className="w-2 h-2 rounded-full bg-blue-600" />
              </div>
            </div>

            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>₹10,000</span>
              <span>₹75,000</span>
              <span>₹1,50,000</span>
            </div>
          </div>

          {/* Slider 3: Breakdown Days Avoided */}
          <div className="neu-flat p-5 rounded-2xl space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Breakdown Downtime Days Avoided / Yr
              </label>
              <span className="neu-inset px-3 py-1 rounded-full text-blue-600 font-bold text-xs">
                {downtimeDays} Days
              </span>
            </div>

            <div className="relative flex items-center">
              <div className="w-full h-3 rounded-full neu-inset relative overflow-hidden flex items-center">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all"
                  style={{ width: `${((downtimeDays - 2) / 23) * 100}%` }}
                />
              </div>
              <input
                type="range"
                min="2"
                max="25"
                value={downtimeDays}
                onChange={(e) => setDowntimeDays(Number(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer h-5"
              />
              <div
                className="absolute pointer-events-none w-5 h-5 rounded-full neu-flat flex items-center justify-center -ml-2.5"
                style={{ left: `${((downtimeDays - 2) / 23) * 100}%` }}
              >
                <div className="w-2 h-2 rounded-full bg-blue-600" />
              </div>
            </div>

            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>2 Days</span>
              <span>12 Days</span>
              <span>25 Days</span>
            </div>
          </div>

          {/* Key Assumptions Note */}
          <div className="neu-inset p-4 rounded-2xl text-xs text-slate-600 leading-relaxed flex items-start gap-2.5">
            <span className="text-blue-600 text-sm">💡</span>
            <div>
              <strong className="text-slate-800 font-semibold">Value Formula:</strong> 6% fuel savings via eco-telemetry + ₹2,200/veh prevented catastrophic failures + ₹8,500/day freight breakdown recovery.
            </div>
          </div>
        </div>

        {/* Right Column: Financial Impact Card */}
        <div className="lg:col-span-6 neu-flat p-6 sm:p-8 rounded-3xl flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-4">
              Annual Financial Projections
            </h3>

            {/* Main Metric */}
            <div className="neu-inset p-6 rounded-2xl mb-6">
              <span className="text-xs text-slate-500 font-medium block mb-1 uppercase tracking-wider">
                Net Estimated Monthly Savings
              </span>
              <div className="text-3xl sm:text-4xl font-black text-blue-600 tracking-tight">
                ₹{netMonthlyProfit.toLocaleString()}
              </div>
              <span className="text-xs text-slate-500 font-medium mt-1 block">
                ₹{(netMonthlyProfit * 12).toLocaleString()} annual bottom-line recovery
              </span>
            </div>

            {/* Sub Metrics Breakdown */}
            <div className="grid grid-cols-2 gap-4 text-xs mb-6">
              <div className="neu-flat p-4 rounded-2xl">
                <span className="text-slate-400 text-xs block font-medium">Payback Period</span>
                <span className="text-lg font-bold text-slate-800 mt-1 block">
                  {paybackMonths} Months
                </span>
              </div>
              <div className="neu-flat p-4 rounded-2xl">
                <span className="text-slate-400 text-xs block font-medium">First-Year Net ROI</span>
                <span className="text-lg font-bold text-blue-600 mt-1 block">
                  {annualROI}%
                </span>
              </div>
              <div className="neu-flat p-4 rounded-2xl">
                <span className="text-slate-400 text-xs block font-medium">Hardware One-Time</span>
                <span className="text-sm font-bold text-slate-700 mt-1 block">
                  ₹{hardwareOneTime.toLocaleString()}
                </span>
              </div>
              <div className="neu-flat p-4 rounded-2xl">
                <span className="text-slate-400 text-xs block font-medium">Monthly SaaS Total</span>
                <span className="text-sm font-bold text-slate-700 mt-1 block">
                  ₹{saasMonthlyTotal.toLocaleString()}/mo
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/store"
            className="w-full neu-btn-primary py-4 rounded-full font-bold text-sm tracking-wide flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            <span>Order Hardware for {vehicles} Vehicles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
