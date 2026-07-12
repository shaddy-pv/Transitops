import { Link } from "@tanstack/react-router";
import {
  Bell,
  Search,
  HelpCircle,
  Command as CommandIcon,
  Menu,
  User,
  Settings,
  LogOut,
  Keyboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { notifications } from "@/mock/notifications";

interface TopBarProps {
  onOpenPalette: () => void;
  onOpenSidebar: () => void;
  onOpenShortcuts: () => void;
}

export function TopBar({ onOpenPalette, onOpenSidebar, onOpenShortcuts }: TopBarProps) {
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur">
      <button
        type="button"
        onClick={onOpenSidebar}
        className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={onOpenPalette}
        className="flex h-9 flex-1 max-w-md items-center gap-2 rounded-md border border-border bg-card px-3 text-left text-sm text-muted-foreground transition-colors hover:bg-secondary/60"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 truncate">Search vehicles, drivers, trips…</span>
        <kbd className="hidden items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-flex">
          <CommandIcon className="h-2.5 w-2.5" />K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={onOpenShortcuts} aria-label="Keyboard shortcuts">
          <Keyboard className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Help">
          <HelpCircle className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              {unread > 0 && (
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              <span className="text-xs font-normal text-muted-foreground">
                {unread} unread
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              {notifications.slice(0, 6).map((n) => (
                <div
                  key={n.id}
                  className="flex items-start gap-3 px-3 py-2.5 hover:bg-secondary/60"
                >
                  <span
                    className={
                      "mt-1.5 h-1.5 w-1.5 rounded-full " +
                      (n.type === "critical"
                        ? "bg-red-400"
                        : n.type === "warning"
                          ? "bg-amber-400"
                          : n.type === "success"
                            ? "bg-emerald-400"
                            : "bg-sky-400")
                    }
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{n.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{n.detail}</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground/70">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-xs">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-1 flex h-8 items-center gap-2 rounded-md pr-2 hover:bg-secondary/60">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-secondary text-xs">AR</AvatarFallback>
              </Avatar>
              <div className="hidden text-left text-xs sm:block">
                <p className="font-medium leading-tight text-foreground">Anita Rao</p>
                <p className="leading-tight text-muted-foreground">Fleet Manager</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/app/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/login">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
