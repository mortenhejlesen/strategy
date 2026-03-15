import { cn } from "@/lib/utils";

export function Panel({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-border/60 bg-card/78 p-6 shadow-panel backdrop-blur-xl",
        className
      )}
    >
      {children}
    </div>
  );
}
