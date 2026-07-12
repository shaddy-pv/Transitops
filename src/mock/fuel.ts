export interface FuelLog {
  id: string;
  vehicleId: string;
  driverId: string;
  date: string;
  station: string;
  liters: number;
  pricePerLiter: number;
  total: number;
  odometer: number;
  mileage: number;
}

const stations = [
  "HP Highway Stop", "IndianOil Retail", "BPCL Fleet Pump", "Shell V-Power",
  "Reliance Trans-Connect", "Nayara Energy", "Essar Fleet",
];

export const fuelLogs: FuelLog[] = Array.from({ length: 30 }).map((_, i) => {
  const liters = 40 + ((i * 11) % 220);
  const ppl = 92 + ((i * 3) % 8);
  const day = 1 + (i % 27);
  return {
    id: `F-${(9000 + i).toString()}`,
    vehicleId: `V-${String(1 + (i % 22)).padStart(3, "0")}`,
    driverId: `D-${1001 + (i % 20)}`,
    date: `2026-07-${String(day).padStart(2, "0")}`,
    station: stations[i % stations.length],
    liters,
    pricePerLiter: ppl,
    total: Math.round(liters * ppl),
    odometer: 40000 + i * 1250,
    mileage: 3.6 + ((i % 20) / 10),
  };
});

export const monthlyFuel = [
  { month: "Jan", liters: 12400, cost: 1189000 },
  { month: "Feb", liters: 11890, cost: 1145200 },
  { month: "Mar", liters: 13210, cost: 1268000 },
  { month: "Apr", liters: 12980, cost: 1244300 },
  { month: "May", liters: 14120, cost: 1355400 },
  { month: "Jun", liters: 13890, cost: 1332800 },
  { month: "Jul", liters: 14520, cost: 1401700 },
];
