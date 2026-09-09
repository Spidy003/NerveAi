"use client";

import { Sidebar } from "@/components/admin/Sidebar";
import { format } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import { Home, Calendar, Bell, Settings } from "lucide-react";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeHeaderBtn, setActiveHeaderBtn] = useState<string>("home");

  const getPageTitle = () => {
    switch (pathname) {
      case "/": return "Overview Dashboard";
      case "/uikit": return "Neumorphic UI Kit & Reference Board";
      case "/sales": return "Sales & Revenue";
      case "/customers": return "Customer CRM";
      case "/subscriptions": return "Subscription Management";
      case "/alerts": return "Predictive Alert Engine";
      case "/analytics": return "Website & Fleet Analytics";
      default: return "Dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-[#E6ECF5] text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      <Sidebar />
      <div className="pl-64">
        {/* Neumorphic Header with Reference Image Icons */}
        <header className="h-20 border-b border-[#D2DCE8] bg-[#E6ECF5]/90 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-8 shadow-sm">
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">{getPageTitle()}</h2>
            <div className="text-xs text-slate-500 font-medium">
              {format(new Date(), "EEEE, MMMM do, yyyy")} • Autonomous Fleet Intelligence
            </div>
          </div>

          {/* Quick Action Bar (Mirrors the 4 square icon buttons from reference image) */}
          <div className="flex items-center gap-3">
            {[
              { id: "home", label: "Home", icon: Home, href: "/" },
              { id: "calendar", label: "Calendar", icon: Calendar, href: "/sales" },
              { id: "notification", label: "Notifications", icon: Bell, href: "/alerts" },
              { id: "settings", label: "Settings", icon: Settings, href: "/uikit" },
            ].map((btn) => {
              const Icon = btn.icon;
              const isSelected = activeHeaderBtn === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => {
                    setActiveHeaderBtn(btn.id);
                    router.push(btn.href);
                  }}
                  title={btn.label}
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? "neu-inset text-blue-600 scale-95"
                      : "neu-btn text-slate-500 hover:text-slate-800 hover:scale-105"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </button>
              );
            })}
          </div>
        </header>

        {/* Content Area */}
        <main className="p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
