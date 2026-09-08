"use client";

import Link from "next/link";
import { Activity } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard")) return null;

  return (
    <footer className="bg-background border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Activity className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg tracking-tight text-white">Nerve AI</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Predictive maintenance for modern fleets. Stop guessing, start knowing.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/store" className="text-sm text-gray-400 hover:text-white">Hardware</Link></li>
              <li><Link href="/pricing" className="text-sm text-gray-400 hover:text-white">Pricing</Link></li>
              <li><Link href="/enterprise" className="text-sm text-gray-400 hover:text-white">Enterprise API</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white">About</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white">Blog</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Nerve AI Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
