import { z } from 'zod';

export const updateUserSchema = z.object({
  body: z.object({
    firstName: z.string().min(2).optional(),
    lastName: z.string().min(2).optional(),
    status: z.enum(['Active', 'Inactive', 'Suspended']).optional(),
    role: z.string().optional(),
  }),
});
