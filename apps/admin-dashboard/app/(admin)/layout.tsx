"use client";

import { Sidebar } from "@/components/admin/Sidebar";
import { format } from "date-fns";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    switch (pathname) {
      case "/": return "Overview Dashboard";
      case "/sales": return "Sales & Revenue";
      case "/customers": return "Customer CRM";
      case "/subscriptions": return "Subscription Management";
      case "/alerts": return "Alert Engine Log";
      case "/analytics": return "Website Analytics";
      default: return "Dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-60">
        <header className="h-16 border-b border-gray-800 bg-background/95 backdrop-blur z-10 sticky top-0 flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold text-white">{getPageTitle()}</h2>
          <div className="text-sm text-gray-400">
            {format(new Date(), "EEEE, MMMM do, yyyy")}
          </div>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
