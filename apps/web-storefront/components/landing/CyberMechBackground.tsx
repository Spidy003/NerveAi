"use client";

import React from "react";

export default function CyberMechBackground({
  theme = "light",
}: {
  theme?: "dark" | "light";
}) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#E6ECF5]">
      {/* 1. Top-Left Soft White Sun/Light Source (Neumorphism Principle: Light from top-left) */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-white/70 blur-3xl" />
      
      {/* 2. Bottom-Right Soft Slate Shadow Ambient Source */}
      <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full bg-[#C5D0E0]/60 blur-3xl" />

      {/* 3. Subtle Center Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-blue-100/30 blur-3xl" />

      {/* 4. Fine Tactile Grid Matrix */}
      <svg
        className="absolute inset-0 w-full h-full opacity-25"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        <defs>
          <pattern id="neu-dots" width="36" height="36" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#94A3B8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#neu-dots)" />
      </svg>
    </div>
  );
}
