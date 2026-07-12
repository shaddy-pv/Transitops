import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Plus, Users, Eye, Pencil, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDrivers, useCreateDriver } from "@/hooks/useFleetData";

export const Route = createFileRoute("/app/drivers")({
  component: DriversPage,
});

function initials(name: string) {
  if (!name) return "DR";
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("");
}

function DriversPage() {
  const [statusF, setStatusF] = useState("all");
  const { data: driversData, isLoading, error } = useDrivers();

  const filtered = useMemo(() => {
    if (!driversData) return [];
    return statusF === "all" ? driversData : driversData.filter((d: any) => d.status === statusF);
  }, [driversData, statusF]);

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Driver",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={row.original.licenseImage} />
              <AvatarFallback className="bg-secondary text-[10px]">
                {initials(row.original.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="font-medium leading-tight">{row.original.name}</p>
              <p className="text-xs text-muted-foreground">{row.original.email}</p>
            </div>
          </div>
        ),
      },
      { accessorKey: "licenseNumber", header: "License No." },
      { 
        accessorKey: "licenseExpiry", 
        header: "Expiry",
        cell: ({ row }) => (
          <span>{new Date(row.original.licenseExpiry).toLocaleDateString()}</span>
        )
      },
      { accessorKey: "phone", header: "Phone" },
      {
        accessorKey: "safetyScore",
        header: "Safety",
        cell: ({ row }) => {
          const s = row.original.safetyScore || 100; // default 100 on new backend
          const color =
            s >= 90 ? "text-emerald-400" : s >= 80 ? "text-sky-400" : s >= 70 ? "text-amber-400" : "text-red-400";
          return <span className={`font-medium tabular-nums ${color}`}>{s}</span>;
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        id: "actions",
        header: "",
        cell: () => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><Eye className="mr-2 h-4 w-4" /> View profile</DropdownMenuItem>
              <DropdownMenuItem><Pencil className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-red-400 focus:text-red-400">
                <Trash2 className="mr-2 h-4 w-4" /> Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [],
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Drivers" description="Loading driver roster..." breadcrumbs={[{ label: "Home" }, { label: "Drivers" }]} />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  if (error || !driversData) {
    return (
      <div className="rounded-md bg-destructive/15 p-4 text-destructive">
        Failed to load drivers.
      </div>
    );
  }

  const onDuty = driversData.filter((d: any) => d.status === "On Duty").length;
  const avgSafety = driversData.length ? Math.round(driversData.reduce((s: number, d: any) => s + (d.safetyScore || 100), 0) / driversData.length) : 0;
  const total = driversData.length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Drivers"
        description="Manage your driver roster, licenses and safety metrics."
        breadcrumbs={[{ label: "Home" }, { label: "Drivers" }]}
        actions={<AddDriverDialog />}
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Total Drivers" value={total} icon={Users} />
        <StatCard label="On Duty" value={onDuty} hint={total > 0 ? `${Math.round((onDuty / total) * 100)}% active` : '0%'} />
        <StatCard label="Avg Safety Score" value={avgSafety} delta={2} />
        <StatCard
          label="License Expiring Soon"
          value={driversData.filter((d: any) => new Date(d.licenseExpiry) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)).length}
          hint="in next 3 months"
        />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        searchPlaceholder="Search drivers by name…"
        toolbar={
          <Select value={statusF} onValueChange={setStatusF}>
            <SelectTrigger className="h-9 w-[150px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="On Duty">On Duty</SelectItem>
              <SelectItem value="Off Duty">Off Duty</SelectItem>
              <SelectItem value="On Leave">On Leave</SelectItem>
              <SelectItem value="Suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        }
      />
    </div>
  );
}

function AddDriverDialog() {
  const [open, setOpen] = useState(false);
  const { mutateAsync: createDriver, isPending } = useCreateDriver();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await createDriver(formData);
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to create driver");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Driver
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Onboard new driver</DialogTitle>
        </DialogHeader>
        <form
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          onSubmit={handleSubmit}
        >
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Full name</Label>
            <Input name="name" placeholder="Rajesh Kumar" required />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Email</Label>
            <Input name="email" type="email" placeholder="rajesh@transitops.com" required />
          </div>
          <div className="space-y-1.5">
            <Label>License number</Label>
            <Input name="licenseNumber" placeholder="MH1420190001234" required />
          </div>
          <div className="space-y-1.5">
            <Label>License expiry</Label>
            <Input name="licenseExpiry" type="date" required />
          </div>
          <div className="space-y-1.5">
            <Label>Phone</Label>
            <Input name="phone" placeholder="+91 98765 43210" required />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label>License Image</Label>
            <Input name="licenseImage" type="file" accept="image/*" />
          </div>
          <DialogFooter className="sm:col-span-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Driver"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}