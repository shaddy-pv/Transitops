import mongoose, { Schema, Document } from 'mongoose';
import { SystemRoles } from '../../constants/roles';

export interface IRole extends Document {
  name: SystemRoles;
  description?: string;
  permissions: string[];
}

const roleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      enum: Object.values(SystemRoles),
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    permissions: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export const Role = mongoose.model<IRole>('Role', roleSchema);
