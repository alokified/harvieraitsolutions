import { notFound } from 'next/navigation';
import { allIndustries, allCaseStudies } from '.contentlayer/generated';
import { Mdx } from '@/components/mdx-components';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CaseStudyCard } from '@/components/sections/case-study-card';
import { TimelineSteps } from '@/components/sections/timeline-steps';
import { FAQAccordion } from '@/components/sections/faq-accordion';
import { CTABand } from '@/components/sections/cta-band';

interface IndustryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return allIndustries.map((industry) => ({
    slug: industry.slug,
  }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const industry = allIndustries.find((i) => i.slug === params.slug);

  if (!industry) {
    return {};
  }

  return {
    title: `${industry.title} Solutions | Harviera IT Solutions`,
    description: industry.description,
  };
}

const industryFAQs: Record<string, Array<{ question: string; answer: string }>> = {
  fintech: [
    {
      question: 'How do you ensure compliance with financial regulations?',
      answer:
        'We have deep expertise in regulations like PCI DSS, SOX, GDPR, and regional banking laws. Our solutions are built with compliance in mind from day one, including audit trails, data encryption, and secure authentication mechanisms.',
    },
    {
      question: 'Can you integrate with existing banking systems?',
      answer:
        'Yes, we have extensive experience integrating with core banking systems, payment gateways, KYC/AML platforms, and other fintech infrastructure. We use secure APIs and follow industry standards for financial data exchange.',
    },
    {
      question: 'How do you handle transaction security?',
      answer:
        'We implement multi-layered security including encryption, tokenization, fraud detection algorithms, and real-time monitoring. All transactions are processed through secure channels with comprehensive audit logging.',
    },
  ],
  healthcare: [
    {
      question: 'Are your solutions HIPAA compliant?',
      answer:
        'Absolutely. We build HIPAA-compliant solutions with proper safeguards for protected health information (PHI), including encryption at rest and in transit, access controls, audit logging, and business associate agreements.',
    },
    {
      question: 'Can you integrate with EHR/EMR systems?',
      answer:
        'Yes, we integrate with major EHR systems like Epic, Cerner, and Allscripts using HL7, FHIR, and other healthcare interoperability standards. We ensure seamless data exchange while maintaining compliance.',
    },
    {
      question: 'How do you ensure patient data privacy?',
      answer:
        'We implement role-based access controls, data anonymization, encryption, secure authentication, and comprehensive audit trails. We follow HIPAA Privacy and Security Rules and conduct regular security assessments.',
    },
  ],
  'retail-ecommerce': [
    {
      question: 'Can you handle high-traffic shopping events?',
      answer:
        'Yes, we design systems with auto-scaling capabilities, CDN integration, and caching strategies to handle traffic spikes during peak shopping periods like Black Friday and holiday seasons.',
    },
    {
      question: 'What payment gateways do you integrate with?',
      answer:
        'We integrate with all major payment providers including Stripe, PayPal, Square, and regional gateways. We ensure PCI DSS compliance and support multiple payment methods including cards, digital wallets, and BNPL.',
    },
    {
      question: 'How do you improve conversion rates?',
      answer:
        'We implement personalization engines, A/B testing, cart abandonment recovery, optimized checkout flows, and recommendation systems. We use analytics to continuously optimize the customer journey.',
    },
  ],
  edtech: [
    {
      question: 'Can your platforms scale for large student populations?',
      answer:
        'Yes, we build scalable cloud-native platforms that can handle thousands of concurrent users. Our systems support video streaming, real-time collaboration, and adaptive content delivery.',
    },
    {
      question: 'Do you support FERPA and COPPA compliance?',
      answer:
        'Absolutely. We ensure compliance with educational privacy regulations including FERPA, COPPA, and GDPR. We implement proper consent mechanisms, data protection, and parental controls where required.',
    },
    {
      question: 'What LMS platforms do you work with?',
      answer:
        'We integrate with Canvas, Moodle, Blackboard, and other major LMS platforms. We also build custom learning management systems tailored to specific educational requirements.',
    },
  ],
  logistics: [
    {
      question: 'How do you enable real-time tracking?',
      answer:
        'We integrate GPS, IoT sensors, and mobile apps to provide real-time visibility into shipments, vehicles, and assets. Our platforms support geofencing, route optimization, and automated notifications.',
    },
    {
      question: 'Can you integrate with existing TMS/WMS systems?',
      answer:
        'Yes, we have experience integrating with Transportation Management Systems (TMS) and Warehouse Management Systems (WMS) from major vendors. We use APIs, EDI, and other integration methods.',
    },
    {
      question: 'How do you optimize delivery routes?',
      answer:
        'We use advanced algorithms for route optimization considering factors like traffic, delivery windows, vehicle capacity, and fuel efficiency. Our systems provide dynamic re-routing based on real-time conditions.',
    },
  ],
};

const processSteps: Record<string, Array<{ title: string; description: string }>> = {
  fintech: [
    {
      title: 'Compliance Assessment',
      description: 'Review regulatory requirements and compliance gaps.',
    },
    {
      title: 'Security Architecture',
      description: 'Design secure infrastructure with fraud prevention and encryption.',
    },
    {
      title: 'Integration Planning',
      description: 'Map out integrations with banking systems and payment gateways.',
    },
    {
      title: 'Development & Testing',
      description: 'Build features with rigorous security and functional testing.',
    },
    {
      title: 'Audit & Launch',
      description: 'Conduct security audits and deploy with compliance certification.',
    },
  ],
  healthcare: [
    {
      title: 'HIPAA Assessment',
      description: 'Evaluate current systems and define compliance requirements.',
    },
    {
      title: 'Architecture Design',
      description: 'Create secure, interoperable healthcare solution architecture.',
    },
    {
      title: 'EHR Integration',
      description: 'Integrate with electronic health records using HL7/FHIR standards.',
    },
    {
      title: 'Testing & Validation',
      description: 'Comprehensive testing including compliance and security validation.',
    },
    {
      title: 'Deployment & Training',
      description: 'Launch with staff training and ongoing HIPAA compliance monitoring.',
    },
  ],
  'retail-ecommerce': [
    {
      title: 'Business Analysis',
      description: 'Understand customer journey, pain points, and business goals.',
    },
    {
      title: 'Platform Selection',
      description: 'Choose optimal e-commerce platform or build custom solution.',
    },
    {
      title: 'Development & Integration',
      description: 'Build features and integrate payment, inventory, and shipping systems.',
    },
    {
      title: 'Optimization',
      description: 'Implement personalization, SEO, and conversion optimization.',
    },
    {
      title: 'Launch & Scale',
      description: 'Deploy with monitoring and continuous improvement based on analytics.',
    },
  ],
  edtech: [
    {
      title: 'Educational Design',
      description: 'Define learning objectives and instructional design approach.',
    },
    {
      title: 'Platform Architecture',
      description: 'Design scalable platform supporting multimedia and collaboration.',
    },
    {
      title: 'Content Development',
      description: 'Create interactive content with assessments and progress tracking.',
    },
    {
      title: 'Testing & Accessibility',
      description: 'Ensure WCAG compliance and test with educators and students.',
    },
    {
      title: 'Launch & Support',
      description: 'Deploy with training and ongoing content management support.',
    },
  ],
  logistics: [
    {
      title: 'Operations Analysis',
      description: 'Map current workflows and identify optimization opportunities.',
    },
    {
      title: 'System Design',
      description: 'Design integrated platform for tracking, routing, and analytics.',
    },
    {
      title: 'IoT Integration',
      description: 'Connect sensors, GPS devices, and tracking systems.',
    },
    {
      title: 'Optimization Algorithms',
      description: 'Implement route optimization and predictive analytics.',
    },
    {
      title: 'Deployment & Monitoring',
      description: 'Roll out with real-time monitoring and continuous optimization.',
    },
  ],
};

const technologyStacks: Record<string, string[]> = {
  fintech: [
    'Plaid',
    'Stripe',
    'Dwolla',
    'Blockchain',
    'Solidity',
    'Hyperledger',
    'AWS Financial Services',
    'Azure Financial',
    'KYC APIs',
    'AML Tools',
    'Encryption Libraries',
    'Fraud Detection ML',
  ],
  healthcare: [
    'HL7 FHIR',
    'Epic APIs',
    'Cerner APIs',
    'DICOM',
    'Twilio Video',
    'AWS HealthLake',
    'Azure Health Data Services',
    'MongoDB HIPAA',
    'Redis Healthcare',
    'ML Diagnostics',
    'Telemedicine SDKs',
    'EHR Integration',
  ],
  'retail-ecommerce': [
    'Shopify',
    'Magento',
    'WooCommerce',
    'Stripe',
    'PayPal',
    'Algolia Search',
    'Elasticsearch',
    'Redis Cache',
    'CDN (CloudFlare)',
    'Segment Analytics',
    'Google Analytics',
    'Recommendation Engines',
  ],
  edtech: [
    'Canvas LMS',
    'Moodle',
    'WebRTC',
    'Twilio',
    'Zoom SDK',
    'Adaptive Learning AI',
    'xAPI (Experience API)',
    'SCORM',
    'MongoDB',
    'PostgreSQL',
    'AWS Educate',
    'Azure Education',
  ],
  logistics: [
    'Google Maps API',
    'Mapbox',
    'GPS Tracking APIs',
    'IoT Platforms',
    'Route Optimization',
    'TMS Integration',
    'WMS Integration',
    'EDI',
    'Real-time Analytics',
    'Predictive ML',
    'Mobile SDKs',
    'Geofencing',
  ],
};

const packages = [
  {
    name: 'Essential',
    description: 'Core solution for getting started',
    features: [
      'Industry-specific features',
      'Basic integrations',
      'Mobile responsive',
      '3 months support',
    ],
  },
  {
    name: 'Professional',
    description: 'Comprehensive solution for growth',
    features: [
      'Advanced features',
      'Full integrations',
      'Custom workflows',
      '6 months support',
      'Training included',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    description: 'Full-scale industry solution',
    features: [
      'Custom development',
      'Unlimited integrations',
      'Compliance support',
      '12 months support',
      'Dedicated team',
    ],
  },
];

export default function IndustryPage({ params }: IndustryPageProps) {
  const industry = allIndustries.find((i) => i.slug === params.slug);

  if (!industry) {
    notFound();
  }

  const relatedCaseStudies = allCaseStudies
    .filter((cs) => cs.industry?.toLowerCase().includes(industry.title.toLowerCase().split(' ')[0]))
    .slice(0, 3);

  const faqs = industryFAQs[industry.slug] || [];
  const steps = processSteps[industry.slug] || [];
  const technologies = technologyStacks[industry.slug] || [];

  return (
    <>
      <section className="border-b py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="mb-4">
              {industry.icon} Industry Solution
            </Badge>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">{industry.title}</h1>
            <p className="mb-8 text-xl text-muted-foreground">{industry.description}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Get Started
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold">Key Outcomes</h2>
              <ul className="space-y-4">
                {industry.benefits.map((benefit, index) => (
                  <li key={index} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-3xl font-bold">Industry Challenges</h2>
              <ul className="space-y-4">
                {industry.challenges.map((challenge, index) => (
                  <li key={index} className="flex gap-3">
                    <AlertCircle className="mt-1 h-5 w-5 shrink-0 text-destructive" />
                    <span className="text-lg">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Our Solutions</h2>
            <p className="text-lg text-muted-foreground">
              How we address your industry&apos;s unique needs
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industry.solutions.map((solution, index) => (
              <Card key={index} className="p-6">
                <div className="mb-3 flex gap-2">
                  <ArrowRight className="h-5 w-5 shrink-0 text-primary" />
                  <h3 className="font-semibold">{solution}</h3>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Specialized Capabilities</h2>
            <p className="text-lg text-muted-foreground">
              Technologies and expertise for {industry.title.toLowerCase()}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {technologies.map((tech, index) => (
              <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Technology Stack</h2>
            <p className="text-lg text-muted-foreground">
              Industry-specific tools and platforms we leverage
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {technologies.slice(0, 12).map((tech, index) => (
              <Card key={index} className="flex items-center justify-center p-6">
                <span className="text-center text-sm font-medium">{tech}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {steps.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Our Process</h2>
              <p className="text-lg text-muted-foreground">
                Specialized approach for {industry.title.toLowerCase()} solutions
              </p>
            </div>

            <TimelineSteps steps={steps} />
          </div>
        </section>
      )}

      {relatedCaseStudies.length > 0 && (
        <section className="border-y bg-muted/30 py-16 md:py-24">
          <div className="container">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                {industry.title} Success Stories
              </h2>
              <p className="text-lg text-muted-foreground">
                See how we&apos;ve helped {industry.title.toLowerCase()} clients succeed
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedCaseStudies.map((caseStudy) => (
                <CaseStudyCard
                  key={caseStudy.slug}
                  title={caseStudy.title}
                  client={caseStudy.client}
                  industry={caseStudy.industry}
                  kpis={caseStudy.kpis}
                  href={`/case-studies/${caseStudy.slug}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Choose Your Package</h2>
            <p className="text-lg text-muted-foreground">
              Flexible options tailored for {industry.title.toLowerCase()}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className={`p-8 ${pkg.highlighted ? 'border-primary shadow-lg' : ''}`}
              >
                {pkg.highlighted && <Badge className="mb-4">Recommended</Badge>}
                <h3 className="mb-2 text-2xl font-bold">{pkg.name}</h3>
                <p className="mb-6 text-muted-foreground">{pkg.description}</p>
                <ul className="mb-8 space-y-3">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`inline-flex h-11 w-full items-center justify-center rounded-md px-8 text-sm font-medium shadow transition-colors ${
                    pkg.highlighted
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  Get Quote
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="border-y bg-muted/30 py-16 md:py-24">
          <div className="container">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Common questions about {industry.title.toLowerCase()} solutions
              </p>
            </div>

            <div className="mx-auto max-w-3xl">
              <FAQAccordion faqs={faqs} />
            </div>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="container">
          <div className="prose prose-lg mx-auto max-w-4xl dark:prose-invert">
            <Mdx code={industry.body.code} />
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to Transform Your Business?"
        description={`Let's discuss how our ${industry.title.toLowerCase()} solutions can help you succeed.`}
        primaryCTA={{ label: 'Schedule Consultation', href: '/contact' }}
        secondaryCTA={{ label: 'View All Solutions', href: '/solutions' }}
      />
    </>
  );
}
