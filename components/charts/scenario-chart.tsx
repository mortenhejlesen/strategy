"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer
} from "recharts";

export function ScenarioChart() {
  const chartData = [
    { metric: "Growth", base: 78, upside: 96, disruption: 32 },
    { metric: "Margin", base: 74, upside: 88, disruption: 45 },
    { metric: "Resilience", base: 69, upside: 84, disruption: 38 },
    { metric: "Differentiation", base: 71, upside: 91, disruption: 34 },
    { metric: "Execution load", base: 62, upside: 81, disruption: 70 }
  ];

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData}>
          <PolarGrid stroke="rgba(148,163,184,0.2)" />
          <PolarAngleAxis dataKey="metric" tick={{ fill: "rgba(148,163,184,0.8)", fontSize: 12 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar dataKey="base" stroke="rgba(101,163,255,1)" fill="rgba(101,163,255,0.2)" />
          <Radar dataKey="upside" stroke="rgba(94,234,212,1)" fill="rgba(94,234,212,0.2)" />
          <Radar dataKey="disruption" stroke="rgba(251,113,133,1)" fill="rgba(251,113,133,0.14)" />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
