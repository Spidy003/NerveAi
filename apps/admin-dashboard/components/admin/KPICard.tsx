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
    <div className={clsx(
      "bg-card rounded-xl p-6 border-l-4 border-gray-800 shadow-sm flex flex-col justify-between",
      trend === "up" && "border-l-primary",
      trend === "down" && "border-l-red-500",
      trend === "neutral" && "border-l-gray-600"
    )}>
      <div className="flex justify-between items-start">
        <h3 className="text-gray-400 font-medium text-sm">{title}</h3>
        <div className="p-2 bg-gray-800/50 rounded-lg">
          <Icon className="w-5 h-5 text-gray-300" />
        </div>
      </div>
      
      <div className="mt-4">
        <div className="text-2xl font-bold text-white">{value}</div>
        {change !== undefined && (
          <div className="flex items-center gap-2 mt-1">
            <span className={clsx(
              "text-xs font-semibold",
              trend === "up" ? "text-primary" : trend === "down" ? "text-red-500" : "text-gray-400"
            )}>
              {trend === "up" ? "+" : ""}{change}%
            </span>
            {changeLabel && <span className="text-xs text-gray-500">{changeLabel}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
