"use client";

import { useState } from "react";
import { SlidersHorizontal, TrendingUp } from "lucide-react";

import { AppFrame } from "@/components/app-frame";
import { ScenarioChart } from "@/components/charts/scenario-chart";
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import { scenarioCases } from "@/lib/data";

const levers = [
  { label: "AI reduces cost-to-serve", value: 62 },
  { label: "Competitor enters with lower pricing", value: 47 },
  { label: "Service attach rate improves", value: 58 },
  { label: "Margin pressure from procurement", value: 33 }
];

export default function ScenarioLabPage() {
  const [selected, setSelected] = useState("Upside case");

  return (
    <main className="pb-12">
      <AppFrame activeSection="Scenario planning">
        <div className="space-y-6">
          <Panel>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-foreground/45">Scenario lab</div>
                <h1 className="mt-2 text-4xl font-semibold">Pressure-test strategic choices before you commit capital.</h1>
              </div>
              <Badge>{selected}</Badge>
            </div>
            <div className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-4">
                {scenarioCases.map((scenario) => (
                  <button
                    key={scenario.name}
                    type="button"
                    onClick={() => setSelected(scenario.name)}
                    className={`w-full rounded-[26px] border p-5 text-left transition ${
                      selected === scenario.name ? "border-accent bg-accent/10" : "border-border/55 bg-background/48 hover:border-accent/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold">{scenario.name}</div>
                      <div className="text-sm text-foreground/45">Risk {scenario.risk}</div>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-foreground/64">{scenario.description}</p>
                    <div className="mt-4 flex gap-4 text-sm text-foreground/55">
                      <span>Growth {scenario.growth}%</span>
                      <span>Margin {scenario.margin}%</span>
                    </div>
                  </button>
                ))}
              </div>
              <Panel className="bg-background/45">
                <div className="flex items-center gap-2 text-sm text-accent">
                  <TrendingUp className="h-4 w-4" />
                  Strategic implications radar
                </div>
                <div className="mt-4">
                  <ScenarioChart />
                </div>
              </Panel>
            </div>
          </Panel>
          <Panel>
            <div className="flex items-center gap-2 text-sm text-accent">
              <SlidersHorizontal className="h-4 w-4" />
              Assumption controls
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {levers.map((lever) => (
                <div key={lever.label} className="rounded-[24px] border border-border/50 bg-background/45 p-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground/72">{lever.label}</span>
                    <span className="text-foreground/45">{lever.value}%</span>
                  </div>
                  <input type="range" defaultValue={lever.value} className="mt-4 w-full accent-[hsl(var(--accent))]" />
                  <p className="mt-3 text-sm leading-6 text-foreground/58">
                    Move the assumption to update growth, margin, complexity, and implementation pressure.
                  </p>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </AppFrame>
    </main>
  );
}
