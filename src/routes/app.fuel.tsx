import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Fuel, Receipt, Gauge, TrendingUp, Plus } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { expenses, type Expense } from "@/mock/expenses";
import { monthlyFuel as mockMonthlyFuel } from "@/mock/fuel";
import { useFuel, useLogFuel, useVehicles } from "@/hooks/useFleetData";

export const Route = createFileRoute("/app/fuel")({
  component: FuelPage,
});

function FuelPage() {
  const { data: fuelLogsData, isLoading, error } = useFuel();

  const fuelLogs = fuelLogsData || [];

  const totalLiters = fuelLogs.reduce((s: number, l: any) => s + l.liters, 0);
  const totalCost = fuelLogs.reduce((s: number, l: any) => s + l.totalCost, 0);
  const avgMileage = fuelLogs.length ? (fuelLogs.reduce((s: number, l: any) => s + (l.odometer / l.liters), 0) / fuelLogs.length).toFixed(2) : "0.00";

  const fuelColumns: ColumnDef<any>[] = useMemo(
    () => [
      { accessorKey: "id", header: "Log", cell: ({ row }) => row.original._id.substring(row.original._id.length - 6).toUpperCase() },
      { 
        accessorKey: "date", 
        header: "Date",
        cell: ({ row }) => <span>{new Date(row.original.date).toLocaleDateString()}</span>
      },
      { 
        accessorKey: "vehicle", 
        header: "Vehicle",
        cell: ({ row }) => <span>{row.original.vehicle?.registrationNumber || row.original.vehicleId}</span>
      },
      { accessorKey: "station", header: "Station" },
      {
        accessorKey: "liters",
        header: "Liters",
        cell: ({ row }) => <span className="tabular-nums">{row.original.liters} L</span>,
      },
      {
        accessorKey: "pricePerLiter",
        header: "₹/L",
        cell: ({ row }) => <span className="tabular-nums">₹{row.original.pricePerLiter}</span>,
      },
      {
        accessorKey: "totalCost",
        header: "Total",
        cell: ({ row }) => <span className="tabular-nums font-medium">₹{row.original.totalCost?.toLocaleString() || 0}</span>,
      },
    ],
    [],
  );

  const expenseColumns: ColumnDef<Expense>[] = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "date", header: "Date" },
      { accessorKey: "category", header: "Category" },
      { accessorKey: "description", header: "Description" },
      { accessorKey: "vehicleId", header: "Vehicle" },
      { accessorKey: "approvedBy", header: "Approved by" },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => <span className="tabular-nums font-medium">₹{row.original.amount.toLocaleString()}</span>,
      },
    ],
    [],
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Fuel & Expenses" description="Loading data..." breadcrumbs={[{ label: "Home" }, { label: "Fuel & Expenses" }]} />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  if (error || !fuelLogsData) {
    return (
      <div className="rounded-md bg-destructive/15 p-4 text-destructive">
        Failed to load fuel records.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fuel & Expenses"
        description="Monitor fuel consumption, mileage anomalies and operational spend."
        breadcrumbs={[{ label: "Home" }, { label: "Fuel & Expenses" }]}
        actions={<LogFuelDialog />}
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Fuel Used (MTD)" value={`${totalLiters.toLocaleString()} L`} icon={Fuel} delta={4} />
        <StatCard label="Fuel Cost" value={`₹${(totalCost / 1000).toFixed(1)}k`} icon={Receipt} delta={6} />
        <StatCard label="Avg Mileage" value={`${avgMileage} km/L`} icon={Gauge} delta={-1} />
        <StatCard
          label="Total Expenses"
          value={`₹${(expenses.reduce((s, e) => s + e.amount, 0) / 1000).toFixed(1)}k`}
          icon={TrendingUp}
          delta={3}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold">Monthly Fuel Usage</h3>
          <p className="text-xs text-muted-foreground">Liters consumed</p>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockMonthlyFuel} margin={{ left: -20, right: 8, top: 8 }}>
                <CartesianGrid stroke="#232323" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="#71717a" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "#111", border: "1px solid #232323", borderRadius: 8, fontSize: 12 }} />
                <Line dataKey="liters" stroke="#fff" strokeWidth={1.5} dot={{ r: 2, fill: "#fff" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold">Monthly Cost</h3>
          <p className="text-xs text-muted-foreground">Fuel spend in ₹</p>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockMonthlyFuel} margin={{ left: -10, right: 8, top: 8 }}>
                <CartesianGrid stroke="#232323" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="#71717a" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "#111", border: "1px solid #232323", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="cost" fill="#a1a1aa" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <Tabs defaultValue="fuel" className="space-y-4">
        <TabsList>
          <TabsTrigger value="fuel">Fuel logs</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>
        <TabsContent value="fuel">
          <DataTable columns={fuelColumns} data={fuelLogs} searchPlaceholder="Search fuel logs…" />
        </TabsContent>
        <TabsContent value="expenses">
          <DataTable columns={expenseColumns} data={expenses} searchPlaceholder="Search expenses…" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function LogFuelDialog() {
  const [open, setOpen] = useState(false);
  const { data: vehicles } = useVehicles();
  const { mutateAsync: logFuel, isPending } = useLogFuel();
  const [vehicleId, setVehicleId] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      vehicleId,
      date: formData.get("date"),
      station: formData.get("station"),
      liters: Number(formData.get("liters")),
      pricePerLiter: Number(formData.get("pricePerLiter")),
      totalCost: Number(formData.get("liters")) * Number(formData.get("pricePerLiter")),
      odometer: Number(formData.get("odometer")),
    };

    try {
      await logFuel(data);
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to log fuel");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" /> Log Fuel</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>New fuel log</DialogTitle></DialogHeader>
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
          <div className="space-y-1.5"><Label>Date</Label><Input name="date" type="date" required /></div>
          <div className="space-y-1.5"><Label>Station</Label><Input name="station" placeholder="IndianOil, Bandra" required /></div>
          <div className="space-y-1.5"><Label>Odometer (km)</Label><Input name="odometer" type="number" placeholder="45200" required /></div>
          <div className="space-y-1.5"><Label>Liters</Label><Input name="liters" type="number" step="0.01" placeholder="50.5" required /></div>
          <div className="space-y-1.5"><Label>Price per liter (₹)</Label><Input name="pricePerLiter" type="number" step="0.01" placeholder="95.50" required /></div>
          <div className="space-y-1.5 sm:col-span-2"><Label>Notes</Label><Textarea name="notes" rows={2} /></div>
          <DialogFooter className="sm:col-span-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : "Save Log"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}