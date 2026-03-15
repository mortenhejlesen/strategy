import { Download, LayoutPanelTop } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { reportSlides } from "@/lib/data";

export default function ReportPreviewPage() {
  return (
    <main className="px-6 py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Board deck preview"
          title="A sleek consulting-style export designed for boardrooms, investment committees, and CEOs."
          description="The export experience balances narrative sharpness with evidence traceability so teams can move from analysis to decision without reworking the story."
        />
        <div className="mt-12 flex flex-wrap gap-4">
          <Button withArrow>
            <Download className="h-4 w-4" />
            Export PowerPoint
          </Button>
          <Button variant="secondary">
            <LayoutPanelTop className="h-4 w-4" />
            Export PDF report
          </Button>
        </div>
        <div className="mt-10 grid gap-6 xl:grid-cols-2">
          {reportSlides.map((slide) => (
            <Panel key={slide.id} className="aspect-[16/10] overflow-hidden p-0">
              <div className="flex h-full flex-col justify-between bg-[linear-gradient(180deg,rgba(101,163,255,0.12),transparent_42%),linear-gradient(120deg,rgba(255,255,255,0.02),transparent)] p-8">
                <div className="flex items-center justify-between">
                  <div className="text-xs uppercase tracking-[0.24em] text-foreground/40">Clariy Insights AI</div>
                  <div className="text-sm text-foreground/45">{slide.id}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-foreground/40">Headline-driven page</div>
                  <h2 className="mt-3 max-w-xl text-3xl font-semibold leading-tight">{slide.title}</h2>
                  <p className="mt-4 max-w-xl text-base leading-7 text-foreground/62">{slide.subtitle}</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {["Implication", "Fact base", "Next move"].map((item) => (
                    <div key={item} className="rounded-[20px] border border-border/50 bg-background/45 p-4 text-sm text-foreground/60">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Panel>
          ))}
        </div>
      </div>
    </main>
  );
}
