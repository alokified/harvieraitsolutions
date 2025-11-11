'use client';

import { useMDXComponent } from 'next-contentlayer2/hooks';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { AlertCircle, Info, CheckCircle2, AlertTriangle } from 'lucide-react';

// CodeBlock component with syntax highlighting
interface CodeBlockProps {
  children: string;
  className?: string;
  filename?: string;
}

function CodeBlock({ children, className, filename }: CodeBlockProps) {
  const language = className?.replace('language-', '') || 'text';

  return (
    <div className="my-6">
      {filename && (
        <div className="rounded-t-lg bg-muted px-4 py-2 text-sm font-mono text-muted-foreground">
          {filename}
        </div>
      )}
      <pre className={cn('overflow-x-auto rounded-lg bg-muted p-4', filename && 'rounded-t-none')}>
        <code className={`language-${language}`}>{children}</code>
      </pre>
    </div>
  );
}

// Callout component for important notes
interface CalloutProps {
  type?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  children: React.ReactNode;
}

function Callout({ type = 'info', title, children }: CalloutProps) {
  const icons = {
    info: Info,
    warning: AlertTriangle,
    error: AlertCircle,
    success: CheckCircle2,
  };

  const colors = {
    info: 'border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-100',
    warning:
      'border-yellow-500 bg-yellow-50 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-100',
    error: 'border-red-500 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100',
    success: 'border-green-500 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100',
  };

  const Icon = icons[type];

  return (
    <Card className={cn('my-6 border-l-4 p-4', colors[type])}>
      <div className="flex gap-3">
        <Icon className="mt-0.5 h-5 w-5 shrink-0" />
        <div className="flex-1">
          {title && <div className="mb-2 font-semibold">{title}</div>}
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </Card>
  );
}

// MDXImage component with Next.js Image optimization
interface MDXImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

function MDXImage({ src, alt, width = 800, height = 600, caption }: MDXImageProps) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-lg border">
        <Image src={src} alt={alt} width={width} height={height} className="w-full" />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Enhanced Table component
function Table({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border">
      <table className="w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  );
}

function TableHeader({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className="bg-muted" {...props}>
      {children}
    </thead>
  );
}

function TableRow({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className="border-b last:border-0" {...props}>
      {children}
    </tr>
  );
}

function TableHead({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th className="px-4 py-3 text-left font-semibold" {...props}>
      {children}
    </th>
  );
}

function TableCell({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className="px-4 py-3" {...props}>
      {children}
    </td>
  );
}

const components = {
  h1: ({ ...props }) => <h1 className="mb-4 mt-8 text-4xl font-bold" {...props} />,
  h2: ({ ...props }) => <h2 className="mb-3 mt-6 text-3xl font-bold" {...props} />,
  h3: ({ ...props }) => <h3 className="mb-2 mt-4 text-2xl font-semibold" {...props} />,
  p: ({ ...props }) => <p className="mb-4 leading-7" {...props} />,
  ul: ({ ...props }) => <ul className="mb-4 ml-6 list-disc" {...props} />,
  ol: ({ ...props }) => <ol className="mb-4 ml-6 list-decimal" {...props} />,
  li: ({ ...props }) => <li className="mb-2" {...props} />,
  a: ({ ...props }) => (
    <a className="font-medium text-primary underline underline-offset-4" {...props} />
  ),
  code: ({
    className,
    children,
    ...props
  }: {
    className?: string;
    children?: React.ReactNode;
    [key: string]: unknown;
  }) => {
    // If it's a code block (has a language class), use CodeBlock
    if (className?.startsWith('language-')) {
      return (
        <CodeBlock className={className} {...props}>
          {String(children)}
        </CodeBlock>
      );
    }
    // Otherwise, inline code
    return (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm" {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children }: { children?: React.ReactNode }) => <>{children}</>, // Let code handle the pre wrapper
  blockquote: ({ ...props }) => (
    <blockquote className="mb-4 border-l-4 border-primary pl-4 italic" {...props} />
  ),
  table: Table,
  thead: TableHeader,
  tr: TableRow,
  th: TableHead,
  td: TableCell,
  // Custom components
  CodeBlock,
  Callout,
  MDXImage,
  Image: MDXImage,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="mdx">
      {/* eslint-disable-next-line react-hooks/static-components */}
      <Component components={components} />
    </div>
  );
}
