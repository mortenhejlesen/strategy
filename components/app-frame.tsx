import { ChevronRight, Download, Sparkles } from "lucide-react";

import { moduleSections, sampleCompany } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { cn } from "@/lib/utils";

export function AppFrame({
  children,
  activeSection
}: {
  children: React.ReactNode;
  activeSection: string;
}) {
  return (
    <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 lg:grid-cols-[280px_minmax(0,1fr)_320px] lg:px-6">
      <Panel className="h-fit lg:sticky lg:top-24">
        <div className="mb-6">
          <div className="text-xs uppercase tracking-[0.25em] text-foreground/45">Active engagement</div>
          <h2 className="mt-3 text-2xl font-semibold text-foreground">{sampleCompany.name}</h2>
          <p className="mt-2 text-sm leading-6 text-foreground/62">{sampleCompany.question}</p>
        </div>
        <div className="space-y-2">
          {moduleSections.map((section) => (
            <div
              key={section}
              className={cn(
                "flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition",
                section === activeSection ? "bg-foreground text-background" : "text-foreground/65 hover:bg-background/60 hover:text-foreground"
              )}
            >
              <span>{section}</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          ))}
        </div>
      </Panel>
      <div className="min-w-0">{children}</div>
      <Panel className="h-fit lg:sticky lg:top-24">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-foreground/45">Strategy copilot</div>
            <h3 className="mt-2 text-xl font-semibold">Evidence and synthesis</h3>
          </div>
          <Badge>Copilot live</Badge>
        </div>
        <div className="mt-6 rounded-[24px] border border-border/60 bg-background/70 p-4">
          <div className="flex items-start gap-3">
            <div className="mt-1 rounded-2xl bg-accent/10 p-2 text-accent">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">Current hypothesis</div>
              <p className="mt-2 text-sm leading-6 text-foreground/62">
                Margin expansion is most likely to come from AI-enabled service leverage and network simplification, not additional price increases.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border border-success/25 bg-success/10 p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-success">High confidence</div>
            <div className="mt-2 text-sm text-foreground/80">Installed base monetization is still materially underdeveloped.</div>
          </div>
          <div className="rounded-2xl border border-warning/25 bg-warning/10 p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-warning">Medium confidence</div>
            <div className="mt-2 text-sm text-foreground/80">Transport adjacency could work, but commercial fit is not proven.</div>
          </div>
          <div className="rounded-2xl border border-danger/25 bg-danger/10 p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-danger">Low confidence</div>
            <div className="mt-2 text-sm text-foreground/80">A larger acquisition would likely dilute near-term operating focus.</div>
          </div>
        </div>
        <Button href="/report-preview" variant="secondary" className="mt-6 w-full" withArrow>
          <Download className="h-4 w-4" />
          Export board pack
        </Button>
      </Panel>
    </div>
  );
}
