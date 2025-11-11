'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  X,
  FileText,
  Briefcase,
  Building2,
  Lightbulb,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useSearch } from '@/hooks/use-search';

type SearchResultType = 'service' | 'industry' | 'case-study' | 'blog' | 'guide';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: SearchResultType;
  url: string;
  category?: string;
  tags?: string[];
}

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
  blog: 'Blog',
  guide: 'Guide',
};

const typeColors = {
  service: 'bg-blue-100 text-blue-700',
  industry: 'bg-purple-100 text-purple-700',
  'case-study': 'bg-green-100 text-green-700',
  blog: 'bg-orange-100 text-orange-700',
  guide: 'bg-pink-100 text-pink-700',
};

interface SearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchPanel({ isOpen, onClose }: SearchPanelProps) {
  const router = useRouter();
  const { search } = useSearch();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Compute search results based on query
  const results = useMemo(() => {
    if (query.trim().length >= 2) {
      const searchResults = search(query);
      return searchResults.slice(0, 8); // Limit to top 8 results
    }
    return [];
  }, [query, search]);

  const handleViewAll = () => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
    onClose();
  };

  const handleResultClick = () => {
    onClose();
    setQuery('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      handleViewAll();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="border-t bg-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <form onSubmit={handleSubmit} className="mb-4 flex items-center gap-2">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search services, solutions, case studies, resources..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close search"
          >
            <X className="h-5 w-5" />
          </Button>
        </form>

        {/* Results */}
        {query.trim().length >= 2 && (
          <div className="max-h-[60vh] overflow-y-auto">
            {results.length > 0 ? (
              <>
                <div className="mb-2 text-xs font-medium text-muted-foreground">
                  Top Results ({results.length})
                </div>
                <div className="space-y-1">
                  {results.map((result) => {
                    const Icon = typeIcons[result.type];
                    return (
                      <Link
                        key={`${result.type}-${result.id}`}
                        href={result.url}
                        onClick={handleResultClick}
                        className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-muted"
                      >
                        <div
                          className={cn(
                            'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md',
                            typeColors[result.type]
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="mb-1 flex items-center gap-2">
                            <h4 className="truncate text-sm font-medium">{result.title}</h4>
                            <Badge variant="secondary" className="shrink-0 text-xs">
                              {typeLabels[result.type]}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {result.description}
                          </p>
                          {result.category && (
                            <div className="mt-1">
                              <Badge variant="outline" className="text-xs">
                                {result.category}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-4 border-t pt-3">
                  <Button
                    variant="ghost"
                    className="w-full justify-between"
                    onClick={handleViewAll}
                  >
                    <span>View all results</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="py-8 text-center">
                <div className="mb-2 text-sm font-medium text-muted-foreground">
                  No results found
                </div>
                <p className="text-xs text-muted-foreground">
                  Try different keywords or browse our{' '}
                  <Link
                    href="/services"
                    onClick={handleResultClick}
                    className="text-primary hover:underline"
                  >
                    services
                  </Link>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {query.trim().length === 0 && (
          <div className="py-6">
            <p className="mb-4 text-sm text-muted-foreground">
              Search across all our services, solutions, case studies, and resources
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              <Link
                href="/services"
                onClick={handleResultClick}
                className="flex items-center gap-2 rounded-lg border p-3 text-sm transition-colors hover:border-primary hover:bg-muted"
              >
                <Briefcase className="h-4 w-4 text-blue-600" />
                <span>Browse Services</span>
              </Link>
              <Link
                href="/solutions"
                onClick={handleResultClick}
                className="flex items-center gap-2 rounded-lg border p-3 text-sm transition-colors hover:border-primary hover:bg-muted"
              >
                <Building2 className="h-4 w-4 text-purple-600" />
                <span>Browse Industries</span>
              </Link>
              <Link
                href="/case-studies"
                onClick={handleResultClick}
                className="flex items-center gap-2 rounded-lg border p-3 text-sm transition-colors hover:border-primary hover:bg-muted"
              >
                <Lightbulb className="h-4 w-4 text-green-600" />
                <span>Case Studies</span>
              </Link>
              <Link
                href="/resources"
                onClick={handleResultClick}
                className="flex items-center gap-2 rounded-lg border p-3 text-sm transition-colors hover:border-primary hover:bg-muted"
              >
                <BookOpen className="h-4 w-4 text-orange-600" />
                <span>Resources</span>
              </Link>
            </div>
          </div>
        )}

        {query.trim().length > 0 && query.trim().length < 2 && (
          <div className="py-4 text-center text-sm text-muted-foreground">
            Type at least 2 characters to search
          </div>
        )}
      </div>
    </div>
  );
}
