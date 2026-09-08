"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface RevenueChartProps {
  data: any[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00C896" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00C896" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val}`} />
          <Tooltip 
            contentStyle={{ backgroundColor: "#1C2128", borderColor: "#374151", borderRadius: "8px" }}
            itemStyle={{ color: "#00C896" }}
          />
          <Area type="monotone" dataKey="revenue" stroke="#00C896" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
