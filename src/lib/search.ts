import Fuse from 'fuse.js';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'service' | 'industry' | 'case-study' | 'blog' | 'guide';
  url: string;
  category?: string;
  tags?: string[];
}

export function createSearchIndex(items: SearchResult[]) {
  const options = {
    keys: [
      { name: 'title', weight: 2 },
      { name: 'description', weight: 1.5 },
      { name: 'category', weight: 1 },
      { name: 'tags', weight: 0.8 },
    ],
    threshold: 0.3,
    includeScore: true,
    minMatchCharLength: 2,
  };

  return new Fuse(items, options);
}

export function performSearch(fuse: Fuse<SearchResult>, query: string): SearchResult[] {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const results = fuse.search(query);
  return results.map((result) => result.item);
}
