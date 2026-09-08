"use client";

import { useEffect, useState } from "react";
import { Check, Calendar as CalendarIcon, Clock, ArrowRight, Printer, FileText, Download, ShieldCheck, X, Sun, Moon, ArrowLeft, Star, Send, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function OrderConfirmationPage() {
  const [step, setStep] = useState(1);
  const [ediStatus, setEdiStatus] = useState("Generating ANSI X12 EDI 850 (Purchase Order)...");
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [orderNumber] = useState(() => `NRV-${Math.floor(100000 + Math.random() * 900000)}`);
  const [orderDate] = useState(() => new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }));
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Feedback state
  const [rating, setRating] = useState(5);
  const [feedbackCategory, setFeedbackCategory] = useState("checkout-speed");
  const [feedbackComment, setFeedbackComment] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

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

  useEffect(() => {
    const t1 = setTimeout(() => setEdiStatus("Transmitting to Depot ERP // Awaiting EDI 855 Acknowledgment..."), 1600);
    const t2 = setTimeout(() => {
      setEdiStatus("✓ EDI 855 Ack Received // OBD Hardware Dispatched via Bluedart");
      setStep(2);
    }, 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
    toast.success("Feedback Logged in Fleet Telemetry DB");
  };

  // Sample fleet invoice parameters
  const hardwareQty = 20;
  const hardwareRate = 1499;
  const saasRate = 180;
  const hardwareTotal = hardwareQty * hardwareRate;
  const saasTotal = hardwareQty * saasRate;
  const subtotal = hardwareTotal + saasTotal;
  const cgst = subtotal * 0.09;
  const sgst = subtotal * 0.09;
  const grandTotal = subtotal + cgst + sgst;

  return (
    <div
      className={`min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-cyber select-none transition-colors duration-300 relative ${
        isLight ? "bg-[#F4F7FA] text-[#0C121A]" : "bg-[#080B10] text-white"
      }`}
    >
      <div className="absolute inset-0 bg-grid-tech opacity-30 pointer-events-none" />

      {/* Top Breadcrumb & Cyber Controls */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-gray-800/80 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/" className={`text-xl font-black tracking-wider ${isLight ? "text-black" : "text-white"}`}>
            NERVE
            <span className={isLight ? "text-[#00897B]" : "text-[#2DE1C2]"}> AI</span>
          </Link>
          <span className="text-gray-500 font-mono text-sm">//</span>
          <span className="font-mono text-xs text-gray-400 tracking-wider">
            [SYS_DISPATCH_CONFIRMED]
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-[#2DE1C2] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Fleet Console
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

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-[#2DE1C2]/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#2DE1C2]/40 shadow-[0_0_30px_rgba(45,225,194,0.3)]"
          >
            <Check className="w-10 h-10 text-[#2DE1C2]" />
          </motion.div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2DE1C2]/10 text-[#2DE1C2] text-xs font-mono font-bold mb-3 border border-[#2DE1C2]/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>PAYMENT VERIFIED VIA RAZORPAY • B2B TRANSACTION SET</span>
          </div>
          <h1 className={`text-3xl sm:text-4xl font-black mb-2 ${isLight ? "text-black" : "text-white"}`}>
            Order Confirmed!
          </h1>
          <p className="text-gray-400 font-mono text-sm">Order ID: {orderNumber} • Date: {orderDate}</p>

          {/* Quick Invoice Action Button */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => setShowInvoiceModal(true)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all border ${
                isLight
                  ? "bg-white border-gray-300 hover:border-[#00897B] text-gray-900 shadow-sm"
                  : "bg-gray-800 hover:bg-gray-700 text-white border-gray-700 hover:border-[#2DE1C2]"
              }`}
            >
              <FileText className="w-4 h-4 text-[#2DE1C2]" />
              <span>View &amp; Print GST Tax Invoice (Module 4 &amp; 6)</span>
            </button>
          </div>
        </div>

        {/* Enterprise EDI 850/855 Simulation Card */}
        <div className={`p-6 mb-8 border cyber-chamfer-lg shadow-lg relative overflow-hidden ${
          isLight ? "bg-white border-gray-200" : "bg-[#0E1520]/90 border-cyan/20"
        }`}>
          <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-3">
            <span className="text-[#2DE1C2] font-bold">// MODULE 3: ELECTRONIC DATA INTERCHANGE (EDI)</span>
            <span>{step === 1 ? "PHASE 1/2" : "PHASE 2/2"}</span>
          </div>
          <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mb-4">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: step === 1 ? "50%" : "100%" }}
              transition={{ duration: 1.5 }}
              className="h-full bg-[#2DE1C2]"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-[#2DE1C2] animate-ping shadow-[0_0_12px_#2DE1C2]" />
            <span className={`font-mono text-sm ${isLight ? "text-gray-800" : "text-gray-200"}`}>{ediStatus}</span>
          </div>
        </div>

        {/* Installation Booking */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-8 border cyber-chamfer-lg mb-8 ${
              isLight ? "bg-white border-gray-200 shadow-sm" : "bg-[#0E1520]/90 border-cyan/20 shadow-xl"
            }`}
          >
            <h2 className={`text-xl font-black mb-2 ${isLight ? "text-black" : "text-white"}`}>
              Schedule Depot Installation
            </h2>
            <p className="text-gray-400 mb-8 text-xs font-mono leading-relaxed">
              Certified Nerve AI technicians arrive at your commercial depot with pre-provisioned OBD-II links. Installation takes ~10 mins per vehicle.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-mono font-bold text-gray-400 mb-4 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-[#2DE1C2]" /> SELECT INSTALLATION DATE
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
                    const d = new Date();
                    d.setDate(d.getDate() + i);
                    return (
                      <button
                        key={i}
                        className={`p-3 border rounded-lg text-center transition-colors focus:border-[#2DE1C2] ${
                          isLight
                            ? "border-gray-200 hover:border-[#00897B] bg-gray-50 focus:bg-[#00897B]/10"
                            : "border-gray-700 hover:border-[#2DE1C2] bg-[#090D14] focus:bg-[#2DE1C2]/10"
                        }`}
                      >
                        <div className="text-[10px] text-gray-400 font-mono">
                          {d.toLocaleDateString("en-US", { weekday: "short" })}
                        </div>
                        <div className={`font-bold text-sm ${isLight ? "text-black" : "text-white"}`}>
                          {d.getDate()}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-gray-400 mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#2DE1C2]" /> SELECT TIME SLOT
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"].map((time) => (
                    <button
                      key={time}
                      className={`p-3 border rounded-lg text-xs font-mono text-center transition-colors focus:border-[#2DE1C2] ${
                        isLight
                          ? "border-gray-200 hover:border-[#00897B] text-black bg-gray-50 focus:bg-[#00897B]/10"
                          : "border-gray-700 hover:border-[#2DE1C2] text-white bg-[#090D14] focus:bg-[#2DE1C2]/10"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => setShowInvoiceModal(true)}
                className={`w-full sm:w-auto px-6 py-4 rounded-xl border font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  isLight
                    ? "border-gray-300 hover:border-[#00897B] text-gray-800 bg-gray-100"
                    : "border-gray-700 hover:border-[#2DE1C2] text-white bg-[#131A26]"
                }`}
              >
                <Printer className="w-4 h-4 text-[#2DE1C2]" />
                <span>Print GST Invoice</span>
              </button>

              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 bg-[#2DE1C2] hover:bg-[#25c4a8] text-black font-bold font-mono text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(45,225,194,0.4)]"
              >
                <span>Confirm Slot &amp; Launch Console</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}

        {/* Customer & Fleet Feedback System Section */}
        <div className={`p-6 sm:p-8 border cyber-chamfer-lg shadow-xl mb-12 ${
          isLight ? "bg-white border-gray-200" : "bg-[#0E1520]/90 border-cyan/20"
        }`}>
          <div className="flex items-center justify-between border-b border-gray-800/80 pb-3 mb-6">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#2DE1C2]" />
              <span className="font-mono text-xs uppercase tracking-wider text-[#2DE1C2] font-bold">
                // CUSTOMER &amp; FLEET OPERATOR FEEDBACK
              </span>
            </div>
            <span className="text-[10px] font-mono text-gray-400">QUALITY ASSURANCE</span>
          </div>

          {feedbackSubmitted ? (
            <div className="p-6 text-center bg-[#2DE1C2]/10 border border-[#2DE1C2]/30 rounded-xl">
              <ThumbsUp className="w-10 h-10 text-[#2DE1C2] mx-auto mb-2" />
              <h4 className={`text-base font-bold mb-1 ${isLight ? "text-gray-900" : "text-white"}`}>
                Thank You for Your Feedback!
              </h4>
              <p className="text-xs font-mono text-gray-400">
                Your rating and suggestions have been transmitted directly to our Fleet Reliability Engineering team.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-gray-400 mb-2 font-bold">
                  // RATE YOUR CHECKOUT &amp; PROCUREMENT EXPERIENCE:
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setRating(s)}
                      className={`p-2 rounded-lg border transition-all ${
                        rating >= s
                          ? "bg-[#2DE1C2]/20 border-[#2DE1C2] text-[#2DE1C2]"
                          : isLight
                          ? "bg-gray-100 border-gray-300 text-gray-400"
                          : "bg-gray-900 border-gray-800 text-gray-600"
                      }`}
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-[#2DE1C2] ml-2">
                    {rating === 5 ? "5/5 (Outstanding)" : `${rating}/5 Stars`}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1.5 font-bold">// FEEDBACK CATEGORY:</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: "checkout-speed", label: "Checkout & EDI Speed" },
                    { id: "hardware-specs", label: "OBD Hardware Clarity" },
                    { id: "pricing-roi", label: "Syllabus Pricing / ROI" },
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setFeedbackCategory(cat.id)}
                      className={`p-2.5 rounded-lg border text-[11px] font-mono transition-all text-center ${
                        feedbackCategory === cat.id
                          ? "bg-[#2DE1C2]/15 border-[#2DE1C2] text-[#2DE1C2] font-bold"
                          : isLight
                          ? "bg-gray-50 border-gray-300 text-gray-600"
                          : "bg-[#090D14] border-gray-800 text-gray-400"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1.5 font-bold">// COMMENTS OR FEATURE SUGGESTIONS (OPTIONAL):</label>
                <textarea
                  rows={2}
                  placeholder="Share feedback on telemetry clarity, payment flow, or EDI document layout..."
                  value={feedbackComment}
                  onChange={(e) => setFeedbackComment(e.target.value)}
                  className={`w-full p-3 rounded-lg border outline-none font-sans text-xs ${
                    isLight
                      ? "bg-gray-50 border-gray-300 text-black focus:border-[#00897B]"
                      : "bg-[#090D14] border-gray-700 text-white focus:border-[#2DE1C2]"
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-[#2DE1C2] hover:bg-[#25c4a8] text-black font-bold font-mono text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(45,225,194,0.3)] flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Feedback to Depot Operations</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Printable GST B2B Tax Invoice Modal (Module 4 & 6) */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 print:p-0 print:bg-white print:static">
          <div className="relative w-full max-w-4xl bg-[#0D1117] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:border-none print:shadow-none print:bg-white print:text-black">
            {/* Modal Control Bar (Hidden when printing) */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#161B22] print:hidden">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">B2B GST Tax Invoice</span>
                <span className="px-2 py-0.5 rounded bg-[#2DE1C2]/20 text-[#2DE1C2] text-xs font-mono font-bold">
                  Compliant Tax Invoice // Rule 46 CGST
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2DE1C2] text-black font-mono text-xs font-bold hover:bg-[#25c4a8] transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  Print / Save PDF
                </button>
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Invoice Printable Body */}
            <div className="p-8 sm:p-12 overflow-y-auto print:overflow-visible print:p-8 font-mono text-xs text-gray-300 print:text-black bg-[#0B0E14] print:bg-white space-y-6">
              {/* Invoice Header */}
              <div className="flex justify-between items-start border-b border-gray-800 print:border-gray-300 pb-6">
                <div>
                  <h2 className="text-2xl font-black text-white print:text-black tracking-tight mb-1">
                    NERVE AI TECHNOLOGIES PVT LTD
                  </h2>
                  <p className="text-gray-400 print:text-gray-600">Cyber Automotive IoT &amp; Predictive Telemetry Hub</p>
                  <p className="text-gray-400 print:text-gray-600">DLF Cyber City, Sector 24, Gurugram, Haryana 122002</p>
                  <p className="mt-2 text-[#2DE1C2] print:text-black font-bold">GSTIN: 07AABCN1234F1Z8 • PAN: AABCN1234F</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-white print:text-black">TAX INVOICE</div>
                  <div className="text-gray-400 print:text-gray-600 font-bold mt-1">Invoice #: {orderNumber}</div>
                  <div className="text-gray-400 print:text-gray-600">Date: {orderDate}</div>
                  <div className="text-gray-400 print:text-gray-600">State Code: 07 (Delhi NCR)</div>
                </div>
              </div>

              {/* Billed To / Shipped To */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 border-b border-gray-800 print:border-gray-300 pb-6">
                <div>
                  <div className="text-gray-500 print:text-gray-600 font-bold uppercase mb-1">BILLED TO (BUYER):</div>
                  <div className="font-bold text-white print:text-black text-sm">Delhi Logistics Express Fleet Ltd</div>
                  <div className="text-gray-400 print:text-gray-600">Plot 14, Commercial Freight Terminal, NH-48</div>
                  <div className="text-gray-400 print:text-gray-600">New Delhi, DL 110037 • India</div>
                  <div className="text-gray-300 print:text-black mt-1">Buyer GSTIN: 07AAECD9876K1ZQ</div>
                </div>
                <div>
                  <div className="text-gray-500 print:text-gray-600 font-bold uppercase mb-1">DISPATCH DEPOT:</div>
                  <div className="font-bold text-white print:text-black text-sm">Nerve Central Logistics Depot</div>
                  <div className="text-gray-400 print:text-gray-600">Consignment Dispatch via Bluedart Surface Express</div>
                  <div className="text-gray-400 print:text-gray-600">AWB Number: 77894102914</div>
                  <div className="text-gray-300 print:text-black mt-1">Payment: Razorpay Confirmed (INR)</div>
                </div>
              </div>

              {/* Line Items Table */}
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-800 print:border-gray-300 text-gray-400 print:text-gray-700">
                    <th className="py-2.5 font-bold">#</th>
                    <th className="py-2.5 font-bold">Item Description</th>
                    <th className="py-2.5 font-bold">HSN / SAC</th>
                    <th className="py-2.5 font-bold text-center">Qty</th>
                    <th className="py-2.5 font-bold text-right">Unit Rate (₹)</th>
                    <th className="py-2.5 font-bold text-right">Taxable Amt (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 print:divide-gray-200">
                  <tr>
                    <td className="py-3">1</td>
                    <td className="py-3">
                      <div className="font-bold text-white print:text-black">Nerve AI OBD-II Telemetry Link Hardware</div>
                      <div className="text-gray-500 print:text-gray-600 text-[10px]">CAN-Bus Real-Time Sensor Ingestion Device</div>
                    </td>
                    <td className="py-3 font-mono">8471.50.00</td>
                    <td className="py-3 text-center">{hardwareQty}</td>
                    <td className="py-3 text-right">₹{hardwareRate.toLocaleString()}</td>
                    <td className="py-3 text-right font-bold">₹{hardwareTotal.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-3">2</td>
                    <td className="py-3">
                      <div className="font-bold text-white print:text-black">Business Predictive Maintenance SaaS Subscription</div>
                      <div className="text-gray-500 print:text-gray-600 text-[10px]">LSTM RUL Telemetry License (Month 1 Pre-paid)</div>
                    </td>
                    <td className="py-3 font-mono">9983.13</td>
                    <td className="py-3 text-center">{hardwareQty}</td>
                    <td className="py-3 text-right">₹{saasRate.toLocaleString()}</td>
                    <td className="py-3 text-right font-bold">₹{saasTotal.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>

              {/* Totals & Tax Breakdown */}
              <div className="border-t border-gray-800 print:border-gray-300 pt-4 flex justify-end">
                <div className="w-72 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400 print:text-gray-600">Total Taxable Value:</span>
                    <span className="font-bold text-white print:text-black">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-400 print:text-gray-600">CGST @ 9.0%:</span>
                    <span>₹{cgst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-400 print:text-gray-600">SGST @ 9.0%:</span>
                    <span>₹{sgst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-800 print:border-gray-300 pt-2 text-sm font-bold text-[#2DE1C2] print:text-black">
                    <span>Invoice Total (INR):</span>
                    <span>₹{grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Sign-off for Viva */}
              <div className="border-t border-gray-800 print:border-gray-300 pt-6 flex justify-between items-end text-[10px] text-gray-500 print:text-gray-600">
                <div>
                  <p>Declaration: This is a computer-generated tax invoice for B2B electronic commerce.</p>
                  <p>EDI Protocol: ANSI X12 850/855 Order Fulfillment Completed.</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white print:text-black">For Nerve AI Technologies Pvt Ltd</p>
                  <p className="mt-4">Authorized Signatory</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
