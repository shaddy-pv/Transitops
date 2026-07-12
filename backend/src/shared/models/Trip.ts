import mongoose, { Schema, Document } from 'mongoose';

export interface ITrip extends Document {
  tripId: string;
  vehicle: mongoose.Types.ObjectId;
  driver: mongoose.Types.ObjectId;
  startLocation: string;
  endLocation: string;
  distance: number;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  scheduledDeparture: Date;
  actualDeparture?: Date;
  actualArrival?: Date;
  notes?: string;
}

const tripSchema = new Schema<ITrip>(
  {
    tripId: { type: String, required: true, unique: true },
    vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    driver: { type: Schema.Types.ObjectId, ref: 'Driver', required: true },
    startLocation: { type: String, required: true },
    endLocation: { type: String, required: true },
    distance: { type: Number, required: true, default: 0 },
    status: {
      type: String,
      enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
      default: 'Scheduled',
    },
    scheduledDeparture: { type: Date, required: true },
    actualDeparture: { type: Date },
    actualArrival: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

export const Trip = mongoose.model<ITrip>('Trip', tripSchema);
