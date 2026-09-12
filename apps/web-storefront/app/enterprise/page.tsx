"use client";

import { useState } from "react";
import { Server, Zap, ArrowLeft, Copy, CheckCircle2, ShieldCheck, Code, Building2, Mail, Users, FileText } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import Footer from "@/components/shared/Footer";

export default function EnterprisePage() {
  const [copied, setCopied] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [enterpriseForm, setEnterpriseForm] = useState({
    name: "",
    company: "",
    email: "",
    fleetSize: "50-200",
  });

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
    toast.success("Enterprise Consultation Scheduled • SLA Assigned");
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans bg-[#E6ECF5] text-slate-800 select-none relative">
      
      {/* Top Header & Breadcrumb */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 neu-flat px-6 py-4 rounded-full">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-lg font-black tracking-tight text-slate-800 flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl neu-flat flex items-center justify-center text-blue-600 font-extrabold text-sm">
              N
            </div>
            <span>NERVE <span className="text-blue-600">AI</span></span>
          </Link>
          <span className="text-slate-300">•</span>
          <span className="text-xs font-semibold text-slate-500">Enterprise EDI &amp; API Integration</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/pricing"
            className="neu-btn px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Pricing Matrix
          </Link>
          <Link
            href="/dashboard"
            className="neu-btn-primary px-5 py-2 rounded-full text-xs font-bold tracking-wide"
          >
            Fleet Console
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header Banner */}
        <div className="text-center space-y-3">
          <div className="neu-inset px-4 py-1.5 rounded-full text-xs font-bold text-blue-600 inline-flex items-center gap-2">
            <Server className="w-3.5 h-3.5" />
            <span>B2B E-COMMERCE &amp; EDI AUTOMATION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-800">
            Fleet Intelligence for Enterprise Logistics
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Integrate Nerve AI directly into ERPs with ANSI X12 EDI 850/855 pipelines, high-throughput WebSockets, and LSTM failure webhooks.
          </p>
        </div>

        {/* EDI Integration Flow HUD */}
        <div className="neu-flat p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm sm:text-base font-bold text-slate-800 uppercase tracking-wide">
                ANSI X12 EDI Pipeline Integration
              </h2>
            </div>
            <span className="neu-inset px-3 py-1 rounded-full text-[10px] text-blue-600 font-bold">
              ZERO-TOUCH PROCUREMENT
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="neu-inset p-6 rounded-2xl space-y-2">
              <div className="text-xs text-blue-600 font-bold uppercase tracking-wider">
                Transaction Set 850
              </div>
              <div className="text-base font-bold text-slate-800">Purchase Order</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Automated hardware requisition dispatched from buyer ERP directly to Nerve distribution depot.
              </p>
            </div>

            <div className="neu-inset p-6 rounded-2xl space-y-2">
              <div className="text-xs text-blue-600 font-bold uppercase tracking-wider">
                Transaction Set 855
              </div>
              <div className="text-base font-bold text-slate-800">PO Acknowledgment</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Automated carrier dispatch confirmation with Bluedart AWB consignment tracking number.
              </p>
            </div>

            <div className="neu-inset p-6 rounded-2xl space-y-2">
              <div className="text-xs text-blue-600 font-bold uppercase tracking-wider">
                REST / WebSocket
              </div>
              <div className="text-base font-bold text-slate-800">Failure Webhook</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Real-time sub-second push notification to fleet dispatchers when component anomaly trips 85%+ threshold.
              </p>
            </div>
          </div>
        </div>

        {/* REST API Telemetry Inspector */}
        <div className="neu-flat rounded-3xl overflow-hidden p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-mono font-bold text-slate-700">
                GET /api/v1/vehicles/&#123;vehicle_id&#125;/health
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="neu-btn px-4 py-2 rounded-full text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy Payload"}</span>
            </button>
          </div>

          <div className="neu-inset p-5 rounded-2xl bg-slate-900 overflow-x-auto">
            <pre className="text-xs font-mono text-cyan-300 leading-relaxed">
              {apiJson}
            </pre>
          </div>
        </div>

        {/* Enterprise Demo Request Form */}
        <div className="neu-flat p-6 sm:p-10 rounded-3xl space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl font-bold text-slate-800">
              Schedule Dedicated Fleet Integration
            </h3>
            <p className="text-xs text-slate-500">
              Our enterprise solution architects configure custom EDI gateways and on-site hardware provisioning for commercial fleets.
            </p>
          </div>

          {demoSubmitted ? (
            <div className="neu-inset p-8 text-center rounded-2xl space-y-3">
              <CheckCircle2 className="w-12 h-12 text-blue-600 mx-auto" />
              <h4 className="text-lg font-bold text-slate-800">RFP Received &amp; Ticket Initialized</h4>
              <p className="text-xs text-slate-500">
                A dedicated technical account manager will initiate contact within 2 operational hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitDemo} className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto text-xs">
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold uppercase tracking-wider">
                  Contact Name
                </label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    placeholder="Director of Fleet"
                    value={enterpriseForm.name}
                    onChange={(e) => setEnterpriseForm({ ...enterpriseForm, name: e.target.value })}
                    className="w-full neu-inset text-slate-800 placeholder-slate-400 p-3 rounded-xl outline-none font-sans text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1.5 font-bold uppercase tracking-wider">
                  Corporate Entity
                </label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    placeholder="e.g. Zomato Logistics, Delhivery"
                    value={enterpriseForm.company}
                    onChange={(e) => setEnterpriseForm({ ...enterpriseForm, company: e.target.value })}
                    className="w-full neu-inset text-slate-800 placeholder-slate-400 p-3 rounded-xl outline-none font-sans text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1.5 font-bold uppercase tracking-wider">
                  Work Email
                </label>
                <div className="relative">
                  <input
                    required
                    type="email"
                    placeholder="fleet@company.com"
                    value={enterpriseForm.email}
                    onChange={(e) => setEnterpriseForm({ ...enterpriseForm, email: e.target.value })}
                    className="w-full neu-inset text-slate-800 placeholder-slate-400 p-3 rounded-xl outline-none font-sans text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1.5 font-bold uppercase tracking-wider">
                  Fleet Volume
                </label>
                <select
                  value={enterpriseForm.fleetSize}
                  onChange={(e) => setEnterpriseForm({ ...enterpriseForm, fleetSize: e.target.value })}
                  className="w-full neu-inset text-slate-800 p-3 rounded-xl outline-none font-sans text-xs cursor-pointer"
                >
                  <option value="20-50">20 - 50 Commercial Vehicles</option>
                  <option value="50-200">50 - 200 Commercial Vehicles</option>
                  <option value="200+">200+ National Fleet</option>
                </select>
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-4 neu-btn-primary rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/20 active:scale-95"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Request Custom SLA &amp; Architecture Consultation</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>

      <Footer />
    </div>
  );
}
