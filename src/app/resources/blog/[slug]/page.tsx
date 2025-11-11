import { notFound } from 'next/navigation';
import { allBlogPosts } from '.contentlayer/generated';
import { Mdx } from '@/components/mdx-components';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Share2, Twitter, Linkedin, Facebook } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { BlogCard } from '@/components/sections/blog-card';
import { TableOfContents } from '@/components/blog/table-of-contents';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return allBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = allBlogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Blog | Harviera IT Solutions`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = allBlogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same category or tags)
  const relatedPosts = allBlogPosts
    .filter(
      (p) =>
        p.slug !== post.slug &&
        p.published &&
        (p.category === post.category || p.tags?.some((tag) => post.tags?.includes(tag)))
    )
    .slice(0, 3);

  const shareUrl = `https://harviera.com/resources/blog/${post.slug}`;
  const shareTitle = post.title;

  return (
    <>
      {/* Article Header */}
      <article className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            {/* Breadcrumbs */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/resources" className="hover:text-foreground">
                Resources
              </Link>
              <span>/</span>
              <Link href="/resources/blog" className="hover:text-foreground">
                Blog
              </Link>
              <span>/</span>
              <span className="text-foreground">{post.title}</span>
            </nav>

            {/* Category & Tags */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <Badge>{post.category}</Badge>
              {post.tags?.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">{post.title}</h1>

            {/* Excerpt */}
            <p className="mb-8 text-xl text-muted-foreground">{post.excerpt}</p>

            {/* Meta Info */}
            <div className="mb-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>By {post.author}</span>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="mb-12 flex items-center gap-4 border-y py-4">
              <span className="text-sm font-medium">Share:</span>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                  }}
                  aria-label="Copy link"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content with Sidebar */}
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_300px]">
            {/* Article Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <Mdx code={post.body.code} />
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
                    {post.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-bold">{post.author}</h3>
                  <p className="text-muted-foreground">
                    Technology expert and thought leader with extensive experience in{' '}
                    {post.category.toLowerCase()} and software development. Passionate about sharing
                    knowledge and helping organizations succeed through technology.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t bg-muted/30 py-16 md:py-24">
          <div className="container">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Related Articles</h2>
              <p className="text-lg text-muted-foreground">
                Continue exploring related topics and insights
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogCard
                  key={relatedPost.slug}
                  title={relatedPost.title}
                  excerpt={relatedPost.excerpt}
                  author={relatedPost.author}
                  date={relatedPost.date}
                  readTime={relatedPost.readTime}
                  category={relatedPost.category}
                  link={`/resources/blog/${relatedPost.slug}`}
                />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button asChild variant="outline">
                <Link href="/resources/blog">View All Articles</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
