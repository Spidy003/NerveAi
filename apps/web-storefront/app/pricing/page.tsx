"use client";

import { useState } from "react";
import PricingCard from "@/components/storefront/PricingCard";
import FleetRoiCalculator from "@/components/landing/FleetRoiCalculator";
import Link from "next/link";
import { ArrowRight, Calculator, CheckCircle2, TrendingUp, ShieldCheck, Zap, ArrowLeft } from "lucide-react";
import Footer from "@/components/shared/Footer";

export default function PricingPage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans bg-[#E6ECF5] text-slate-800 select-none relative">
      
      {/* Top Breadcrumb & Controls */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 neu-flat px-6 py-4 rounded-full">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-lg font-black tracking-tight text-slate-800 flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl neu-flat flex items-center justify-center text-blue-600 font-extrabold text-sm">
              N
            </div>
            <span>NERVE <span className="text-blue-600">AI</span></span>
          </Link>
          <span className="text-slate-300">•</span>
          <span className="text-xs font-semibold text-slate-500">Pricing &amp; Subscriptions</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/store"
            className="neu-btn px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Hardware Store
          </Link>
          <Link
            href="/dashboard"
            className="neu-btn-primary px-5 py-2 rounded-full text-xs font-bold tracking-wide"
          >
            Open Console
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="neu-inset px-4 py-1.5 rounded-full text-xs font-bold text-blue-600 inline-block mb-3">
            TRANSPARENT FLEET PRICING
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-800 tracking-tight mb-4">
            Predictive Intelligence for Every Fleet
          </h1>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
            Hardware: <strong className="text-blue-600 font-bold">₹1,499</strong> one-time per vehicle.
            Predictive LSTM Telemetry SaaS from <strong className="text-blue-600 font-bold">₹150/month</strong>. Zero hidden fees.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          <PricingCard
            name="Starter"
            price="₹200"
            description="Designed for local freight operators and small intra-city fleets (1 to 5 vehicles)."
            features={[
              "Nerve Link OBD-II plug & play hardware",
              "Sub-second CAN-bus live telemetry streaming",
              "LSTM Battery & Alternator failure prediction",
              "Twilio SMS breakdown notifications",
              "Standard Cloud Telemetry Storage (30 Days)",
            ]}
            ctaText="Deploy Starter Nodes"
            isLight={true}
          />

          <PricingCard
            name="Business"
            price="₹180"
            description="Optimal tier for growing commercial transport, logistics hubs, and delivery fleets (6 to 20 vehicles)."
            features={[
              "Everything in Starter Tier",
              "14-Day predictive engine component RUL scoring",
              "Autonomous ANSI X12 EDI 850 PO dispatch",
              "Driver harsh braking & idling efficiency analytics",
              "Real-time Geo-fencing & route telemetry history",
              "Priority 24/7 Fleet Dispatch Hotline",
            ]}
            highlighted={true}
            ctaText="Order Fleet Pilot Link"
            isLight={true}
          />

          <PricingCard
            name="Enterprise"
            price="₹150"
            description="Full-scale industrial fleets, airport ground support equipment, and national transit networks (20+ vehicles)."
            features={[
              "Everything in Business Tier",
              "Custom LSTM neural weights per truck class",
              "Full SAP / Oracle ERP webhook integration",
              "Custom EDI 855 order acknowledgments",
              "Dedicated technical field account engineer",
              "99.95% API SLA & on-premise gateway option",
            ]}
            ctaText="Contact Enterprise Desk"
            isLight={true}
          />
        </div>

        {/* Interactive ROI Calculator Section */}
        <div className="space-y-6 pt-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Calculate Your Fleet Bottom-Line Recovery
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Adjust fleet size and fuel spend to calculate your monthly cash savings with Nerve AI.
            </p>
          </div>
          <FleetRoiCalculator isLight={true} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
