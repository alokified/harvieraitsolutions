'use client';

import { Button } from '@/components/ui/button';
import { Twitter, Linkedin, Facebook, Share2 } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="mb-12 flex items-center gap-4 border-y py-4">
      <span className="text-sm font-medium">Share:</span>
      <div className="flex gap-2">
        <Button variant="outline" size="icon" asChild>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Twitter"
          >
            <Twitter className="h-4 w-4" />
          </a>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Facebook"
          >
            <Facebook className="h-4 w-4" />
          </a>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleCopyLink}
          aria-label={copied ? 'Link copied!' : 'Copy link'}
          title={copied ? 'Link copied!' : 'Copy link'}
        >
          <Share2 className={`h-4 w-4 ${copied ? 'text-green-600' : ''}`} />
        </Button>
      </div>
    </div>
  );
}
