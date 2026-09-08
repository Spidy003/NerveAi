"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  LineChart, 
  Users, 
  CreditCard, 
  BellAlert, 
  PieChart, 
  LogOut 
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Sales", href: "/sales", icon: LineChart },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Subscriptions", href: "/subscriptions", icon: CreditCard },
  { name: "Alerts", href: "/alerts", icon: BellAlert },
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
    <div className="w-60 h-screen fixed left-0 top-0 bg-sidebar border-r border-gray-800 flex flex-col z-20">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-primary">Nerve</span> AI
          <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full ml-1">Admin</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="text-xs text-gray-500 mb-3 px-2 truncate">
          {email}
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
