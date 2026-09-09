"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  LineChart, 
  Users, 
  CreditCard, 
  Bell, 
  PieChart, 
  Layers,
  LogOut 
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "UI Kit / Neumorphic", href: "/uikit", icon: Layers, highlight: true },
  { name: "Sales", href: "/sales", icon: LineChart },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Subscriptions", href: "/subscriptions", icon: CreditCard },
  { name: "Alerts", href: "/alerts", icon: Bell },
  { name: "Analytics", href: "/analytics", icon: PieChart },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setEmail(user.email ?? "");
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-[#E6ECF5] border-r border-[#D2DCE8] flex flex-col z-20 shadow-[4px_0_15px_rgba(197,208,224,0.5)]">
      {/* Brand Header */}
      <div className="p-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 neu-flat rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
            <span className="font-extrabold text-lg">N</span>
          </div>
          <div>
            <h1 className="text-lg font-black text-slate-800 tracking-tight leading-none">
              Nerve <span className="text-blue-600">AI</span>
            </h1>
            <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-100/70 px-2 py-0.5 rounded-full">
              Neumorphic Suite
            </span>
          </div>
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-4 space-y-2.5 mt-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                isActive
                  ? "neu-inset text-blue-600 shadow-inner"
                  : "neu-btn text-slate-600 hover:text-slate-900"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-slate-500"}`} />
              <span className="flex-1">{item.name}</span>
              {item.highlight && !isActive && (
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="p-4 border-t border-[#D2DCE8] space-y-3">
        <div className="neu-inset px-3 py-2 rounded-xl text-xs text-slate-500 truncate flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          <span className="truncate font-medium">{email || "admin@nerveai.local"}</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-xs font-bold text-rose-600 neu-btn hover:text-rose-700 rounded-xl transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
