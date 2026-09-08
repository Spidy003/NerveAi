"use client";

import React, { useState } from "react";

export default function RetroCarVector({
  view = "rear",
  theme = "dark",
  className = "",
}: {
  view?: "rear" | "topdown";
  theme?: "dark" | "light";
  className?: string;
}) {
  const isLight = theme === "light";

  if (view === "topdown") {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 460 210"
          className={`w-full h-auto transition-all ${
            isLight
              ? "drop-shadow-[0_12px_28px_rgba(0,180,160,0.25)]"
              : "drop-shadow-[0_0_20px_rgba(45,225,194,0.6)]"
          }`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer glow aura */}
          <rect
            x="40"
            y="35"
            width="370"
            height="140"
            rx="55"
            fill="#00D9B5"
            opacity="0.08"
          />

          {/* Tires - Left Front & Rear */}
          <rect x="75" y="16" width="60" height="22" rx="6" fill="#04070B" stroke="#00D9B5" strokeWidth="2.5" />
          <line x1="88" y1="20" x2="88" y2="34" stroke="#00D9B5" strokeWidth="2" opacity="0.6" />
          <line x1="105" y1="20" x2="105" y2="34" stroke="#00D9B5" strokeWidth="2" opacity="0.6" />
          <line x1="122" y1="20" x2="122" y2="34" stroke="#00D9B5" strokeWidth="2" opacity="0.6" />

          <rect x="315" y="16" width="60" height="22" rx="6" fill="#04070B" stroke="#00D9B5" strokeWidth="2.5" />
          <line x1="328" y1="20" x2="328" y2="34" stroke="#00D9B5" strokeWidth="2" opacity="0.6" />
          <line x1="345" y1="20" x2="345" y2="34" stroke="#00D9B5" strokeWidth="2" opacity="0.6" />
          <line x1="362" y1="20" x2="362" y2="34" stroke="#00D9B5" strokeWidth="2" opacity="0.6" />

          {/* Tires - Right Front & Rear */}
          <rect x="75" y="172" width="60" height="22" rx="6" fill="#04070B" stroke="#00D9B5" strokeWidth="2.5" />
          <line x1="88" y1="176" x2="88" y2="190" stroke="#00D9B5" strokeWidth="2" opacity="0.6" />
          <line x1="105" y1="176" x2="105" y2="190" stroke="#00D9B5" strokeWidth="2" opacity="0.6" />
          <line x1="122" y1="176" x2="122" y2="190" stroke="#00D9B5" strokeWidth="2" opacity="0.6" />

          <rect x="315" y="172" width="60" height="22" rx="6" fill="#04070B" stroke="#00D9B5" strokeWidth="2.5" />
          <line x1="328" y1="176" x2="328" y2="190" stroke="#00D9B5" strokeWidth="2" opacity="0.6" />
          <line x1="345" y1="176" x2="345" y2="190" stroke="#00D9B5" strokeWidth="2" opacity="0.6" />
          <line x1="362" y1="176" x2="362" y2="190" stroke="#00D9B5" strokeWidth="2" opacity="0.6" />

          {/* Main Car Body Profile */}
          <path
            d="M 55,105 
               C 50,55 90,36 170,36 
               L 330,36 
               C 380,36 410,65 410,105 
               C 410,145 380,174 330,174 
               L 170,174 
               C 90,174 50,155 55,105 Z"
            fill="#00CBB0"
            stroke="#00F7CC"
            strokeWidth="3.5"
          />

          {/* Front Hood Aero Channels */}
          <path d="M 70,75 C 100,75 125,78 145,80" stroke="#007F70" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 70,135 C 100,135 125,132 145,130" stroke="#007F70" strokeWidth="2.5" strokeLinecap="round" />

          {/* Front Headlights (Neon Cyan) */}
          <path d="M 52,65 Q 60,60 70,68" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          <path d="M 52,145 Q 60,150 70,142" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />

          {/* Dark Aerodynamic Greenhouse / Windshield Cabin */}
          <path
            d="M 160,54 
               C 210,54 280,55 315,58 
               C 345,62 355,85 355,105 
               C 355,125 345,148 315,152 
               C 280,155 210,156 160,156 
               C 135,145 130,125 130,105 
               C 130,85 135,65 160,54 Z"
            fill="#091219"
            stroke="#00E6BD"
            strokeWidth="3"
          />

          {/* Windshield Reflection Slant */}
          <path d="M 152,70 L 205,70 L 180,140 L 140,140 Z" fill="#00D9B5" opacity="0.25" />

          {/* Side View Mirrors */}
          <path d="M 175,36 L 165,22 L 182,22 Z" fill="#00D9B5" stroke="#00F7CC" strokeWidth="2" />
          <path d="M 175,174 L 165,188 L 182,188 Z" fill="#00D9B5" stroke="#00F7CC" strokeWidth="2" />

          {/* Rear Spoiler / Tail bar (Red neon edge) */}
          <rect x="396" y="70" width="8" height="70" rx="3" fill="#FF3366" stroke="#FF5D5D" strokeWidth="2" />
          <path d="M 390,52 Q 408,55 408,70" stroke="#FF3366" strokeWidth="3" strokeLinecap="round" />
          <path d="M 390,158 Q 408,155 408,140" stroke="#FF3366" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // REAR VIEW (Screen 1 & Template exact match)
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 380 260"
        className={`w-full h-auto transition-all ${
          isLight
            ? "drop-shadow-[0_15px_30px_rgba(0,180,160,0.25)]"
            : "drop-shadow-[0_0_25px_rgba(45,225,194,0.5)]"
        }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft ground shadow */}
        <ellipse cx="190" cy="245" rx="160" ry="12" fill="#000000" opacity={isLight ? "0.22" : "0.8"} />

        {/* Outer Rear Tires */}
        <rect x="42" y="150" width="38" height="90" rx="10" fill="#05080C" stroke="#00D9B5" strokeWidth="2.5" />
        <line x1="42" y1="170" x2="80" y2="170" stroke="#00D9B5" strokeWidth="1.5" opacity="0.4" />
        <line x1="42" y1="195" x2="80" y2="195" stroke="#00D9B5" strokeWidth="1.5" opacity="0.4" />
        <line x1="42" y1="220" x2="80" y2="220" stroke="#00D9B5" strokeWidth="1.5" opacity="0.4" />

        <rect x="300" y="150" width="38" height="90" rx="10" fill="#05080C" stroke="#00D9B5" strokeWidth="2.5" />
        <line x1="300" y1="170" x2="338" y2="170" stroke="#00D9B5" strokeWidth="1.5" opacity="0.4" />
        <line x1="300" y1="195" x2="338" y2="195" stroke="#00D9B5" strokeWidth="1.5" opacity="0.4" />
        <line x1="300" y1="220" x2="338" y2="220" stroke="#00D9B5" strokeWidth="1.5" opacity="0.4" />

        {/* Lower Bumper & Diffuser */}
        <rect x="65" y="188" width="250" height="48" rx="8" fill="#070D12" stroke="#00D9B5" strokeWidth="3" />
        
        {/* Diffuser vertical aerodynamic fins */}
        <line x1="140" y1="196" x2="140" y2="230" stroke="#00D9B5" strokeWidth="2" opacity="0.6" />
        <line x1="170" y1="196" x2="170" y2="230" stroke="#00D9B5" strokeWidth="2" opacity="0.6" />
        <line x1="210" y1="196" x2="210" y2="230" stroke="#00D9B5" strokeWidth="2" opacity="0.6" />
        <line x1="240" y1="196" x2="240" y2="230" stroke="#00D9B5" strokeWidth="2" opacity="0.6" />

        {/* Dual Chrome Exhaust Tips (Exactly as in reference image) */}
        <ellipse cx="102" cy="216" rx="12" ry="9" fill="#0D161F" stroke="#00E6BD" strokeWidth="2.5" />
        <ellipse cx="128" cy="216" rx="12" ry="9" fill="#0D161F" stroke="#00E6BD" strokeWidth="2.5" />

        {/* Main Rear Body Hull */}
        <path
          d="M 50,185 
             C 48,135 65,115 95,108 
             C 115,75 145,50 190,50 
             C 235,50 265,75 285,108 
             C 315,115 332,135 330,185 
             Z"
          fill="#00CBB0"
          stroke="#00F7CC"
          strokeWidth="3.5"
        />

        {/* Rear Windshield (Dark Glazed) */}
        <path
          d="M 108,102 
             C 125,72 155,58 190,58 
             C 225,58 255,72 272,102 
             C 255,106 125,106 108,102 Z"
          fill="#081018"
          stroke="#00E6BD"
          strokeWidth="2.5"
        />
        {/* Windshield Reflection */}
        <path d="M 125,98 L 175,64 L 195,64 L 140,102 Z" fill="#00D9B5" opacity="0.25" />

        {/* Side Mirrors */}
        <ellipse cx="58" cy="115" rx="14" ry="7" fill="#00CBB0" stroke="#00F7CC" strokeWidth="2" />
        <ellipse cx="322" cy="115" rx="14" ry="7" fill="#00CBB0" stroke="#00F7CC" strokeWidth="2" />

        {/* Trunk Indentation & License Plate Box */}
        <rect x="125" y="142" width="130" height="28" rx="4" fill="#009B87" stroke="#007F70" strokeWidth="2" />

        {/* Rear Glowing Red LED Taillights (Exact curved profile) */}
        <path
          d="M 58,150 
             C 70,148 95,148 115,152 
             C 105,160 75,162 58,158 Z"
          fill="#FF3366"
          stroke="#FF5D5D"
          strokeWidth="2.5"
          className="drop-shadow-[0_0_8px_#FF3366]"
        />
        <path
          d="M 322,150 
             C 310,148 285,148 265,152 
             C 275,160 305,162 322,158 Z"
          fill="#FF3366"
          stroke="#FF5D5D"
          strokeWidth="2.5"
          className="drop-shadow-[0_0_8px_#FF3366]"
        />
      </svg>
    </div>
  );
}
