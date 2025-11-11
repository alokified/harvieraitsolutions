import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDB } from '@/lib/db';
import { Ticket } from '@/models/Ticket';
import { sendTicketEmail } from '@/lib/email';

const ticketSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  category: z.string().min(1, 'Category is required'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  honeypot: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot check
    if (body.honeypot) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
    }

    // Validate input
    const validatedData = ticketSchema.parse(body);

    // Remove honeypot field
    const { honeypot, ...data } = validatedData;

    // Check if MongoDB is configured
    const useMongo = !!process.env.MONGO_URL;

    if (useMongo) {
      // Save to MongoDB
      await connectDB();
      const ticket = new Ticket({
        ...data,
        status: 'open',
      });
      await ticket.save();
    } else {
      // Send email via nodemailer
      if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        throw new Error('Email configuration is missing');
      }
      await sendTicketEmail(data);
    }

    return NextResponse.json(
      {
        message: 'Your support ticket has been created successfully. We will respond shortly.',
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Ticket creation error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.issues.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to create ticket. Please try again later.',
      },
      { status: 500 }
    );
  }
}
