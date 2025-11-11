import mongoose, { Schema, Model } from 'mongoose';

export interface IContact {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  plan?: string;
  subject: string;
  message: string;
  source?: string;
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String },
  phone: { type: String },
  plan: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  source: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
