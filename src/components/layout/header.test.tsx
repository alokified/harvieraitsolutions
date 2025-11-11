import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './header';
import { ReactNode } from 'react';

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock Next.js dynamic
vi.mock('next/dynamic', () => ({
  default: (fn: () => Promise<unknown>) => {
    const Component = () => null;
    Component.displayName = 'DynamicComponent';
    return Component;
  },
}));

// Mock siteConfig
vi.mock('@/config/site', () => ({
  siteConfig: {
    name: 'Harviera IT Solutions',
    brand: {
      colors: {
        primary: '#0066CC',
        accent: '#FF5722',
      },
    },
    ctas: {
      primary: {
        title: 'Get Started',
        href: '/contact',
      },
    },
    mainNav: [
      {
        title: 'Services',
        items: [
          {
            title: 'Cloud Services',
            href: '/services/cloud',
            description: 'Cloud computing solutions',
          },
          {
            title: 'IT Consulting',
            href: '/services/consulting',
            description: 'Expert IT consulting',
          },
        ],
      },
      {
        title: 'Solutions',
        items: [
          {
            title: 'Healthcare',
            href: '/solutions/healthcare',
            description: 'Healthcare IT solutions',
          },
          { title: 'Finance', href: '/solutions/finance', description: 'Financial IT solutions' },
        ],
      },
      {
        title: 'Resources',
        items: [
          { title: 'Blog', href: '/blog', description: 'Our blog' },
          { title: 'Case Studies', href: '/case-studies', description: 'Success stories' },
        ],
      },
      {
        title: 'About',
        items: [
          { title: 'Company', href: '/about', description: 'About us' },
          { title: 'Contact', href: '/contact', description: 'Get in touch' },
        ],
      },
    ],
  },
}));

// Mock UI components
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: { children: ReactNode; [key: string]: unknown }) => (
    <button {...props}>{children}</button>
  ),
}));

vi.mock('@/components/ui/navigation-menu', () => ({
  NavigationMenu: ({ children, ...props }: { children: ReactNode; [key: string]: unknown }) => (
    <nav {...props}>{children}</nav>
  ),
  NavigationMenuList: ({ children }: { children: ReactNode }) => <ul>{children}</ul>,
  NavigationMenuItem: ({ children }: { children: ReactNode }) => <li>{children}</li>,
  NavigationMenuTrigger: ({
    children,
    ...props
  }: {
    children: ReactNode;
    [key: string]: unknown;
  }) => <button {...props}>{children}</button>,
  NavigationMenuContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  NavigationMenuLink: ({ children, asChild }: { children: ReactNode; asChild?: boolean }) =>
    asChild ? children : <a>{children}</a>,
}));

vi.mock('@/components/ui/sheet', () => ({
  Sheet: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  SheetTrigger: ({
    children,
    asChild,
    ...props
  }: {
    children: ReactNode;
    asChild?: boolean;
    [key: string]: unknown;
  }) => (asChild ? <div {...props}>{children}</div> : <button {...props}>{children}</button>),
  SheetContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

vi.mock('@/components/search-panel', () => ({
  SearchPanel: () => <div data-testid="search-panel">Search Panel</div>,
}));

describe('Header Component', () => {
  it('renders the logo with correct link', () => {
    render(<Header />);
    const logoLink = screen.getByLabelText('Harviera IT Solutions Home');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('displays the site name', () => {
    render(<Header />);
    const siteName = screen.getAllByText('Harviera IT Solutions')[0];
    expect(siteName).toBeInTheDocument();
  });

  it('renders all main navigation items', () => {
    render(<Header />);
    expect(screen.getAllByText('Services')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Solutions')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Resources')[0]).toBeInTheDocument();
    expect(screen.getAllByText('About')[0]).toBeInTheDocument();
  });

  it('has proper ARIA labels for accessibility', () => {
    render(<Header />);
    const servicesMenu = screen.getByLabelText('Services menu');
    expect(servicesMenu).toBeInTheDocument();
  });

  it('renders search button', () => {
    render(<Header />);
    const searchButton = screen.getByLabelText('Open search');
    expect(searchButton).toBeInTheDocument();
  });

  it('renders mobile menu toggle', () => {
    render(<Header />);
    const mobileMenuButton = screen.getByLabelText('Open menu');
    expect(mobileMenuButton).toBeInTheDocument();
  });
});
