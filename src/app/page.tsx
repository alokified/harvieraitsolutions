import { allServices, allCaseStudies, allBlogPosts, allGuides } from '.contentlayer/generated';
import { HeroSplit } from '@/components/sections/hero-split';
import { LogoWall } from '@/components/sections/logo-wall';
import { ServiceCard } from '@/components/sections/service-card';
import { CaseStudyCard } from '@/components/sections/case-study-card';
import { TimelineSteps } from '@/components/sections/timeline-steps';
import { Testimonials } from '@/components/sections/testimonials';
import { BlogCard } from '@/components/sections/blog-card';
import { FAQAccordion } from '@/components/sections/faq-accordion';
import { CTABand } from '@/components/sections/cta-band';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const trustedLogos = [
  { name: 'Microsoft', src: '/logos/microsoft.svg' },
  { name: 'AWS', src: '/logos/aws.svg' },
  { name: 'Google Cloud', src: '/logos/gcp.svg' },
  { name: 'Salesforce', src: '/logos/salesforce.svg' },
  { name: 'Oracle', src: '/logos/oracle.svg' },
  { name: 'SAP', src: '/logos/sap.svg' },
];

const industries = [
  { name: 'Fintech', icon: '💳', href: '/solutions/fintech' },
  { name: 'Healthcare', icon: '🏥', href: '/solutions/healthcare' },
  { name: 'Retail', icon: '🛍️', href: '/solutions/retail-ecommerce' },
  { name: 'Education', icon: '🎓', href: '/solutions/edtech' },
  { name: 'Logistics', icon: '🚚', href: '/solutions/logistics' },
];

const processSteps = [
  {
    title: 'Discovery & Planning',
    description:
      'We analyze your needs, define objectives, and create a roadmap aligned with your business goals.',
  },
  {
    title: 'Design & Architecture',
    description:
      'Our experts design scalable, secure solutions with modern architecture and best practices.',
  },
  {
    title: 'Development & Testing',
    description:
      'Agile development with continuous testing, code reviews, and quality assurance at every stage.',
  },
  {
    title: 'Deployment & Support',
    description: 'Seamless deployment with ongoing monitoring, optimization, and 24/7 support.',
  },
];

const faqs = [
  {
    question: 'What industries do you specialize in?',
    answer:
      'We work across multiple industries including fintech, healthcare, retail/e-commerce, education, and logistics. Our team has deep domain expertise in regulated industries and complex enterprise environments.',
  },
  {
    question: 'How do you ensure project success?',
    answer:
      'We follow agile methodologies with regular sprints, continuous communication, automated testing, and iterative feedback. Every project has a dedicated team, clear milestones, and measurable KPIs.',
  },
  {
    question: 'What is your typical engagement model?',
    answer:
      'We offer flexible engagement models including fixed-price projects, time & materials, dedicated teams, and staff augmentation. We tailor our approach based on your specific needs and project requirements.',
  },
  {
    question: 'Do you provide ongoing support after launch?',
    answer:
      'Yes, we offer comprehensive support packages including 24/7 monitoring, maintenance, bug fixes, security updates, and feature enhancements. Our managed services ensure your systems run smoothly.',
  },
  {
    question: 'How do you handle data security and compliance?',
    answer:
      'Security is built into every phase of development. We follow industry standards (ISO 27001, SOC 2), implement encryption, conduct security audits, and ensure compliance with regulations like GDPR, HIPAA, and PCI DSS.',
  },
];

export default function Home() {
  const featuredCaseStudy = allCaseStudies[0];
  const latestResources = [...allBlogPosts, ...allGuides]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <>
      <HeroSplit
        headline="Transform Your Business with Enterprise Technology"
        description="We deliver world-class IT solutions that drive growth, efficiency, and innovation. From custom software to AI-powered systems, we turn your vision into reality."
        primaryCTA={{ label: 'Start Your Project', href: '/contact' }}
        secondaryCTA={{ label: 'View Our Work', href: '/case-studies' }}
        imageSrc="/images/hero-home.jpg"
        imageAlt="Enterprise Technology Solutions"
      />

      <LogoWall title="Trusted by Industry Leaders" logos={trustedLogos} />

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Our Services</h2>
            <p className="text-lg text-muted-foreground">
              End-to-end technology solutions tailored to your business needs
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allServices.slice(0, 6).map((service) => (
              <ServiceCard
                key={service.slug}
                title={service.title}
                description={service.description}
                icon={service.icon}
                features={service.features.slice(0, 3)}
                href={`/services/${service.slug}`}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-lg font-semibold text-primary hover:underline"
            >
              View All Services
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30 py-12">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold">Industries We Serve</h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {industries.map((industry) => (
              <Link
                key={industry.name}
                href={industry.href}
                className="group flex items-center gap-3 rounded-lg border bg-background px-6 py-4 transition-all hover:border-primary hover:shadow-md"
              >
                <span className="text-3xl">{industry.icon}</span>
                <span className="font-semibold group-hover:text-primary">{industry.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {featuredCaseStudy && (
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <Badge variant="outline" className="mb-4">
                Featured Success Story
              </Badge>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Delivering Measurable Results</h2>
              <p className="text-lg text-muted-foreground">
                See how we helped {featuredCaseStudy.client} achieve transformative outcomes
              </p>
            </div>

            <div className="mx-auto max-w-4xl">
              <CaseStudyCard
                title={featuredCaseStudy.title}
                client={featuredCaseStudy.client}
                industry={featuredCaseStudy.industry}
                kpis={featuredCaseStudy.kpis}
                href={`/case-studies/${featuredCaseStudy.slug}`}
              />
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 text-lg font-semibold text-primary hover:underline"
              >
                View All Case Studies
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Our Process</h2>
            <p className="text-lg text-muted-foreground">
              A proven methodology that ensures project success
            </p>
          </div>

          <TimelineSteps steps={processSteps} />
        </div>
      </section>

      <Testimonials />

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Latest Insights</h2>
            <p className="text-lg text-muted-foreground">
              Expert perspectives on technology trends and best practices
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {latestResources.map((resource) => (
              <BlogCard
                key={resource.slug}
                title={resource.title}
                excerpt={'excerpt' in resource ? resource.excerpt : resource.description}
                author={resource.author}
                date={resource.date}
                readTime={resource.readTime}
                category={resource.category}
                link={`/resources/${'category' in resource && resource.category === 'guide' ? 'guides' : 'blog'}/${resource.slug}`}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/resources/blog"
              className="inline-flex items-center gap-2 text-lg font-semibold text-primary hover:underline"
            >
              View All Resources
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t py-16 md:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about working with us
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to Transform Your Business?"
        description="Let's discuss how we can help you achieve your technology goals."
        primaryCTA={{ label: 'Schedule a Consultation', href: '/contact' }}
        secondaryCTA={{ label: 'View Our Services', href: '/services' }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </>
  );
}
