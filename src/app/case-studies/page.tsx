import { allCaseStudies } from '.contentlayer/generated';
import { HeroSplit } from '@/components/sections/hero-split';
import { CaseStudyCard } from '@/components/sections/case-study-card';
import { CTABand } from '@/components/sections/cta-band';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies | Harviera IT Solutions',
  description:
    'Success stories from clients across fintech, healthcare, and e-commerce industries.',
};

export default function CaseStudiesPage() {
  return (
    <>
      <HeroSplit
        eyebrow="Success Stories"
        headline="Real Results from Real Clients"
        description="Discover how we've helped organizations transform their business through technology."
        primaryCTA={{ label: 'View All Studies', href: '#case-studies' }}
        secondaryCTA={{ label: 'Start Your Project', href: '/contact' }}
        imageSrc="/images/case-studies-hero.jpg"
        imageAlt="Case Studies"
      />

      <section className="py-16 md:py-24" id="case-studies">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Client Success Stories</h2>
            <p className="text-lg text-muted-foreground">
              Measurable impact across industries and technologies.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allCaseStudies.map((caseStudy) => (
              <CaseStudyCard
                key={caseStudy.slug}
                title={caseStudy.title}
                client={caseStudy.client}
                industry={caseStudy.industry}
                description={caseStudy.description}
                kpis={caseStudy.kpis}
                href={`/case-studies/${caseStudy.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to Write Your Success Story?"
        description="Join our growing list of satisfied clients achieving transformative results."
        primaryCTA={{ label: 'Start Your Project', href: '/contact' }}
        secondaryCTA={{ label: 'Our Services', href: '/services' }}
      />
    </>
  );
}
