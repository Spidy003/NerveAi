"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Wifi, BrainCircuit, BellRing, ArrowRight } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "OBD Hardware Plug-in",
      desc: "Insert the Nerve Link device into the vehicle's standard J1939 or OBD-II CAN-bus port in under 30 seconds. Zero wiring cuts or warranty invalidation.",
      icon: Cpu,
      accent: "cyan",
      badge: "PLUG & PLAY // <30 SEC",
    },
    {
      num: "02",
      title: "Real-Time Sensor Ingestion",
      desc: "Streams engine RPM, coolant temperature, fuel rail pressure, alternator output, and vibration harmonics over high-frequency WebSocket channels to MongoDB Atlas.",
      icon: Wifi,
      accent: "violet",
      badge: "2.0s WEBSOCKET CYCLE",
    },
    {
      num: "03",
      title: "LSTM Inference Core",
      desc: "Our deep recurrent neural network evaluates rolling 30-step temporal windows to detect micro-drift patterns invisible to traditional diagnostic scan tools.",
      icon: BrainCircuit,
      accent: "cyan",
      badge: "94.8% RUL ACCURACY",
    },
    {
      num: "04",
      title: "Automated Dispatch & Alerts",
      desc: "Dispatches automated SMS (Twilio), email (Resend), and EDI 850/855 purchase orders for replacement parts straight to your maintenance depots before road breakdown.",
      icon: BellRing,
      accent: "alert",
      badge: "TWILIO + EDI 850",
    },
  ];

  return (
    <section id="technology" className="relative py-28 bg-[#07090C] border-b border-[#1E2633] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-cyan/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F141C] border border-cyan/30 text-xs font-mono text-cyan mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            <span>NEURAL PIPELINE ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase">
            From Raw CAN-Bus Pulses to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet">
              Predictive Protection.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#8A96A3] leading-relaxed">
            Four synchronized layers ensuring your commercial fleet never suffers an unexpected highway failure again.
          </p>
        </div>

        {/* Step-by-Step Grid with Glowing Signal Line */}
        <div className="relative">
          
          {/* Connecting Glow Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-[2px] -translate-y-8 bg-gradient-to-r from-cyan/30 via-violet/50 to-[#FF5D5D]/50 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="glass-panel p-6 sm:p-7 rounded-2xl border-[#1E2633] hover:border-cyan/50 transition-all flex flex-col justify-between group hover:shadow-glow-cyan"
                >
                  <div>
                    {/* Top Step Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-3xl font-extrabold text-[#1E2633] group-hover:text-cyan/60 transition-colors">
                        {step.num}
                      </span>
                      <div className="w-12 h-12 rounded-xl bg-[#0F141C] border border-[#1E2633] group-hover:border-cyan/50 flex items-center justify-center transition-all group-hover:shadow-glow-cyan-sm">
                        <Icon className="h-6 w-6 text-cyan group-hover:scale-110 transition-transform" />
                      </div>
                    </div>

                    {/* Step Badge */}
                    <div className="inline-block font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded bg-[#0B0F14] border border-[#1E2633] text-cyan mb-3">
                      {step.badge}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold font-display text-white mb-2 group-hover:text-cyan transition-colors">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[#8A96A3] leading-relaxed font-sans">
                      {step.desc}
                    </p>
                  </div>

                  {/* Micro Footer Indicator */}
                  <div className="mt-6 pt-4 border-t border-[#1E2633] flex items-center justify-between text-[11px] font-mono text-[#8A96A3]">
                    <span>STATUS: ACTIVE</span>
                    <span className="text-cyan">CYCLE 0{idx + 1}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
