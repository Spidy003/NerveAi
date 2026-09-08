"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Radio,
  FileCode2,
  ShieldCheck,
  Zap,
  Gauge,
  Workflow,
  Server,
  Bell,
  Smartphone,
} from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="relative py-28 bg-[#0B0F14] border-b border-[#1E2633] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-violet/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F141C] border border-cyan/30 text-xs font-mono text-cyan mb-4">
            <Zap className="h-3.5 w-3.5" />
            <span>ENTERPRISE SPECIFICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase">
            Engineered for Massive Scale.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet">
              Industrial Grade Telemetry.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#8A96A3] leading-relaxed">
            Built from scratch for commercial Indian fleet operators — ruggedized hardware, low-bandwidth edge buffering, and complete ERP/EDI integration.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* Bento Card 1: 30-Second Plug-and-Play Hardware (Span 7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-panel rounded-3xl p-7 sm:p-9 border-[#1E2633] hover:border-cyan/40 transition-all group relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#0F141C] border border-cyan/30 flex items-center justify-center text-cyan shadow-glow-cyan-sm group-hover:scale-110 transition-transform">
                <Cpu className="h-6 w-6" />
              </div>
              <span className="font-mono text-xs text-cyan px-2.5 py-1 rounded-full bg-cyan/10 border border-cyan/30">
                EDGE HARDWARE
              </span>
            </div>

            <h3 className="text-2xl font-bold font-display text-white mb-3">
              Nerve Link OBD-II / J1939 Edge Dongle
            </h3>
            <p className="text-sm text-[#8A96A3] leading-relaxed max-w-lg mb-6">
              Plugs directly into the diagnostics port. Equipped with 4G LTE Cat-M1, high-sensitivity GPS, 6-axis IMU accelerometer for road vibration analysis, and secure CAN-bus optical isolation.
            </p>

            <div className="grid grid-cols-3 gap-3 font-mono text-xs pt-4 border-t border-[#1E2633]">
              <div>
                <span className="text-[#8A96A3] block text-[10px]">INSTALL TIME</span>
                <strong className="text-white">&lt; 30 SECONDS</strong>
              </div>
              <div>
                <span className="text-[#8A96A3] block text-[10px]">NETWORK</span>
                <strong className="text-cyan">4G LTE-M + 2G</strong>
              </div>
              <div>
                <span className="text-[#8A96A3] block text-[10px]">WARRANTY</span>
                <strong className="text-white">100% UNTOUCHED</strong>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 2: EDI 850 / 855 B2B Purchase Automation (Span 5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 glass-panel rounded-3xl p-7 sm:p-9 border-[#1E2633] hover:border-[#6C5CE7]/40 transition-all group relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#0F141C] border border-[#6C5CE7]/30 flex items-center justify-center text-[#6C5CE7] shadow-glow-violet group-hover:scale-110 transition-transform">
                <FileCode2 className="h-6 w-6" />
              </div>
              <span className="font-mono text-xs text-[#6C5CE7] px-2.5 py-1 rounded-full bg-[#6C5CE7]/10 border border-[#6C5CE7]/30">
                ERP / EDI INTEGRATION
              </span>
            </div>

            <h3 className="text-2xl font-bold font-display text-white mb-3">
              Automated EDI 850 Parts Orders
            </h3>
            <p className="text-sm text-[#8A96A3] leading-relaxed mb-6">
              When an LSTM failure prediction trips the critical boundary, Nerve AI automatically issues standard ANSI X12 EDI 850 purchase orders to your OEM spare parts distributor.
            </p>

            <div className="font-mono text-xs p-3 bg-[#07090C] rounded-xl border border-[#1E2633] text-[#8A96A3]">
              ST*850*0001~BEG*00*SA*PO-8821~REF*VEH*DL-01-AT-9021~N1*SU*TATA_GENUINE_PARTS~
            </div>
          </motion.div>

          {/* Bento Card 3: Multi-Channel Alerts (Span 4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 glass-panel rounded-3xl p-7 border-[#1E2633] hover:border-cyan/40 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#0F141C] border border-cyan/30 flex items-center justify-center text-cyan mb-6 group-hover:scale-110 transition-transform">
              <Bell className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white mb-2">
              Twilio SMS &amp; Resend Email Alerts
            </h3>
            <p className="text-sm text-[#8A96A3] leading-relaxed">
              Instant alerts sent directly to fleet managers, workshop mechanics, and driver consoles with pinpoint failure diagnostics.
            </p>
          </motion.div>

          {/* Bento Card 4: High-Frequency MongoDB Atlas Telemetry (Span 4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-4 glass-panel rounded-3xl p-7 border-[#1E2633] hover:border-cyan/40 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#0F141C] border border-cyan/30 flex items-center justify-center text-cyan mb-6 group-hover:scale-110 transition-transform">
              <Server className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white mb-2">
              High-Frequency Time-Series Store
            </h3>
            <p className="text-sm text-[#8A96A3] leading-relaxed">
              MongoDB Atlas telemetry cluster optimized for write-heavy CAN telemetry. Capable of millions of sensor packets per minute.
            </p>
          </motion.div>

          {/* Bento Card 5: Razorpay Subscriptions (Span 4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-4 glass-panel rounded-3xl p-7 border-[#1E2633] hover:border-cyan/40 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#0F141C] border border-cyan/30 flex items-center justify-center text-cyan mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white mb-2">
              Razorpay Seamless Billing &amp; Subscriptions
            </h3>
            <p className="text-sm text-[#8A96A3] leading-relaxed">
              Transparent per-vehicle monthly billing in INR with GST invoice auto-generation for streamlined fleet tax accounting.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
