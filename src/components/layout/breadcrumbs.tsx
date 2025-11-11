'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { Fragment } from 'react';

export function Breadcrumbs() {
  const pathname = usePathname();

  // Don't show breadcrumbs on homepage
  if (pathname === '/') {
    return null;
  }

  // Generate breadcrumb items from pathname
  const paths = pathname.split('/').filter(Boolean);

  const breadcrumbItems = paths.map((path, index) => {
    const href = `/${paths.slice(0, index + 1).join('/')}`;
    // Convert kebab-case to Title Case
    const label = path
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return { href, label };
  });

  return (
    <nav aria-label="Breadcrumb" className="border-b bg-gray-50 py-3">
      <div className="container mx-auto px-4">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link
              href="/"
              className="flex items-center text-gray-600 transition-colors hover:text-blue-600"
              aria-label="Home"
            >
              <Home className="h-4 w-4" />
            </Link>
          </li>

          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;

            return (
              <Fragment key={item.href}>
                <li>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </li>
                <li>
                  {isLast ? (
                    <span className="font-medium text-gray-900" aria-current="page">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-gray-600 transition-colors hover:text-blue-600"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              </Fragment>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
