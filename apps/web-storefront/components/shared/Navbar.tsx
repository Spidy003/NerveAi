"use client";

import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";
import { Activity, Menu, X, ShoppingCart } from "lucide-react";
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
          ? "bg-[#E6ECF5]/90 backdrop-blur-md shadow-md border-b border-slate-200/60"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl neu-flat flex items-center justify-center text-blue-600 font-black text-base">
                N
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-slate-800 flex items-center gap-1.5">
                  NERVE <span className="text-blue-600 font-bold text-sm tracking-widest">AI</span>
                </span>
                <span className="text-[10px] text-slate-500 font-semibold tracking-wider -mt-1 hidden sm:block">
                  NEURAL FLEET TELEMETRY
                </span>
              </div>
            </Link>

            {/* Live System Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full neu-inset text-[11px] font-bold text-blue-600">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span>LSTM CORE: ONLINE</span>
            </div>
          </div>
          
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/#technology"
              className="text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors tracking-wide"
            >
              Neural Core
            </Link>
            <Link
              href="/store"
              className="text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors tracking-wide"
            >
              Hardware Store
            </Link>
            <Link
              href="/pricing"
              className="text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors tracking-wide"
            >
              Pricing
            </Link>
            <Link
              href="/enterprise"
              className="text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors tracking-wide"
            >
              Enterprise EDI
            </Link>
            
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200/80">
              {/* Shopping Cart */}
              <Link
                href="/cart"
                className="relative p-2.5 neu-btn rounded-full text-slate-600 hover:text-blue-600 transition-all"
                title="Hardware Cart"
              >
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-600 text-[10px] font-bold flex items-center justify-center rounded-full text-white shadow-sm">
                    {cartCount}
                  </span>
                )}
              </Link>

              {user ? (
                <Link
                  href="/dashboard"
                  className="neu-btn-primary text-xs font-bold px-4 py-2.5 rounded-full transition-all"
                >
                  Fleet Console →
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="text-xs font-bold text-slate-600 hover:text-blue-600 px-3 py-2 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/store"
                    className="neu-btn-primary text-xs font-bold px-4 py-2.5 rounded-full transition-all shadow-md shadow-blue-500/20 active:scale-95"
                  >
                    Deploy Link →
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <Link href="/cart" className="relative p-2 neu-btn rounded-full text-blue-600">
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-600 text-[9px] font-bold flex items-center justify-center rounded-full text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-full neu-btn text-slate-700"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X className="h-5 w-5 text-blue-600" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden px-4 pt-4 pb-6 space-y-3 bg-[#E6ECF5] border-b border-slate-200/80 shadow-xl">
          <Link
            href="/#technology"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-700 neu-btn"
          >
            Neural Core
          </Link>
          <Link
            href="/store"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-700 neu-btn"
          >
            Hardware Store
          </Link>
          <Link
            href="/pricing"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-700 neu-btn"
          >
            Pricing Plans
          </Link>
          <Link
            href="/enterprise"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-700 neu-btn"
          >
            Enterprise EDI
          </Link>
          
          <div className="pt-2 border-t border-slate-200/80 space-y-2">
            {user ? (
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block text-center w-full py-3 rounded-full neu-btn-primary font-bold text-xs"
              >
                Access Fleet Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-center w-full py-2.5 rounded-full neu-btn text-slate-700 font-bold text-xs"
                >
                  Sign In
                </Link>
                <Link
                  href="/store"
                  onClick={() => setIsOpen(false)}
                  className="block text-center w-full py-2.5 rounded-full neu-btn-primary font-bold text-xs shadow-md shadow-blue-500/20"
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
