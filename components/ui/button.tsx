import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  withArrow?: boolean;
};

const styles = {
  primary:
    "bg-foreground text-background hover:bg-foreground/90 shadow-soft border border-transparent",
  secondary:
    "bg-card/80 text-foreground border border-border/70 hover:border-accent/50 hover:bg-card",
  ghost:
    "bg-transparent text-foreground/80 border border-transparent hover:text-foreground"
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  withArrow
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition duration-300",
    styles[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        {withArrow ? <ArrowRight className="h-4 w-4" /> : null}
      </Link>
    );
  }

  return (
    <button className={classes}>
      {children}
      {withArrow ? <ArrowRight className="h-4 w-4" /> : null}
    </button>
  );
}
