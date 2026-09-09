import { LucideIcon } from "lucide-react";
import { clsx } from "clsx";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: number;
  changeLabel?: string;
  trend?: "up" | "down" | "neutral";
}

export function KPICard({ title, value, icon: Icon, change, changeLabel, trend = "neutral" }: KPICardProps) {
  return (
    <div className="neu-flat rounded-3xl p-6 flex flex-col justify-between transition-all hover:scale-[1.01]">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{title}</span>
          <div className="text-2xl font-black text-slate-800 mt-2">{value}</div>
        </div>

        <div className="w-12 h-12 neu-inset rounded-2xl flex items-center justify-center text-blue-600">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      
      {change !== undefined && (
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-200/60">
          <span className={clsx(
            "text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5",
            trend === "up" ? "text-emerald-700 bg-emerald-100/80" : 
            trend === "down" ? "text-rose-700 bg-rose-100/80" : "text-slate-600 bg-slate-100"
          )}>
            <span>{trend === "up" ? "▲" : trend === "down" ? "▼" : "•"}</span>
            {trend === "up" ? "+" : ""}{change}%
          </span>
          {changeLabel && <span className="text-xs text-slate-400 font-medium">{changeLabel}</span>}
        </div>
      )}
    </div>
  );
}
