"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Activity, 
  Twitter, 
  Linkedin, 
  Github, 
  Youtube, 
  Instagram, 
  Send, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  Lock,
  ArrowRight
} from "lucide-react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

export default function Footer() {
  const pathname = usePathname();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Keep clean dashboard views without bottom e-commerce footer
  if (pathname.startsWith("/dashboard")) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    toast.success("Subscribed to Nerve AI Fleet Briefing!");
    setNewsletterEmail("");
  };

  const socialLinks = [
    { name: "Twitter / X", handle: "@nerve_ai", href: "https://twitter.com/nerve_ai", icon: Twitter },
    { name: "LinkedIn", handle: "/company/nerve-ai", href: "https://linkedin.com/company/nerve-ai", icon: Linkedin },
    { name: "GitHub", handle: "/nerve-ai", href: "https://github.com/nerve-ai", icon: Github },
    { name: "YouTube", handle: "@nerve-ai", href: "https://youtube.com/@nerve-ai", icon: Youtube },
    { name: "Instagram", handle: "@nerve_ai", href: "https://instagram.com/nerve_ai", icon: Instagram },
  ];

  return (
    <footer className="w-full bg-[#E6ECF5] border-t border-slate-200/80 pt-16 pb-12 text-slate-700 font-sans relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Newsletter & Dispatch Banner */}
        <div className="neu-flat p-8 sm:p-10 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <div className="neu-inset px-3.5 py-1 rounded-full text-[11px] font-bold text-blue-600 inline-flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>NERVE AI TELEMETRY DISPATCH</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
              Stay ahead of fleet breakdowns &amp; hardware upgrades
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Get monthly engineering debriefs on CAN-bus edge AI, predictive failure algorithms, and depot hardware inventory.
            </p>
          </div>

          <div className="w-full lg:w-auto min-w-[320px] max-w-md">
            {subscribed ? (
              <div className="neu-inset p-4 rounded-2xl flex items-center gap-2 text-blue-600 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Thank you! Your email is enrolled in weekly fleet dispatches.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch gap-2.5">
                <input
                  type="email"
                  required
                  placeholder="fleet.director@logistics.in"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="neu-inset px-4 py-3 rounded-full text-xs text-slate-800 placeholder-slate-400 outline-none flex-grow"
                />
                <button
                  type="submit"
                  className="neu-btn-primary px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-md shadow-blue-500/25 active:scale-95"
                >
                  <span>Join</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main 4-Column Navigation & Social Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Social Channels (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3 group inline-block">
              <div className="w-10 h-10 rounded-2xl neu-flat flex items-center justify-center text-blue-600 font-black text-base">
                N
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-slate-800 flex items-center gap-1.5">
                  NERVE <span className="text-blue-600 font-black">AI</span>
                </span>
                <span className="text-[10px] text-slate-500 font-semibold tracking-wider -mt-1">
                  COMMERCIAL FLEET TELEMETRY PLATFORM
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
              Nerve AI pairs high-frequency CAN-bus sensor telemetry with LSTM neural networks to forecast critical mechanical failures up to 14 days in advance.
            </p>

            {/* Social Media Links with Nerve-AI Handles */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Official Nerve AI Channels
              </div>
              <div className="flex items-center gap-2.5 flex-wrap">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Nerve AI on ${social.name} (${social.handle})`}
                      className="neu-btn p-3 rounded-full text-slate-600 hover:text-blue-600 transition-all hover:scale-105 active:scale-95 group relative"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="sr-only">Nerve AI on {social.name}</span>
                    </a>
                  );
                })}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                Follow <strong className="text-slate-700 font-bold">@nerve-ai</strong> for engineering benchmarks &amp; telemetry updates.
              </div>
            </div>
          </div>

          {/* Col 2: Hardware Store */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 tracking-wider uppercase">
              Hardware Store
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/store" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1">
                  <span>OBD-II CAN-Bus Link</span>
                </Link>
              </li>
              <li>
                <Link href="/store" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Commercial Fleet Kit (20x)
                </Link>
              </li>
              <li>
                <Link href="/store" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Enterprise Depot Gateway
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Shopping Cart &amp; Requisition
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Express Checkout
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Solutions & Intelligence */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 tracking-wider uppercase">
              Intelligence &amp; Plans
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/pricing" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Pricing Matrix &amp; Tiers
                </Link>
              </li>
              <li>
                <Link href="/enterprise" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Enterprise ANSI EDI 850
                </Link>
              </li>
              <li>
                <Link href="/#calculator" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Fleet ROI Calculator
                </Link>
              </li>
              <li>
                <Link href="/#technology" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Neural Core LSTM Specs
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Live Fleet Console HUD
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Operations & Support */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 tracking-wider uppercase">
              Support &amp; Trust
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/feedback" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Fleet Feedback &amp; NPS
                </Link>
              </li>
              <li>
                <Link href="/order-confirmation" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Track Order &amp; Invoice
                </Link>
              </li>
              <li>
                <Link href="/enterprise" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Custom SLA &amp; RFPs
                </Link>
              </li>
              <li>
                <span className="text-slate-500 block">
                  Support: <strong className="text-slate-700">support@nerveai.io</strong>
                </span>
              </li>
              <li>
                <span className="text-slate-500 block">
                  Procurement: <strong className="text-slate-700">orders@nerveai.io</strong>
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* E-Commerce Trust Badges & Payment Logistics Strip */}
        <div className="neu-inset p-5 sm:p-6 rounded-2xl flex flex-wrap items-center justify-between gap-6 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
            <span className="font-semibold text-slate-700">
              ISO 27001 Certified • SOC 2 Type II Telemetry Vault
            </span>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
              <CreditCard className="w-4 h-4 text-blue-600" />
              <span>Razorpay Verified Gateway</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
              <Truck className="w-4 h-4 text-blue-600" />
              <span>Bluedart Surface Express Logistics</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
              <Lock className="w-4 h-4 text-blue-600" />
              <span>Rule 46 CGST Tax Invoicing</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} <strong>Nerve AI Technologies Inc.</strong> (nerve-ai). All rights reserved.
          </div>

          <div className="flex items-center gap-5 text-xs">
            <Link href="/feedback" className="hover:text-blue-600 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/feedback" className="hover:text-blue-600 transition-colors">
              Terms of Telemetry
            </Link>
            <span>•</span>
            <Link href="/enterprise" className="hover:text-blue-600 transition-colors">
              Enterprise EDI SLA
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
