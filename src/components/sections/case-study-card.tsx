'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CaseStudyCardProps {
  title: string;
  client: string;
  industry: string;
  summary: string;
  results: string[];
  imageSrc?: string;
  slug: string;
  index?: number;
}

export function CaseStudyCard({
  title,
  client,
  industry,
  summary,
  results,
  imageSrc,
  slug,
  index = 0,
}: CaseStudyCardProps) {
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
          <div className="aspect-video bg-linear-to-br from-blue-600 to-purple-700" />
        )}
        <CardHeader>
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="outline">{industry}</Badge>
            <Badge variant="secondary">{client}</Badge>
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{summary}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 space-y-2">
            <h4 className="text-sm font-semibold text-gray-900">Key Results:</h4>
            {results.slice(0, 2).map((result) => (
              <div key={result} className="flex items-start text-sm text-gray-600">
                <span className="mr-2 mt-1 text-green-600">↗</span>
                {result}
              </div>
            ))}
          </div>
          <Button asChild variant="outline" className="w-full">
            <Link href={`/case-studies/${slug}`}>
              Read Case Study
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
