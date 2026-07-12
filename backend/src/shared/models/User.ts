import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { IRole } from './Role';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: mongoose.Types.ObjectId | IRole;
  status: 'Active' | 'Inactive' | 'Suspended';
  profileImage?: string;
  lastLogin?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, select: false },
    role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
    status: { type: String, enum: ['Active', 'Inactive', 'Suspended'], default: 'Active' },
    profileImage: { type: String },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);
