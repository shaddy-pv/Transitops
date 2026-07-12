export type MaintenanceStatus = "Pending" | "In Progress" | "Completed";
export type Priority = "Low" | "Medium" | "High" | "Critical";

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  issue: string;
  priority: Priority;
  technician: string;
  scheduled: string;
  completed?: string;
  cost: number;
  status: MaintenanceStatus;
  notes: string;
}

const issues = [
  "Engine overhaul", "Brake pad replacement", "Tire rotation & alignment",
  "Clutch plate replacement", "Suspension inspection", "Battery replacement",
  "Coolant flush", "Oil & filter change", "AC compressor repair",
  "Gearbox service", "Electrical wiring fix", "Radiator repair",
  "Wheel bearing replacement", "Fuel injector cleaning", "Exhaust system repair",
];

const techs = [
  "Rakesh Bhat", "Suresh Pillai", "Naveen Kulkarni", "Mahesh Joshi", "Vinay Roy",
  "Ravindra Shetty", "Ajay Malhotra",
];

const priorities: Priority[] = ["Low", "Medium", "High", "Critical"];
const statuses: MaintenanceStatus[] = ["Pending", "In Progress", "Completed"];

export const maintenance: MaintenanceRecord[] = Array.from({ length: 15 }).map((_, i) => {
  const s = statuses[i < 4 ? 0 : i < 8 ? 1 : 2];
  const day = 1 + (i % 27);
  return {
    id: `M-${(500 + i).toString()}`,
    vehicleId: `V-${String(1 + (i % 22)).padStart(3, "0")}`,
    issue: issues[i % issues.length],
    priority: priorities[i % priorities.length],
    technician: techs[i % techs.length],
    scheduled: `2026-07-${String(day).padStart(2, "0")}`,
    completed: s === "Completed" ? `2026-07-${String(day + 1).padStart(2, "0")}` : undefined,
    cost: 2500 + ((i * 1330) % 45000),
    status: s,
    notes: "Preventive service as per fleet schedule.",
  };
});
