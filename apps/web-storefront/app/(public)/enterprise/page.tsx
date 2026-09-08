"use client";

import { useState, useEffect } from "react";
import { Server, Database, Code, ArrowRight, ShieldCheck, Zap, Sun, Moon, ArrowLeft, Copy, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function EnterprisePage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [copied, setCopied] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [enterpriseForm, setEnterpriseForm] = useState({
    name: "",
    company: "",
    email: "",
    fleetSize: "50-200",
  });

  useEffect(() => {
    const saved = localStorage.getItem("cyber-theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("cyber-theme", next);
  };

  const isLight = theme === "light";

  const apiJson = `{
  "vehicle_id": "v_8932abc",
  "status": "warning",
  "health_score": 68,
  "predictions": [
    {
      "component": "alternator",
      "probability": 0.92,
      "estimated_failure_days": 12,
      "severity": "high"
    }
  ],
  "telemetry": {
    "voltage": 11.2,
    "rpm_avg": 2400,
    "temp_avg": 98.5
  }
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(apiJson);
    setCopied(true);
    toast.success("Telemetry JSON copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitDemo = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoSubmitted(true);
    toast.success("Enterprise Consultation Scheduled // SLA Assigned");
  };

  return (
    <div
      className={`min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-cyber select-none transition-colors duration-300 relative ${
        isLight ? "bg-[#F4F7FA] text-[#0C121A]" : "bg-[#080B10] text-white"
      }`}
    >
      <div className="absolute inset-0 bg-grid-tech opacity-30 pointer-events-none" />

      {/* Top Breadcrumb & Cyber Controls */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-gray-800/80 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/" className={`text-xl font-black tracking-wider ${isLight ? "text-black" : "text-white"}`}>
            NERVE
            <span className={isLight ? "text-[#00897B]" : "text-[#2DE1C2]"}> AI</span>
          </Link>
          <span className="text-gray-500 font-mono text-sm">//</span>
          <span className="font-mono text-xs text-gray-400 tracking-wider">
            [SYS_ENTERPRISE_EDI_V4]
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <Link
            href="/pricing"
            className="flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-[#2DE1C2] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Pricing Matrix
          </Link>

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border transition-colors flex items-center gap-2 text-xs font-mono ${
              isLight
                ? "bg-white border-gray-300 text-gray-800 hover:bg-gray-100"
                : "bg-navy-card/80 border-cyan/30 text-cyan hover:bg-cyan/10"
            }`}
            title="Toggle theme"
          >
            {isLight ? <Moon className="w-4 h-4 text-amber-500" /> : <Sun className="w-4 h-4 text-cyan" />}
            <span className="hidden sm:inline">{isLight ? "DARK" : "LIGHT"} MODE</span>
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header Banner */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2DE1C2]/10 border border-[#2DE1C2]/30 text-[#2DE1C2] text-xs font-mono font-bold mb-4">
            <Server className="w-3.5 h-3.5" />
            <span>[ MODULE 3: B2B E-COMMERCE &amp; EDI AUTOMATION ]</span>
          </div>
          <h1 className={`text-4xl md:text-6xl font-black tracking-tight mb-4 ${isLight ? "text-black" : "text-white"}`}>
            Fleet Intelligence for Quick-Commerce
          </h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed font-mono">
            Integrate Nerve AI deeply into logistics ERPs with ANSI X12 EDI 850/855 pipelines, high-throughput WebSockets, and LSTM failure webhooks.
          </p>
        </div>

        {/* EDI Integration Flow HUD */}
        <div className={`p-8 border cyber-chamfer-lg shadow-2xl mb-12 ${
          isLight ? "bg-white border-gray-200" : "bg-[#0E1520]/90 border-cyan/30"
        }`}>
          <div className="flex items-center justify-between border-b border-gray-800/80 pb-4 mb-8">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#2DE1C2]" />
              <h2 className={`text-lg font-bold font-mono tracking-wider ${isLight ? "text-gray-900" : "text-white"}`}>
                // ANSI X12 EDI PIPELINE INTEGRATION
              </h2>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#2DE1C2]/10 text-[#2DE1C2] font-bold">
              ZERO-TOUCH PROCUREMENT
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className={`p-6 border rounded-xl relative transition-all ${
              isLight ? "bg-gray-50 border-gray-200" : "bg-[#090D14] border-cyan/30"
            }`}>
              <div className="font-mono text-xs text-[#2DE1C2] font-bold mb-1">// TRANSACTION SET 850</div>
              <div className={`text-lg font-black ${isLight ? "text-black" : "text-white"}`}>Purchase Order</div>
              <p className="text-xs font-mono text-gray-400 mt-2 leading-relaxed">
                Automated hardware requisition dispatched from buyer ERP directly to Nerve distribution depot.
              </p>
            </div>

            <div className={`p-6 border rounded-xl relative transition-all ${
              isLight ? "bg-gray-50 border-gray-200" : "bg-[#090D14] border-blue-500/30"
            }`}>
              <div className="font-mono text-xs text-blue-400 font-bold mb-1">// TRANSACTION SET 855</div>
              <div className={`text-lg font-black ${isLight ? "text-black" : "text-white"}`}>PO Acknowledgment</div>
              <p className="text-xs font-mono text-gray-400 mt-2 leading-relaxed">
                Automated carrier dispatch confirmation with Bluedart AWB consignment tracking number.
              </p>
            </div>

            <div className={`p-6 border rounded-xl relative transition-all ${
              isLight ? "bg-gray-50 border-gray-200" : "bg-[#090D14] border-amber-500/30"
            }`}>
              <div className="font-mono text-xs text-amber-400 font-bold mb-1">// REST / WEBSOCKET</div>
              <div className={`text-lg font-black ${isLight ? "text-black" : "text-white"}`}>Failure Webhook</div>
              <p className="text-xs font-mono text-gray-400 mt-2 leading-relaxed">
                Real-time sub-second push notification to fleet dispatchers when component anomaly trips 85%+ threshold.
              </p>
            </div>
          </div>
        </div>

        {/* REST API Telemetry Inspector */}
        <div className={`border cyber-chamfer-lg shadow-2xl overflow-hidden mb-12 ${
          isLight ? "bg-white border-gray-200" : "bg-[#0A0E17] border-cyan/30"
        }`}>
          <div className="bg-[#101724] border-b border-gray-800 px-6 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-[#2DE1C2]" />
              <span className="text-xs font-mono text-gray-300 font-bold">
                GET /api/v1/vehicles/&#123;vehicle_id&#125;/health
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#2DE1C2]/10 hover:bg-[#2DE1C2]/20 text-[#2DE1C2] text-xs font-mono font-bold transition-colors"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "COPIED" : "COPY PAYLOAD"}</span>
            </button>
          </div>
          <div className="p-6 overflow-x-auto bg-[#06090F]">
            <pre className="text-xs font-mono text-[#2DE1C2] leading-relaxed">
              {apiJson}
            </pre>
          </div>
        </div>

        {/* Enterprise Demo Request HUD */}
        <div className={`p-8 border cyber-chamfer-lg ${
          isLight ? "bg-white border-gray-200 shadow-sm" : "bg-[#0E1520]/90 border-cyan/20 shadow-xl"
        }`}>
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className={`text-2xl font-black mb-2 ${isLight ? "text-black" : "text-white"}`}>
              Schedule Dedicated Fleet Integration
            </h3>
            <p className="text-xs font-mono text-gray-400">
              Our enterprise solution architects configure custom EDI gateways and on-site hardware provisioning for commercial fleets.
            </p>
          </div>

          {demoSubmitted ? (
            <div className="p-8 text-center bg-[#2DE1C2]/10 border border-[#2DE1C2]/30 rounded-2xl">
              <CheckCircle2 className="w-12 h-12 text-[#2DE1C2] mx-auto mb-3" />
              <h4 className="text-lg font-bold text-white mb-1">RFP Received &amp; Ticket Initialized</h4>
              <p className="text-xs font-mono text-gray-300">
                A dedicated technical account manager will initiate contact within 2 operational hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitDemo} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto font-mono text-xs">
              <div>
                <label className="block text-gray-400 mb-1 font-bold">// CONTACT NAME</label>
                <input
                  required
                  type="text"
                  placeholder="Director of Fleet"
                  value={enterpriseForm.name}
                  onChange={(e) => setEnterpriseForm({ ...enterpriseForm, name: e.target.value })}
                  className={`w-full p-3 rounded-lg border outline-none font-sans text-sm ${
                    isLight ? "bg-gray-50 border-gray-300 text-black" : "bg-[#090D14] border-gray-700 text-white"
                  }`}
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-bold">// CORPORATE ENTITY</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Zomato Logistics, Delhivery"
                  value={enterpriseForm.company}
                  onChange={(e) => setEnterpriseForm({ ...enterpriseForm, company: e.target.value })}
                  className={`w-full p-3 rounded-lg border outline-none font-sans text-sm ${
                    isLight ? "bg-gray-50 border-gray-300 text-black" : "bg-[#090D14] border-gray-700 text-white"
                  }`}
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-bold">// WORK EMAIL</label>
                <input
                  required
                  type="email"
                  placeholder="fleet@company.com"
                  value={enterpriseForm.email}
                  onChange={(e) => setEnterpriseForm({ ...enterpriseForm, email: e.target.value })}
                  className={`w-full p-3 rounded-lg border outline-none font-sans text-sm ${
                    isLight ? "bg-gray-50 border-gray-300 text-black" : "bg-[#090D14] border-gray-700 text-white"
                  }`}
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-bold">// FLEET VOLUME</label>
                <select
                  value={enterpriseForm.fleetSize}
                  onChange={(e) => setEnterpriseForm({ ...enterpriseForm, fleetSize: e.target.value })}
                  className={`w-full p-3 rounded-lg border outline-none font-sans text-sm ${
                    isLight ? "bg-gray-50 border-gray-300 text-black" : "bg-[#090D14] border-gray-700 text-white"
                  }`}
                >
                  <option value="20-50">20 - 50 Commercial Vehicles</option>
                  <option value="50-200">50 - 200 Commercial Vehicles</option>
                  <option value="200+">200+ National Fleet</option>
                </select>
              </div>

              <div className="sm:col-span-2 mt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#2DE1C2] hover:bg-[#25c4a8] text-black font-bold font-mono text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_25px_rgba(45,225,194,0.4)] flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Request Custom SLA &amp; Architecture Consultation</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
