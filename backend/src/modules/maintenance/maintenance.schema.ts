import { z } from 'zod';

export const createMaintenanceSchema = z.object({
  body: z.object({
    vehicle: z.string().min(1, 'Vehicle ID is required'),
    serviceType: z.string().min(1, 'Service type is required'),
    description: z.string().min(1, 'Description is required'),
    date: z.string().datetime(),
    cost: z.preprocess((val) => Number(val), z.number().min(0)),
    provider: z.string().min(1, 'Provider is required'),
    status: z.enum(['Scheduled', 'In Progress', 'Completed']).optional(),
    odometerReading: z.preprocess((val) => Number(val), z.number().min(0)),
  }),
});

export const updateMaintenanceSchema = z.object({
  body: createMaintenanceSchema.shape.body.partial(),
});
