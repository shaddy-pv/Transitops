import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Plus, Trash2, Truck } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
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
import { MoreHorizontal } from "lucide-react";
import { vehicles as vehicleData, type Vehicle } from "@/mock/vehicles";

export const Route = createFileRoute("/app/vehicles")({
  component: VehiclesPage,
});

function VehiclesPage() {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  const filtered = useMemo(() => {
    return vehicleData.filter(
      (v) =>
        (filterStatus === "all" || v.status === filterStatus) &&
        (filterType === "all" || v.type === filterType),
    );
  }, [filterStatus, filterType]);

  const columns: ColumnDef<Vehicle>[] = useMemo(
    () => [
      {
        accessorKey: "registration",
        header: "Registration",
        cell: ({ row }) => (
          <span className="font-medium tabular-nums">{row.original.registration}</span>
        ),
      },
      { accessorKey: "name", header: "Vehicle" },
      { accessorKey: "type", header: "Type" },
      { accessorKey: "capacity", header: "Capacity" },
      {
        accessorKey: "odometer",
        header: "Odometer",
        cell: ({ row }) => (
          <span className="tabular-nums text-muted-foreground">
            {row.original.odometer.toLocaleString()} km
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: () => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" /> View details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-400 focus:text-red-400">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [],
  );

  const total = vehicleData.length;
  const available = vehicleData.filter((v) => v.status === "Available").length;
  const inTransit = vehicleData.filter((v) => v.status === "In Transit").length;
  const maintenance = vehicleData.filter((v) => v.status === "Maintenance").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Vehicles"
        description="All assets across depots. Manage registration, capacity and service state."
        breadcrumbs={[{ label: "Home" }, { label: "Vehicles" }]}
        actions={<AddVehicleDialog />}
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Total Fleet" value={total} icon={Truck} hint="Active assets" />
        <StatCard label="Available" value={available} hint={`${Math.round((available / total) * 100)}% of fleet`} />
        <StatCard label="In Transit" value={inTransit} hint="on active routes" />
        <StatCard label="Maintenance" value={maintenance} hint="under service" />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        searchPlaceholder="Search registration or name…"
        toolbar={
          <div className="flex flex-wrap items-center gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="h-9 w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="In Transit">In Transit</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Idle">Idle</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="h-9 w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                {["Truck", "Van", "Trailer", "Container", "Tanker", "Reefer"].map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        }
      />
    </div>
  );
}

function AddVehicleDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Vehicle
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add new vehicle</DialogTitle>
        </DialogHeader>
        <form
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            setOpen(false);
          }}
        >
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Registration number</Label>
            <Input placeholder="MH-12-AB-4521" required />
          </div>
          <div className="space-y-1.5">
            <Label>Model</Label>
            <Input placeholder="Volvo FH16" required />
          </div>
          <div className="space-y-1.5">
            <Label>Type</Label>
            <Select defaultValue="Truck">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Truck", "Van", "Trailer", "Container", "Tanker", "Reefer"].map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Capacity</Label>
            <Input placeholder="25 T" required />
          </div>
          <div className="space-y-1.5">
            <Label>Odometer (km)</Label>
            <Input type="number" placeholder="0" required />
          </div>
          <DialogFooter className="sm:col-span-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Vehicle</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}