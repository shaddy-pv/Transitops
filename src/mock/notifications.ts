export interface Notification {
  id: string;
  title: string;
  detail: string;
  time: string;
  type: "info" | "warning" | "success" | "critical";
  read: boolean;
}

export const notifications: Notification[] = [
  { id: "N-01", title: "Trip TRIP-4218 completed", detail: "Vehicle V-014 arrived at Kochi hub.", time: "12m ago", type: "success", read: false },
  { id: "N-02", title: "Maintenance overdue", detail: "V-011 clutch service delayed by 3 days.", time: "45m ago", type: "warning", read: false },
  { id: "N-03", title: "License expiring", detail: "Driver Vikram Singh's license expires Nov 5.", time: "2h ago", type: "warning", read: false },
  { id: "N-04", title: "Fuel anomaly detected", detail: "Vehicle V-006 mileage dropped 22% this week.", time: "3h ago", type: "critical", read: true },
  { id: "N-05", title: "New trip dispatched", detail: "TRIP-4221 dispatched from Delhi to Jaipur.", time: "5h ago", type: "info", read: true },
  { id: "N-06", title: "Driver checked in", detail: "Ganesh Iyer started shift at Chennai hub.", time: "6h ago", type: "info", read: true },
  { id: "N-07", title: "Permit renewal required", detail: "Interstate permit for V-018 expires next week.", time: "1d ago", type: "warning", read: true },
  { id: "N-08", title: "Monthly report available", detail: "June fleet performance report ready.", time: "1d ago", type: "info", read: true },
  { id: "N-09", title: "Vehicle back in service", detail: "V-003 released from maintenance yard.", time: "2d ago", type: "success", read: true },
  { id: "N-10", title: "Insurance renewed", detail: "V-005 annual insurance policy renewed.", time: "2d ago", type: "success", read: true },
  { id: "N-11", title: "Fuel top-up", detail: "220 L refuel at HP Highway Stop for V-009.", time: "3d ago", type: "info", read: true },
  { id: "N-12", title: "Trip cancelled", detail: "TRIP-4225 cancelled by dispatcher.", time: "3d ago", type: "critical", read: true },
  { id: "N-13", title: "Route optimization", detail: "New optimal route saved for Mumbai–Delhi corridor.", time: "4d ago", type: "info", read: true },
  { id: "N-14", title: "Compliance check passed", detail: "All 22 vehicles cleared safety compliance audit.", time: "5d ago", type: "success", read: true },
  { id: "N-15", title: "New driver onboarded", detail: "Imran Khan added to Mumbai roster.", time: "5d ago", type: "info", read: true },
  { id: "N-16", title: "Expense approval pending", detail: "3 tolls awaiting supervisor approval.", time: "6d ago", type: "warning", read: true },
  { id: "N-17", title: "Odometer anomaly", detail: "V-012 odometer reading missing for Jun 12.", time: "1w ago", type: "warning", read: true },
  { id: "N-18", title: "Backup completed", detail: "Nightly telemetry backup completed.", time: "1w ago", type: "success", read: true },
  { id: "N-19", title: "Cost target achieved", detail: "Q2 fuel cost 4.2% below target.", time: "1w ago", type: "success", read: true },
  { id: "N-20", title: "System update", detail: "TransitOps v2.14 deployed with new reports module.", time: "2w ago", type: "info", read: true },
];
