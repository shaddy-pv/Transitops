export type ExpenseCategory =
  | "Fuel"
  | "Maintenance"
  | "Tolls"
  | "Driver Allowance"
  | "Insurance"
  | "Permits"
  | "Parking";

export interface Expense {
  id: string;
  category: ExpenseCategory;
  vehicleId?: string;
  description: string;
  amount: number;
  date: string;
  approvedBy: string;
}

const cats: ExpenseCategory[] = [
  "Fuel", "Maintenance", "Tolls", "Driver Allowance", "Insurance", "Permits", "Parking",
];

export const expenses: Expense[] = Array.from({ length: 24 }).map((_, i) => {
  const day = 1 + (i % 27);
  return {
    id: `E-${(3000 + i).toString()}`,
    category: cats[i % cats.length],
    vehicleId: `V-${String(1 + (i % 22)).padStart(3, "0")}`,
    description: `${cats[i % cats.length]} expense for route ${100 + i}`,
    amount: 1200 + ((i * 811) % 32000),
    date: `2026-07-${String(day).padStart(2, "0")}`,
    approvedBy: ["Anita Rao", "Karan Mehta", "Neha Kapoor"][i % 3],
  };
});
