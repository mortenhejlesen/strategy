import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      {eyebrow ? (
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent/80">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="max-w-4xl text-balance text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-3xl text-pretty text-base leading-7 text-foreground/68 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
