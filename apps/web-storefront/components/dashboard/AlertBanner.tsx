"use client";

import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function AlertBanner({ days, component }: { days: number, component: string }) {
  if (days > 30) return null;
  
  const isCritical = days <= 7;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-4 p-3 rounded-lg flex items-start gap-3 border ${
        isCritical 
          ? 'bg-red-500/10 border-red-500/30 text-red-400' 
          : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
      }`}
    >
      <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
      <div>
        <h4 className="text-sm font-semibold">Predicted Failure</h4>
        <p className="text-xs mt-1 opacity-90">
          {component} failure likely in <span className="font-bold">{days} days</span>. Schedule maintenance.
        </p>
      </div>
    </motion.div>
  );
}
