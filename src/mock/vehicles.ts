export type VehicleStatus = "Available" | "In Transit" | "Maintenance" | "Idle";
export type VehicleType = "Truck" | "Van" | "Trailer" | "Container" | "Tanker" | "Reefer";

export interface Vehicle {
  id: string;
  registration: string;
  name: string;
  type: VehicleType;
  capacity: string;
  odometer: number;
  fuelType: "Diesel" | "Petrol" | "Electric";
  status: VehicleStatus;
  year: number;
  lastServiced: string;
  location: string;
}

export const vehicles: Vehicle[] = [
  { id: "V-001", registration: "MH-12-AB-4521", name: "Volvo FH16", type: "Truck", capacity: "25 T", odometer: 128430, fuelType: "Diesel", status: "In Transit", year: 2022, lastServiced: "2026-05-12", location: "Mumbai Hub" },
  { id: "V-002", registration: "DL-08-CA-1902", name: "Tata Prima 4028", type: "Truck", capacity: "28 T", odometer: 94210, fuelType: "Diesel", status: "Available", year: 2023, lastServiced: "2026-06-04", location: "Delhi Depot" },
  { id: "V-003", registration: "KA-05-EF-7810", name: "Ashok Leyland 3520", type: "Trailer", capacity: "35 T", odometer: 210443, fuelType: "Diesel", status: "Maintenance", year: 2020, lastServiced: "2026-06-28", location: "Bangalore Yard" },
  { id: "V-004", registration: "TN-22-KL-3345", name: "BharatBenz 1617", type: "Truck", capacity: "16 T", odometer: 58910, fuelType: "Diesel", status: "Available", year: 2024, lastServiced: "2026-04-18", location: "Chennai Hub" },
  { id: "V-005", registration: "GJ-01-MN-2211", name: "Mahindra Furio 14", type: "Truck", capacity: "14 T", odometer: 71200, fuelType: "Diesel", status: "In Transit", year: 2023, lastServiced: "2026-03-22", location: "Ahmedabad" },
  { id: "V-006", registration: "MH-14-PQ-9910", name: "Eicher Pro 2059", type: "Van", capacity: "5 T", odometer: 43120, fuelType: "Diesel", status: "Idle", year: 2024, lastServiced: "2026-05-30", location: "Pune Depot" },
  { id: "V-007", registration: "UP-16-RS-8823", name: "Tata Ultra T.9", type: "Van", capacity: "9 T", odometer: 88450, fuelType: "Diesel", status: "In Transit", year: 2022, lastServiced: "2026-02-14", location: "Noida" },
  { id: "V-008", registration: "HR-26-TU-1122", name: "Volvo FMX 460", type: "Tanker", capacity: "22 T", odometer: 154210, fuelType: "Diesel", status: "Available", year: 2021, lastServiced: "2026-06-11", location: "Gurugram" },
  { id: "V-009", registration: "RJ-14-VW-3300", name: "Scania R500", type: "Trailer", capacity: "40 T", odometer: 198220, fuelType: "Diesel", status: "In Transit", year: 2020, lastServiced: "2026-01-09", location: "Jaipur" },
  { id: "V-010", registration: "MP-04-XY-4488", name: "Force Traveller 3350", type: "Van", capacity: "3 T", odometer: 61230, fuelType: "Petrol", status: "Available", year: 2023, lastServiced: "2026-05-01", location: "Indore" },
  { id: "V-011", registration: "WB-20-ZA-6612", name: "MAN CLA 25.220", type: "Container", capacity: "20 T", odometer: 111450, fuelType: "Diesel", status: "Maintenance", year: 2021, lastServiced: "2026-06-25", location: "Kolkata Yard" },
  { id: "V-012", registration: "AP-31-BC-7745", name: "Tata Signa 4825", type: "Trailer", capacity: "38 T", odometer: 175880, fuelType: "Diesel", status: "In Transit", year: 2022, lastServiced: "2026-04-08", location: "Vizag" },
  { id: "V-013", registration: "TS-09-DE-2020", name: "Ashok Leyland Boss 1315", type: "Truck", capacity: "13 T", odometer: 39840, fuelType: "Diesel", status: "Available", year: 2024, lastServiced: "2026-06-01", location: "Hyderabad" },
  { id: "V-014", registration: "KL-07-FG-9911", name: "Mahindra Blazo X 42", type: "Trailer", capacity: "42 T", odometer: 122390, fuelType: "Diesel", status: "In Transit", year: 2022, lastServiced: "2026-03-15", location: "Kochi" },
  { id: "V-015", registration: "PB-10-HI-3388", name: "BharatBenz 2823R", type: "Truck", capacity: "28 T", odometer: 84210, fuelType: "Diesel", status: "Idle", year: 2023, lastServiced: "2026-05-19", location: "Ludhiana" },
  { id: "V-016", registration: "OD-02-JK-5511", name: "Tata Ace Gold EV", type: "Van", capacity: "1 T", odometer: 12420, fuelType: "Electric", status: "Available", year: 2025, lastServiced: "2026-06-20", location: "Bhubaneswar" },
  { id: "V-017", registration: "BR-01-LM-7799", name: "Eicher Pro 6055T", type: "Trailer", capacity: "35 T", odometer: 141220, fuelType: "Diesel", status: "In Transit", year: 2021, lastServiced: "2026-02-27", location: "Patna" },
  { id: "V-018", registration: "CG-04-NO-6644", name: "Volvo FMX 500", type: "Tanker", capacity: "24 T", odometer: 167300, fuelType: "Diesel", status: "Maintenance", year: 2020, lastServiced: "2026-06-30", location: "Raipur" },
  { id: "V-019", registration: "JH-05-PQ-2255", name: "Tata LPT 1109", type: "Truck", capacity: "11 T", odometer: 55920, fuelType: "Diesel", status: "Available", year: 2024, lastServiced: "2026-05-25", location: "Ranchi" },
  { id: "V-020", registration: "AS-01-RS-9988", name: "Ashok Leyland U-2820", type: "Reefer", capacity: "20 T", odometer: 98410, fuelType: "Diesel", status: "In Transit", year: 2023, lastServiced: "2026-04-12", location: "Guwahati" },
  { id: "V-021", registration: "MH-01-TU-1010", name: "Scania G410", type: "Trailer", capacity: "37 T", odometer: 76540, fuelType: "Diesel", status: "Available", year: 2024, lastServiced: "2026-06-15", location: "Navi Mumbai" },
  { id: "V-022", registration: "GA-03-VW-5522", name: "Isuzu D-Max Cargo", type: "Van", capacity: "2 T", odometer: 22100, fuelType: "Diesel", status: "Idle", year: 2024, lastServiced: "2026-05-05", location: "Panaji" },
];
