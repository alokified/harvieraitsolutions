import { allServices } from '.contentlayer/generated';
import { HeroSplit } from '@/components/sections/hero-split';
import { ServiceCard } from '@/components/sections/service-card';
import { CTABand } from '@/components/sections/cta-band';
import { getIconComponent } from '@/lib/icons';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | Harviera IT Solutions',
  description:
    'Comprehensive IT services including software development, cloud, cybersecurity, AI/ML, QA automation, and managed IT support.',
};

export default function ServicesPage() {
  return (
    <>
      <HeroSplit
        subtitle="Our Services"
        title="Expert IT Solutions for Modern Businesses"
        description="From custom software development to managed IT services, we provide end-to-end technology solutions that drive growth and innovation."
        ctaPrimary={{ text: 'Schedule Consultation', href: '/contact' }}
        ctaSecondary={{ text: 'View Case Studies', href: '/case-studies' }}
        imageSrc="/images/services-hero.jpg"
        imageAlt="IT Services Overview"
      />

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Comprehensive IT Services</h2>
            <p className="text-lg text-muted-foreground">
              We deliver cutting-edge technology solutions tailored to your business needs.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allServices.map((service) => (
              <ServiceCard
                key={service.slug}
                title={service.title}
                description={service.description}
                icon={getIconComponent(service.icon)}
                features={service.features || []}
                href={`/services/${service.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to Transform Your Business?"
        description="Let's discuss how our services can help you achieve your goals."
        ctaText="Get Started"
        ctaHref="/contact"
      />
    </>
  );
}
