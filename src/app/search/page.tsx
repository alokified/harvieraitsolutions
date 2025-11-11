'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Search, FileText, Briefcase, Building2, Lightbulb, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useSearch } from '@/hooks/use-search';
import { SearchResult } from '@/lib/search';

const typeIcons = {
  service: Briefcase,
  industry: Building2,
  'case-study': Lightbulb,
  blog: FileText,
  guide: BookOpen,
};

const typeLabels = {
  service: 'Service',
  industry: 'Industry',
  'case-study': 'Case Study',
  blog: 'Blog Post',
  guide: 'Guide',
};

const typeColors = {
  service: 'bg-blue-100 text-blue-700',
  industry: 'bg-purple-100 text-purple-700',
  'case-study': 'bg-green-100 text-green-700',
  blog: 'bg-orange-100 text-orange-700',
  guide: 'bg-pink-100 text-pink-700',
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const { search } = useSearch();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Compute search results based on query
  const results = useMemo(() => {
    if (query.trim().length >= 2) {
      return search(query);
    }
    return [];
  }, [query, search]);

  const filteredResults =
    selectedType === 'all' ? results : results.filter((r) => r.type === selectedType);

  const resultsByType = results.reduce(
    (acc, result) => {
      acc[result.type] = (acc[result.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <>
      {/* Hero Section */}
      <section className="border-b bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">Search</h1>
              <p className="text-lg text-muted-foreground">
                Search across services, industries, case studies, and resources
              </p>
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for services, case studies, blog posts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-14 pl-12 pr-4 text-lg"
                autoFocus
              />
            </div>

            {query.trim().length > 0 && (
              <div className="mt-4 text-center text-sm text-muted-foreground">
                {results.length === 0 ? (
                  query.trim().length < 2 ? (
                    'Type at least 2 characters to search'
                  ) : (
                    'No results found'
                  )
                ) : (
                  <>
                    Found <span className="font-semibold text-foreground">{results.length}</span>{' '}
                    {results.length === 1 ? 'result' : 'results'}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Filters */}
      {results.length > 0 && (
        <section className="border-b py-6">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedType === 'all'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  All ({results.length})
                </button>
                {Object.entries(resultsByType).map(([type, count]) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      selectedType === type
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {typeLabels[type as keyof typeof typeLabels]} ({count})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            {filteredResults.length > 0 ? (
              <div className="space-y-4">
                {filteredResults.map((result) => {
                  const Icon = typeIcons[result.type];
                  return (
                    <Link key={`${result.type}-${result.id}`} href={result.url}>
                      <Card className="p-6 transition-all hover:border-primary hover:shadow-md">
                        <div className="flex items-start gap-4">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${typeColors[result.type]}`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                              <h3 className="text-lg font-semibold hover:text-primary">
                                {result.title}
                              </h3>
                              <Badge variant="secondary" className="text-xs">
                                {typeLabels[result.type]}
                              </Badge>
                            </div>
                            <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                              {result.description}
                            </p>
                            {result.category && (
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {result.category}
                                </Badge>
                                {result.tags && result.tags.length > 0 && (
                                  <>
                                    {result.tags.slice(0, 3).map((tag, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            ) : (
              query.trim().length >= 2 && (
                <div className="py-12 text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">No results found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or browse our{' '}
                    <Link href="/services" className="text-primary hover:underline">
                      services
                    </Link>
                    ,{' '}
                    <Link href="/solutions" className="text-primary hover:underline">
                      industries
                    </Link>
                    , or{' '}
                    <Link href="/resources" className="text-primary hover:underline">
                      resources
                    </Link>
                    .
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
}
