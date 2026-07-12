import mongoose, { Schema, Document } from 'mongoose';

export interface IDriver extends Document {
  firstName: string;
  lastName: string;
  licenseNumber: string;
  licenseExpiry: Date;
  licenseClass: string;
  dateOfBirth: Date;
  contactNumber: string;
  address: string;
  status: 'Active' | 'On Leave' | 'Suspended' | 'Terminated';
  hireDate: Date;
  bloodGroup: string;
  medicalClearanceExpiry: Date;
  assignedVehicle?: mongoose.Types.ObjectId;
  image?: string;
  documents?: string[];
}

const driverSchema = new Schema<IDriver>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    licenseNumber: { type: String, required: true, unique: true },
    licenseExpiry: { type: Date, required: true },
    licenseClass: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    contactNumber: { type: String, required: true },
    address: { type: String, required: true },
    status: {
      type: String,
      enum: ['Active', 'On Leave', 'Suspended', 'Terminated'],
      default: 'Active',
    },
    hireDate: { type: Date, required: true },
    bloodGroup: { type: String, required: true },
    medicalClearanceExpiry: { type: Date, required: true },
    assignedVehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle' },
    image: { type: String },
    documents: [{ type: String }],
  },
  { timestamps: true }
);

export const Driver = mongoose.model<IDriver>('Driver', driverSchema);
