import mongoose, { Schema, Model } from 'mongoose';

export interface ITicket {
  name: string;
  email: string;
  company?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  subject: string;
  description: string;
  attachments?: string[];
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

const TicketSchema = new Schema<ITicket>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
      required: true,
    },
    category: { type: String, required: true },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    attachments: [{ type: String }],
    status: {
      type: String,
      enum: ['open', 'in-progress', 'resolved', 'closed'],
      default: 'open',
    },
  },
  {
    timestamps: true,
  }
);

export const Ticket: Model<ITicket> =
  mongoose.models.Ticket || mongoose.model<ITicket>('Ticket', TicketSchema);
