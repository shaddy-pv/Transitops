import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Fuel, Receipt, Gauge, TrendingUp } from "lucide-react";
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { fuelLogs, monthlyFuel, type FuelLog } from "@/mock/fuel";
import { expenses, type Expense } from "@/mock/expenses";

export const Route = createFileRoute("/app/fuel")({
  component: FuelPage,
});

function FuelPage() {
  const totalLiters = fuelLogs.reduce((s, l) => s + l.liters, 0);
  const totalCost = fuelLogs.reduce((s, l) => s + l.total, 0);
  const avgMileage = (fuelLogs.reduce((s, l) => s + l.mileage, 0) / fuelLogs.length).toFixed(2);

  const fuelColumns: ColumnDef<FuelLog>[] = useMemo(
    () => [
      { accessorKey: "id", header: "Log" },
      { accessorKey: "date", header: "Date" },
      { accessorKey: "vehicleId", header: "Vehicle" },
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
        accessorKey: "total",
        header: "Total",
        cell: ({ row }) => <span className="tabular-nums font-medium">₹{row.original.total.toLocaleString()}</span>,
      },
      {
        accessorKey: "mileage",
        header: "Mileage",
        cell: ({ row }) => <span className="tabular-nums text-muted-foreground">{row.original.mileage.toFixed(1)} km/L</span>,
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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fuel & Expenses"
        description="Monitor fuel consumption, mileage anomalies and operational spend."
        breadcrumbs={[{ label: "Home" }, { label: "Fuel & Expenses" }]}
        actions={<Button size="sm">Log expense</Button>}
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
              <LineChart data={monthlyFuel} margin={{ left: -20, right: 8, top: 8 }}>
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
              <BarChart data={monthlyFuel} margin={{ left: -10, right: 8, top: 8 }}>
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