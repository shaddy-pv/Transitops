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
  ChevronLeft,
} from "lucide-react";
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

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-border bg-sidebar text-sidebar-foreground lg:flex",
        collapsed ? "w-16" : "w-60",
      )}
    >
      <div className="flex h-14 items-center gap-2 border-b border-border px-4">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-foreground text-background">
          <Truck className="h-4 w-4" />
        </div>
        {!collapsed && (
          <span className="text-sm font-semibold tracking-tight">TransitOps</span>
        )}
        <button
          type="button"
          onClick={onToggle}
          className="ml-auto flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {!collapsed && (
          <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Operations
          </p>
        )}
        {nav.map((item) => {
          const active = pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 rounded-md px-2.5 py-2 text-sm transition-colors",
                active
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                collapsed && "justify-center",
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <Link
          to="/login"
          className={cn(
            "flex items-center gap-3 rounded-md px-2.5 py-2 text-sm text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
            collapsed && "justify-center",
          )}
          title={collapsed ? "Log out" : undefined}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Log out</span>}
        </Link>
      </div>
    </aside>
  );
}
