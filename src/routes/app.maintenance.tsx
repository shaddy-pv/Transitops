import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Plus, Wrench, CheckCircle2, Clock, CircleAlert } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { maintenance as data, type MaintenanceRecord } from "@/mock/maintenance";

export const Route = createFileRoute("/app/maintenance")({
  component: MaintenancePage,
});

function MaintenancePage() {
  const [statusF, setStatusF] = useState("all");
  const filtered = useMemo(
    () => (statusF === "all" ? data : data.filter((m) => m.status === statusF)),
    [statusF],
  );

  const columns: ColumnDef<MaintenanceRecord>[] = useMemo(
    () => [
      { accessorKey: "id", header: "Ticket" },
      { accessorKey: "vehicleId", header: "Vehicle" },
      { accessorKey: "issue", header: "Issue" },
      {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ row }) => <StatusBadge status={row.original.priority} />,
      },
      { accessorKey: "technician", header: "Technician" },
      { accessorKey: "scheduled", header: "Scheduled" },
      {
        accessorKey: "cost",
        header: "Cost",
        cell: ({ row }) => <span className="tabular-nums">₹{row.original.cost.toLocaleString()}</span>,
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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Maintenance"
        description="Preventive schedules, service tickets and technician workload."
        breadcrumbs={[{ label: "Home" }, { label: "Maintenance" }]}
        actions={<AddMaintenanceDialog />}
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Total Tickets" value={data.length} icon={Wrench} />
        <StatCard label="Today" value={3} icon={Clock} hint="scheduled" />
        <StatCard label="Pending" value={data.filter((m) => m.status === "Pending").length} icon={CircleAlert} />
        <StatCard label="Completed" value={data.filter((m) => m.status === "Completed").length} icon={CheckCircle2} />
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
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" /> Log Maintenance</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>New maintenance ticket</DialogTitle></DialogHeader>
        <form
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          onSubmit={(e) => { e.preventDefault(); setOpen(false); }}
        >
          <div className="space-y-1.5"><Label>Vehicle</Label><Input placeholder="V-011" required /></div>
          <div className="space-y-1.5">
            <Label>Priority</Label>
            <Select defaultValue="Medium">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Low", "Medium", "High", "Critical"].map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5 sm:col-span-2"><Label>Issue</Label><Input placeholder="e.g. Brake pad replacement" required /></div>
          <div className="space-y-1.5"><Label>Technician</Label><Input placeholder="Rakesh Bhat" /></div>
          <div className="space-y-1.5"><Label>Scheduled date</Label><Input type="date" required /></div>
          <div className="space-y-1.5 sm:col-span-2"><Label>Notes</Label><Textarea rows={3} /></div>
          <DialogFooter className="sm:col-span-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Create Ticket</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}