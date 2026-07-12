import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusStyles: Record<string, string> = {
  // vehicles
  "Available": "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
  "In Transit": "bg-sky-500/10 text-sky-400 ring-sky-500/20",
  "Maintenance": "bg-amber-500/10 text-amber-400 ring-amber-500/20",
  "Idle": "bg-zinc-500/10 text-zinc-400 ring-zinc-500/20",
  // drivers
  "On Duty": "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
  "Off Duty": "bg-zinc-500/10 text-zinc-400 ring-zinc-500/20",
  "On Leave": "bg-amber-500/10 text-amber-400 ring-amber-500/20",
  "Suspended": "bg-red-500/10 text-red-400 ring-red-500/20",
  // trips
  "Draft": "bg-zinc-500/10 text-zinc-400 ring-zinc-500/20",
  "Dispatched": "bg-sky-500/10 text-sky-400 ring-sky-500/20",
  "Completed": "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
  "Cancelled": "bg-red-500/10 text-red-400 ring-red-500/20",
  // maintenance
  "Pending": "bg-amber-500/10 text-amber-400 ring-amber-500/20",
  "In Progress": "bg-sky-500/10 text-sky-400 ring-sky-500/20",
  // priorities
  "Low": "bg-zinc-500/10 text-zinc-400 ring-zinc-500/20",
  "Medium": "bg-sky-500/10 text-sky-400 ring-sky-500/20",
  "High": "bg-amber-500/10 text-amber-400 ring-amber-500/20",
  "Critical": "bg-red-500/10 text-red-400 ring-red-500/20",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const style = statusStyles[status] ?? "bg-muted text-muted-foreground ring-border";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
        style,
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {status}
    </span>
  );
}
