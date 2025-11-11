'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';

interface BlogCardProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  imageSrc?: string;
  slug: string;
  index?: number;
}

export function BlogCard({
  title,
  excerpt,
  author,
  date,
  readTime,
  category,
  imageSrc,
  slug,
  index = 0,
}: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/resources/blog/${slug}`}>
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
            <div className="aspect-video bg-linear-to-br from-gray-700 to-gray-900" />
          )}
          <CardHeader>
            <Badge variant="secondary" className="mb-2 w-fit">
              {category}
            </Badge>
            <CardTitle className="text-xl line-clamp-2">{title}</CardTitle>
            <CardDescription className="line-clamp-2">{excerpt}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {author}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {readTime}
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
