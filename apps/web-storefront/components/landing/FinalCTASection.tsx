"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Radio, Terminal } from "lucide-react";

export default function FinalCTASection() {
  const integrations = [
    { name: "SUPABASE", tech: "PostgreSQL & Auth" },
    { name: "MONGODB ATLAS", tech: "Time-Series Telemetry" },
    { name: "RAZORPAY", tech: "Fleet Subscriptions" },
    { name: "TWILIO", tech: "Critical SMS Gateways" },
    { name: "RESEND", tech: "Transactional Reports" },
    { name: "ANSI X12", tech: "EDI 850/855 PO Integration" },
  ];

  return (
    <section className="relative py-32 bg-[#07090C] overflow-hidden">
      {/* Intense Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-r from-cyan/15 via-violet/15 to-transparent blur-[160px] pointer-events-none rounded-full" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-tech opacity-40 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Radar Beacon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F141C] border border-cyan/40 text-xs font-mono text-cyan shadow-glow-cyan-sm mb-8"
        >
          <Radio className="h-4 w-4 text-cyan animate-pulse" />
          <span>READY TO SECURE YOUR COMMERCIAL FLEET</span>
        </motion.div>

        {/* Big Impact Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl xl:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.08] uppercase"
        >
          Turn Highway Breakdowns Into{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-teal to-[#6C5CE7] drop-shadow-[0_0_35px_rgba(45,225,194,0.4)]">
            Prevented Incidents.
          </span>
        </motion.h2>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-base sm:text-lg text-[#8A96A3] max-w-2xl mx-auto leading-relaxed"
        >
          Deploy the Nerve Link OBD hardware across your trucks today. Zero vehicle downtime during installation, immediate CAN-bus signal ingestion, and 14-day advance failure predictions.
        </motion.p>

        {/* CTA Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          {/* Glowing Animated CTA */}
          <Link
            href="/store"
            className="animate-conic-glow inline-flex items-center justify-center px-10 py-5 rounded-2xl font-mono text-sm font-extrabold uppercase tracking-wider text-white hover:text-cyan transition-all group shadow-glow-cyan"
          >
            <span className="flex items-center gap-3">
              Deploy Nerve Link Now — ₹200/mo
              <ArrowRight className="h-5 w-5 text-cyan group-hover:translate-x-1.5 transition-transform" />
            </span>
          </Link>

          {/* Secondary Enterprise Consultation */}
          <Link
            href="/enterprise"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-5 rounded-2xl bg-[#0F141C] border border-[#1E2633] hover:border-cyan/50 text-[#C7D0D9] hover:text-white font-mono text-xs font-bold tracking-wider uppercase transition-all hover:shadow-glow-cyan-sm"
          >
            Book Fleet Audit Demo
          </Link>
        </motion.div>

        {/* Enterprise Trust Grid */}
        <div className="mt-20 pt-10 border-t border-[#1E2633]">
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#8A96A3] block mb-6">
            // ENTERPRISE TELEMETRY INFRASTRUCTURE INTEGRATIONS
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {integrations.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#0F141C]/60 border border-[#1E2633] text-center font-mono"
              >
                <div className="text-xs font-bold text-white tracking-wider">{item.name}</div>
                <div className="text-[10px] text-[#8A96A3] mt-0.5">{item.tech}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
