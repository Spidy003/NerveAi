"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Search } from "lucide-react";

export default function HeroSection() {
  const [selectedCity, setSelectedCity] = useState("Delhi NCR");

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-between pt-24 pb-10 bg-[#07090C] overflow-hidden">
      
      {/* 1. Exact Engineering Grid with + Crosshairs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Fine square grid */}
        <div className="absolute inset-0 bg-grid-tech opacity-40" />

        {/* Regular matrix of glowing + crosshairs (exact like reference) */}
        <div className="absolute inset-0 flex flex-wrap justify-between p-12 opacity-35">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="w-[12%] h-24 flex items-center justify-center font-mono text-cyan text-sm select-none">
              +
            </div>
          ))}
        </div>

        {/* Bottom smooth topographic contour waves */}
        <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none opacity-30">
          <svg className="w-full h-full stroke-cyan fill-none" viewBox="0 0 1440 250">
            <path d="M0,180 C320,240 480,120 720,170 C960,220 1200,140 1440,190" strokeWidth="1.2" />
            <path d="M0,150 C280,210 520,90 720,140 C920,190 1180,110 1440,160" strokeWidth="1" />
            <path d="M0,120 C240,180 560,60 720,110 C880,160 1160,80 1440,130" strokeWidth="0.8" />
            <path d="M0,90 C200,150 600,30 720,80 C840,130 1140,50 1440,100" strokeWidth="0.6" />
          </svg>
        </div>
      </div>

      {/* 2. Top Header / Brand Row */}
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between relative z-20 pt-2">
        <div className="flex items-center gap-3">
          <span className="font-display text-3xl sm:text-4xl font-black italic tracking-tighter text-cyan drop-shadow-[0_0_15px_rgba(45,225,194,0.6)]">
            NERVE AI
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-white/90">
          <Link href="/" className="hover:text-cyan transition-colors">Home</Link>
          <Link href="/store" className="hover:text-cyan transition-colors">Hardware Link</Link>
          <Link href="/pricing" className="hover:text-cyan transition-colors">Fleet Pricing</Link>
          <Link href="/enterprise" className="hover:text-cyan transition-colors">EDI Integration</Link>
          <Link href="/dashboard" className="hover:text-cyan transition-colors">Console</Link>
        </div>

        {/* Top-Right Start Dial + Login */}
        <div className="flex items-center gap-5">
          <Link
            href="/login"
            className="px-5 py-1.5 rounded bg-cyan hover:bg-cyan-glow text-black font-mono font-bold text-xs uppercase tracking-wider transition-all"
          >
            Login
          </Link>
          {/* Circular START NOW Dial */}
          <div className="relative flex flex-col items-center justify-center w-14 h-14 rounded-full border-2 border-cyan/80 bg-[#07090C] shadow-[0_0_20px_rgba(45,225,194,0.4)]">
            <span className="font-mono text-[9px] font-black text-cyan text-center leading-none">
              START<br />NOW
            </span>
          </div>
        </div>
      </div>

      {/* 3. Hero Main Section: Form on Left + Exact Top-Down Turquoise Car on Right */}
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 my-auto py-8">
        
        {/* Left Side: Exact typography & booking form matching the image */}
        <div className="lg:col-span-6 flex flex-col items-start">
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold italic tracking-tight text-white leading-tight mb-8">
            Predict fleet breakdowns and<br />
            <span className="text-white">stream live telemetry now!</span>
          </h1>

          {/* Form Block */}
          <div className="w-full max-w-lg space-y-4">
            <div>
              <label className="text-xs font-bold text-white uppercase block mb-1.5 font-mono">
                NAME
              </label>
              <input
                type="text"
                placeholder="Enter fleet operator or company name"
                defaultValue="Delhi Logistics Express"
                className="w-full bg-[#E8E8E8] text-black font-medium px-4 py-3 rounded outline-none border-none text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-white uppercase block mb-1.5 font-mono">
                EMAIL
              </label>
              <input
                type="email"
                placeholder="Enter corporate email address"
                defaultValue="dispatch@delhiexpress.in"
                className="w-full bg-[#E8E8E8] text-black font-medium px-4 py-3 rounded outline-none border-none text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-white uppercase block mb-1.5 font-mono">
                  BRANCH / CITY
                </label>
                <input
                  type="text"
                  defaultValue="New Delhi Depot"
                  className="w-full bg-[#E8E8E8] text-black font-medium px-4 py-3 rounded outline-none border-none text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-white uppercase block mb-1.5 font-mono">
                  FLEET SIZE
                </label>
                <input
                  type="text"
                  defaultValue="25 Vehicles"
                  className="w-full bg-[#E8E8E8] text-black font-medium px-4 py-3 rounded outline-none border-none text-sm"
                />
              </div>
            </div>

            {/* Cyan Full Width Action Button */}
            <Link
              href="/store"
              className="w-full mt-2 py-3.5 bg-cyan hover:bg-cyan-glow text-black font-bold font-mono uppercase text-xs tracking-widest rounded flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(45,225,194,0.4)]"
            >
              DEPLOY NERVE LINK NOW
            </Link>

            {/* Secondary Direct Support Line */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-white">
                <Phone className="h-4 w-4 text-cyan" />
                <span>Call telemetry desk: <strong>+91 1800 454 356</strong></span>
              </div>
              <div className="flex items-center gap-4 text-cyan">
                <Link href="/store" className="hover:underline">Start now</Link>
                <Link href="/enterprise" className="hover:underline">Enterprise SLA</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Exact Horizontal Top-Down Turquoise Car with "Let's go!" */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
          
          <div className="relative w-full max-w-lg aspect-[16/9] flex items-center justify-center">
            {/* The exact horizontal cyan vehicle */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-cyan/40 shadow-[0_0_40px_rgba(45,225,194,0.3)] bg-[#07090C]">
              <Image
                src="/images/exact_car_topdown.jpg"
                alt="Nerve AI Connected Vehicle Top-Down View"
                fill
                priority
                className="object-contain p-2"
              />
            </div>

            {/* Floating "Let's go!" text exactly like the design */}
            <div className="absolute right-4 bottom-2 font-display text-2xl font-bold text-cyan drop-shadow-[0_0_12px_rgba(45,225,194,0.8)]">
              Let's go!
            </div>
          </div>

          {/* Telemetry live status badge */}
          <div className="mt-4 px-4 py-1.5 rounded-full bg-[#0A0F16] border border-cyan/40 flex items-center gap-3 font-mono text-xs text-cyan">
            <span className="w-2 h-2 rounded-full bg-cyan animate-ping" />
            <span>OBD-II CAN-BUS // TELEMETRY STREAM ONLINE</span>
          </div>

        </div>

      </div>

      {/* 4. Bottom Second Template Slide: Rear View of Car with Driving Classes / Schedule */}
      <div className="max-w-7xl mx-auto px-6 w-full pt-16 border-t border-[#1E2633] mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Rear perspective car on left */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden border border-cyan/30 shadow-glow-cyan bg-[#07090C]">
              <Image
                src="/images/exact_car_rear.jpg"
                alt="Nerve AI Connected Vehicle Rear Perspective"
                fill
                className="object-contain p-2"
              />
            </div>
          </div>

          {/* Schedule Driving/Fleet Audit on right */}
          <div className="lg:col-span-6">
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white mb-6">
              Start your fleet telemetry.<br />
              <span className="text-cyan">Schedule your onboarding now!</span>
            </h2>

            <div className="space-y-3 font-mono text-xs max-w-lg">
              <input
                type="text"
                placeholder="CONTACT PERSON"
                defaultValue="Chief Operations Officer"
                className="w-full bg-[#E8E8E8] text-black font-medium px-4 py-3 rounded outline-none"
              />
              <input
                type="email"
                placeholder="BUSINESS EMAIL"
                defaultValue="operations@delhiexpress.in"
                className="w-full bg-[#E8E8E8] text-black font-medium px-4 py-3 rounded outline-none"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="BRANCH"
                  defaultValue="Gurugram Hub"
                  className="w-full bg-[#E8E8E8] text-black font-medium px-4 py-3 rounded outline-none"
                />
                <input
                  type="text"
                  placeholder="DATE"
                  defaultValue="Immediate"
                  className="w-full bg-[#E8E8E8] text-black font-medium px-4 py-3 rounded outline-none"
                />
              </div>

              <Link
                href="/store"
                className="w-full py-3.5 bg-cyan hover:bg-cyan-glow text-black font-bold font-mono uppercase text-xs tracking-widest rounded flex items-center justify-center gap-2 shadow-glow-cyan-sm transition-all"
              >
                SCHEDULE ONBOARDING NOW
              </Link>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
