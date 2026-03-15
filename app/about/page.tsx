import { ShieldCheck, Waypoints, Workflow } from "lucide-react";

import { Panel } from "@/components/ui/panel";
import { SectionHeading } from "@/components/section-heading";

export default function AboutPage() {
  return (
    <main className="px-6 py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Methodology and trust"
          title="Built to think like strategy consultants and communicate like a premium product."
          description="Clariy Insights AI combines structured frameworks, confidence-aware reasoning, and executive-grade design to make AI useful in high-stakes decision environments."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Panel>
            <ShieldCheck className="h-6 w-6 text-success" />
            <h2 className="mt-5 text-2xl font-semibold">Responsible AI use</h2>
            <p className="mt-4 text-sm leading-7 text-foreground/63">
              Insights are explicitly tagged as evidence or inference. Confidence levels signal where the fact base is strong and where judgment remains provisional.
            </p>
          </Panel>
          <Panel>
            <Waypoints className="h-6 w-6 text-accent" />
            <h2 className="mt-5 text-2xl font-semibold">Consulting frameworks, not chatbot drift</h2>
            <p className="mt-4 text-sm leading-7 text-foreground/63">
              The product uses issue trees, 3C, Five Forces, value chain logic, capability diagnostics, and scenario planning to keep analysis structured and decision-relevant.
            </p>
          </Panel>
          <Panel>
            <Workflow className="h-6 w-6 text-warning" />
            <h2 className="mt-5 text-2xl font-semibold">Made for executives</h2>
            <p className="mt-4 text-sm leading-7 text-foreground/63">
              Every screen is designed to reduce noise, improve strategic clarity, and accelerate the path from analysis to action across boards, CEOs, investors, and transformation offices.
            </p>
          </Panel>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Panel>
            <div className="text-xs uppercase tracking-[0.24em] text-foreground/45">Framework library</div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {[
                "Situational analysis",
                "Industry structure",
                "Competitor benchmarking",
                "SWOT from evidence",
                "Value chain breakdown",
                "AI maturity and disruption radar",
                "Scenario analysis",
                "Initiative portfolio and roadmap"
              ].map((item) => (
                <div key={item} className="rounded-[20px] border border-border/50 bg-background/45 px-4 py-4 text-sm text-foreground/64">
                  {item}
                </div>
              ))}
            </div>
          </Panel>
          <Panel>
            <div className="text-xs uppercase tracking-[0.24em] text-foreground/45">Why executives trust the workflow</div>
            <div className="mt-4 space-y-4">
              {[
                "The interface is designed for scrutiny: confidence indicators, source placeholders, and structured recommendation logic are visible throughout.",
                "Board mode, CEO memo mode, investor mode, and transformation office mode make the same fact base useful across stakeholder groups.",
                "The platform is intentionally opinionated. It drives toward decision-quality synthesis instead of endless conversational exploration."
              ].map((item) => (
                <div key={item} className="rounded-[24px] border border-border/50 bg-background/45 p-5 text-sm leading-7 text-foreground/64">
                  {item}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </main>
  );
}
