'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from the article
    const article = document.querySelector('article');
    if (!article) return;

    const elements = article.querySelectorAll('h2, h3');

    // Add IDs to headings if they don't have them and collect heading data
    const extractedHeadings: Heading[] = [];
    elements.forEach((element) => {
      const id = element.id || element.textContent?.toLowerCase().replace(/\s+/g, '-') || '';
      if (!element.id) {
        element.id = id;
      }
      extractedHeadings.push({
        id,
        text: element.textContent || '',
        level: parseInt(element.tagName.substring(1)),
      });
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect -- Extracting headings from DOM on mount is a valid use case for setting state in effect
    setHeadings(extractedHeadings);

    // Track active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="space-y-2">
      <h4 className="mb-4 text-sm font-semibold">On This Page</h4>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} className={cn(heading.level === 3 && 'pl-4')}>
            <a
              href={`#${heading.id}`}
              className={cn(
                'block py-1 transition-colors hover:text-foreground',
                activeId === heading.id ? 'font-medium text-foreground' : 'text-muted-foreground'
              )}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
