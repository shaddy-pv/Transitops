import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  user?: mongoose.Types.ObjectId; // null if broadcasted to a role
  role?: string;
  title: string;
  message: string;
  type: 'Info' | 'Warning' | 'Error' | 'Success';
  isRead: boolean;
  link?: string;
}

const notificationSchema = new Schema<INotification>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    role: { type: String },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ['Info', 'Warning', 'Error', 'Success'],
      default: 'Info',
    },
    isRead: { type: Boolean, default: false },
    link: { type: String },
  },
  { timestamps: true }
);

export const Notification = mongoose.model<INotification>('Notification', notificationSchema);
