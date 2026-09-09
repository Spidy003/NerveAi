"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface RevenueChartProps {
  data: any[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#2563EB" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            stroke="#94A3B8" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="#94A3B8" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(val) => `₹${val}`} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#E6ECF5", 
              borderColor: "#CBD5E1", 
              borderRadius: "16px",
              boxShadow: "6px 6px 14px #C5D0E0, -6px -6px 14px #FFFFFF",
              color: "#1E293B",
              fontWeight: 600,
              fontSize: "12px",
            }}
            itemStyle={{ color: "#2563EB" }}
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#2563EB" 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorRev)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
