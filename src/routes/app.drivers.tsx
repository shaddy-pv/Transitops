import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Plus, Users, Eye, Pencil, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { drivers as data, type Driver } from "@/mock/drivers";

export const Route = createFileRoute("/app/drivers")({
  component: DriversPage,
});

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("");
}

function DriversPage() {
  const [statusF, setStatusF] = useState("all");
  const filtered = useMemo(
    () => (statusF === "all" ? data : data.filter((d) => d.status === statusF)),
    [statusF],
  );

  const columns: ColumnDef<Driver>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Driver",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-secondary text-[10px]">
                {initials(row.original.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="font-medium leading-tight">{row.original.name}</p>
              <p className="text-xs text-muted-foreground">{row.original.base}</p>
            </div>
          </div>
        ),
      },
      { accessorKey: "licenseNumber", header: "License No." },
      { accessorKey: "licenseExpiry", header: "Expiry" },
      { accessorKey: "phone", header: "Phone" },
      {
        accessorKey: "safetyScore",
        header: "Safety",
        cell: ({ row }) => {
          const s = row.original.safetyScore;
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

  const onDuty = data.filter((d) => d.status === "On Duty").length;
  const avgSafety = Math.round(data.reduce((s, d) => s + d.safetyScore, 0) / data.length);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Drivers"
        description="Manage your driver roster, licenses and safety metrics."
        breadcrumbs={[{ label: "Home" }, { label: "Drivers" }]}
        actions={<AddDriverDialog />}
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Total Drivers" value={data.length} icon={Users} />
        <StatCard label="On Duty" value={onDuty} hint={`${Math.round((onDuty / data.length) * 100)}% active`} />
        <StatCard label="Avg Safety Score" value={avgSafety} delta={2} />
        <StatCard
          label="License Expiring Soon"
          value={data.filter((d) => new Date(d.licenseExpiry) < new Date("2027-01-01")).length}
          hint="in next 6 months"
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
          onSubmit={(e) => {
            e.preventDefault();
            setOpen(false);
          }}
        >
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Full name</Label>
            <Input placeholder="Rajesh Kumar" required />
          </div>
          <div className="space-y-1.5">
            <Label>License number</Label>
            <Input placeholder="MH1420190001234" required />
          </div>
          <div className="space-y-1.5">
            <Label>License expiry</Label>
            <Input type="date" required />
          </div>
          <div className="space-y-1.5">
            <Label>Phone</Label>
            <Input placeholder="+91 98765 43210" required />
          </div>
          <div className="space-y-1.5">
            <Label>Base location</Label>
            <Input placeholder="Mumbai" required />
          </div>
          <DialogFooter className="sm:col-span-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Driver</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}