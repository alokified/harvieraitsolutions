import { allIndustries } from '.contentlayer/generated';
import { HeroSplit } from '@/components/sections/hero-split';
import { SolutionCard } from '@/components/sections/solution-card';
import { CTABand } from '@/components/sections/cta-band';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industry Solutions | Harviera IT Solutions',
  description:
    'Tailored IT solutions for fintech, healthcare, retail, education, and logistics industries.',
};

export default function SolutionsPage() {
  return (
    <>
      <HeroSplit
        subtitle="Industry Solutions"
        title="Specialized Solutions for Your Industry"
        description="We understand the unique challenges of your industry and deliver solutions that address them effectively."
        ctaPrimary={{ text: 'Explore Solutions', href: '#solutions' }}
        ctaSecondary={{ text: 'Contact Us', href: '/contact' }}
        imageSrc="/images/solutions-hero.jpg"
        imageAlt="Industry Solutions"
      />

      <section className="py-16 md:py-24" id="solutions">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Industry-Specific Expertise</h2>
            <p className="text-lg text-muted-foreground">
              Deep domain knowledge combined with technical excellence.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allIndustries.map((industry) => (
              <SolutionCard
                key={industry.slug}
                title={industry.title}
                industry={industry.title}
                description={industry.description}
                benefits={industry.challenges || []}
                href={`/solutions/${industry.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Need a Custom Solution?"
        description="Every industry has unique requirements. Let's build something perfect for yours."
        ctaText="Start Discussion"
        ctaHref="/contact"
      />
    </>
  );
}
