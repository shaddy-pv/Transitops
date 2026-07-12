export type TripStatus = "Draft" | "Dispatched" | "In Transit" | "Completed" | "Cancelled";

export interface Trip {
  id: string;
  code: string;
  source: string;
  destination: string;
  vehicleId: string;
  driverId: string;
  cargo: string;
  cargoWeight: number;
  distance: number;
  scheduled: string;
  status: TripStatus;
  cost: number;
}

const cities = [
  "Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Pune",
  "Ahmedabad", "Jaipur", "Kochi", "Lucknow", "Nagpur", "Indore", "Surat", "Bhopal",
];

const cargoTypes = [
  "Consumer Electronics", "Steel Coils", "Automotive Parts", "Pharma Cold Chain",
  "Textile Rolls", "Cement Bags", "FMCG Goods", "Refrigerated Food", "Industrial Chemicals",
  "Machinery", "Retail Inventory", "Construction Material",
];

function pick<T>(arr: T[], i: number): T {
  return arr[i % arr.length];
}

const statuses: TripStatus[] = ["Draft", "Dispatched", "In Transit", "Completed", "Cancelled"];

export const trips: Trip[] = Array.from({ length: 30 }).map((_, i) => {
  const src = pick(cities, i);
  let dest = pick(cities, i + 3);
  if (dest === src) dest = pick(cities, i + 5);
  const distance = 180 + ((i * 137) % 1600);
  const weight = 3 + ((i * 7) % 30);
  const statusIdx = i < 6 ? 0 : i < 12 ? 1 : i < 20 ? 2 : i < 27 ? 3 : 4;
  const day = 1 + (i % 27);
  return {
    id: `T-${(1000 + i).toString()}`,
    code: `TRIP-${(4200 + i).toString()}`,
    source: src,
    destination: dest,
    vehicleId: `V-${String(1 + (i % 22)).padStart(3, "0")}`,
    driverId: `D-${1001 + (i % 20)}`,
    cargo: pick(cargoTypes, i),
    cargoWeight: weight,
    distance,
    scheduled: `2026-07-${String(day).padStart(2, "0")}`,
    status: statuses[statusIdx],
    cost: Math.round(distance * (18 + (i % 6))),
  };
});
