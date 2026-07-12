import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  hint?: string;
  delta?: number;
  icon?: LucideIcon;
  className?: string;
}

export function StatCard({ label, value, hint, delta, icon: Icon, className }: StatCardProps) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div
      className={cn(
        "group relative rounded-xl border border-border bg-card p-5 transition-colors hover:bg-secondary/40",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {label}
          </p>
          <p className="mt-2 text-2xl font-semibold text-foreground tabular-nums">
            {value}
          </p>
        </div>
        {Icon && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background/40 text-muted-foreground">
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
        {typeof delta === "number" && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-medium",
              positive ? "text-emerald-400" : "text-red-400",
            )}
          >
            {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(delta)}%
          </span>
        )}
        {hint && <span>{hint}</span>}
      </div>
    </div>
  );
}
