import { createFileRoute } from "@tanstack/react-router";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Download, FileText, Wallet, Gauge, Wrench, Fuel } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { Button } from "@/components/ui/button";
import { utilizationTrend, tripsByStatus } from "@/mock/dashboard";
import { monthlyFuel } from "@/mock/fuel";

export const Route = createFileRoute("/app/reports")({
  component: ReportsPage,
});

const PIE_COLORS = ["#f4f4f5", "#a1a1aa", "#71717a", "#52525b", "#3f3f46"];

function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Analytics"
        description="Executive view of cost, utilization and performance."
        breadcrumbs={[{ label: "Home" }, { label: "Reports" }]}
        actions={
          <>
            <Button variant="outline" size="sm"><FileText className="mr-1.5 h-3.5 w-3.5" /> Export PDF</Button>
            <Button size="sm"><Download className="mr-1.5 h-3.5 w-3.5" /> Export CSV</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Total Cost (YTD)" value="₹94.2 L" icon={Wallet} delta={-3} hint="vs last year" />
        <StatCard label="Fleet Utilization" value="78%" icon={Gauge} delta={4} />
        <StatCard label="Fuel Consumption" value="93.1k L" icon={Fuel} delta={2} />
        <StatCard label="Maintenance Cost" value="₹18.4 L" icon={Wrench} delta={-6} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">Monthly Fuel Spend</h3>
              <p className="text-xs text-muted-foreground">Last 7 months</p>
            </div>
          </div>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyFuel} margin={{ left: -10, right: 8, top: 8 }}>
                <CartesianGrid stroke="#232323" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="#71717a" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "#111", border: "1px solid #232323", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="cost" fill="#e4e4e7" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold">Trips by Status</h3>
          <p className="text-xs text-muted-foreground">Quarter to date</p>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tripsByStatus}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {tripsByStatus.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="#111" />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#111", border: "1px solid #232323", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11, color: "#a1a1aa" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">Fleet Utilization Trend</h3>
            <p className="text-xs text-muted-foreground">Weekly average utilization</p>
          </div>
        </div>
        <div className="mt-6 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={utilizationTrend} margin={{ left: -10, right: 8, top: 8 }}>
              <CartesianGrid stroke="#232323" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" stroke="#71717a" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis stroke="#71717a" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "#111", border: "1px solid #232323", borderRadius: 8, fontSize: 12 }} />
              <Line dataKey="utilization" stroke="#fff" strokeWidth={1.5} dot={{ r: 3, fill: "#fff" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}