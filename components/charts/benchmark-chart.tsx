"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { benchmarkData } from "@/lib/data";

export function BenchmarkChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={benchmarkData} layout="vertical" margin={{ left: 10 }}>
          <CartesianGrid stroke="rgba(148,163,184,0.15)" horizontal={false} />
          <XAxis type="number" stroke="rgba(148,163,184,0.55)" tickLine={false} axisLine={false} />
          <YAxis type="category" dataKey="name" stroke="rgba(148,163,184,0.55)" tickLine={false} axisLine={false} width={84} />
          <Tooltip
            contentStyle={{
              borderRadius: 16,
              border: "1px solid rgba(148,163,184,0.2)",
              background: "rgba(15,23,42,0.92)"
            }}
          />
          <Bar dataKey="digital" fill="rgba(246,189,96,0.8)" radius={[0, 12, 12, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
