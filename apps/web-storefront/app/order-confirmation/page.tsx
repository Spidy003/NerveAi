"use client";

import { useEffect, useState } from "react";
import { Check, Calendar as CalendarIcon, Clock, ArrowRight, Printer, FileText, Download, ShieldCheck, X, ArrowLeft, Star, Send, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Footer from "@/components/shared/Footer";

export default function OrderConfirmationPage() {
  const [step, setStep] = useState(1);
  const [ediStatus, setEdiStatus] = useState("Generating ANSI X12 EDI 850 (Purchase Order)...");
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [orderNumber] = useState(() => `NRV-${Math.floor(100000 + Math.random() * 900000)}`);
  const [orderDate] = useState(() => new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }));

  // Feedback state
  const [rating, setRating] = useState(5);
  const [feedbackCategory, setFeedbackCategory] = useState("checkout-speed");
  const [feedbackComment, setFeedbackComment] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    // Grant customer access to telemetry dashboard upon payment confirmation
    document.cookie = "nerve_demo_session=active; path=/; max-age=86400; SameSite=Lax";
    
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
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans bg-[#E6ECF5] text-slate-800 select-none relative">
      
      {/* Top Header & Breadcrumb */}
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 neu-flat px-6 py-4 rounded-full">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-lg font-black tracking-tight text-slate-800 flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl neu-flat flex items-center justify-center text-blue-600 font-extrabold text-sm">
              N
            </div>
            <span>NERVE <span className="text-blue-600">AI</span></span>
          </Link>
          <span className="text-slate-300">•</span>
          <span className="text-xs font-semibold text-slate-500">Order Confirmed &amp; Dispatched</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="neu-btn-primary px-5 py-2 rounded-full text-xs font-bold tracking-wide flex items-center gap-1.5"
          >
            <span>Launch Fleet Console</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Success Header Card */}
        <div className="neu-flat p-8 sm:p-10 rounded-3xl text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 neu-flat rounded-full flex items-center justify-center mx-auto mb-2 text-blue-600"
          >
            <Check className="w-10 h-10" />
          </motion.div>

          <div className="neu-inset px-4 py-1 rounded-full text-xs font-bold text-blue-600 inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>PAYMENT VERIFIED VIA RAZORPAY • B2B TRANSACTION SET</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            Order Confirmed!
          </h1>
          
          <p className="text-xs text-slate-500 font-medium">
            Order ID: <strong className="text-slate-800">{orderNumber}</strong> • Date: <strong className="text-slate-800">{orderDate}</strong>
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => setShowInvoiceModal(true)}
              className="neu-btn px-5 py-2.5 rounded-full text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>View &amp; Print GST Tax Invoice (Module 4 &amp; 6)</span>
            </button>
          </div>
        </div>

        {/* Enterprise EDI 850/855 Simulation Card */}
        <div className="neu-flat p-6 sm:p-8 rounded-3xl space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span className="text-blue-600 uppercase tracking-wider">
              Module 3: Electronic Data Interchange (EDI)
            </span>
            <span>{step === 1 ? "PHASE 1/2" : "PHASE 2/2"}</span>
          </div>

          <div className="w-full h-3 neu-inset rounded-full overflow-hidden p-0.5">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: step === 1 ? "50%" : "100%" }}
              transition={{ duration: 1.5 }}
              className="h-full bg-blue-600 rounded-full"
            />
          </div>

          <div className="flex items-center gap-3 pt-1">
            <div className="w-3 h-3 rounded-full bg-blue-600 animate-pulse shrink-0" />
            <span className="text-xs font-bold text-slate-700">{ediStatus}</span>
          </div>
        </div>

        {/* Installation Booking */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="neu-flat p-6 sm:p-8 rounded-3xl space-y-6"
          >
            <div>
              <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
                Schedule Depot Installation
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Certified Nerve AI technicians arrive at your commercial depot with pre-provisioned OBD-II links. Installation takes ~10 mins per vehicle.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-blue-600" /> SELECT INSTALLATION DATE
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
                    const d = new Date();
                    d.setDate(d.getDate() + i);
                    return (
                      <button
                        key={i}
                        className="neu-btn p-2.5 rounded-2xl text-center transition-all hover:text-blue-600 active:neu-inset cursor-pointer"
                      >
                        <div className="text-[10px] text-slate-400 font-medium">
                          {d.toLocaleDateString("en-US", { weekday: "short" })}
                        </div>
                        <div className="font-bold text-sm text-slate-800">
                          {d.getDate()}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" /> SELECT TIME SLOT
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"].map((time) => (
                    <button
                      key={time}
                      className="neu-btn p-3 rounded-2xl text-xs font-bold text-slate-700 hover:text-blue-600 transition-all active:neu-inset cursor-pointer"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => setShowInvoiceModal(true)}
                className="w-full sm:w-auto neu-btn px-6 py-3.5 rounded-full text-xs font-bold text-slate-700 hover:text-blue-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-blue-600" />
                <span>Print GST Invoice</span>
              </button>

              <Link
                href="/dashboard"
                className="w-full sm:w-auto neu-btn-primary px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/30"
              >
                <span>Confirm Slot &amp; Launch Console</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}

        {/* Customer & Fleet Feedback System Section */}
        <div className="neu-flat p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-blue-600" />
              <span className="text-xs uppercase font-bold text-slate-800">
                Customer &amp; Fleet Operator Feedback
              </span>
            </div>
            <span className="neu-inset px-2.5 py-0.5 rounded-full text-[10px] text-blue-600 font-bold">
              Quality Assurance
            </span>
          </div>

          {feedbackSubmitted ? (
            <div className="neu-inset p-6 text-center rounded-2xl space-y-2">
              <ThumbsUp className="w-8 h-8 text-blue-600 mx-auto" />
              <h4 className="text-base font-bold text-slate-800">
                Thank You for Your Feedback!
              </h4>
              <p className="text-xs text-slate-500">
                Your rating and suggestions have been transmitted directly to our Fleet Reliability Engineering team.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 mb-2 font-bold">
                  Rate your checkout &amp; procurement experience:
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setRating(s)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                        rating >= s
                          ? "neu-btn-primary shadow-sm"
                          : "neu-btn text-slate-400"
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-blue-600 ml-2">
                    {rating === 5 ? "5/5 (Outstanding)" : `${rating}/5 Stars`}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-600 font-bold">Feedback Category:</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: "checkout-speed", label: "Checkout & EDI Speed" },
                    { id: "hardware-specs", label: "OBD Hardware Clarity" },
                    { id: "pricing-roi", label: "Pricing & ROI Simulator" },
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setFeedbackCategory(cat.id)}
                      className={`p-2.5 rounded-2xl text-[11px] font-bold transition-all text-center cursor-pointer ${
                        feedbackCategory === cat.id
                          ? "neu-inset text-blue-600"
                          : "neu-btn text-slate-600"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-600 font-bold">Comments or Feature Suggestions:</label>
                <div className="neu-inset rounded-2xl p-3">
                  <textarea
                    rows={2}
                    placeholder="Share feedback on telemetry clarity, payment flow, or EDI document layout..."
                    value={feedbackComment}
                    onChange={(e) => setFeedbackComment(e.target.value)}
                    className="bg-transparent text-xs text-slate-800 w-full focus:outline-none resize-none font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto neu-btn-primary px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/20 active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Feedback to Depot Operations</span>
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Printable GST B2B Tax Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 print:p-0 print:bg-white print:static">
          <div className="relative w-full max-w-4xl bg-[#E6ECF5] neu-flat rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:border-none print:shadow-none print:bg-white print:text-black">
            
            {/* Modal Control Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 bg-[#E6ECF5] print:hidden">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800 text-sm">B2B GST Tax Invoice</span>
                <span className="neu-inset px-2.5 py-0.5 rounded-full text-blue-600 text-xs font-bold">
                  Rule 46 CGST Compliant
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrint}
                  className="neu-btn-primary flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  Print / Save PDF
                </button>
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="neu-btn p-2 rounded-full text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Invoice Printable Body */}
            <div className="p-8 sm:p-12 overflow-y-auto print:overflow-visible print:p-8 text-xs text-slate-700 bg-white print:bg-white space-y-6">
              {/* Invoice Header */}
              <div className="flex justify-between items-start border-b border-slate-200 pb-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
                    NERVE AI TECHNOLOGIES PVT LTD
                  </h2>
                  <p className="text-slate-500">Cyber Automotive IoT &amp; Predictive Telemetry Hub</p>
                  <p className="text-slate-500">DLF Cyber City, Sector 24, Gurugram, Haryana 122002</p>
                  <p className="mt-2 text-blue-600 font-bold">GSTIN: 07AABCN1234F1Z8 • PAN: AABCN1234F</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-slate-900">TAX INVOICE</div>
                  <div className="text-slate-500 font-bold mt-1">Invoice #: {orderNumber}</div>
                  <div className="text-slate-500">Date: {orderDate}</div>
                  <div className="text-slate-500">State Code: 07 (Delhi NCR)</div>
                </div>
              </div>

              {/* Billed To / Shipped To */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 border-b border-slate-200 pb-6">
                <div>
                  <div className="text-slate-400 font-bold uppercase mb-1">BILLED TO (BUYER):</div>
                  <div className="font-bold text-slate-900 text-sm">Delhi Logistics Express Fleet Ltd</div>
                  <div className="text-slate-500">Plot 14, Commercial Freight Terminal, NH-48</div>
                  <div className="text-slate-500">New Delhi, DL 110037 • India</div>
                  <div className="text-slate-700 mt-1">Buyer GSTIN: 07AAECD9876K1ZQ</div>
                </div>
                <div>
                  <div className="text-slate-400 font-bold uppercase mb-1">DISPATCH DEPOT:</div>
                  <div className="font-bold text-slate-900 text-sm">Nerve Central Logistics Depot</div>
                  <div className="text-slate-500">Consignment Dispatch via Bluedart Surface Express</div>
                  <div className="text-slate-500">AWB Number: 77894102914</div>
                  <div className="text-slate-700 mt-1">Payment: Razorpay Confirmed (INR)</div>
                </div>
              </div>

              {/* Line Items Table */}
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="py-2.5 font-bold">#</th>
                    <th className="py-2.5 font-bold">Item Description</th>
                    <th className="py-2.5 font-bold">HSN / SAC</th>
                    <th className="py-2.5 font-bold text-center">Qty</th>
                    <th className="py-2.5 font-bold text-right">Unit Rate (₹)</th>
                    <th className="py-2.5 font-bold text-right">Taxable Amt (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3">1</td>
                    <td className="py-3">
                      <div className="font-bold text-slate-900">Nerve AI OBD-II Telemetry Link Hardware</div>
                      <div className="text-slate-400 text-[10px]">CAN-Bus Real-Time Sensor Ingestion Device</div>
                    </td>
                    <td className="py-3 font-mono">8471.50.00</td>
                    <td className="py-3 text-center">{hardwareQty}</td>
                    <td className="py-3 text-right">₹{hardwareRate.toLocaleString()}</td>
                    <td className="py-3 text-right font-bold text-slate-900">₹{hardwareTotal.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-3">2</td>
                    <td className="py-3">
                      <div className="font-bold text-slate-900">Business Predictive Maintenance SaaS Subscription</div>
                      <div className="text-slate-400 text-[10px]">LSTM RUL Telemetry License (Month 1 Pre-paid)</div>
                    </td>
                    <td className="py-3 font-mono">9983.13</td>
                    <td className="py-3 text-center">{hardwareQty}</td>
                    <td className="py-3 text-right">₹{saasRate.toLocaleString()}</td>
                    <td className="py-3 text-right font-bold text-slate-900">₹{saasTotal.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>

              {/* Totals & Tax Breakdown */}
              <div className="border-t border-slate-200 pt-4 flex justify-end">
                <div className="w-72 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Taxable Value:</span>
                    <span className="font-bold text-slate-900">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">CGST @ 9.0%:</span>
                    <span>₹{cgst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">SGST @ 9.0%:</span>
                    <span>₹{sgst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-bold text-blue-600">
                    <span>Invoice Total (INR):</span>
                    <span>₹{grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Sign-off */}
              <div className="border-t border-slate-200 pt-6 flex justify-between items-end text-[10px] text-slate-400">
                <div>
                  <p>Declaration: This is a computer-generated tax invoice for B2B electronic commerce.</p>
                  <p>EDI Protocol: ANSI X12 850/855 Order Fulfillment Completed.</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">For Nerve AI Technologies Pvt Ltd</p>
                  <p className="mt-4">Authorized Signatory</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
