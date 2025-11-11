'use client';

import { useMemo } from 'react';
import {
  allServices,
  allIndustries,
  allCaseStudies,
  allBlogPosts,
  allGuides,
} from '.contentlayer/generated';
import { SearchResult, createSearchIndex, performSearch } from '@/lib/search';

export function useSearch() {
  const searchData = useMemo(() => {
    const items: SearchResult[] = [];

    // Add services
    allServices.forEach((service) => {
      items.push({
        id: service.slug,
        title: service.title,
        description: service.description,
        type: 'service',
        url: `/services/${service.slug}`,
        category: 'Services',
        tags: service.technologies || [],
      });
    });

    // Add industries
    allIndustries.forEach((industry) => {
      items.push({
        id: industry.slug,
        title: industry.title,
        description: industry.description,
        type: 'industry',
        url: `/solutions/${industry.slug}`,
        category: 'Industries',
      });
    });

    // Add case studies
    allCaseStudies.forEach((caseStudy) => {
      items.push({
        id: caseStudy.slug,
        title: caseStudy.title,
        description: caseStudy.description || caseStudy.challenge || '',
        type: 'case-study',
        url: `/case-studies/${caseStudy.slug}`,
        category: 'Case Studies',
        tags: [caseStudy.industry || '', ...(caseStudy.services || [])],
      });
    });

    // Add blog posts
    allBlogPosts.forEach((post) => {
      items.push({
        id: post.slug,
        title: post.title,
        description: post.excerpt,
        type: 'blog',
        url: `/resources/blog/${post.slug}`,
        category: post.category,
        tags: post.tags || [],
      });
    });

    // Add guides
    allGuides.forEach((guide) => {
      items.push({
        id: guide.slug,
        title: guide.title,
        description: guide.description,
        type: 'guide',
        url: `/resources/guides/${guide.slug}`,
        category: guide.category,
        tags: guide.tags || [],
      });
    });

    return items;
  }, []);

  const fuse = useMemo(() => createSearchIndex(searchData), [searchData]);

  const search = (query: string) => performSearch(fuse, query);

  return { search, searchData };
}
