'use client';

import { useMDXComponent } from 'next-contentlayer2/hooks';

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
  code: ({ ...props }) => (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm" {...props} />
  ),
  pre: ({ ...props }) => (
    <pre className="mb-4 overflow-x-auto rounded-lg bg-muted p-4" {...props} />
  ),
  blockquote: ({ ...props }) => (
    <blockquote className="mb-4 border-l-4 border-primary pl-4 italic" {...props} />
  ),
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
