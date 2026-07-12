import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Plus, Route as RouteIcon, ArrowRight, Eye, Pencil, Ban } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trips as data, type Trip } from "@/mock/trips";
import { vehicles } from "@/mock/vehicles";
import { drivers } from "@/mock/drivers";

export const Route = createFileRoute("/app/trips")({
  component: TripsPage,
});

function TripsPage() {
  const [statusF, setStatusF] = useState("all");
  const [selected, setSelected] = useState<Trip | null>(null);

  const filtered = useMemo(
    () => (statusF === "all" ? data : data.filter((t) => t.status === statusF)),
    [statusF],
  );

  const columns: ColumnDef<Trip>[] = useMemo(
    () => [
      { accessorKey: "code", header: "Trip", cell: ({ row }) => <span className="font-medium">{row.original.code}</span> },
      {
        id: "route",
        header: "Route",
        cell: ({ row }) => (
          <span className="flex items-center gap-2 text-muted-foreground">
            {row.original.source} <ArrowRight className="h-3 w-3" /> {row.original.destination}
          </span>
        ),
      },
      { accessorKey: "vehicleId", header: "Vehicle" },
      { accessorKey: "driverId", header: "Driver" },
      {
        accessorKey: "distance",
        header: "Distance",
        cell: ({ row }) => <span className="tabular-nums">{row.original.distance} km</span>,
      },
      { accessorKey: "scheduled", header: "Scheduled" },
      { accessorKey: "status", header: "Status", cell: ({ row }) => <StatusBadge status={row.original.status} /> },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => setSelected(row.original)}>
                <Eye className="mr-2 h-4 w-4" /> View details
              </DropdownMenuItem>
              <DropdownMenuItem><Pencil className="mr-2 h-4 w-4" /> Edit trip</DropdownMenuItem>
              <DropdownMenuItem className="text-red-400 focus:text-red-400">
                <Ban className="mr-2 h-4 w-4" /> Cancel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Trips"
        description="Plan, dispatch and monitor loads across the network."
        breadcrumbs={[{ label: "Home" }, { label: "Trips" }]}
        actions={<CreateTripDialog />}
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Total Trips" value={data.length} icon={RouteIcon} />
        <StatCard label="In Transit" value={data.filter((t) => t.status === "In Transit").length} />
        <StatCard label="Dispatched" value={data.filter((t) => t.status === "Dispatched").length} />
        <StatCard label="Completed" value={data.filter((t) => t.status === "Completed").length} />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        searchPlaceholder="Search by trip code, source, destination…"
        toolbar={
          <Select value={statusF} onValueChange={setStatusF}>
            <SelectTrigger className="h-9 w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Dispatched">Dispatched</SelectItem>
              <SelectItem value="In Transit">In Transit</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        }
      />

      <TripDrawer trip={selected} onOpenChange={(o) => !o && setSelected(null)} />
    </div>
  );
}

function TripDrawer({ trip, onOpenChange }: { trip: Trip | null; onOpenChange: (o: boolean) => void }) {
  return (
    <Sheet open={!!trip} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        {trip && (
          <>
            <SheetHeader>
              <SheetTitle className="flex items-center gap-3">
                {trip.code}
                <StatusBadge status={trip.status} />
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <div className="rounded-lg border border-border p-4">
                <p className="text-xs text-muted-foreground">Route</p>
                <p className="mt-1 text-lg font-medium">
                  {trip.source} <ArrowRight className="inline h-4 w-4 text-muted-foreground" /> {trip.destination}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{trip.distance} km</p>
              </div>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div><dt className="text-xs text-muted-foreground">Vehicle</dt><dd className="mt-0.5 font-medium">{trip.vehicleId}</dd></div>
                <div><dt className="text-xs text-muted-foreground">Driver</dt><dd className="mt-0.5 font-medium">{trip.driverId}</dd></div>
                <div><dt className="text-xs text-muted-foreground">Cargo</dt><dd className="mt-0.5 font-medium">{trip.cargo}</dd></div>
                <div><dt className="text-xs text-muted-foreground">Weight</dt><dd className="mt-0.5 font-medium">{trip.cargoWeight} T</dd></div>
                <div><dt className="text-xs text-muted-foreground">Scheduled</dt><dd className="mt-0.5 font-medium">{trip.scheduled}</dd></div>
                <div><dt className="text-xs text-muted-foreground">Est. Cost</dt><dd className="mt-0.5 font-medium">₹{trip.cost.toLocaleString()}</dd></div>
              </dl>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Timeline</p>
                <ol className="mt-3 space-y-3 border-l border-border pl-4">
                  {["Trip created", "Driver assigned", "Vehicle inspected", "Dispatched from origin", "In transit", "Reached destination"].map((s, i) => {
                    const active = i <= (trip.status === "Completed" ? 5 : trip.status === "In Transit" ? 4 : trip.status === "Dispatched" ? 3 : 1);
                    return (
                      <li key={s} className="relative">
                        <span
                          className={
                            "absolute -left-[21px] top-1.5 h-2 w-2 rounded-full ring-4 ring-background " +
                            (active ? "bg-foreground" : "bg-border")
                          }
                        />
                        <p className={active ? "text-sm text-foreground" : "text-sm text-muted-foreground"}>{s}</p>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function CreateTripDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" /> Create Trip</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>Create new trip</DialogTitle></DialogHeader>
        <form
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          onSubmit={(e) => { e.preventDefault(); setOpen(false); }}
        >
          <div className="space-y-1.5"><Label>Source</Label><Input placeholder="Mumbai" required /></div>
          <div className="space-y-1.5"><Label>Destination</Label><Input placeholder="Delhi" required /></div>
          <div className="space-y-1.5">
            <Label>Vehicle</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Assign vehicle" /></SelectTrigger>
              <SelectContent>
                {vehicles.slice(0, 8).map((v) => (
                  <SelectItem key={v.id} value={v.id}>{v.registration}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Driver</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Assign driver" /></SelectTrigger>
              <SelectContent>
                {drivers.slice(0, 8).map((d) => (
                  <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5"><Label>Cargo weight (T)</Label><Input type="number" placeholder="0" required /></div>
          <div className="space-y-1.5"><Label>Distance (km)</Label><Input type="number" placeholder="0" required /></div>
          <div className="space-y-1.5 sm:col-span-2"><Label>Cargo notes</Label><Textarea placeholder="Handling, restrictions, contact…" rows={3} /></div>
          <DialogFooter className="sm:col-span-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Save as draft</Button>
            <Button type="submit">Dispatch</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}