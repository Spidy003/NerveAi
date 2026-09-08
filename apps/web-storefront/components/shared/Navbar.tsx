"use client";

import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";
import { Activity, Menu, X, ShoppingCart, ShieldAlert, Cpu } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/hooks/useCart";

export default function Navbar() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/dashboard")) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#07090C]/85 backdrop-blur-xl border-b border-[#1E2633] shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo with Nerve Signal Beacon */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#0F141C] border border-cyan/40 shadow-glow-cyan-sm group-hover:border-cyan transition-colors">
                <Activity className="h-5 w-5 text-cyan animate-pulse" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan shadow-[0_0_8px_#2DE1C2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl tracking-tight text-white flex items-center gap-1.5">
                  NERVE <span className="text-cyan text-sm tracking-widest font-mono">AI</span>
                </span>
                <span className="text-[10px] text-[#8A96A3] font-mono tracking-wider -mt-1 hidden sm:block">
                  NEURAL FLEET TELEMETRY
                </span>
              </div>
            </Link>

            {/* Live System Pill */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0B0F14] border border-[#1E2633] text-[11px] font-mono text-cyan">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-ping" />
              <span>LSTM CORE: ONLINE</span>
            </div>
          </div>
          
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/#technology"
              className="text-sm font-medium text-[#C7D0D9] hover:text-cyan transition-colors tracking-wide"
            >
              Neural Core
            </Link>
            <Link
              href="/store"
              className="text-sm font-medium text-[#C7D0D9] hover:text-cyan transition-colors tracking-wide"
            >
              OBD Hardware
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-[#C7D0D9] hover:text-cyan transition-colors tracking-wide"
            >
              Pricing
            </Link>
            <Link
              href="/enterprise"
              className="text-sm font-medium text-[#C7D0D9] hover:text-cyan transition-colors tracking-wide"
            >
              Enterprise EDI
            </Link>
            
            <div className="flex items-center gap-4 pl-4 border-l border-[#1E2633]">
              {/* Shopping Cart */}
              <Link
                href="/cart"
                className="relative p-2.5 text-[#C7D0D9] hover:text-cyan hover:bg-[#0F141C] rounded-lg transition-all"
                title="Hardware Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-cyan text-[11px] font-mono font-bold flex items-center justify-center rounded-full text-black shadow-glow-cyan-sm">
                    {cartCount}
                  </span>
                )}
              </Link>

              {user ? (
                <Link
                  href="/dashboard"
                  className="text-xs font-mono font-bold uppercase tracking-wider text-black bg-cyan hover:bg-cyan-glow px-4 py-2.5 rounded-lg shadow-glow-cyan-sm transition-all"
                >
                  Fleet Console →
                </Link>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/login"
                    className="text-sm font-medium text-[#C7D0D9] hover:text-white px-3 py-2 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/store"
                    className="relative inline-flex items-center justify-center p-[1px] overflow-hidden rounded-lg font-mono text-xs font-bold uppercase tracking-wider text-white group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan to-violet group-hover:from-cyan-glow group-hover:to-violet-glow" />
                    <span className="relative px-4 py-2 transition-all ease-out bg-[#0B0F14] rounded-[7px] group-hover:bg-opacity-0">
                      Deploy Link →
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <Link href="/cart" className="relative p-2 text-cyan">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute 0 right-0 h-4 w-4 bg-cyan text-[10px] font-bold flex items-center justify-center rounded-full text-black">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-[#0F141C] border border-[#1E2633] text-[#C7D0D9]"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X className="h-6 w-6 text-cyan" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden px-4 pt-4 pb-6 space-y-3 bg-[#07090C] border-b border-[#1E2633] shadow-2xl animate-in slide-in-from-top duration-200">
          <Link
            href="/#technology"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#C7D0D9] hover:bg-[#0F141C] hover:text-cyan font-mono"
          >
            // 01 Neural Core
          </Link>
          <Link
            href="/store"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#C7D0D9] hover:bg-[#0F141C] hover:text-cyan font-mono"
          >
            // 02 OBD Hardware
          </Link>
          <Link
            href="/pricing"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#C7D0D9] hover:bg-[#0F141C] hover:text-cyan font-mono"
          >
            // 03 Pricing Plans
          </Link>
          <Link
            href="/enterprise"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#C7D0D9] hover:bg-[#0F141C] hover:text-cyan font-mono"
          >
            // 04 Enterprise EDI
          </Link>
          
          <div className="pt-4 border-t border-[#1E2633] space-y-2">
            {user ? (
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block text-center w-full py-3 rounded-lg bg-cyan text-black font-mono font-bold uppercase tracking-wider"
              >
                Access Fleet Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-center w-full py-2.5 rounded-lg bg-[#0F141C] border border-[#1E2633] text-white font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/store"
                  onClick={() => setIsOpen(false)}
                  className="block text-center w-full py-2.5 rounded-lg bg-cyan text-black font-mono font-bold uppercase tracking-wider shadow-glow-cyan-sm"
                >
                  Deploy Nerve Link
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

