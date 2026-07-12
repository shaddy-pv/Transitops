import mongoose, { Schema, Document } from 'mongoose';

export interface IExpense extends Document {
  category: 'Fuel' | 'Maintenance' | 'Toll' | 'Salary' | 'Insurance' | 'Other';
  amount: number;
  date: Date;
  referenceId?: string; // e.g. Trip ID or Maintenance ID
  vehicle?: mongoose.Types.ObjectId;
  description: string;
  receiptImage?: string;
  loggedBy: mongoose.Types.ObjectId;
}

const expenseSchema = new Schema<IExpense>(
  {
    category: {
      type: String,
      enum: ['Fuel', 'Maintenance', 'Toll', 'Salary', 'Insurance', 'Other'],
      required: true,
    },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    referenceId: { type: String },
    vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle' },
    description: { type: String, required: true },
    receiptImage: { type: String },
    loggedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const Expense = mongoose.model<IExpense>('Expense', expenseSchema);
