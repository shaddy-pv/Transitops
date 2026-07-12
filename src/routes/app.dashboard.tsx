import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Truck,
  Users,
  Wrench,
  Route as RouteIcon,
  Clock,
  Gauge,
  CircleCheck,
  CircleAlert,
  Plus,
  Download,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useDashboardStats } from "@/hooks/useFleetData";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/app/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { data: dashboardData, isLoading, error } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Fleet Overview" description="Loading real-time snapshot..." breadcrumbs={[{ label: "Home" }, { label: "Dashboard" }]} />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 2xl:grid-cols-7">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="rounded-md bg-destructive/15 p-4 text-destructive">
        Failed to load dashboard data. Please try again.
      </div>
    );
  }

  const { stats, utilizationTrend, activities = [], monthlyFuel = [], licenseSoon = [], recentTrips = [] } = dashboardData;

  const {
    totalVehicles,
    available,
    inMaintenance,
    onDuty,
    activeTrips,
    pendingTrips,
    utilization,
  } = stats;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fleet Overview"
        description="Real-time snapshot of your operations, updated dynamically."
        breadcrumbs={[{ label: "Home" }, { label: "Dashboard" }]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download className="mr-1.5 h-3.5 w-3.5" /> Export
            </Button>
            <Button size="sm" asChild>
              <Link to="/app/trips">
                <Plus className="mr-1.5 h-3.5 w-3.5" /> New Trip
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 2xl:grid-cols-7">
        <StatCard label="Total Vehicles" value={totalVehicles} icon={Truck} delta={3} hint="vs last week" />
        <StatCard label="Available" value={available} icon={CircleCheck} delta={5} hint="ready" />
        <StatCard label="In Maintenance" value={inMaintenance} icon={Wrench} delta={-2} hint="under service" />
        <StatCard label="Drivers On Duty" value={onDuty} icon={Users} delta={4} hint="active shift" />
        <StatCard label="Active Trips" value={activeTrips} icon={RouteIcon} delta={7} hint="in transit" />
        <StatCard label="Pending Trips" value={pendingTrips} icon={Clock} delta={-1} hint="awaiting dispatch" />
        <StatCard label="Fleet Utilization" value={`${utilization}%`} icon={Gauge} delta={2} hint="7-day avg" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">Fleet Utilization</h3>
              <p className="text-xs text-muted-foreground">Weekly average across all depots</p>
            </div>
            <span className="text-xs text-muted-foreground">Last 7 days</span>
          </div>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={utilizationTrend} margin={{ left: -20, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="util" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#fff" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#fff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#232323" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" stroke="#71717a" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: "#111", border: "1px solid #232323", borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: "#a1a1aa" }}
                />
                <Area type="monotone" dataKey="utilization" stroke="#fff" strokeWidth={1.5} fill="url(#util)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">Monthly Fuel</h3>
              <p className="text-xs text-muted-foreground">Liters consumed</p>
            </div>
          </div>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyFuel} margin={{ left: -20, right: 8, top: 8 }}>
                <CartesianGrid stroke="#232323" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="#71717a" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: "#111", border: "1px solid #232323", borderRadius: 8, fontSize: 12 }}
                />
                <Bar dataKey="liters" fill="#e4e4e7" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h3 className="text-sm font-semibold">Recent Trips</h3>
              <p className="text-xs text-muted-foreground">Latest dispatches across the network</p>
            </div>
            <Link to="/app/trips" className="text-xs text-muted-foreground hover:text-foreground">
              View all →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/40 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-5 py-2.5 text-left font-medium">Trip</th>
                  <th className="px-5 py-2.5 text-left font-medium">Route</th>
                  <th className="px-5 py-2.5 text-left font-medium">Vehicle</th>
                  <th className="px-5 py-2.5 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTrips.map((t) => (
                  <tr key={t.id} className="border-t border-border/60 hover:bg-secondary/30">
                    <td className="px-5 py-3 font-medium">{t.code}</td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {t.source} → {t.destination}
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{t.vehicleId}</td>
                    <td className="px-5 py-3"><StatusBadge status={t.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border px-5 py-4">
            <h3 className="text-sm font-semibold">Recent Activity</h3>
            <p className="text-xs text-muted-foreground">Actions across your team</p>
          </div>
          <ul className="max-h-[360px] overflow-y-auto p-2">
            {activities.map((a) => (
              <li key={a.id} className="flex items-start gap-3 rounded-md px-3 py-2 hover:bg-secondary/40">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="bg-secondary text-[10px]">
                    {a.actor.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 text-sm">
                  <p className="truncate">
                    <span className="font-medium">{a.actor}</span>{" "}
                    <span className="text-muted-foreground">{a.action}</span>
                  </p>
                  <p className="text-[10px] text-muted-foreground">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border px-5 py-4">
            <h3 className="text-sm font-semibold">Upcoming License Expiry</h3>
            <p className="text-xs text-muted-foreground">Renew before these dates</p>
          </div>
          <ul className="divide-y divide-border/60">
            {licenseSoon.map((d) => (
              <li key={d.id} className="flex items-center justify-between px-5 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{d.name}</p>
                  <p className="text-xs text-muted-foreground">{d.licenseNumber}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">Expires</span>
                  <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-400 ring-1 ring-inset ring-amber-500/20">
                    {d.licenseExpiry}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border px-5 py-4">
            <h3 className="text-sm font-semibold">Maintenance Overview</h3>
            <p className="text-xs text-muted-foreground">Weekly service load</p>
          </div>
          <div className="grid grid-cols-3 divide-x divide-border">
            {(dashboardData.maintenanceOverview || [
              { l: "Today", v: 3, icon: Clock, color: "text-sky-400" },
              { l: "Pending", v: 8, icon: CircleAlert, color: "text-amber-400" },
              { l: "Completed", v: 12, icon: CircleCheck, color: "text-emerald-400" },
            ]).map((s: any) => {
              const Icon = s.icon === "Clock" ? Clock : s.icon === "CircleAlert" ? CircleAlert : s.icon === "CircleCheck" ? CircleCheck : s.icon;
              return (
                <div key={s.l} className="p-5">
                  <Icon className={`h-4 w-4 ${s.color}`} />
                  <p className="mt-3 text-2xl font-semibold">{s.v}</p>
                  <p className="text-xs text-muted-foreground">{s.l}</p>
                </div>
              );
            })}
          </div>
          <div className="border-t border-border p-5">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Quick actions</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/app/maintenance">Open queue</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/app/vehicles">Vehicle health</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/app/reports">Cost report</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}