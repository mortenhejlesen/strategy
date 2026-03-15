import { Activity, Cpu, ShieldAlert, Swords, TrendingUp } from "lucide-react";

import { AppFrame } from "@/components/app-frame";
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";

const commandTiles = [
  {
    title: "Company health",
    icon: Activity,
    value: "Stable, rising quality",
    text: "Revenue momentum remains solid and service quality is improving, but execution complexity is still above target."
  },
  {
    title: "Competitor pressure",
    icon: Swords,
    value: "Escalating in mid-market",
    text: "Digital-native competitors are moving faster on workflow intelligence and lighter deployment models."
  },
  {
    title: "AI disruption",
    icon: Cpu,
    value: "Material and actionable",
    text: "Aurelis has meaningful exposure, but the installed base and service intimacy create a credible right-to-win."
  },
  {
    title: "Scenario risk",
    icon: ShieldAlert,
    value: "Contained with focus",
    text: "The biggest downside comes from doing too much at once rather than from market demand deterioration."
  }
];

export default function WarRoomPage() {
  return (
    <main className="pb-12">
      <AppFrame activeSection="War Room">
        <div className="space-y-6">
          <Panel className="overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(101,163,255,0.16),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.01),transparent)]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-foreground/45">War Room</div>
                <h1 className="mt-2 text-4xl font-semibold">A command-center view of strategic pressure, readiness, and choice.</h1>
              </div>
              <Badge tone="warning">Scare McKinsey mode</Badge>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {commandTiles.map((tile) => (
                <div key={tile.title} className="rounded-[26px] border border-border/50 bg-background/42 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <tile.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-5 text-lg font-semibold">{tile.title}</div>
                  <div className="mt-2 text-sm font-medium text-foreground">{tile.value}</div>
                  <p className="mt-3 text-sm leading-7 text-foreground/61">{tile.text}</p>
                </div>
              ))}
            </div>
          </Panel>

          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <Panel>
              <div className="flex items-center gap-2 text-sm text-accent">
                <TrendingUp className="h-4 w-4" />
                Strategic implication stack
              </div>
              <div className="mt-6 space-y-4">
                {[
                  "Priority one is service productivity: it improves margin, strengthens stickiness, and creates a differentiated AI story without a full business model reset.",
                  "Priority two is operating model simplification: without it, digital value will be swallowed by regional complexity and delivery friction.",
                  "Priority three is disciplined portfolio action: selective tuck-in acquisitions can accelerate capability building, but only after the data foundation is stabilized."
                ].map((item) => (
                  <div key={item} className="rounded-[24px] border border-border/50 bg-background/45 p-5 text-sm leading-7 text-foreground/64">
                    {item}
                  </div>
                ))}
              </div>
            </Panel>
            <Panel>
              <div className="text-xs uppercase tracking-[0.24em] text-foreground/45">Command triggers</div>
              <div className="mt-6 grid gap-4">
                {[
                  ["If margin drops 200 bps", "Accelerate delivery simplification and pricing architecture reset."],
                  ["If a low-cost competitor enters", "Bundle AI-enabled service outcomes to protect premium positioning."],
                  ["If AI lowers service cost-to-serve faster than planned", "Reinvest savings into installed-base expansion and software attach."],
                  ["If M&A window opens", "Target narrow analytics capability with clear integration thesis."]
                ].map(([title, text]) => (
                  <div key={title} className="rounded-[24px] border border-border/50 bg-background/45 p-5">
                    <div className="text-base font-semibold">{title}</div>
                    <div className="mt-2 text-sm leading-7 text-foreground/62">{text}</div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </AppFrame>
    </main>
  );
}
