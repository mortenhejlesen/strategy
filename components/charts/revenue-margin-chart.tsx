"use client";

import {
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar
} from "recharts";

import { revenueMarginTrend } from "@/lib/data";

export function RevenueMarginChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={revenueMarginTrend}>
          <CartesianGrid stroke="rgba(148,163,184,0.18)" vertical={false} />
          <XAxis dataKey="year" stroke="rgba(148,163,184,0.6)" tickLine={false} axisLine={false} />
          <YAxis yAxisId="left" stroke="rgba(148,163,184,0.6)" tickLine={false} axisLine={false} />
          <YAxis yAxisId="right" orientation="right" stroke="rgba(148,163,184,0.6)" tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: 16,
              border: "1px solid rgba(148,163,184,0.2)",
              background: "rgba(15,23,42,0.9)"
            }}
          />
          <Bar yAxisId="left" dataKey="revenue" fill="rgba(101,163,255,0.65)" radius={[8, 8, 0, 0]} />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="margin"
            stroke="rgba(94,234,212,1)"
            strokeWidth={3}
            dot={{ r: 4, fill: "rgba(94,234,212,1)" }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
