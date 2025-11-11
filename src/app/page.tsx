import { HeroSplit } from '@/components/sections/hero-split';
import { siteConfig } from '@/config/site';

export default function Home() {
  return (
    <HeroSplit
      title="Transform Your Business with Cutting-Edge Technology"
      description="Enterprise-grade IT consulting and solutions"
      ctaPrimary={{ text: siteConfig.ctas.primary.title, href: siteConfig.ctas.primary.href }}
    />
  );
}
