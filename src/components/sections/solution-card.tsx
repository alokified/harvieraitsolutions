'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface SolutionCardProps {
  title: string;
  industry: string;
  description: string;
  benefits: string[];
  imageSrc?: string;
  href: string;
  index?: number;
}

export function SolutionCard({
  title,
  industry,
  description,
  benefits,
  imageSrc,
  href,
  index = 0,
}: SolutionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
        {imageSrc ? (
          <div className="aspect-video overflow-hidden">
            <img
              src={imageSrc}
              alt={title}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </div>
        ) : (
          <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600" />
        )}
        <CardHeader>
          <Badge variant="secondary" className="mb-2 w-fit">
            {industry}
          </Badge>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="mb-6 space-y-2">
            {benefits.slice(0, 3).map((benefit) => (
              <li key={benefit} className="flex items-start text-sm text-gray-600">
                <span className="mr-2 mt-1 text-blue-600">•</span>
                {benefit}
              </li>
            ))}
          </ul>
          <Button asChild variant="link" className="p-0 text-blue-600">
            <Link href={href}>
              Explore Solution
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
