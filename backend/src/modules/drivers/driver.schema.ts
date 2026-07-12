import { z } from 'zod';

export const createDriverSchema = z.object({
  body: z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    licenseNumber: z.string().min(5, 'License number is required'),
    licenseExpiry: z.string().datetime(),
    licenseClass: z.string().min(1, 'License class is required'),
    dateOfBirth: z.string().datetime(),
    contactNumber: z.string().min(7, 'Contact number is required'),
    address: z.string().min(5, 'Address is required'),
    status: z.enum(['Active', 'On Leave', 'Suspended', 'Terminated']).optional(),
    hireDate: z.string().datetime(),
    bloodGroup: z.string().min(2, 'Blood group is required'),
    medicalClearanceExpiry: z.string().datetime(),
    assignedVehicle: z.string().optional(),
  }),
});

export const updateDriverSchema = z.object({
  body: createDriverSchema.shape.body.partial(),
});
