"use client";

import React, { useState } from "react";
import { X, Copy, Check, Download, FileText, Code2, Layers } from "lucide-react";

export interface OrderRecord {
  id: string;
  customer: string;
  amount: number;
  status: string;
  date: string;
}

interface EDIDocumentModalProps {
  order: OrderRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EDIDocumentModal({
  order,
  isOpen,
  onClose,
}: EDIDocumentModalProps) {
  const [docType, setDocType] = useState<"850" | "855">("850");
  const [copied, setCopied] = useState(false);

  if (!isOpen || !order) return null;

  const dateCompact = order.date.replace(/-/g, "").slice(2);
  const dateFull = order.date.replace(/-/g, "");
  const orderNum = order.id.replace(/[^0-9]/g, "") || "9912";
  const controlNum = orderNum.padStart(9, "0");
  const partnerCode = order.customer.toUpperCase().replace(/\s+/g, "").slice(0, 15);

  // Generate standard ANSI X12 EDI 850 (Purchase Order)
  const edi850 = [
    `ISA*00*          *00*          *ZZ*NERVEAI        *ZZ*${partnerCode.padEnd(15, " ")}*${dateCompact}*1430*U*00401*${controlNum}*0*P*>~`,
    `GS*PO*NERVEAI*${partnerCode}*${dateFull}*1430*${orderNum}*X*004010~`,
    `ST*850*0001~`,
    `BEG*00*SA*${order.id}**${dateFull}~`,
    `CUR*BY*INR~`,
    `REF*DP*DEPOT-DELHI-NCR-01~`,
    `PER*BD*LOGISTICS FLEET DISPATCH*TE*1800454356*EM*dispatch@nerveai.com~`,
    `N1*BY*${order.customer}*92*CUST-${orderNum}~`,
    `N3*Plot 14, Commercial Freight Terminal, NH-48~`,
    `N4*New Delhi*DL*110037*IN~`,
    `N1*SE*Nerve AI Technologies Pvt Ltd*92*NRV01~`,
    `N3*DLF Cyber City, Sector 24~`,
    `N4*Gurugram*HR*122002*IN~`,
    `PO1*1*20*EA*1499.00**VC*NRV-OBD-V2*IN*84715000~`,
    `PID*F****Nerve AI CAN-Bus Telemetry Hardware OBD-II Link~`,
    `PO1*2*20*MO*180.00**VC*NRV-SAAS-BIZ*IN*998313~`,
    `PID*F****Business Tier LSTM Predictive Telemetry Subscription~`,
    `CTT*2*40~`,
    `AMT*TT*${order.amount.toFixed(2)}~`,
    `SE*19*0001~`,
    `GE*1*${orderNum}~`,
    `IEA*1*${controlNum}~`,
  ].join("\n");

  // Generate standard ANSI X12 EDI 855 (PO Acknowledgment)
  const edi855 = [
    `ISA*00*          *00*          *ZZ*${partnerCode.padEnd(15, " ")}*ZZ*NERVEAI        *${dateCompact}*1435*U*00401*${controlNum}*0*P*>~`,
    `GS*PR*${partnerCode}*NERVEAI*${dateFull}*1435*${orderNum}*X*004010~`,
    `ST*855*0001~`,
    `BAK*00*AD*${order.id}*${dateFull}****ACK-${orderNum}~`,
    `CUR*BY*INR~`,
    `N1*ST*${order.customer} Depot Bay 3~`,
    `N3*Central Logistics Warehouse, Sector 18~`,
    `N4*New Delhi*DL*110037*IN~`,
    `PO1*1*20*EA*1499.00**VC*NRV-OBD-V2~`,
    `ACK*IA*20*EA*017*${dateFull}~`,
    `PO1*2*20*MO*180.00**VC*NRV-SAAS-BIZ~`,
    `ACK*IA*20*MO*017*${dateFull}~`,
    `CTT*2~`,
    `SE*13*0001~`,
    `GE*1*${orderNum}~`,
    `IEA*1*${controlNum}~`,
  ].join("\n");

  const currentEDI = docType === "850" ? edi850 : edi855;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentEDI);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentEDI], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${order.id}_EDI_${docType}.edi`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl bg-[#E6ECF5] border border-slate-300 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-300/80 bg-[#E6ECF5]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl neu-inset text-blue-600">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-slate-800">
                  EDI Document Inspector (ANSI X12 Standard)
                </h3>
                <span className="px-2.5 py-0.5 text-[11px] font-mono rounded-full bg-blue-100 text-blue-700 font-bold">
                  Module 3: EDI
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Order ID: {order.id} • Buyer: {order.customer} • Amount: ₹
                {order.amount.toLocaleString()}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full neu-btn flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-300/70 bg-[#E6ECF5]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDocType("850")}
              className={`px-4 py-2 text-xs font-mono font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                docType === "850"
                  ? "neu-btn-primary"
                  : "neu-btn text-slate-600 hover:text-slate-900"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              EDI 850: Purchase Order (Inbound)
            </button>
            <button
              onClick={() => setDocType("855")}
              className={`px-4 py-2 text-xs font-mono font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                docType === "855"
                  ? "neu-btn-primary"
                  : "neu-btn text-slate-600 hover:text-slate-900"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              EDI 855: PO Acknowledgment (Outbound)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono neu-btn text-slate-700 font-semibold cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy ANSI X12
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono neu-btn-primary font-bold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download .EDI
            </button>
          </div>
        </div>

        {/* Document Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="p-4 neu-inset rounded-2xl font-mono text-xs text-slate-800 leading-relaxed overflow-x-auto selection:bg-blue-200">
            {currentEDI.split("\n").map((line, idx) => {
              const seg = line.split("*")[0];
              const isHeader = ["ISA", "GS", "ST"].includes(seg);
              const isTail = ["SE", "GE", "IEA"].includes(seg);
              const isItem = ["PO1", "PID", "ACK"].includes(seg);

              return (
                <div key={idx} className="hover:bg-blue-50/60 px-2 py-0.5 rounded flex items-center">
                  <span className="w-8 text-slate-400 select-none text-[10px]">
                    {(idx + 1).toString().padStart(2, "0")}
                  </span>
                  <span
                    className={`font-bold mr-2 ${
                      isHeader
                        ? "text-blue-600"
                        : isTail
                        ? "text-amber-600"
                        : isItem
                        ? "text-emerald-600"
                        : "text-indigo-600"
                    }`}
                  >
                    {seg}
                  </span>
                  <span className="text-slate-700">
                    {line.slice(seg.length)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Academic Segment Decoder (Direct Viva Assistant) */}
          <div className="neu-flat rounded-2xl p-4 text-xs font-mono">
            <h4 className="font-bold text-blue-600 mb-2 flex items-center gap-2">
              <span>// SYLLABUS DECODER (ANSI X12 EDI SEGMENTS)</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] text-slate-600">
              <div className="neu-inset p-3 rounded-xl">
                <span className="text-blue-600 font-bold block">ISA / GS / ST:</span>
                Interchange Envelope, Functional Group &amp; Transaction Set Header
              </div>
              <div className="neu-inset p-3 rounded-xl">
                <span className="text-emerald-600 font-bold block">PO1 / PID / ACK:</span>
                Line item purchase (OBD-II hardware &amp; recurring SaaS telemetry)
              </div>
              <div className="neu-inset p-3 rounded-xl">
                <span className="text-amber-600 font-bold block">CTT / SE / IEA:</span>
                Transaction hash summary, segment count validation &amp; trailer
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-300/80 bg-[#E6ECF5] flex items-center justify-between text-xs font-mono text-slate-500">
          <span>Standard: ANSI ASC X12 Release 004010</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 neu-btn text-slate-700 hover:text-slate-900 rounded-xl font-bold transition-all cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
