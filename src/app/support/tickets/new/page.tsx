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
import { Loader2, AlertCircle, MessageSquare, Lightbulb, Bug } from 'lucide-react';
import Link from 'next/link';

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

type TicketFormData = z.infer<typeof ticketSchema>;

const categories = [
  { value: 'bug', label: 'Bug Report', icon: Bug },
  { value: 'feature', label: 'Feature Request', icon: Lightbulb },
  { value: 'technical', label: 'Technical Issue', icon: AlertCircle },
  { value: 'general', label: 'General Inquiry', icon: MessageSquare },
];

const priorities = [
  {
    value: 'low',
    label: 'Low',
    description: 'Minor issue, no immediate impact',
    color: 'text-green-600',
  },
  {
    value: 'medium',
    label: 'Medium',
    description: 'Moderate impact on operations',
    color: 'text-yellow-600',
  },
  {
    value: 'high',
    label: 'High',
    description: 'Significant impact, needs attention',
    color: 'text-orange-600',
  },
  {
    value: 'urgent',
    label: 'Urgent',
    description: 'Critical issue, business stopped',
    color: 'text-red-600',
  },
];

export default function NewTicketPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      priority: 'medium',
    },
  });

  const priority = watch('priority');
  const category = watch('category');

  const onSubmit = async (data: TicketFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create ticket');
      }

      toast.success('Ticket created successfully!', {
        description: result.message,
      });

      // Reset form
      reset();
      setTimeout(() => {
        window.location.href = '/support';
      }, 2000);
    } catch (error) {
      toast.error('Failed to create ticket', {
        description: error instanceof Error ? error.message : 'Please try again later',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="border-b py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-4">
              Support
            </Badge>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              Create Support Ticket
            </h1>
            <p className="text-xl text-muted-foreground">
              Our support team is here to help. Please provide as much detail as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Ticket Form */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <Card className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  {...register('honeypot')}
                  style={{ position: 'absolute', left: '-9999px' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Contact Information */}
                <div>
                  <h2 className="mb-4 text-lg font-bold">Contact Information</h2>
                  <div className="grid gap-4 md:grid-cols-2">
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
                  </div>

                  <div className="mt-4">
                    <label htmlFor="company" className="mb-2 block text-sm font-medium">
                      Company Name
                    </label>
                    <Input id="company" {...register('company')} placeholder="Acme Inc." />
                  </div>
                </div>

                {/* Ticket Details */}
                <div>
                  <h2 className="mb-4 text-lg font-bold">Ticket Details</h2>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="category" className="mb-2 block text-sm font-medium">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={category}
                        onValueChange={(value) => setValue('category', value)}
                      >
                        <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => {
                            const Icon = cat.icon;
                            return (
                              <SelectItem key={cat.value} value={cat.value}>
                                <div className="flex items-center gap-2">
                                  <Icon className="h-4 w-4" />
                                  {cat.label}
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="priority" className="mb-2 block text-sm font-medium">
                        Priority <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={priority}
                        onValueChange={(value) =>
                          setValue('priority', value as 'low' | 'medium' | 'high' | 'urgent')
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {priorities.map((p) => (
                            <SelectItem key={p.value} value={p.value}>
                              <div>
                                <div className={`font-medium ${p.color}`}>{p.label}</div>
                                <div className="text-xs text-muted-foreground">{p.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="subject"
                      {...register('subject')}
                      placeholder="Brief description of the issue"
                      className={errors.subject ? 'border-red-500' : ''}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                    )}
                  </div>

                  <div className="mt-4">
                    <label htmlFor="description" className="mb-2 block text-sm font-medium">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="description"
                      {...register('description')}
                      placeholder="Please provide detailed information about the issue, including:&#10;- What you were trying to do&#10;- What actually happened&#10;- Steps to reproduce (if applicable)&#10;- Error messages (if any)"
                      rows={10}
                      className={errors.description ? 'border-red-500' : ''}
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between border-t pt-6">
                  <Button type="button" variant="outline" asChild>
                    <Link href="/support">Cancel</Link>
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Ticket...
                      </>
                    ) : (
                      'Create Ticket'
                    )}
                  </Button>
                </div>
              </form>
            </Card>

            {/* Help Text */}
            <div className="mt-8 rounded-lg border bg-muted/30 p-6">
              <h3 className="mb-3 font-bold">Tips for Better Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Be as specific as possible about the issue</li>
                <li>• Include relevant error messages or screenshots</li>
                <li>• Mention your environment (browser, OS, etc.)</li>
                <li>• List steps to reproduce the problem</li>
                <li>• Set appropriate priority based on business impact</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
