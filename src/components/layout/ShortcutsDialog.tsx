import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ShortcutsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const shortcuts = [
  { keys: ["⌘", "K"], label: "Open command palette" },
  { keys: ["G", "D"], label: "Go to Dashboard" },
  { keys: ["G", "V"], label: "Go to Vehicles" },
  { keys: ["G", "T"], label: "Go to Trips" },
  { keys: ["N"], label: "New trip" },
  { keys: ["?"], label: "Toggle this help" },
  { keys: ["Esc"], label: "Close overlays" },
];

export function ShortcutsDialog({ open, onOpenChange }: ShortcutsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard shortcuts</DialogTitle>
        </DialogHeader>
        <ul className="divide-y divide-border">
          {shortcuts.map((s) => (
            <li key={s.label} className="flex items-center justify-between py-2.5 text-sm">
              <span className="text-muted-foreground">{s.label}</span>
              <span className="flex gap-1">
                {s.keys.map((k) => (
                  <kbd
                    key={k}
                    className="min-w-[24px] rounded border border-border bg-secondary px-1.5 py-0.5 text-center text-[11px] font-medium"
                  >
                    {k}
                  </kbd>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
