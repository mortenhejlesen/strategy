"use client";

import { useState } from "react";
import { Building2, Globe2, Layers3, ShieldEllipsis, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";

const modes = ["Board mode", "PE mode", "Transformation mode"];
const depths = [
  {
    name: "Light",
    time: "2-4 minutes",
    description: "Executive scan with snapshot, risks, opportunities, and a 5-slide storyline."
  },
  {
    name: "Medium",
    time: "6-10 minutes",
    description: "Consulting-style diagnostic with industry structure, benchmarking, SWOT, and recommendations."
  },
  {
    name: "Heavy",
    time: "12-18 minutes",
    description: "Full workup with 3C, Five Forces, capability heatmap, scenarios, roadmap, and board pack."
  }
];

export default function SetupPage() {
  const [depth, setDepth] = useState("Heavy");
  const [mode, setMode] = useState("Board mode");

  return (
    <main className="px-6 py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Start a new engagement"
          title="Frame the mandate like a top-tier strategy team would."
          description="Define the company, strategic question, and analysis mode. Clariy will generate workstreams, issue trees, evidence logic, and a board-grade workspace."
        />
        <div className="mt-12 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <Panel className="p-8">
            <div className="grid gap-5 md:grid-cols-2">
              {[
                ["Company", "Aurelis Industrial Systems", Building2],
                ["Geography", "Europe and North America", Globe2],
                ["Industry", "Industrial technology", Layers3],
                ["Strategic horizon", "3 years", ShieldEllipsis]
              ].map(([label, value, Icon]) => (
                <label key={label} className="block">
                  <div className="mb-2 text-sm font-medium text-foreground/70">{label}</div>
                  <div className="flex items-center gap-3 rounded-[24px] border border-border/60 bg-background/55 px-4 py-4">
                    <Icon className="h-4 w-4 text-accent" />
                    <input defaultValue={value} className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/30" />
                  </div>
                </label>
              ))}
            </div>
            <label className="mt-5 block">
              <div className="mb-2 text-sm font-medium text-foreground/70">Strategic thesis or key question</div>
              <textarea
                defaultValue="How should Aurelis accelerate profitable growth while defending premium positioning against AI-native competitors?"
                className="min-h-36 w-full rounded-[28px] border border-border/60 bg-background/55 px-4 py-4 text-sm leading-7 text-foreground outline-none"
              />
            </label>
            <div className="mt-8">
              <div className="text-sm font-medium text-foreground/70">Analysis depth</div>
              <div className="mt-3 grid gap-4 md:grid-cols-3">
                {depths.map((option) => (
                  <button
                    key={option.name}
                    type="button"
                    onClick={() => setDepth(option.name)}
                    className={`rounded-[26px] border p-5 text-left transition ${
                      depth === option.name ? "border-accent bg-accent/10 shadow-soft" : "border-border/60 bg-card/60 hover:border-accent/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold">{option.name}</div>
                      <Badge>{option.time}</Badge>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-foreground/62">{option.description}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <div className="text-sm font-medium text-foreground/70">Decision lens</div>
              <div className="mt-3 flex flex-wrap gap-3">
                {modes.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setMode(item)}
                    className={`rounded-full border px-4 py-3 text-sm transition ${
                      mode === item ? "border-foreground bg-foreground text-background" : "border-border/60 bg-card/60 text-foreground/72 hover:text-foreground"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/workspace" withArrow>
                Start analysis
              </Button>
              <Button href="/executive-summary" variant="secondary">
                Preview generated storyline
              </Button>
            </div>
          </Panel>
          <div className="space-y-6">
            <Panel>
              <div className="flex items-center gap-2 text-sm text-accent">
                <Sparkles className="h-4 w-4" />
                Auto-generated workstreams
              </div>
              <div className="mt-6 space-y-4">
                {[
                  "Market attractiveness and structural profit pools",
                  "Competitive position and benchmark economics",
                  "Customer economics, segment priorities, and pricing logic",
                  "Operating model and AI-enabled value creation",
                  "Strategic choices, risk register, and implementation sequencing"
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-border/50 bg-background/45 px-4 py-4 text-sm text-foreground/68">
                    {item}
                  </div>
                ))}
              </div>
            </Panel>
            <Panel>
              <div className="text-xs uppercase tracking-[0.24em] text-foreground/45">What heavy depth unlocks</div>
              <div className="mt-4 space-y-4">
                {[
                  "Board-mode synthesis, CEO memo, and investor lens",
                  "Strategic option simulator across growth, margin, complexity, and risk",
                  "Capability heatmap and AI disruption exposure radar",
                  "Consultant-grade issue tree and storyline generator"
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-border/50 p-4">
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-success" />
                    <div className="text-sm leading-7 text-foreground/65">{item}</div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </main>
  );
}
