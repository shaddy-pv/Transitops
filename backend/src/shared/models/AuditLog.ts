import mongoose, { Schema, Document } from 'mongoose';

export interface IAuditLog extends Document {
  user?: mongoose.Types.ObjectId;
  action: string;
  entity: string;
  entityId?: mongoose.Types.ObjectId;
  before?: any;
  after?: any;
  ipAddress?: string;
  browser?: string;
  device?: string;
  apiEndpoint: string;
}

const auditLogSchema = new Schema<IAuditLog>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' }, // Can be null if action is unauthenticated
    action: { type: String, required: true },
    entity: { type: String, required: true },
    entityId: { type: Schema.Types.ObjectId },
    before: { type: Schema.Types.Mixed },
    after: { type: Schema.Types.Mixed },
    ipAddress: { type: String },
    browser: { type: String },
    device: { type: String },
    apiEndpoint: { type: String, required: true },
  },
  { timestamps: true }
);

export const AuditLog = mongoose.model<IAuditLog>('AuditLog', auditLogSchema);
