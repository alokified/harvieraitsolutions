import { notFound } from 'next/navigation';
import { allGuides } from '.contentlayer/generated';
import { Mdx } from '@/components/mdx-components';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, BookOpen } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { TableOfContents } from '@/components/blog/table-of-contents';

interface GuidePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return allGuides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const guide = allGuides.find((g) => g.slug === params.slug);

  if (!guide) {
    return {};
  }

  return {
    title: `${guide.title} | Guides | Harviera IT Solutions`,
    description: guide.description,
  };
}

export default function GuidePage({ params }: GuidePageProps) {
  const guide = allGuides.find((g) => g.slug === params.slug);

  if (!guide) {
    notFound();
  }

  // Get related guides (same category)
  const relatedGuides = allGuides
    .filter((g) => g.slug !== guide.slug && g.published && g.category === guide.category)
    .slice(0, 3);

  return (
    <>
      {/* Guide Header */}
      <article className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            {/* Breadcrumbs */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/resources" className="hover:text-foreground">
                Resources
              </Link>
              <span>/</span>
              <Link href="/resources" className="hover:text-foreground">
                Guides
              </Link>
              <span>/</span>
              <span className="text-foreground">{guide.title}</span>
            </nav>

            {/* Category & Difficulty */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <Badge>{guide.category}</Badge>
              {guide.difficulty && <Badge variant="outline">{guide.difficulty}</Badge>}
              {guide.tags?.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">{guide.title}</h1>

            {/* Description */}
            <p className="mb-8 text-xl text-muted-foreground">{guide.description}</p>

            {/* Meta Info */}
            <div className="mb-12 flex flex-wrap items-center gap-6 border-b pb-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={guide.date}>
                  {new Date(guide.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{guide.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>By {guide.author}</span>
              </div>
            </div>
          </div>

          {/* Main Content with Sidebar */}
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_300px]">
            {/* Guide Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <Mdx code={guide.body.code} />
            </div>

            {/* Sidebar - Table of Contents */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents />
              </div>
            </aside>
          </div>

          {/* Author Box */}
          <div className="mx-auto mt-16 max-w-4xl">
            <Card className="p-8">
              <div className="flex items-start gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-lg">
                    {guide.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-bold">{guide.author}</h3>
                  <p className="text-muted-foreground">
                    Expert in {guide.category.toLowerCase()} with years of hands-on experience.
                    Dedicated to creating comprehensive guides that help teams implement best
                    practices and achieve success.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </article>

      {/* Related Guides */}
      {relatedGuides.length > 0 && (
        <section className="border-t bg-muted/30 py-16 md:py-24">
          <div className="container">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Related Guides</h2>
              <p className="text-lg text-muted-foreground">
                Continue learning with these related resources
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedGuides.map((relatedGuide) => (
                <Link
                  key={relatedGuide.slug}
                  href={`/resources/guides/${relatedGuide.slug}`}
                  className="group"
                >
                  <div className="h-full rounded-lg border p-6 transition-all hover:border-primary hover:shadow-md">
                    <div className="mb-4 flex items-center gap-2">
                      <Badge variant="secondary">{relatedGuide.category}</Badge>
                      {relatedGuide.difficulty && (
                        <Badge variant="outline">{relatedGuide.difficulty}</Badge>
                      )}
                    </div>
                    <h3 className="mb-2 text-xl font-bold group-hover:text-primary">
                      {relatedGuide.title}
                    </h3>
                    <p className="mb-4 text-muted-foreground">{relatedGuide.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{relatedGuide.author}</span>
                      <span>•</span>
                      <span>{relatedGuide.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button asChild variant="outline">
                <Link href="/resources">View All Guides</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
