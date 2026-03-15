import { AppFrame } from "@/components/app-frame";
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import { optionPortfolio } from "@/lib/data";

export default function StrategicOptionsPage() {
  return (
    <main className="pb-12">
      <AppFrame activeSection="Strategic options">
        <div className="space-y-6">
          <Panel>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-foreground/45">Strategic choices</div>
                <h1 className="mt-2 text-4xl font-semibold">Compare moves by impact, feasibility, time-to-value, and risk.</h1>
              </div>
              <Badge>Prioritization matrix</Badge>
            </div>
            <div className="mt-8 grid gap-4">
              {optionPortfolio.map((option) => (
                <div key={option.option} className="grid gap-4 rounded-[28px] border border-border/55 bg-background/48 p-6 lg:grid-cols-[1.2fr_repeat(4,120px)]">
                  <div>
                    <div className="text-xl font-semibold">{option.option}</div>
                    <p className="mt-2 text-sm leading-7 text-foreground/63">{option.thesis}</p>
                  </div>
                  <Metric label="Impact" value={option.impact} />
                  <Metric label="Feasibility" value={option.feasibility} />
                  <Metric label="Risk" value={option.risk} inverse />
                  <Metric label="Time" value={option.timeToValue} textual />
                </div>
              ))}
            </div>
          </Panel>
          <Panel>
            <div className="text-xs uppercase tracking-[0.24em] text-foreground/45">Portfolio recommendation</div>
            <div className="mt-3 grid gap-4 md:grid-cols-3">
              {[
                "Commit now: AI-assisted remote operations suite and delivery footprint simplification.",
                "Stage-gate next: acquisition of a focused analytics player once data foundations are stabilized.",
                "Watchlist: adjacent transport control entry pending clearer sales motion evidence."
              ].map((item) => (
                <div key={item} className="rounded-[24px] border border-border/50 bg-background/45 p-5 text-sm leading-7 text-foreground/64">
                  {item}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </AppFrame>
    </main>
  );
}

function Metric({
  label,
  value,
  inverse,
  textual
}: {
  label: string;
  value: number | string;
  inverse?: boolean;
  textual?: boolean;
}) {
  const numeric = typeof value === "number";
  const tone = inverse ? "text-danger" : "text-success";

  return (
    <div className="rounded-[20px] border border-border/50 bg-card/60 p-4 text-center">
      <div className="text-xs uppercase tracking-[0.2em] text-foreground/42">{label}</div>
      <div className={`mt-3 text-2xl font-semibold ${numeric && !textual ? tone : ""}`}>
        {value}
        {numeric && !textual ? "%" : ""}
      </div>
    </div>
  );
}
