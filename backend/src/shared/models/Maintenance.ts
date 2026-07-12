import mongoose, { Schema, Document } from 'mongoose';

export interface IMaintenance extends Document {
  vehicle: mongoose.Types.ObjectId;
  serviceType: string;
  description: string;
  date: Date;
  cost: number;
  provider: string;
  status: 'Scheduled' | 'In Progress' | 'Completed';
  odometerReading: number;
  invoiceImage?: string;
}

const maintenanceSchema = new Schema<IMaintenance>(
  {
    vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    serviceType: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    cost: { type: Number, required: true, default: 0 },
    provider: { type: String, required: true },
    status: {
      type: String,
      enum: ['Scheduled', 'In Progress', 'Completed'],
      default: 'Scheduled',
    },
    odometerReading: { type: Number, required: true },
    invoiceImage: { type: String },
  },
  { timestamps: true }
);

export const Maintenance = mongoose.model<IMaintenance>('Maintenance', maintenanceSchema);
