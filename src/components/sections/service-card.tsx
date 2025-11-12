'use client';

import { motion } from 'framer-motion';
import { memo, createElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { getIconComponent } from '@/lib/icons';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  href: string;
  imageSrc?: string;
  index?: number;
}

const IconRenderer = memo(({ iconName, className }: { iconName: string; className?: string }) => {
  const IconComponent = getIconComponent(iconName);
  return createElement(IconComponent, { className });
});
IconRenderer.displayName = 'IconRenderer';

export function ServiceCard({
  icon,
  title,
  description,
  features,
  href,
  imageSrc,
  index = 0,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={href}>
        <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
          {imageSrc ? (
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-cover transition-transform hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : (
            <div className="mb-4 flex h-48 items-center justify-center bg-linear-to-br from-blue-50 to-blue-100">
              <IconRenderer iconName={icon} className="h-16 w-16 text-blue-600" />
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="mb-6 space-y-2">
              {features.map((feature) => (
                <li key={feature} className="flex items-start text-sm text-gray-600">
                  <span className="mr-2 mt-1 text-blue-600">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" className="w-full">
              <span>
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Button>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
