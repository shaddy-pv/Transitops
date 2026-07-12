import { z } from 'zod';

export const createExpenseSchema = z.object({
  body: z.object({
    category: z.enum(['Fuel', 'Maintenance', 'Toll', 'Salary', 'Insurance', 'Other']),
    amount: z.preprocess((val) => Number(val), z.number().positive()),
    date: z.string().datetime(),
    referenceId: z.string().optional(),
    vehicle: z.string().optional(),
    description: z.string().min(1, 'Description is required'),
  }),
});

export const updateExpenseSchema = z.object({
  body: createExpenseSchema.shape.body.partial(),
});
