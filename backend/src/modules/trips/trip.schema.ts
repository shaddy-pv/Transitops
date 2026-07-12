import { z } from 'zod';

export const createTripSchema = z.object({
  body: z.object({
    tripId: z.string().min(1, 'Trip ID is required'),
    vehicle: z.string().min(1, 'Vehicle ID is required'),
    driver: z.string().min(1, 'Driver ID is required'),
    startLocation: z.string().min(1, 'Start location is required'),
    endLocation: z.string().min(1, 'End location is required'),
    distance: z.preprocess((val) => Number(val), z.number().min(0)),
    status: z.enum(['Scheduled', 'In Progress', 'Completed', 'Cancelled']).optional(),
    scheduledDeparture: z.string().datetime(),
    notes: z.string().optional(),
  }),
});

export const updateTripSchema = z.object({
  body: createTripSchema.shape.body.partial().extend({
    actualDeparture: z.string().datetime().optional(),
    actualArrival: z.string().datetime().optional(),
  }),
});
