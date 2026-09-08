"use client";

import React from "react";

export default function CyberMechBackground({
  theme = "dark",
}: {
  theme?: "dark" | "light";
}) {
  const isLight = theme === "light";

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      
      {/* 1. Base Subtle Geometric Angular Plates (Inspired by Reference Image) */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        <defs>
          {/* Subtle Grid Pattern */}
          <pattern id="mech-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke={isLight ? "rgba(0, 168, 150, 0.07)" : "rgba(45, 225, 194, 0.04)"}
              strokeWidth="1"
            />
          </pattern>

          {/* Dotted Matrix Pattern */}
          <pattern id="mech-dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle
              cx="2"
              cy="2"
              r="1"
              fill={isLight ? "rgba(0, 168, 150, 0.12)" : "rgba(45, 225, 194, 0.15)"}
            />
          </pattern>

          {/* Linear Gradient for Conduits */}
          <linearGradient id="conduit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isLight ? "#00A896" : "#2DE1C2"} stopOpacity="0.4" />
            <stop offset="50%" stopColor={isLight ? "#007A6D" : "#00F7CC"} stopOpacity="0.7" />
            <stop offset="100%" stopColor={isLight ? "#00A896" : "#2DE1C2"} stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Technical Grid Fill */}
        <rect width="100%" height="100%" fill="url(#mech-grid)" />

        {/* 2. Main 45-Degree Angular Cyber Conduit Traces (Exact style from Reference) */}
        
        {/* Upper Trace: Traverses from left across middle down at 45 deg */}
        <path
          d="M -20,280 L 140,280 L 260,400 L 580,400 L 720,540 L 1180,540 L 1260,460 L 1460,460"
          fill="none"
          stroke={isLight ? "rgba(15, 23, 42, 0.16)" : "rgba(255, 255, 255, 0.22)"}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Parallel Thin Accent Trace with Glowing Color */}
        <path
          d="M -20,288 L 136,288 L 254,408 L 576,408 L 716,548 L 1176,548 L 1254,468 L 1460,468"
          fill="none"
          stroke="url(#conduit-grad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Lower Circuit Trace */}
        <path
          d="M -10,640 L 190,440 L 320,440 L 410,530 L 680,530 L 780,630 L 1220,630 L 1320,730 L 1460,730"
          fill="none"
          stroke={isLight ? "rgba(0, 168, 150, 0.3)" : "rgba(45, 225, 194, 0.25)"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

      </svg>

      {/* 4. Right Edge Vertical Technical Scale & Hash Ruler (From Reference Image) */}
      <div className="absolute right-6 top-32 bottom-32 w-16 hidden xl:flex flex-col justify-between items-end pointer-events-none opacity-80">
        
        {/* Top Hatch Block */}
        <div className="space-y-1 font-mono text-[8px] text-right">
          <div className={isLight ? "text-[#556778]" : "text-[#8A96A3]"}>SYS.ORD // 09</div>
          <div className="flex gap-1 justify-end">
            <span className={`w-3 h-1 ${isLight ? "bg-[#00897B]" : "bg-cyan"}`} />
            <span className={`w-2 h-1 ${isLight ? "bg-[#CBD5E1]" : "bg-[#1E2633]"}`} />
            <span className={`w-1 h-1 ${isLight ? "bg-[#00897B]" : "bg-cyan"}`} />
          </div>
        </div>

        {/* Vertical Hatch Lines: ///////// */}
        <div className="flex flex-col items-center space-y-1 py-4">
          {Array.from({ length: 12 }).map((_, idx) => (
            <div
              key={idx}
              className={`w-4 h-0.5 transform -skew-x-12 ${
                idx % 3 === 0
                  ? isLight
                    ? "bg-[#00897B]"
                    : "bg-cyan"
                  : isLight
                  ? "bg-[#94A3B8]"
                  : "bg-[#2E3C4E]"
              }`}
            />
          ))}
        </div>

        {/* Large Vertical Stencil Text (Like NKH in Reference Image) */}
        <div className="flex flex-col items-center my-6">
          <div
            className={`font-cyber font-black text-2xl tracking-[0.4em] select-none [writing-mode:vertical-rl] ${
              isLight ? "text-[#0F172A]/30" : "text-white/20"
            }`}
          >
            NRV-AI
          </div>
          <div className={`w-px h-16 mt-3 ${isLight ? "bg-[#00897B]/40" : "bg-cyan/40"}`} />
        </div>

        {/* Measurement Scale with Ticks */}
        <div className="flex items-center gap-1.5 font-mono text-[9px]">
          <div className="flex flex-col items-end space-y-2">
            <span className={isLight ? "text-[#556778]" : "text-gray-400"}>01</span>
            <span className={isLight ? "text-[#556778]" : "text-gray-400"}>02</span>
            <span className={isLight ? "text-[#556778]" : "text-gray-400"}>03</span>
            <span className={isLight ? "text-[#556778]" : "text-gray-400"}>04</span>
          </div>
          <div className={`w-1 h-24 border-r-2 ${isLight ? "border-[#00897B]/50" : "border-cyan/50"} flex flex-col justify-between`}>
            <div className={`w-2 h-0.5 ${isLight ? "bg-[#00897B]" : "bg-cyan"}`} />
            <div className={`w-1.5 h-0.5 ${isLight ? "bg-[#94A3B8]" : "bg-[#2E3C4E]"}`} />
            <div className={`w-2 h-0.5 ${isLight ? "bg-[#00897B]" : "bg-cyan"}`} />
            <div className={`w-1.5 h-0.5 ${isLight ? "bg-[#94A3B8]" : "bg-[#2E3C4E]"}`} />
            <div className={`w-2 h-0.5 ${isLight ? "bg-[#00897B]" : "bg-cyan"}`} />
          </div>
        </div>

        {/* Bottom Status Notch */}
        <div className="font-mono text-[8px] space-y-0.5 text-right">
          <div className={isLight ? "text-[#00897B] font-bold" : "text-cyan"}>[ SEC.04 ]</div>
          <div className={isLight ? "text-[#768C9E]" : "text-[#4A5D6E]"}>LAT: 28.61°N</div>
        </div>

      </div>

      {/* 6. Subtle Technical Crosshairs Matrix */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-5 p-16 pointer-events-none opacity-15">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className={`flex items-center justify-center font-mono text-xs select-none ${
              isLight ? "text-[#00897B]" : "text-cyan"
            }`}
          >
            +
          </div>
        ))}
      </div>

    </div>
  );
}
