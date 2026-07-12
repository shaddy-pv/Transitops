import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  LayoutDashboard,
  Truck,
  Users,
  Route as RouteIcon,
  Wrench,
  Fuel,
  BarChart3,
  Settings,
  Plus,
} from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate();

  const go = (to: string) => {
    onOpenChange(false);
    navigate({ to });
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => go("/app/dashboard")}>
            <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
          </CommandItem>
          <CommandItem onSelect={() => go("/app/vehicles")}>
            <Truck className="mr-2 h-4 w-4" /> Vehicles
          </CommandItem>
          <CommandItem onSelect={() => go("/app/drivers")}>
            <Users className="mr-2 h-4 w-4" /> Drivers
          </CommandItem>
          <CommandItem onSelect={() => go("/app/trips")}>
            <RouteIcon className="mr-2 h-4 w-4" /> Trips
          </CommandItem>
          <CommandItem onSelect={() => go("/app/maintenance")}>
            <Wrench className="mr-2 h-4 w-4" /> Maintenance
          </CommandItem>
          <CommandItem onSelect={() => go("/app/fuel")}>
            <Fuel className="mr-2 h-4 w-4" /> Fuel & Expenses
          </CommandItem>
          <CommandItem onSelect={() => go("/app/reports")}>
            <BarChart3 className="mr-2 h-4 w-4" /> Reports
          </CommandItem>
          <CommandItem onSelect={() => go("/app/settings")}>
            <Settings className="mr-2 h-4 w-4" /> Settings
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => go("/app/vehicles")}>
            <Plus className="mr-2 h-4 w-4" /> Add new vehicle
          </CommandItem>
          <CommandItem onSelect={() => go("/app/drivers")}>
            <Plus className="mr-2 h-4 w-4" /> Onboard driver
          </CommandItem>
          <CommandItem onSelect={() => go("/app/trips")}>
            <Plus className="mr-2 h-4 w-4" /> Create trip
          </CommandItem>
          <CommandItem onSelect={() => go("/app/maintenance")}>
            <Plus className="mr-2 h-4 w-4" /> Log maintenance
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
