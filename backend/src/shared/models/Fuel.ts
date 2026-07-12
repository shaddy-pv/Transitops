import mongoose, { Schema, Document } from 'mongoose';

export interface IFuel extends Document {
  vehicle: mongoose.Types.ObjectId;
  driver?: mongoose.Types.ObjectId;
  date: Date;
  liters: number;
  cost: number;
  odometerReading: number;
  fuelStation: string;
  receiptImage?: string;
  notes?: string;
}

const fuelSchema = new Schema<IFuel>(
  {
    vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    driver: { type: Schema.Types.ObjectId, ref: 'Driver' },
    date: { type: Date, required: true },
    liters: { type: Number, required: true },
    cost: { type: Number, required: true },
    odometerReading: { type: Number, required: true },
    fuelStation: { type: String, required: true },
    receiptImage: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

export const Fuel = mongoose.model<IFuel>('Fuel', fuelSchema);
