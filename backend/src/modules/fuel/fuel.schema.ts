import { z } from 'zod';

export const createFuelSchema = z.object({
  body: z.object({
    vehicle: z.string().min(1, 'Vehicle ID is required'),
    driver: z.string().optional(),
    date: z.string().datetime(),
    liters: z.preprocess((val) => Number(val), z.number().positive()),
    cost: z.preprocess((val) => Number(val), z.number().positive()),
    odometerReading: z.preprocess((val) => Number(val), z.number().min(0)),
    fuelStation: z.string().min(1, 'Fuel station is required'),
    notes: z.string().optional(),
  }),
});

export const updateFuelSchema = z.object({
  body: createFuelSchema.shape.body.partial(),
});
