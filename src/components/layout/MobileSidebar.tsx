import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Truck,
  Users,
  Route as RouteIcon,
  Wrench,
  Fuel,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/vehicles", label: "Vehicles", icon: Truck },
  { to: "/app/drivers", label: "Drivers", icon: Users },
  { to: "/app/trips", label: "Trips", icon: RouteIcon },
  { to: "/app/maintenance", label: "Maintenance", icon: Wrench },
  { to: "/app/fuel", label: "Fuel & Expenses", icon: Fuel },
  { to: "/app/reports", label: "Reports", icon: BarChart3 },
  { to: "/app/settings", label: "Settings", icon: Settings },
] as const;

interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileSidebar({ open, onOpenChange }: MobileSidebarProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-64 border-border bg-sidebar p-0">
        <div className="flex h-14 items-center gap-2 border-b border-border px-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background">
            <Truck className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight">TransitOps</span>
        </div>
        <nav className="flex-1 space-y-0.5 p-3">
          {nav.map((item) => {
            const active = pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => onOpenChange(false)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-2.5 py-2 text-sm",
                  active
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          <Link
            to="/login"
            onClick={() => onOpenChange(false)}
            className="mt-4 flex items-center gap-3 rounded-md border-t border-border px-2.5 pt-4 pb-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4" /> Log out
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
