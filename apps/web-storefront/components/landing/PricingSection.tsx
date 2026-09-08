"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Zap, ArrowRight, Shield } from "lucide-react";

export default function PricingSection() {
  const plans = [
    {
      name: "Starter Fleet",
      desc: "For small logistics fleets & independent vehicle operators.",
      price: "₹200",
      cadence: "/ vehicle / month",
      hardwarePrice: "₹2,499 one-time OBD hardware",
      features: [
        "Up to 10 vehicles",
        "LSTM RUL Failure Predictions (14 days)",
        "Real-Time WebSocket Dashboard (2s cycle)",
        "Automated Twilio SMS Alerts",
        "Standard Email Reports",
        "99.5% Platform SLA",
      ],
      cta: "Order Starter Link",
      link: "/store",
      highlighted: false,
    },
    {
      name: "Business Fleet",
      desc: "For regional distribution, express couriers & bus operators.",
      price: "₹180",
      cadence: "/ vehicle / month",
      hardwarePrice: "₹2,199 one-time OBD hardware",
      badge: "MOST POPULAR // FLEET OPTIMIZED",
      features: [
        "10 to 100 vehicles",
        "Full LSTM Neural Network Pipeline",
        "Sub-second CAN-bus Telemetry Streams",
        "Multi-user Dispatch Console & Radar",
        "Twilio SMS + Resend Automated Emails",
        "Preventative Parts Restock Warnings",
        "Priority 24/7 Fleet Dispatch Support",
      ],
      cta: "Deploy Business Link",
      link: "/store",
      highlighted: true,
    },
    {
      name: "Enterprise Logistics",
      desc: "For nationwide supply chains, quick-commerce & 3PL giants.",
      price: "Custom",
      cadence: "volume discounted pricing",
      hardwarePrice: "Zero upfront hardware on 36mo contracts",
      features: [
        "100+ vehicles to unlimited fleets",
        "Automated EDI 850 & 855 ERP Purchase Orders",
        "Dedicated Supabase & MongoDB VPC Clusters",
        "Custom Neural Model Tuning for Heavy Machinery",
        "Custom REST & WebSocket API Webhooks",
        "Dedicated Enterprise Account Director",
      ],
      cta: "Contact Enterprise Team",
      link: "/enterprise",
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-28 bg-[#07090C] border-b border-[#1E2633] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F141C] border border-cyan/30 text-xs font-mono text-cyan mb-4">
            <Zap className="h-3.5 w-3.5" />
            <span>TRANSPARENT FLEET ECONOMICS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase">
            Predictive AI That Pays For Itself{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-teal">
              On Day One.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#8A96A3] leading-relaxed">
            A single prevented roadside alternator breakdown saves ₹42,000+ — easily covering your entire annual fleet subscription.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all relative ${
                plan.highlighted
                  ? "bg-[#0B0F14] border-2 border-cyan shadow-glow-cyan lg:-translate-y-4 z-20"
                  : "glass-panel border-[#1E2633] hover:border-cyan/40"
              }`}
            >
              {/* Highlight Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cyan text-black font-mono text-[10px] font-extrabold tracking-wider uppercase shadow-glow-cyan-sm whitespace-nowrap">
                  {plan.badge}
                </div>
              )}

              <div>
                {/* Plan Header */}
                <h3 className="text-2xl font-bold font-display text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-[#8A96A3] font-sans leading-relaxed mb-6">{plan.desc}</p>

                {/* Price */}
                <div className="mb-2 flex items-baseline gap-1.5">
                  <span className="text-4xl sm:text-5xl font-mono font-extrabold text-white">{plan.price}</span>
                  <span className="text-xs font-mono text-[#8A96A3]">{plan.cadence}</span>
                </div>
                <div className="text-[11px] font-mono text-cyan mb-8">
                  {plan.hardwarePrice}
                </div>

                {/* Features List */}
                <div className="space-y-3.5 pt-6 border-t border-[#1E2633] mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#0F141C] border border-cyan/40 flex items-center justify-center text-cyan shrink-0 mt-0.5">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-xs text-[#C7D0D9] leading-relaxed font-sans">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={plan.link}
                className={`w-full py-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  plan.highlighted
                    ? "bg-cyan hover:bg-cyan-glow text-black shadow-glow-cyan-sm"
                    : "bg-[#0F141C] hover:bg-[#1E2633] border border-[#1E2633] hover:border-cyan text-white"
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
