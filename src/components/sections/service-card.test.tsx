import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ServiceCard } from './service-card';
import { Cloud } from 'lucide-react';
import { ReactNode } from 'react';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: ReactNode; [key: string]: unknown }) => (
      <div {...props}>{children}</div>
    ),
  },
}));

// Mock UI components
vi.mock('@/components/ui/card', () => ({
  Card: ({ children, className }: { children: ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
  CardHeader: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  CardTitle: ({ children, className }: { children: ReactNode; className?: string }) => (
    <h3 className={className}>{children}</h3>
  ),
  CardDescription: ({ children }: { children: ReactNode }) => <p>{children}</p>,
  CardContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

vi.mock('@/components/ui/button', () => ({
  Button: ({
    children,
    asChild,
    ...props
  }: {
    children: ReactNode;
    asChild?: boolean;
    [key: string]: unknown;
  }) => {
    if (asChild) {
      return <>{children}</>;
    }
    return <button {...props}>{children}</button>;
  },
}));

describe('ServiceCard Component', () => {
  const defaultProps = {
    icon: Cloud,
    title: 'Cloud Services',
    description: 'Scalable cloud infrastructure solutions',
    features: ['AWS Integration', 'Azure Support', 'Google Cloud Platform'],
    href: '/services/cloud',
  };

  it('renders the service title', () => {
    render(<ServiceCard {...defaultProps} />);
    expect(screen.getByText('Cloud Services')).toBeInTheDocument();
  });

  it('renders the service description', () => {
    render(<ServiceCard {...defaultProps} />);
    expect(screen.getByText('Scalable cloud infrastructure solutions')).toBeInTheDocument();
  });

  it('renders all features in a list', () => {
    render(<ServiceCard {...defaultProps} />);
    expect(screen.getByText('AWS Integration')).toBeInTheDocument();
    expect(screen.getByText('Azure Support')).toBeInTheDocument();
    expect(screen.getByText('Google Cloud Platform')).toBeInTheDocument();
  });

  it('renders the icon component', () => {
    const { container } = render(<ServiceCard {...defaultProps} />);
    // Check for icon container with correct styling
    const iconContainer = container.querySelector('.bg-blue-100');
    expect(iconContainer).toBeInTheDocument();
  });

  it('renders the "Learn more" link with correct href', () => {
    render(<ServiceCard {...defaultProps} />);
    const link = screen.getByRole('link', { name: /learn more/i });
    expect(link).toHaveAttribute('href', '/services/cloud');
  });

  it('renders with different features array', () => {
    const customProps = {
      ...defaultProps,
      features: ['Feature A', 'Feature B'],
    };
    render(<ServiceCard {...customProps} />);
    expect(screen.getByText('Feature A')).toBeInTheDocument();
    expect(screen.getByText('Feature B')).toBeInTheDocument();
    expect(screen.queryByText('AWS Integration')).not.toBeInTheDocument();
  });

  it('renders with custom index prop', () => {
    render(<ServiceCard {...defaultProps} index={5} />);
    // Component should render regardless of index value
    expect(screen.getByText('Cloud Services')).toBeInTheDocument();
  });

  it('applies hover shadow class to card', () => {
    const { container } = render(<ServiceCard {...defaultProps} />);
    const card = container.querySelector('.hover\\:shadow-lg');
    expect(card).toBeInTheDocument();
  });
});
