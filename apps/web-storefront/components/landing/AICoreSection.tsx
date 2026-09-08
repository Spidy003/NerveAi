"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Cpu, Network, LineChart, CheckCircle2, Binary } from "lucide-react";

export default function AICoreSection() {
  const layers = [
    { name: "Input Tensor", desc: "30-Step CAN Ingestion", nodes: 5, color: "#2DE1C2" },
    { name: "LSTM Layer 1", desc: "64 Memory Units + Dropout", nodes: 6, color: "#6C5CE7" },
    { name: "LSTM Layer 2", desc: "32 Recurrent Hidden Cells", nodes: 4, color: "#7B61FF" },
    { name: "Dense Output", desc: "RUL Days + Confidence Score", nodes: 2, color: "#2DE1C2" },
  ];

  return (
    <section className="relative py-28 bg-[#07090C] border-b border-[#1E2633] overflow-hidden">
      {/* Neural Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#6C5CE7]/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-cyan/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F141C] border border-[#6C5CE7]/40 text-xs font-mono text-[#6C5CE7] mb-4">
            <Brain className="h-3.5 w-3.5 animate-pulse" />
            <span>RECURRENT DEEP LEARNING MODEL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase">
            The LSTM Neural Core.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet via-cyan to-teal">
              Time-Series Intelligence.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#8A96A3] leading-relaxed">
            Unlike basic threshold alarms that only trigger once an engine is already overheating, Nerve AI trains Long Short-Term Memory recurrent networks to learn subtle multi-sensor degradation dynamics.
          </p>
        </div>

        {/* Neural Network Visualization Graph */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border-[#1E2633] shadow-glow-violet relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-10 pb-8 border-b border-[#1E2633]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#0F141C] border border-cyan/40 flex items-center justify-center text-cyan shadow-glow-cyan-sm">
                <Network className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-white">
                  Temporal Sliding-Window Inference Pipeline
                </h3>
                <p className="text-xs font-mono text-[#8A96A3]">
                  Model Architecture: Double Stacked LSTM (64/32) • Activation: tanh + recurrent sigmoid
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="px-3 py-1 rounded-md bg-[#0F141C] border border-[#1E2633] text-[#C7D0D9]">
                WEIGHTS: INT8 QUANTIZED
              </span>
              <span className="px-3 py-1 rounded-md bg-[#0F141C] border border-cyan/30 text-cyan">
                LATENCY: &lt;14MS
              </span>
            </div>
          </div>

          {/* SVG Synaptic Network Animation */}
          <div className="w-full overflow-x-auto py-4">
            <div className="min-w-[650px] grid grid-cols-4 gap-8 relative items-center">
              
              {layers.map((layer, colIdx) => (
                <div key={colIdx} className="flex flex-col items-center">
                  <span className="font-mono text-xs font-bold text-white mb-1">{layer.name}</span>
                  <span className="font-mono text-[10px] text-[#8A96A3] text-center mb-6">{layer.desc}</span>

                  {/* Nodes in this layer */}
                  <div className="space-y-4 flex flex-col items-center w-full">
                    {Array.from({ length: layer.nodes }).map((_, nodeIdx) => (
                      <motion.div
                        key={nodeIdx}
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.6, 1, 0.6] }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          delay: colIdx * 0.35 + nodeIdx * 0.15,
                        }}
                        className="w-10 h-10 rounded-xl bg-[#0F141C] border flex items-center justify-center relative group"
                        style={{
                          borderColor: layer.color,
                          boxShadow: `0 0 15px ${layer.color}40`,
                        }}
                      >
                        <span className="font-mono text-[10px] text-white font-bold">N{nodeIdx + 1}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* Feature highlights below the net */}
          <div className="mt-12 pt-8 border-t border-[#1E2633] grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-cyan shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-1">CAN J1939 Feature Matrix</strong>
                <p className="text-[#8A96A3] leading-relaxed">
                  Extracts 8 coupled engine signals: RPM, fuel rail PSI, alternator V, vibrations, coolant C, throttle %.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-[#6C5CE7] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-1">Time-Series Micro-Drift</strong>
                <p className="text-[#8A96A3] leading-relaxed">
                  Identifies sensor covariance decay weeks before standard diagnostic trouble codes (DTCs) illuminate.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-cyan shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-1">Fleet RUL Regression</strong>
                <p className="text-[#8A96A3] leading-relaxed">
                  Outputs precise remaining days until critical component boundary with calibrated Bayesian uncertainty bounds.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
