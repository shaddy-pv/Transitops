export type DriverStatus = "On Duty" | "Off Duty" | "On Leave" | "Suspended";

export interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  licenseExpiry: string;
  phone: string;
  email: string;
  safetyScore: number;
  status: DriverStatus;
  experience: number;
  assignedVehicle?: string;
  base: string;
}

export const drivers: Driver[] = [
  { id: "D-1001", name: "Rajesh Kumar", licenseNumber: "MH1420190001234", licenseExpiry: "2027-04-11", phone: "+91 98765 43210", email: "rajesh.k@transitops.io", safetyScore: 94, status: "On Duty", experience: 12, assignedVehicle: "V-001", base: "Mumbai" },
  { id: "D-1002", name: "Anil Sharma", licenseNumber: "DL0820180005621", licenseExpiry: "2026-08-22", phone: "+91 98123 55621", email: "anil.s@transitops.io", safetyScore: 88, status: "On Duty", experience: 9, assignedVehicle: "V-002", base: "Delhi" },
  { id: "D-1003", name: "Suresh Nair", licenseNumber: "KL0720200008812", licenseExpiry: "2028-01-30", phone: "+91 99456 22190", email: "suresh.n@transitops.io", safetyScore: 96, status: "Off Duty", experience: 15, base: "Kochi" },
  { id: "D-1004", name: "Vikram Singh", licenseNumber: "PB1020170007745", licenseExpiry: "2026-11-05", phone: "+91 97654 88112", email: "vikram.s@transitops.io", safetyScore: 82, status: "On Duty", experience: 8, assignedVehicle: "V-005", base: "Ludhiana" },
  { id: "D-1005", name: "Ganesh Iyer", licenseNumber: "TN2220160003321", licenseExpiry: "2027-06-18", phone: "+91 90000 41120", email: "ganesh.i@transitops.io", safetyScore: 91, status: "On Duty", experience: 11, assignedVehicle: "V-004", base: "Chennai" },
  { id: "D-1006", name: "Mohammed Farooq", licenseNumber: "TS0920190006654", licenseExpiry: "2026-09-14", phone: "+91 96543 22118", email: "farooq.m@transitops.io", safetyScore: 78, status: "On Leave", experience: 6, base: "Hyderabad" },
  { id: "D-1007", name: "Devendra Patil", licenseNumber: "MH1220150009911", licenseExpiry: "2026-07-08", phone: "+91 99881 44320", email: "dev.p@transitops.io", safetyScore: 85, status: "On Duty", experience: 14, assignedVehicle: "V-021", base: "Mumbai" },
  { id: "D-1008", name: "Ramesh Yadav", licenseNumber: "UP1620170003390", licenseExpiry: "2027-02-25", phone: "+91 96712 90032", email: "ramesh.y@transitops.io", safetyScore: 90, status: "On Duty", experience: 10, assignedVehicle: "V-007", base: "Noida" },
  { id: "D-1009", name: "Kiran Deshmukh", licenseNumber: "MH1420160002233", licenseExpiry: "2026-12-01", phone: "+91 98212 33012", email: "kiran.d@transitops.io", safetyScore: 87, status: "Off Duty", experience: 7, base: "Pune" },
  { id: "D-1010", name: "Sanjay Rao", licenseNumber: "KA0520180008801", licenseExpiry: "2027-08-17", phone: "+91 98453 21567", email: "sanjay.r@transitops.io", safetyScore: 93, status: "On Duty", experience: 13, assignedVehicle: "V-014", base: "Bangalore" },
  { id: "D-1011", name: "Prakash Menon", licenseNumber: "KL0720190002210", licenseExpiry: "2028-03-04", phone: "+91 96345 88771", email: "prakash.m@transitops.io", safetyScore: 89, status: "Off Duty", experience: 9, base: "Kochi" },
  { id: "D-1012", name: "Harish Chandra", licenseNumber: "UK0520160005544", licenseExpiry: "2026-10-10", phone: "+91 98111 33445", email: "harish.c@transitops.io", safetyScore: 74, status: "Suspended", experience: 5, base: "Dehradun" },
  { id: "D-1013", name: "Arjun Nambiar", licenseNumber: "KL0620200001129", licenseExpiry: "2028-05-21", phone: "+91 97445 11289", email: "arjun.n@transitops.io", safetyScore: 95, status: "On Duty", experience: 11, assignedVehicle: "V-020", base: "Kozhikode" },
  { id: "D-1014", name: "Naveen Reddy", licenseNumber: "AP3120180007712", licenseExpiry: "2027-01-12", phone: "+91 99889 66112", email: "naveen.r@transitops.io", safetyScore: 86, status: "On Duty", experience: 8, assignedVehicle: "V-012", base: "Vizag" },
  { id: "D-1015", name: "Balbir Singh", licenseNumber: "PB1020140002298", licenseExpiry: "2026-08-30", phone: "+91 98776 44012", email: "balbir.s@transitops.io", safetyScore: 92, status: "Off Duty", experience: 18, base: "Amritsar" },
  { id: "D-1016", name: "Manoj Verma", licenseNumber: "MP0420190004401", licenseExpiry: "2027-05-19", phone: "+91 98220 77341", email: "manoj.v@transitops.io", safetyScore: 84, status: "On Duty", experience: 7, assignedVehicle: "V-017", base: "Bhopal" },
  { id: "D-1017", name: "Ashok Mehta", licenseNumber: "GJ0120170005587", licenseExpiry: "2026-11-27", phone: "+91 90112 45632", email: "ashok.m@transitops.io", safetyScore: 89, status: "On Duty", experience: 12, assignedVehicle: "V-008", base: "Ahmedabad" },
  { id: "D-1018", name: "Tarun Bose", licenseNumber: "WB2020150009923", licenseExpiry: "2026-09-09", phone: "+91 98304 88771", email: "tarun.b@transitops.io", safetyScore: 81, status: "On Leave", experience: 6, base: "Kolkata" },
  { id: "D-1019", name: "Siddharth Jain", licenseNumber: "RJ1420200003345", licenseExpiry: "2028-02-14", phone: "+91 97889 12290", email: "sid.j@transitops.io", safetyScore: 90, status: "On Duty", experience: 10, assignedVehicle: "V-009", base: "Jaipur" },
  { id: "D-1020", name: "Imran Khan", licenseNumber: "MH0120180007790", licenseExpiry: "2027-07-01", phone: "+91 98910 33221", email: "imran.k@transitops.io", safetyScore: 88, status: "On Duty", experience: 9, base: "Mumbai" },
];
