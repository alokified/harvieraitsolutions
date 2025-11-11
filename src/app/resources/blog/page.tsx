import { allBlogPosts } from '.contentlayer/generated';
import { HeroSplit } from '@/components/sections/hero-split';
import { BlogCard } from '@/components/sections/blog-card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Harviera IT Solutions',
  description:
    'Insights, trends, and best practices in software development, cloud, AI, cybersecurity, and more.',
};

export default function BlogPage() {
  const sortedPosts = allBlogPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <HeroSplit
        title="Insights & Expertise"
        description="Stay ahead with the latest trends, best practices, and thought leadership in technology."
        ctaPrimary={{ text: 'Subscribe', href: '#newsletter' }}
        imageSrc="/images/blog-hero.jpg"
        imageAlt="Blog"
      />

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Latest Articles</h2>
            <p className="text-lg text-muted-foreground">
              Deep dives, tutorials, and analysis from our engineering team.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sortedPosts.map((post) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                author={post.author}
                date={post.date}
                readTime={post.readTime}
                category={post.category}
                slug={post.slug}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
