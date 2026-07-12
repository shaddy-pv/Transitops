import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Plus, Wrench, CheckCircle2, Clock, CircleAlert } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMaintenance, useLogMaintenance, useVehicles } from "@/hooks/useFleetData";

export const Route = createFileRoute("/app/maintenance")({
  component: MaintenancePage,
});

function MaintenancePage() {
  const [statusF, setStatusF] = useState("all");
  const { data: maintenanceData, isLoading, error } = useMaintenance();

  const filtered = useMemo(() => {
    if (!maintenanceData) return [];
    return statusF === "all" ? maintenanceData : maintenanceData.filter((m: any) => m.status === statusF);
  }, [maintenanceData, statusF]);

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      { accessorKey: "id", header: "Ticket", cell: ({ row }) => row.original._id.substring(row.original._id.length - 6).toUpperCase() },
      { 
        accessorKey: "vehicle", 
        header: "Vehicle",
        cell: ({ row }) => <span>{row.original.vehicle?.registrationNumber || row.original.vehicleId}</span>
      },
      { accessorKey: "issue", header: "Issue" },
      {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ row }) => <StatusBadge status={row.original.priority} />,
      },
      { accessorKey: "technician", header: "Technician" },
      { 
        accessorKey: "scheduled", 
        header: "Scheduled",
        cell: ({ row }) => <span>{new Date(row.original.scheduledDate || row.original.scheduled).toLocaleDateString()}</span>
      },
      {
        accessorKey: "cost",
        header: "Cost",
        cell: ({ row }) => <span className="tabular-nums">₹{row.original.cost?.toLocaleString() || 0}</span>,
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
              <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View</DropdownMenuItem>
              <DropdownMenuItem>Mark in-progress</DropdownMenuItem>
              <DropdownMenuItem>Mark complete</DropdownMenuItem>
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
        <PageHeader title="Maintenance" description="Loading tickets..." breadcrumbs={[{ label: "Home" }, { label: "Maintenance" }]} />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  if (error || !maintenanceData) {
    return (
      <div className="rounded-md bg-destructive/15 p-4 text-destructive">
        Failed to load maintenance records.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Maintenance"
        description="Preventive schedules, service tickets and technician workload."
        breadcrumbs={[{ label: "Home" }, { label: "Maintenance" }]}
        actions={<AddMaintenanceDialog />}
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Total Tickets" value={maintenanceData.length} icon={Wrench} />
        <StatCard label="Today" value={maintenanceData.filter((m: any) => new Date(m.scheduledDate).toDateString() === new Date().toDateString()).length} icon={Clock} hint="scheduled" />
        <StatCard label="Pending" value={maintenanceData.filter((m: any) => m.status === "Pending").length} icon={CircleAlert} />
        <StatCard label="Completed" value={maintenanceData.filter((m: any) => m.status === "Completed").length} icon={CheckCircle2} />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        searchPlaceholder="Search by ticket, vehicle, issue…"
        toolbar={
          <Select value={statusF} onValueChange={setStatusF}>
            <SelectTrigger className="h-9 w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        }
      />
    </div>
  );
}

function AddMaintenanceDialog() {
  const [open, setOpen] = useState(false);
  const { data: vehicles } = useVehicles();
  const { mutateAsync: logMaintenance, isPending } = useLogMaintenance();
  const [vehicleId, setVehicleId] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      vehicleId,
      issue: formData.get("issue"),
      priority,
      technician: formData.get("technician"),
      scheduledDate: formData.get("scheduledDate"),
      notes: formData.get("notes"),
      status: 'Pending',
    };

    try {
      await logMaintenance(data);
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to create maintenance ticket");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" /> Log Maintenance</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>New maintenance ticket</DialogTitle></DialogHeader>
        <form
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          onSubmit={handleSubmit}
        >
          <div className="space-y-1.5">
            <Label>Vehicle</Label>
            <Select value={vehicleId} onValueChange={setVehicleId} required>
              <SelectTrigger><SelectValue placeholder="Select vehicle" /></SelectTrigger>
              <SelectContent>
                {vehicles?.map((v: any) => (
                  <SelectItem key={v._id} value={v._id}>{v.registrationNumber}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Priority</Label>
            <Select value={priority} onValueChange={setPriority} required>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Low", "Medium", "High", "Critical"].map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5 sm:col-span-2"><Label>Issue</Label><Input name="issue" placeholder="e.g. Brake pad replacement" required /></div>
          <div className="space-y-1.5"><Label>Technician</Label><Input name="technician" placeholder="Rakesh Bhat" /></div>
          <div className="space-y-1.5"><Label>Scheduled date</Label><Input name="scheduledDate" type="date" required /></div>
          <div className="space-y-1.5 sm:col-span-2"><Label>Notes</Label><Textarea name="notes" rows={3} /></div>
          <DialogFooter className="sm:col-span-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isPending}>{isPending ? "Creating..." : "Create Ticket"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}