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
  isLight = true,
}: PricingCardProps) {
  return (
    <div
      className={`neu-flat p-8 rounded-3xl flex flex-col h-full relative transition-all duration-300 select-none ${
        highlighted ? "ring-2 ring-blue-600/50" : ""
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-[10px] font-sans font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-md shadow-blue-500/30 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3" />
          <span>RECOMMENDED // B2B SWEETSPOT</span>
        </div>
      )}

      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold text-slate-800">
          {name}
        </h3>
        <span className="neu-inset px-2.5 py-0.5 rounded-full text-[10px] text-blue-600 font-bold">
          TIER {name === "Starter" ? "01" : name === "Business" ? "02" : "03"}
        </span>
      </div>

      <p className="text-xs text-slate-500 mb-6">{description}</p>

      <div className="mb-6 pb-6 border-b border-slate-200/80">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-slate-800 tracking-tight">
            {price}
          </span>
          {price !== "Custom" && (
            <span className="text-xs text-slate-400">/mo/vehicle</span>
          )}
        </div>
        <div className="text-[11px] font-semibold text-blue-600 mt-1">
          + ₹1,499 one-time hardware link (Rule 46 ITC)
        </div>
      </div>

      <ul className="space-y-3 mb-8 flex-grow text-xs text-slate-600">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="w-4 h-4 rounded-full neu-inset flex items-center justify-center shrink-0 mt-0.5 text-blue-600">
              <Check className="h-2.5 w-2.5" />
            </div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/store"
        className={`w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 cursor-pointer ${
          highlighted
            ? "neu-btn-primary shadow-md shadow-blue-500/30"
            : "neu-btn text-slate-700 hover:text-blue-600"
        }`}
      >
        <Zap className="w-3.5 h-3.5" />
        <span>{ctaText}</span>
      </Link>
    </div>
  );
}
