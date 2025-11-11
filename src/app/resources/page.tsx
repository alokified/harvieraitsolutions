'use client';

import { useState } from 'react';
import Link from 'next/link';
import { allBlogPosts, allGuides } from '.contentlayer/generated';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BlogCard } from '@/components/sections/blog-card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const publishedBlogPosts = allBlogPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const publishedGuides = allGuides
    .filter((guide) => guide.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filteredBlogPosts = publishedBlogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredGuides = publishedGuides.filter(
    (guide) =>
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const categories = [...new Set(publishedBlogPosts.map((post) => post.category))];

  return (
    <>
      {/* Hero Section */}
      <section className="border-b py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              Resources & Insights
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Expert knowledge on technology trends, best practices, and industry insights to help
              you succeed.
            </p>

            {/* Search */}
            <div className="relative mx-auto max-w-xl">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles, guides, and topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resources Tabs */}
      <section className="py-16 md:py-24">
        <div className="container">
          <Tabs defaultValue="blog" className="w-full">
            <div className="mb-12 flex justify-center">
              <TabsList className="grid w-full max-w-md grid-cols-4">
                <TabsTrigger value="blog">
                  Blog
                  <Badge variant="secondary" className="ml-2">
                    {publishedBlogPosts.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="guides">
                  Guides
                  <Badge variant="secondary" className="ml-2">
                    {publishedGuides.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="webinars">
                  Webinars
                  <Badge variant="secondary" className="ml-2">
                    0
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="tools">
                  Tools
                  <Badge variant="secondary" className="ml-2">
                    0
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Blog Tab */}
            <TabsContent value="blog" className="space-y-12">
              {/* Categories */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Categories:</span>
                {categories.map((category) => (
                  <Badge key={category} variant="outline">
                    {category}
                  </Badge>
                ))}
              </div>

              {/* Blog Posts Grid */}
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredBlogPosts.map((post) => (
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

              {filteredBlogPosts.length === 0 && (
                <div className="py-16 text-center">
                  <p className="text-lg text-muted-foreground">
                    No blog posts found matching your search.
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Guides Tab */}
            <TabsContent value="guides" className="space-y-12">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredGuides.map((guide) => (
                  <Link key={guide.slug} href={`/resources/guides/${guide.slug}`} className="group">
                    <div className="h-full rounded-lg border p-6 transition-all hover:border-primary hover:shadow-md">
                      <div className="mb-4 flex items-center gap-2">
                        <Badge variant="secondary">{guide.category}</Badge>
                        {guide.difficulty && <Badge variant="outline">{guide.difficulty}</Badge>}
                      </div>
                      <h3 className="mb-2 text-xl font-bold group-hover:text-primary">
                        {guide.title}
                      </h3>
                      <p className="mb-4 text-muted-foreground">{guide.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{guide.author}</span>
                        <span>•</span>
                        <span>{guide.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {filteredGuides.length === 0 && (
                <div className="py-16 text-center">
                  <p className="text-lg text-muted-foreground">
                    No guides found matching your search.
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Webinars Tab */}
            <TabsContent value="webinars">
              <div className="py-16 text-center">
                <h3 className="mb-4 text-2xl font-bold">Coming Soon</h3>
                <p className="text-lg text-muted-foreground">
                  We&apos;re working on bringing you expert-led webinars and workshops. Stay tuned!
                </p>
              </div>
            </TabsContent>

            {/* Tools Tab */}
            <TabsContent value="tools">
              <div className="py-16 text-center">
                <h3 className="mb-4 text-2xl font-bold">Coming Soon</h3>
                <p className="text-lg text-muted-foreground">
                  Free tools and calculators to help you plan and optimize your technology projects.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
