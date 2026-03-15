import { ArrowUpRight, CheckCircle2, FileStack, Radar, Sparkles } from "lucide-react";

import { AppFrame } from "@/components/app-frame";
import { BenchmarkChart } from "@/components/charts/benchmark-chart";
import { RevenueMarginChart } from "@/components/charts/revenue-margin-chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { evidenceFeed, issueTree, sampleCompany, workstreams } from "@/lib/data";

export default function WorkspacePage() {
  return (
    <main className="pb-12">
      <AppFrame activeSection="Overview">
        <div className="space-y-6">
          <Panel className="overflow-hidden">
            <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
              <div>
                <Badge className="mb-4">Heavy depth | Board mode</Badge>
                <h1 className="text-4xl font-semibold tracking-tight text-foreground">
                  {sampleCompany.name} is well-positioned, but the next chapter requires software-led operating leverage.
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-8 text-foreground/66">
                  The company has credible structural advantages in regulated infrastructure and field-service intimacy.
                  The strategic challenge is not whether to digitize, but how quickly to convert installed-base access into
                  AI-enabled service economics before lower-cost challengers redefine the category.
                </p>
                <div className="mt-8 grid gap-4 md:grid-cols-4">
                  {[
                    ["Revenue", sampleCompany.revenue],
                    ["EBIT margin", sampleCompany.ebitMargin],
                    ["Enterprise value", sampleCompany.valuation],
                    ["Employee base", sampleCompany.employees]
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[24px] border border-border/50 bg-background/45 p-4">
                      <div className="text-sm text-foreground/50">{label}</div>
                      <div className="mt-2 text-2xl font-semibold">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[28px] border border-border/60 bg-background/55 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.24em] text-foreground/45">Engagement health</div>
                    <div className="mt-2 text-2xl font-semibold">79% complete</div>
                  </div>
                  <Badge tone="success">High signal density</Badge>
                </div>
                <div className="mt-6 space-y-4">
                  {workstreams.map((stream) => (
                    <div key={stream.name}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground/72">{stream.name}</span>
                        <span className="text-foreground/45">{stream.confidence}</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-muted">
                        <div className="h-full rounded-full bg-gradient-to-r from-accent to-success" style={{ width: `${stream.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Panel>

          <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
            <Panel>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-foreground/45">Financial signals</div>
                  <div className="mt-2 text-2xl font-semibold">Revenue growth is compounding while margin quality improves</div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-accent" />
              </div>
              <div className="mt-6">
                <RevenueMarginChart />
              </div>
            </Panel>
            <Panel>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-foreground/45">Competitor benchmark</div>
                  <div className="mt-2 text-2xl font-semibold">Aurelis trails on digital maturity despite premium economics</div>
                </div>
                <Radar className="h-5 w-5 text-warning" />
              </div>
              <div className="mt-6">
                <BenchmarkChart />
              </div>
            </Panel>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <Panel>
              <div className="flex items-center gap-2 text-sm text-accent">
                <Sparkles className="h-4 w-4" />
                Hypothesis tree
              </div>
              <div className="mt-6 space-y-4">
                {issueTree.map((branch) => (
                  <div key={branch.title} className="rounded-[24px] border border-border/55 bg-background/45 p-5">
                    <div className="text-lg font-semibold">{branch.title}</div>
                    <div className="mt-3 space-y-2 text-sm text-foreground/62">
                      {branch.items.map((item) => (
                        <div key={item}>- {item}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
            <Panel>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-foreground/45">Evidence register</div>
                  <div className="mt-2 text-2xl font-semibold">Insight quality is transparent by design</div>
                </div>
                <FileStack className="h-5 w-5 text-accent" />
              </div>
              <div className="mt-6 space-y-4">
                {evidenceFeed.map((item) => (
                  <div key={item.title} className="rounded-[24px] border border-border/50 bg-background/48 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-base font-medium">{item.title}</div>
                      <Badge tone={item.confidence === "High" ? "success" : item.confidence === "Medium" ? "warning" : "danger"}>
                        {item.confidence}
                      </Badge>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm text-foreground/55">
                      <span>{item.source}</span>
                      <span>Evidence over inference</span>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          <Panel>
            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-foreground/45">Strategic recommendation</div>
                <div className="mt-2 text-3xl font-semibold">Prioritize three moves, not ten.</div>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {[
                    "Build an AI-enabled service layer around uptime, diagnostics, and response routing.",
                    "Simplify regional delivery into a control tower model to unlock operating leverage.",
                    "Use selective tuck-in M&A only where it accelerates software differentiation."
                  ].map((item) => (
                    <div key={item} className="rounded-[24px] border border-border/55 bg-background/45 p-5 text-sm leading-7 text-foreground/64">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[28px] border border-border/60 bg-background/50 p-6">
                <div className="flex items-center gap-2 text-sm text-success">
                  <CheckCircle2 className="h-4 w-4" />
                  Storyline ready
                </div>
                <p className="mt-4 text-lg leading-8">
                  The company can outgrow the market and expand margin if it shifts from premium hardware supplier to
                  intelligence-enabled service orchestrator.
                </p>
                <div className="mt-8 space-y-3">
                  <Button href="/executive-summary" className="w-full" withArrow>
                    Open executive storyline
                  </Button>
                  <Button href="/scenario-lab" variant="secondary" className="w-full">
                    Pressure-test scenarios
                  </Button>
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </AppFrame>
    </main>
  );
}
