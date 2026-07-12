import { z } from 'zod';

export const createVehicleSchema = z.object({
  body: z.object({
    registrationNumber: z.string().min(1, 'Registration number is required'),
    vehicleName: z.string().min(1, 'Vehicle name is required'),
    vehicleType: z.string().min(1, 'Vehicle type is required'),
    vin: z.string().min(1, 'VIN is required'),
    manufacturer: z.string().min(1, 'Manufacturer is required'),
    year: z.preprocess((val) => Number(val), z.number().int().min(1900)),
    capacity: z.preprocess((val) => Number(val), z.number().positive()),
    odometer: z.preprocess((val) => Number(val), z.number().min(0)),
    fuelType: z.enum(['Diesel', 'Petrol', 'Electric', 'Hybrid', 'CNG']),
    insuranceExpiry: z.string().datetime(),
    registrationExpiry: z.string().datetime(),
    purchaseDate: z.string().datetime(),
    purchaseCost: z.preprocess((val) => Number(val), z.number().positive()),
    status: z.enum(['Available', 'On Trip', 'In Maintenance', 'Retired']).optional(),
  }),
});

export const updateVehicleSchema = z.object({
  body: createVehicleSchema.shape.body.partial(),
});
