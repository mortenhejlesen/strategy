import { AppFrame } from "@/components/app-frame";
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import { boardNarrative, reportSlides } from "@/lib/data";

export default function ExecutiveSummaryPage() {
  return (
    <main className="pb-12">
      <AppFrame activeSection="Board summary">
        <div className="space-y-6">
          <Panel>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-foreground/45">Executive summary</div>
                <h1 className="mt-2 text-4xl font-semibold">A board-ready storyline with headline-driven synthesis.</h1>
              </div>
              <Badge>10-slide narrative</Badge>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {boardNarrative.map((point) => (
                <div key={point} className="rounded-[24px] border border-border/50 bg-background/45 p-5 text-sm leading-7 text-foreground/65">
                  {point}
                </div>
              ))}
            </div>
          </Panel>
          <div className="grid gap-6">
            {reportSlides.map((slide) => (
              <Panel key={slide.id} className="overflow-hidden p-0">
                <div className="grid md:grid-cols-[160px_1fr]">
                  <div className="flex items-center justify-center border-b border-border/50 bg-background/55 p-8 md:border-b-0 md:border-r">
                    <div className="text-center">
                      <div className="text-xs uppercase tracking-[0.24em] text-foreground/40">Slide</div>
                      <div className="mt-2 text-5xl font-semibold">{slide.id}</div>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="text-xs uppercase tracking-[0.24em] text-foreground/40">Headline</div>
                    <h2 className="mt-3 text-3xl font-semibold">{slide.title}</h2>
                    <p className="mt-5 max-w-3xl text-lg leading-8 text-foreground/65">{slide.subtitle}</p>
                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                      {["Implication", "Evidence", "Recommended action"].map((label) => (
                        <div key={label} className="rounded-[20px] border border-border/50 bg-background/48 p-4">
                          <div className="text-xs uppercase tracking-[0.22em] text-foreground/45">{label}</div>
                          <div className="mt-3 text-sm leading-7 text-foreground/64">
                            Consulting-style synthesis block tailored for executives who need clarity without losing the logic underneath.
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Panel>
            ))}
          </div>
        </div>
      </AppFrame>
    </main>
  );
}
