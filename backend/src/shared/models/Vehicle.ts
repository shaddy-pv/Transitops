import mongoose, { Schema, Document } from 'mongoose';

export interface IVehicle extends Document {
  registrationNumber: string;
  vehicleName: string;
  vehicleType: string;
  vin: string;
  manufacturer: string;
  year: number;
  capacity: number;
  odometer: number;
  fuelType: 'Diesel' | 'Petrol' | 'Electric' | 'Hybrid' | 'CNG';
  insuranceExpiry: Date;
  registrationExpiry: Date;
  purchaseDate: Date;
  purchaseCost: number;
  status: 'Available' | 'On Trip' | 'In Maintenance' | 'Retired';
  image?: string;
  documents?: string[];
}

const vehicleSchema = new Schema<IVehicle>(
  {
    registrationNumber: { type: String, required: true, unique: true },
    vehicleName: { type: String, required: true },
    vehicleType: { type: String, required: true },
    vin: { type: String, required: true, unique: true },
    manufacturer: { type: String, required: true },
    year: { type: Number, required: true },
    capacity: { type: Number, required: true },
    odometer: { type: Number, required: true, default: 0 },
    fuelType: {
      type: String,
      enum: ['Diesel', 'Petrol', 'Electric', 'Hybrid', 'CNG'],
      required: true,
    },
    insuranceExpiry: { type: Date, required: true },
    registrationExpiry: { type: Date, required: true },
    purchaseDate: { type: Date, required: true },
    purchaseCost: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Available', 'On Trip', 'In Maintenance', 'Retired'],
      default: 'Available',
    },
    image: { type: String },
    documents: [{ type: String }],
  },
  { timestamps: true }
);

export const Vehicle = mongoose.model<IVehicle>('Vehicle', vehicleSchema);
