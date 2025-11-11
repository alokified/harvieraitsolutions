import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDB } from '@/lib/db';
import { Contact } from '@/models/Contact';
import { sendContactEmail } from '@/lib/email';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  plan: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
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
    const validatedData = contactSchema.parse(body);

    // Remove honeypot field
    const { honeypot, ...data } = validatedData;

    // Check if MongoDB is configured
    const useMongo = !!process.env.MONGO_URL;

    if (useMongo) {
      // Save to MongoDB
      await connectDB();
      const contact = new Contact({
        ...data,
        source: 'website',
      });
      await contact.save();
    } else {
      // Send email via nodemailer
      if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        throw new Error('Email configuration is missing');
      }
      await sendContactEmail(data);
    }

    return NextResponse.json(
      {
        message: 'Thank you for contacting us! We will get back to you soon.',
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);

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
        error: 'Failed to process your request. Please try again later.',
      },
      { status: 500 }
    );
  }
}
