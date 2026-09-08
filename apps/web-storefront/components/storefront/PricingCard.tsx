import { Check, Zap, Sparkles } from "lucide-react";
import Link from "next/link";

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText?: string;
  isLight?: boolean;
}

export default function PricingCard({
  name,
  price,
  description,
  features,
  highlighted = false,
  ctaText = "Deploy Telemetry Nodes",
  isLight = false,
}: PricingCardProps) {
  return (
    <div
      className={`p-8 border cyber-chamfer-lg flex flex-col h-full relative transition-all duration-300 select-none ${
        highlighted
          ? isLight
            ? "bg-white border-[#00897B] shadow-[0_0_30px_rgba(0,137,123,0.15)] ring-1 ring-[#00897B]/30"
            : "bg-[#0D141F] border-[#2DE1C2] shadow-[0_0_35px_rgba(45,225,194,0.2)] ring-1 ring-[#2DE1C2]/40"
          : isLight
          ? "bg-white border-gray-200 shadow-sm hover:border-[#00897B]/50"
          : "bg-[#0B1018]/90 border-gray-800 hover:border-[#2DE1C2]/50 shadow-lg"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#2DE1C2] text-black text-[10px] font-mono font-black px-3.5 py-1 rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(45,225,194,0.5)] flex items-center gap-1.5">
          <Sparkles className="w-3 h-3" />
          <span>RECOMMENDED // B2B SWEETSPOT</span>
        </div>
      )}

      <div className="flex items-center justify-between mb-2">
        <h3 className={`text-xl font-black font-cyber tracking-wide ${isLight ? "text-gray-900" : "text-white"}`}>
          {name}
        </h3>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#2DE1C2]/10 text-[#2DE1C2] font-bold border border-[#2DE1C2]/20">
          TIER {name === "Starter" ? "01" : name === "Business" ? "02" : "03"}
        </span>
      </div>

      <p className="text-xs font-mono text-gray-400 mb-6">{description}</p>

      <div className="mb-6 pb-6 border-b border-gray-800/60">
        <div className="flex items-baseline gap-1">
          <span className={`text-4xl font-black font-mono tracking-tight ${isLight ? "text-gray-900" : "text-white"}`}>
            {price}
          </span>
          {price !== "Custom" && (
            <span className="text-xs font-mono text-gray-400">/mo/vehicle</span>
          )}
        </div>
        <div className="text-[11px] font-mono text-[#2DE1C2] mt-1">
          + ₹1,499 one-time hardware link (Rule 46 ITC)
        </div>
      </div>

      <ul className="space-y-3.5 mb-8 flex-grow font-mono text-xs">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="w-4 h-4 rounded-full bg-[#2DE1C2]/15 flex items-center justify-center shrink-0 mt-0.5 border border-[#2DE1C2]/30">
              <Check className="h-2.5 w-2.5 text-[#2DE1C2]" />
            </div>
            <span className={isLight ? "text-gray-700" : "text-gray-300"}>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/store"
        className={`w-full py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 ${
          highlighted
            ? "bg-[#2DE1C2] hover:bg-[#25c4a8] text-black shadow-[0_0_20px_rgba(45,225,194,0.4)]"
            : isLight
            ? "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300"
            : "bg-[#141B26] hover:bg-[#1B2433] text-white border border-gray-700 hover:border-[#2DE1C2]"
        }`}
      >
        <Zap className="w-3.5 h-3.5" />
        <span>{ctaText}</span>
      </Link>
    </div>
  );
}
