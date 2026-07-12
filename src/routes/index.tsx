import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Truck,
  Users,
  Route as RouteIcon,
  Wrench,
  Fuel,
  BarChart3,
  ArrowRight,
  PlayCircle,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

const features = [
  { icon: Truck, title: "Vehicle Management", desc: "Track every asset, from odometer to service history — one source of truth for the entire fleet." },
  { icon: Users, title: "Driver Management", desc: "Onboard, roster, and monitor driver safety scores, licenses and duty cycles at a glance." },
  { icon: RouteIcon, title: "Trip Dispatch", desc: "Plan, dispatch and track loads with live status transitions and route timelines." },
  { icon: Wrench, title: "Maintenance", desc: "Preventive schedules, priority triage and technician workflows keep your fleet moving." },
  { icon: Fuel, title: "Fuel Tracking", desc: "Detect anomalies, benchmark mileage and reconcile fuel spend across depots." },
  { icon: BarChart3, title: "Analytics", desc: "Board-ready reports for utilization, cost per km, downtime and route performance." },
];

const stats = [
  { value: "100+", label: "Vehicles under management" },
  { value: "24/7", label: "Fleet monitoring" },
  { value: "98%", label: "Operational efficiency" },
];

const steps = [
  { n: "01", t: "Manage Fleet", d: "Centralize vehicles, drivers, documents and depots." },
  { n: "02", t: "Dispatch Trips", d: "Assign the right truck to the right load in seconds." },
  { n: "03", t: "Track Performance", d: "Measure utilization, cost and safety with live analytics." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background">
              <Truck className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold tracking-tight">TransitOps</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#modules" className="hover:text-foreground">Modules</a>
            <a href="#about" className="hover:text-foreground">About</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              Login
            </Link>
            <Link
              to="/app/dashboard"
              className="hidden rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background hover:bg-foreground/90 sm:inline-flex"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06), transparent 40%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.04), transparent 45%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              v2.14 · Reports module now live
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Manage your entire fleet
              <br />
              <span className="text-muted-foreground">from one place.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Digitize vehicles, drivers, maintenance, dispatching and fleet
              operations with one unified dashboard built for logistics teams.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/app/dashboard"
                className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
              <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                <PlayCircle className="h-4 w-4" /> Watch Demo
              </button>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" /> SOC 2 Type II
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5" /> 99.98% uptime
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" /> ISO 27001
              </span>
            </div>
          </div>

          {/* Dashboard preview mock */}
          <div className="mt-16 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <div className="flex items-center gap-2 border-b border-border bg-secondary/40 px-4 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
              <span className="ml-3 text-xs text-muted-foreground">
                transitops.io · Dashboard
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-4">
              {[
                { l: "Total Vehicles", v: "128" },
                { l: "Active Trips", v: "42" },
                { l: "On-Duty Drivers", v: "76" },
                { l: "Fleet Utilization", v: "84%" },
              ].map((s) => (
                <div key={s.l} className="rounded-lg border border-border bg-background/60 p-4">
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    {s.l}
                  </p>
                  <p className="mt-2 text-xl font-semibold">{s.v}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4 px-6 pb-6 lg:grid-cols-3">
              <div className="col-span-2 rounded-lg border border-border bg-background/60 p-4">
                <p className="text-xs text-muted-foreground">Weekly utilization</p>
                <div className="mt-4 flex h-32 items-end gap-2">
                  {[52, 68, 74, 61, 82, 78, 88].map((v, i) => (
                    <div key={i} className="flex-1 rounded-t bg-foreground/70" style={{ height: `${v}%` }} />
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-border bg-background/60 p-4">
                <p className="text-xs text-muted-foreground">Active trips</p>
                <ul className="mt-3 space-y-2 text-xs">
                  {["Mumbai → Delhi", "Chennai → Bangalore", "Kolkata → Patna"].map((t) => (
                    <li key={t} className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0">
                      <span>{t}</span>
                      <span className="text-muted-foreground">In Transit</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Platform
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Every module your fleet needs.
            </h2>
            <p className="mt-3 text-muted-foreground">
              From onboarding a new vehicle to closing a maintenance ticket —
              TransitOps replaces a dozen spreadsheets and legacy tools.
            </p>
          </div>
          <div id="modules" className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="group bg-card p-6 transition-colors hover:bg-secondary/40">
                <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background/40">
                  <f.icon className="h-4 w-4" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Workflow
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Three steps to a running operation.
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.n} className="relative rounded-xl border border-border bg-card p-6">
                <span className="text-xs font-semibold tracking-widest text-muted-foreground">
                  {s.n}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{s.t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>
                {i < steps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-border md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="about" className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="border-l border-border pl-6">
                <p className="text-4xl font-semibold tracking-tight sm:text-5xl">{s.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to run a smarter fleet?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Start with the full dashboard — no setup, no credit card, just the
            product.
          </p>
          <Link
            to="/app/dashboard"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:bg-foreground/90"
          >
            Launch Dashboard <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-foreground text-background">
              <Truck className="h-3 w-3" />
            </span>
            TransitOps © 2026
          </div>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Security</a>
            <a href="#" className="hover:text-foreground">Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
