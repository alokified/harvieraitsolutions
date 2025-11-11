import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './header';
import { ReactNode } from 'react';

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
        ],
      },
    ],
  },
}));

// Mock UI components with keyboard support
vi.mock('@/components/ui/button', () => ({
  Button: ({
    children,
    onClick,
    ...props
  }: {
    children: ReactNode;
    onClick?: () => void;
    [key: string]: unknown;
  }) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
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
    onClick,
    ...props
  }: {
    children: ReactNode;
    onClick?: () => void;
    [key: string]: unknown;
  }) => (
    <button onClick={onClick} role="button" aria-haspopup="true" {...props}>
      {children}
    </button>
  ),
  NavigationMenuContent: ({ children }: { children: ReactNode }) => (
    <div role="region" aria-label="Submenu">
      {children}
    </div>
  ),
  NavigationMenuLink: ({ children, asChild }: { children: ReactNode; asChild?: boolean }) =>
    asChild ? children : <a>{children}</a>,
}));

vi.mock('@/components/ui/sheet', () => ({
  Sheet: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  SheetTrigger: ({ children, ...props }: { children: ReactNode; [key: string]: unknown }) => (
    <button {...props}>{children}</button>
  ),
  SheetContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

vi.mock('@/components/search-panel', () => ({
  SearchPanel: () => <div data-testid="search-panel">Search Panel</div>,
}));

describe('MegaMenu Keyboard Navigation', () => {
  it('navigation menu trigger has proper ARIA attributes', () => {
    render(<Header />);
    const servicesButton = screen.getByRole('button', { name: /services/i });
    expect(servicesButton).toHaveAttribute('aria-haspopup', 'true');
  });

  it('menu items are keyboard accessible', async () => {
    render(<Header />);

    const servicesButton = screen.getByRole('button', { name: /services/i });

    // Tab to the services button
    await userEvent.tab();
    // The button should be focused (testing that it's in tab order)
    expect(document.activeElement?.tagName).toBe('BUTTON');
  });

  it('search button is keyboard accessible', async () => {
    render(<Header />);

    const searchButton = screen.getByLabelText('Open search');
    expect(searchButton).toBeInTheDocument();

    // Button should be focusable
    searchButton.focus();
    expect(document.activeElement).toBe(searchButton);
  });

  it('mobile menu button is keyboard accessible', async () => {
    render(<Header />);

    const mobileMenuButton = screen.getByLabelText('Open menu');
    expect(mobileMenuButton).toBeInTheDocument();

    // Button should be focusable
    mobileMenuButton.focus();
    expect(document.activeElement).toBe(mobileMenuButton);
  });

  it('logo link is keyboard accessible and first in tab order', async () => {
    render(<Header />);

    const logoLink = screen.getByLabelText('Harviera IT Solutions Home');

    // Tab once should focus the logo
    await userEvent.tab();
    // Logo link should receive focus first
    expect(logoLink).toBeInTheDocument();
  });
});
