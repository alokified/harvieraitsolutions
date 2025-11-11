'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroSplitProps {
  title: string;
  subtitle?: string;
  description: string;
  ctaPrimary?: {
    text: string;
    href: string;
  };
  ctaSecondary?: {
    text: string;
    href: string;
  };
  imageSrc?: string;
  imageAlt?: string;
  reversed?: boolean;
}

export function HeroSplit({
  title,
  subtitle,
  description,
  ctaPrimary,
  ctaSecondary,
  imageSrc,
  imageAlt,
  reversed = false,
}: HeroSplitProps) {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div
          className={`grid gap-12 lg:grid-cols-2 lg:gap-16 items-center ${
            reversed ? 'lg:flex-row-reverse' : ''
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={reversed ? 'lg:order-2' : ''}
          >
            {subtitle && (
              <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-600">
                {subtitle}
              </div>
            )}
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              {title}
            </h1>
            <p className="mb-8 text-lg text-gray-600 md:text-xl">{description}</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              {ctaPrimary && (
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link href={ctaPrimary.href}>
                    {ctaPrimary.text}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
              {ctaSecondary && (
                <Button asChild variant="outline" size="lg">
                  <Link href={ctaSecondary.href}>{ctaSecondary.text}</Link>
                </Button>
              )}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={reversed ? 'lg:order-1' : ''}
          >
            {imageSrc ? (
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-gray-100 shadow-2xl">
                <Image
                  src={imageSrc}
                  alt={imageAlt || title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
            ) : (
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl" />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
