import {
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  Castle,
  ChartColumnIncreasing,
  Radar,
  Sparkles
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Panel } from "@/components/ui/panel";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { boardNarrative, issueTree, workstreams } from "@/lib/data";

const featureCards = [
  {
    icon: BrainCircuit,
    title: "Strategy copilot",
    description: "Hypothesis-driven analysis that separates evidence from inference and keeps the storyline board-ready."
  },
  {
    icon: ChartColumnIncreasing,
    title: "Consulting-grade diagnostics",
    description: "3C, Five Forces, SWOT, scenario planning, option simulation, and implementation logic in one workflow."
  },
  {
    icon: Radar,
    title: "War Room command center",
    description: "A cinematic operating view of company health, market pressure, AI disruption, and strategic moves."
  },
  {
    icon: Castle,
    title: "Executive trust by design",
    description: "Confidence scoring, source placeholders, structured reasoning, and premium communication for serious stakeholders."
  }
];

export default function LandingPage() {
  return (
    <main>
      <section className="relative overflow-hidden px-6 pb-20 pt-16 lg:px-8 lg:pt-24">
        <div className="absolute inset-0 grid-surface opacity-60" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <div className="relative z-10">
            <Badge className="mb-6">AI strategy consulting for serious decision-makers</Badge>
            <h1 className="max-w-5xl text-balance text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
              Run a full situational analysis in hours, not the months traditional firms require.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground/68 md:text-xl">
              Clariy Insights AI turns company research, consulting frameworks, and board-level synthesis into one sharp
              operating system for CEOs, PE funds, strategy leaders, and transformation teams.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="/setup" withArrow>
                Start analysis
              </Button>
              <Button href="/workspace" variant="secondary">
                Explore live workspace
              </Button>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                ["2-4 min", "Executive scan"],
                ["10-15 slides", "Auto-built storyline"],
                ["Board mode", "One-click lens shift"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-[24px] border border-border/50 bg-card/55 p-5 backdrop-blur">
                  <div className="text-2xl font-semibold">{value}</div>
                  <div className="mt-1 text-sm text-foreground/58">{label}</div>
                </div>
              ))}
            </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Panel className="relative z-10 overflow-hidden p-0">
            <div className="border-b border-border/60 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-foreground/45">War Room preview</div>
                  <div className="mt-2 text-2xl font-semibold">Aurelis Industrial Systems</div>
                </div>
                <Badge tone="success">82% confidence</Badge>
              </div>
            </div>
            <div className="space-y-6 p-6">
              <div className="grid gap-4 md:grid-cols-2">
                {workstreams.slice(0, 4).map((stream) => (
                  <div key={stream.name} className="rounded-[24px] border border-border/60 bg-background/60 p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground/72">{stream.name}</span>
                      <span className="text-foreground/45">{stream.progress}%</span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-muted">
                      <div className="h-full rounded-full bg-gradient-to-r from-accent to-success" style={{ width: `${stream.progress}%` }} />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-foreground/58">{stream.note}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-[28px] border border-border/60 bg-gradient-to-br from-background via-card to-background p-6">
                <div className="flex items-center gap-2 text-sm text-accent">
                  <Sparkles className="h-4 w-4" />
                  Live storyline generator
                </div>
                <p className="mt-4 text-2xl font-semibold leading-tight">
                  The company&apos;s premium position is still defensible, but value creation now depends on turning the installed base into a software-led service engine.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm text-foreground/58">
                  Open executive summary <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="How it works"
            title="Structured like an elite consulting team. Fast like software."
            description="The workflow is designed to move from hypothesis formation to diagnostic depth to executive synthesis without losing rigor."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              ["1. Frame the mandate", "Choose company, geography, business unit, thesis, lens, and horizon. The system auto-builds workstreams and issue trees."],
              ["2. Build the fact base", "Generate a dynamic analysis workspace across market, competition, customer economics, operating model, and AI value pools."],
              ["3. Decide with confidence", "Transform findings into options, scenarios, board narratives, CEO memos, and implementation roadmaps."]
            ].map(([title, description]) => (
              <Reveal key={title} delay={0.04}>
                <Panel>
                <div className="text-lg font-semibold">{title}</div>
                <p className="mt-3 text-sm leading-7 text-foreground/62">{description}</p>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Signature capabilities"
            title="Purpose-built to pressure the consulting value chain."
            description="Not a chat interface. A premium strategy operating environment with modules leaders can actually use."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featureCards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.05}>
                <Panel className="min-h-[240px]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <card.icon className="h-5 w-5" />
                </div>
                <div className="mt-6 text-xl font-semibold">{card.title}</div>
                <p className="mt-3 text-sm leading-7 text-foreground/62">{card.description}</p>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <Panel>
            <div className="flex items-center gap-3 text-sm text-foreground/58">
              <BriefcaseBusiness className="h-4 w-4 text-accent" />
              Traditional consulting vs Clariy Insights AI
            </div>
            <div className="mt-8 space-y-4">
              {[
                ["Speed to insight", "Weeks to months", "Hours"],
                ["Depth control", "Scoped through staffing", "Dynamic: light, medium, heavy"],
                ["Narrative synthesis", "Partner-driven", "Instant and editable"],
                ["Scenario iteration", "Slow and expensive", "Interactive and continuous"]
              ].map(([row, left, right]) => (
                <div key={row} className="grid grid-cols-[1fr_160px_160px] gap-4 rounded-2xl border border-border/50 px-4 py-4 text-sm">
                  <div className="font-medium">{row}</div>
                  <div className="text-foreground/55">{left}</div>
                  <div className="font-medium text-foreground">{right}</div>
                </div>
              ))}
            </div>
          </Panel>
          <Panel>
            <div className="text-xs uppercase tracking-[0.25em] text-foreground/45">Case study teaser</div>
            <h3 className="mt-3 text-3xl font-semibold">Aurelis identified EUR 120M in EBIT upside before the first steering committee.</h3>
            <div className="mt-6 space-y-4">
              {boardNarrative.map((point) => (
                <div key={point} className="rounded-2xl border border-border/50 bg-background/45 p-4 text-sm leading-7 text-foreground/68">
                  {point}
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {issueTree.map((branch) => (
                <div key={branch.title} className="rounded-[24px] border border-border/50 p-4">
                  <div className="font-medium">{branch.title}</div>
                  <div className="mt-3 space-y-2 text-sm text-foreground/58">
                    {branch.items.map((item) => (
                      <div key={item}>- {item}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </section>

      <section className="px-6 pb-24 pt-10 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[36px] border border-border/60 bg-card/75 px-8 py-12 text-center shadow-panel backdrop-blur-xl">
          <Badge className="mb-4">Board-ready in one workflow</Badge>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Why pay a consulting firm millions to wait for clarity?
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-foreground/65">
            Build a dynamic strategy workspace, pressure-test choices, and export a board-ready narrative in the same day.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/setup" withArrow>
              Start a situational analysis
            </Button>
            <Button href="/report-preview" variant="secondary">
              Preview board deck
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
