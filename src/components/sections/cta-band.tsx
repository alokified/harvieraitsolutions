'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CTABandProps {
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  variant?: 'default' | 'gradient';
}

export function CTABand({
  title,
  description,
  ctaText,
  ctaHref,
  variant = 'default',
}: CTABandProps) {
  const bgClass =
    variant === 'gradient' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-900';

  return (
    <section className={`py-16 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left"
        >
          <div className="flex-1">
            <h2 className="mb-2 text-3xl font-bold text-white md:text-4xl">{title}</h2>
            <p className="text-lg text-gray-200">{description}</p>
          </div>
          <div>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-white text-gray-900 hover:bg-gray-100"
            >
              <Link href={ctaHref}>
                {ctaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
