import mongoose, { Schema, Document } from 'mongoose';

export interface IRefreshToken extends Document {
  token: string;
  user: mongoose.Types.ObjectId;
  expires: Date;
  revoked?: Date;
  replacedByToken?: string;
  isExpired: boolean;
  isActive: boolean;
}

const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    token: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    expires: { type: Date, required: true },
    revoked: { type: Date },
    replacedByToken: { type: String },
  },
  { timestamps: true }
);

refreshTokenSchema.virtual('isExpired').get(function () {
  return Date.now() >= this.expires.getTime();
});

refreshTokenSchema.virtual('isActive').get(function () {
  return !this.revoked && !this.isExpired;
});

refreshTokenSchema.set('toJSON', {
  virtuals: true,
});

export const RefreshToken = mongoose.model<IRefreshToken>('RefreshToken', refreshTokenSchema);
