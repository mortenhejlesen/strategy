import Link from "next/link";
import { Orbit, ShieldCheck } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/setup", label: "Start analysis" },
  { href: "/workspace", label: "Workspace" },
  { href: "/scenario-lab", label: "Scenario lab" },
  { href: "/war-room", label: "War Room" },
  { href: "/about", label: "Methodology" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/30 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/60 bg-card/80 shadow-soft">
            <Orbit className="h-5 w-5 text-accent" />
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-foreground/80">
              Clariy Insights AI
            </div>
            <div className="text-xs text-foreground/50">AI strategy operating system</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-foreground/70 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-border/50 bg-card/60 px-3 py-2 text-xs text-foreground/60 md:flex">
            <ShieldCheck className="h-4 w-4 text-success" />
            Evidence-aware synthesis
          </div>
          <ThemeToggle />
          <Button href="/setup" withArrow>
            Launch workspace
          </Button>
        </div>
      </div>
    </header>
  );
}
