'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { ChevronRight, ChevronLeft, Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import Link from 'next/link';

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

type ContactFormData = z.infer<typeof contactSchema>;

const steps = [
  { id: 1, title: 'Your Information', fields: ['name', 'email', 'company', 'phone'] },
  { id: 2, title: 'Project Details', fields: ['plan', 'subject'] },
  { id: 3, title: 'Tell Us More', fields: ['message'] },
];

export default function ContactPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
  });

  const plan = watch('plan');

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      toast.success('Message sent successfully!', {
        description: result.message,
      });

      // Reset form
      setCurrentStep(1);
      window.location.href = '/';
    } catch (error) {
      toast.error('Failed to send message', {
        description: error instanceof Error ? error.message : 'Please try again later',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateStep = () => {
    const currentFields = steps[currentStep - 1].fields;
    const values = watch();

    for (const field of currentFields) {
      const value = values[field as keyof ContactFormData];
      if (field === 'name' || field === 'email' || field === 'subject' || field === 'message') {
        if (!value || value.toString().trim() === '') {
          return false;
        }
      }
      // Check if there are errors for the field
      if (errors[field as keyof ContactFormData]) {
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep() && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="border-b py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-4">
              Get In Touch
            </Badge>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              Let&apos;s Build Something Amazing Together
            </h1>
            <p className="text-xl text-muted-foreground">
              Share your vision with us and we&apos;ll help bring it to life
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact Info Sidebar */}
            <div className="space-y-8">
              <div>
                <h2 className="mb-6 text-2xl font-bold">Contact Information</h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a
                        href="mailto:contact@harvierait.com"
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        contact@harvierait.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <a
                        href="tel:+1-555-123-4567"
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Office</p>
                      <p className="text-sm text-muted-foreground">
                        123 Tech Street
                        <br />
                        San Francisco, CA 94103
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="p-6">
                <h3 className="mb-3 font-bold">Looking for Support?</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  If you&apos;re an existing customer needing technical assistance, please create a
                  support ticket for faster service.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/support/tickets/new">Create Support Ticket</Link>
                </Button>
              </Card>
            </div>

            {/* Multi-step Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                {/* Progress Steps */}
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    {steps.map((step, index) => (
                      <div key={step.id} className="flex flex-1 items-center">
                        <div className="flex items-center">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                              currentStep >= step.id
                                ? 'border-primary bg-primary text-white'
                                : 'border-gray-300 text-gray-400'
                            }`}
                          >
                            {step.id}
                          </div>
                          <div className="ml-3 hidden md:block">
                            <p
                              className={`text-sm font-medium ${
                                currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                              }`}
                            >
                              {step.title}
                            </p>
                          </div>
                        </div>
                        {index < steps.length - 1 && (
                          <div
                            className={`mx-4 h-0.5 flex-1 ${
                              currentStep > step.id ? 'bg-primary' : 'bg-gray-300'
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Honeypot field - hidden from users */}
                  <input
                    type="text"
                    {...register('honeypot')}
                    style={{ position: 'absolute', left: '-9999px' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Step 1: Your Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="name"
                          {...register('name')}
                          placeholder="John Doe"
                          className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          placeholder="john@company.com"
                          className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="company" className="mb-2 block text-sm font-medium">
                          Company Name
                        </label>
                        <Input id="company" {...register('company')} placeholder="Acme Inc." />
                      </div>

                      <div>
                        <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          {...register('phone')}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Project Details */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="plan" className="mb-2 block text-sm font-medium">
                          Interested In
                        </label>
                        <Select value={plan} onValueChange={(value) => setValue('plan', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a plan or service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="good">Good Plan - $2,999/mo</SelectItem>
                            <SelectItem value="better">Better Plan - $5,999/mo</SelectItem>
                            <SelectItem value="best">Best Plan - $11,999/mo</SelectItem>
                            <SelectItem value="enterprise">Enterprise - Custom</SelectItem>
                            <SelectItem value="software-development">
                              Software Development
                            </SelectItem>
                            <SelectItem value="cloud-devops">Cloud & DevOps</SelectItem>
                            <SelectItem value="data-ai">Data & AI</SelectItem>
                            <SelectItem value="other">Other Services</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="subject"
                          {...register('subject')}
                          placeholder="What can we help you with?"
                          className={errors.subject ? 'border-red-500' : ''}
                        />
                        {errors.subject && (
                          <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Tell Us More */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="message" className="mb-2 block text-sm font-medium">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          id="message"
                          {...register('message')}
                          placeholder="Tell us about your project, timeline, and any specific requirements..."
                          rows={8}
                          className={errors.message ? 'border-red-500' : ''}
                        />
                        {errors.message && (
                          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground">
                        By submitting this form, you agree to our privacy policy and terms of
                        service.
                      </p>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="mt-8 flex items-center justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>

                    {currentStep < steps.length ? (
                      <Button type="button" onClick={nextStep} disabled={!validateStep()}>
                        Next
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
