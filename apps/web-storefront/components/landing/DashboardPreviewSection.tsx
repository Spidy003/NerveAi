"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, ShieldAlert, Wifi, Zap, RefreshCw, Cpu, Layers, Radio } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function DashboardPreviewSection() {
  const [chartData, setChartData] = useState([
    { time: "00:00", temp: 88, rpm: 1900, volt: 13.8 },
    { time: "00:02", temp: 89, rpm: 2100, volt: 13.9 },
    { time: "00:04", temp: 90, rpm: 2250, volt: 13.7 },
    { time: "00:06", temp: 91, rpm: 2400, volt: 13.8 },
    { time: "00:08", temp: 90, rpm: 2150, volt: 13.6 },
    { time: "00:10", temp: 92, rpm: 2300, volt: 13.5 },
    { time: "00:12", temp: 93, rpm: 2500, volt: 13.4 },
    { time: "00:14", temp: 94, rpm: 2600, volt: 13.2 },
    { time: "00:16", temp: 96, rpm: 2800, volt: 12.8 },
  ]);

  // Push new live telemetry point every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prev) => {
        const nextTime = new Date().toLocaleTimeString("en-US", {
          hour12: false,
          minute: "2-digit",
          second: "2-digit",
        });
        const last = prev[prev.length - 1];
        const nextTemp = +(last.temp + (Math.random() * 2 - 0.8)).toFixed(1);
        const nextRpm = Math.floor(last.rpm + (Math.random() * 160 - 80));
        const nextVolt = +(13.6 + (Math.random() * 0.4 - 0.2)).toFixed(2);

        const updated = [...prev.slice(1), { time: nextTime, temp: nextTemp, rpm: nextRpm, volt: nextVolt }];
        return updated;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="live-preview" className="relative py-28 bg-[#0B0F14] border-b border-[#1E2633] overflow-hidden">
      {/* Glow Backdrops */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-cyan/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F141C] border border-cyan/30 text-xs font-mono text-cyan mb-4">
            <Radio className="h-3.5 w-3.5 animate-pulse" />
            <span>MISSION CONTROL INTERFACE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase">
            Live Fleet Cockpit.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-teal">
              Zero Latency Blindspots.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#8A96A3] leading-relaxed">
            Every vehicle on your roster mapped in real-time. Continuous CAN-bus sensor streaming, automated fault clustering, and predictive RUL alerts on a single pane of glass.
          </p>
        </div>

        {/* 3D Glass Dashboard Mockup Window */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto rounded-3xl p-1 sm:p-2 bg-gradient-to-b from-cyan/30 via-white/5 to-[#1E2633] shadow-glow-cyan-lg"
        >
          <div className="bg-[#07090C] rounded-[22px] border border-[#1E2633] overflow-hidden">
            
            {/* Window Bar */}
            <div className="h-12 bg-[#0F141C] border-b border-[#1E2633] px-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5D5D]/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-cyan/80" />
                <span className="ml-4 font-mono text-xs text-[#8A96A3] hidden sm:inline">
                  NERVE_CONSOLE // VE-FLEET-CENTRAL-01 [WEBSOCKET CONNECTED]
                </span>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs text-cyan">
                <span className="w-2 h-2 rounded-full bg-cyan animate-ping" />
                <span>CAN-BUS: 1420 MSG/S</span>
              </div>
            </div>

            {/* Dashboard Content Grid */}
            <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Live Chart + Vehicle Telemetry Status (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Vehicle Quick Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                  <div className="p-3.5 bg-[#0F141C] rounded-xl border border-[#1E2633]">
                    <span className="text-[10px] text-[#8A96A3] block uppercase">ACTIVE ASSETS</span>
                    <span className="text-xl font-bold text-white">48 / 50</span>
                  </div>
                  <div className="p-3.5 bg-[#0F141C] rounded-xl border border-[#1E2633]">
                    <span className="text-[10px] text-[#8A96A3] block uppercase">CRITICAL ALERTS</span>
                    <span className="text-xl font-bold text-[#FF5D5D]">1 ANOMALY</span>
                  </div>
                  <div className="p-3.5 bg-[#0F141C] rounded-xl border border-[#1E2633]">
                    <span className="text-[10px] text-[#8A96A3] block uppercase">FLEET AVG RUL</span>
                    <span className="text-xl font-bold text-cyan">38 DAYS</span>
                  </div>
                  <div className="p-3.5 bg-[#0F141C] rounded-xl border border-[#1E2633]">
                    <span className="text-[10px] text-[#8A96A3] block uppercase">CAN LATENCY</span>
                    <span className="text-xl font-bold text-[#6C5CE7]">42 MS</span>
                  </div>
                </div>

                {/* Real-time Telemetry Sparkline Chart */}
                <div className="p-5 bg-[#0F141C] rounded-2xl border border-[#1E2633]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h4 className="font-display font-bold text-white text-base">
                        Real-Time CAN-Bus Telemetry Stream
                      </h4>
                      <p className="font-mono text-xs text-[#8A96A3]">
                        Target Vehicle: <strong className="text-cyan">MH-12-BF-4491 (Tata Prima 5530.S)</strong>
                      </p>
                    </div>
                    <div className="flex items-center gap-4 font-mono text-xs">
                      <span className="flex items-center gap-1.5 text-cyan">
                        <span className="w-2 h-2 rounded-full bg-cyan" /> Coolant Temp (°C)
                      </span>
                      <span className="flex items-center gap-1.5 text-violet">
                        <span className="w-2 h-2 rounded-full bg-violet" /> Alternator (V)
                      </span>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2DE1C2" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#2DE1C2" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="time" stroke="#1E2633" tick={{ fill: "#8A96A3", fontSize: 10 }} />
                        <YAxis stroke="#1E2633" tick={{ fill: "#8A96A3", fontSize: 10 }} domain={[70, 110]} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#07090C",
                            border: "1px solid #1E2633",
                            borderRadius: "8px",
                            fontFamily: "monospace",
                            fontSize: "12px",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="temp"
                          stroke="#2DE1C2"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#cyanGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>

              {/* Right Column: Predictive Alert Feed + Geospatial Map Mock (4 cols) */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Predictive Alert Box */}
                <div className="p-5 bg-[#1A0E12] rounded-2xl border border-[#FF5D5D]/40">
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex items-center gap-2 text-xs font-mono font-bold text-[#FF5D5D]">
                      <ShieldAlert className="h-4 w-4 animate-pulse" />
                      PREDICTIVE ANOMALY
                    </span>
                    <span className="font-mono text-[10px] text-[#FF5D5D] px-2 py-0.5 rounded bg-[#FF5D5D]/20">
                      CRITICAL
                    </span>
                  </div>
                  <h5 className="font-display font-bold text-white text-sm">
                    Alternator Stator Failure in 9 Days
                  </h5>
                  <p className="mt-1 font-mono text-xs text-[#8A96A3]">
                    Vehicle: #DL-01-AT-9021 • Highway Route: NH-48
                  </p>
                  <div className="mt-3 pt-3 border-t border-[#FF5D5D]/20 flex items-center justify-between text-xs font-mono">
                    <span className="text-[#8A96A3]">Auto Dispatch:</span>
                    <span className="text-cyan font-bold">EDI 850 Dispatched ✓</span>
                  </div>
                </div>

                {/* Fleet Geolocation Radar Feed */}
                <div className="p-5 bg-[#0F141C] rounded-2xl border border-[#1E2633]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-cyan" />
                      GEOSPATIAL FLEET RADAR
                    </span>
                    <span className="font-mono text-[10px] text-cyan animate-pulse">48 ACTIVE PINGS</span>
                  </div>
                  {/* Radar Map Graphic with pulsing dots */}
                  <div className="h-40 bg-[#07090C] rounded-xl border border-[#1E2633] relative overflow-hidden flex items-center justify-center bg-grid-tech">
                    {/* Concentric radar circles */}
                    <div className="absolute w-28 h-28 rounded-full border border-cyan/15" />
                    <div className="absolute w-44 h-44 rounded-full border border-cyan/10" />

                    {/* Vehicle Pings */}
                    <div className="absolute top-8 left-12 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan animate-ping" />
                      <span className="font-mono text-[9px] text-white">#MH-12</span>
                    </div>

                    <div className="absolute bottom-10 right-14 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5D5D] animate-ping" />
                      <span className="font-mono text-[9px] text-[#FF5D5D]">#DL-01 (STALL ALERT)</span>
                    </div>

                    <div className="absolute top-16 right-20 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan" />
                      <span className="font-mono text-[9px] text-white">#KA-04</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
