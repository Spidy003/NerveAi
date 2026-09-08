"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AlertOctagon, TrendingDown, DollarSign, Clock, ShieldX, Wrench } from "lucide-react";

function CountUp({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isInView, end]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function ProblemSection() {
  return (
    <section className="relative py-28 bg-[#0B0F14] border-b border-[#1E2633] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-[#FF5D5D]/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A0E12] border border-[#FF5D5D]/30 text-xs font-mono text-[#FF5D5D] mb-4">
            <AlertOctagon className="h-3.5 w-3.5 animate-pulse" />
            <span>THE FLEET CRISIS IN INDIA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase">
            Reactive Repairs Are{" "}
            <span className="text-[#FF5D5D] underline decoration-[#FF5D5D]/40 decoration-wavy">
              Bleeding Your Fleet Dry.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#8A96A3] leading-relaxed">
            By the time a dashboard check-engine light flickers on highways, catastrophic mechanical damage is already done. Towing delays, spoiled cargo, and urgent shop markup cost fleets millions.
          </p>
        </div>

        {/* Split Grid: Left Stats Counter, Right Breakdown Glitch HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Stat Cards */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Stat Card 1 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-panel p-6 rounded-2xl border-[#1E2633] hover:border-[#FF5D5D]/40 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-4xl sm:text-5xl font-mono font-extrabold text-[#FF5D5D] tracking-tight group-hover:scale-105 transition-transform">
                    <CountUp end={72} suffix="%" />
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-white font-display">
                    Of Commercial Breakdowns Are Preventable
                  </h3>
                  <p className="mt-1 text-sm text-[#8A96A3] leading-relaxed">
                    Alternator dropouts, battery cell failures, and thermal runaway show CAN-bus symptoms up to 14 days before road stalls occur.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#1A0E12] border border-[#FF5D5D]/30 text-[#FF5D5D]">
                  <Wrench className="h-6 w-6" />
                </div>
              </div>
            </motion.div>

            {/* Stat Card 2 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="glass-panel p-6 rounded-2xl border-[#1E2633] hover:border-cyan/40 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-4xl sm:text-5xl font-mono font-extrabold text-white tracking-tight group-hover:scale-105 transition-transform">
                    <CountUp end={42000} prefix="₹" suffix="+" />
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-white font-display">
                    Average Lost Revenue Per Roadside Stall
                  </h3>
                  <p className="mt-1 text-sm text-[#8A96A3] leading-relaxed">
                    Includes highway towing, emergency technician labor, contract SLA penalties, and vehicle downtime.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#0F141C] border border-cyan/30 text-cyan">
                  <DollarSign className="h-6 w-6" />
                </div>
              </div>
            </motion.div>

            {/* Stat Card 3 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-panel p-6 rounded-2xl border-[#1E2633] hover:border-[#6C5CE7]/40 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-4xl sm:text-5xl font-mono font-extrabold text-cyan tracking-tight group-hover:scale-105 transition-transform">
                    <CountUp end={36} suffix=" Hours" />
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-white font-display">
                    Average Idle Repair Wait Time
                  </h3>
                  <p className="mt-1 text-sm text-[#8A96A3] leading-relaxed">
                    Without advance part procurement, fleets sit dead at workshops waiting for replacement components to ship.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#0F141C] border border-[#6C5CE7]/30 text-[#6C5CE7]">
                  <Clock className="h-6 w-6" />
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Animated Glitch / Failure Simulation HUD */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass-panel rounded-3xl p-6 sm:p-8 border-[#FF5D5D]/30 shadow-glow-alert relative overflow-hidden"
            >
              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF5D5D]/5 to-transparent scanline pointer-events-none" />

              {/* HUD Header */}
              <div className="flex items-center justify-between border-b border-[#1E2633] pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5D5D] animate-ping" />
                  <span className="font-mono text-xs font-bold text-[#FF5D5D] tracking-wider uppercase">
                    LIVE SYSTEM SIMULATION // CRITICAL STALL
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#8A96A3]">ID: CAN_DTC_P0622</span>
              </div>

              {/* Graphical Glitch Diagnostic Box */}
              <div className="bg-[#07090C] rounded-2xl p-5 border border-[#1E2633] relative">
                <div className="flex justify-between items-center text-xs font-mono mb-4 text-[#8A96A3]">
                  <span>VEHICLE: TATA 407 LPT</span>
                  <span className="text-[#FF5D5D] font-bold">STATUS: CRITICAL FAULT</span>
                </div>

                {/* Animated Simulated Waveform with Stutter */}
                <div className="h-28 w-full flex items-end gap-1.5 px-2 py-3 bg-[#0B0F14] rounded-xl border border-[#1E2633]/60 relative overflow-hidden">
                  {[45, 60, 55, 70, 65, 80, 75, 90, 85, 30, 20, 95, 10, 5, 0, 0, 0, 0].map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t transition-all duration-300 ${
                        i > 11 ? "bg-[#FF5D5D] animate-pulse" : "bg-cyan/40"
                      }`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                  <div className="absolute top-2 right-3 font-mono text-[10px] text-[#FF5D5D] font-bold">
                    VOLTAGE COLLAPSE // STALL EVENT
                  </div>
                </div>

                {/* Diagnostic Readout Output */}
                <div className="mt-4 grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3 bg-[#0F141C] rounded-lg border border-[#1E2633]">
                    <span className="text-[#8A96A3] block text-[10px]">ALTERNATR OUTPUT</span>
                    <span className="text-white font-bold">11.2V</span>
                    <span className="text-[#FF5D5D] ml-1.5 text-[11px]">(-2.6V CRIT)</span>
                  </div>
                  <div className="p-3 bg-[#0F141C] rounded-lg border border-[#1E2633]">
                    <span className="text-[#8A96A3] block text-[10px]">EST. ROAD DOWNTIME</span>
                    <span className="text-[#FF5D5D] font-bold">18.4 HOURS</span>
                  </div>
                </div>
              </div>

              {/* Bottom Callout banner */}
              <div className="mt-6 p-4 rounded-xl bg-[#1A0E12] border border-[#FF5D5D]/40 flex items-center gap-4">
                <ShieldX className="h-7 w-7 text-[#FF5D5D] shrink-0" />
                <p className="font-mono text-xs text-[#C7D0D9] leading-relaxed">
                  <strong className="text-white">With Standard OBD:</strong> Driver only learns after the engine halts on NH-48.
                  <br />
                  <strong className="text-cyan">With Nerve AI:</strong> Maintenance alert triggers 14 days earlier during scheduled depot layover.
                </p>
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
