import { describe, it, expect } from 'vitest';
import { z } from 'zod';

// Contact form schema (extracted from page.tsx)
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

describe('Contact Form Schema Validation', () => {
  it('validates a complete valid form submission', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      company: 'Acme Corp',
      phone: '555-1234',
      plan: 'Enterprise',
      subject: 'Inquiry about services',
      message: 'I would like to learn more about your cloud services.',
      honeypot: '',
    };

    const result = contactSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('validates minimal required fields', () => {
    const minimalData = {
      name: 'Jane',
      email: 'jane@example.com',
      subject: 'Hello',
      message: 'Short message here',
    };

    const result = contactSchema.safeParse(minimalData);
    expect(result.success).toBe(true);
  });

  it('rejects name shorter than 2 characters', () => {
    const invalidData = {
      name: 'J',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'Test message here',
    };

    const result = contactSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Name must be at least 2 characters');
    }
  });

  it('rejects invalid email format', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'invalid-email',
      subject: 'Test Subject',
      message: 'Test message here',
    };

    const result = contactSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Invalid email address');
    }
  });

  it('rejects subject shorter than 5 characters', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Hi',
      message: 'Test message here',
    };

    const result = contactSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Subject must be at least 5 characters');
    }
  });

  it('rejects message shorter than 10 characters', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'Short',
    };

    const result = contactSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Message must be at least 10 characters');
    }
  });

  it('accepts optional fields when not provided', () => {
    const dataWithoutOptionals = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'Test message here',
    };

    const result = contactSchema.safeParse(dataWithoutOptionals);
    expect(result.success).toBe(true);
  });

  it('validates honeypot field is optional', () => {
    const dataWithHoneypot = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'Test message here',
      honeypot: 'bot-filled-this',
    };

    const result = contactSchema.safeParse(dataWithHoneypot);
    expect(result.success).toBe(true);
  });

  it('rejects missing required field (name)', () => {
    const invalidData = {
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'Test message here',
    };

    const result = contactSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('rejects missing required field (email)', () => {
    const invalidData = {
      name: 'John Doe',
      subject: 'Test Subject',
      message: 'Test message here',
    };

    const result = contactSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
