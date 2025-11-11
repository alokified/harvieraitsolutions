import { CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import type { Metadata } from 'next';
import { FAQAccordion } from '@/components/sections/faq-accordion';
import { CTABand } from '@/components/sections/cta-band';
import { generateFAQSchema, renderJsonLd } from '@/lib/json-ld';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Transparent pricing for enterprise IT solutions. Choose from our Good, Better, or Best packages, or contact us for custom enterprise solutions.',
  openGraph: {
    title: 'Pricing - Harviera IT Solutions',
    description:
      'Transparent pricing for enterprise IT solutions. Choose from our Good, Better, or Best packages.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://harviera.com'}/pricing`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing - Harviera IT Solutions',
    description:
      'Transparent pricing for enterprise IT solutions. Choose from our Good, Better, or Best packages.',
  },
};

const pricingTiers = [
  {
    name: 'Good',
    tagline: 'Perfect for startups',
    price: '$2,999',
    period: '/month',
    description: 'Essential IT solutions to get your business started',
    features: [
      { name: 'Up to 3 custom applications', included: true },
      { name: 'Basic cloud infrastructure', included: true },
      { name: '40 hours monthly support', included: true },
      { name: 'Email support (24hr response)', included: true },
      { name: 'Monthly performance reports', included: true },
      { name: 'Standard security protocols', included: true },
      { name: 'Code repository access', included: true },
      { name: 'Basic documentation', included: true },
      { name: 'Dedicated account manager', included: false },
      { name: 'Priority support', included: false },
      { name: 'Advanced security & compliance', included: false },
      { name: 'Custom integrations', included: false },
      { name: 'White-label solutions', included: false },
      { name: 'SLA guarantee', included: false },
    ],
    cta: 'Get Started',
    href: '/contact?plan=good',
    popular: false,
  },
  {
    name: 'Better',
    tagline: 'Ideal for growing companies',
    price: '$5,999',
    period: '/month',
    description: 'Comprehensive IT solutions for scaling businesses',
    features: [
      { name: 'Up to 8 custom applications', included: true },
      { name: 'Advanced cloud infrastructure', included: true },
      { name: '100 hours monthly support', included: true },
      { name: 'Priority support (4hr response)', included: true },
      { name: 'Weekly performance reports', included: true },
      { name: 'Advanced security & compliance', included: true },
      { name: 'Code repository access', included: true },
      { name: 'Comprehensive documentation', included: true },
      { name: 'Dedicated account manager', included: true },
      { name: 'Priority support', included: true },
      { name: 'Advanced security & compliance', included: true },
      { name: 'Custom integrations (up to 5)', included: true },
      { name: 'White-label solutions', included: false },
      { name: 'SLA guarantee (99.5%)', included: true },
    ],
    cta: 'Get Started',
    href: '/contact?plan=better',
    popular: true,
  },
  {
    name: 'Best',
    tagline: 'For established enterprises',
    price: '$11,999',
    period: '/month',
    description: 'Full-scale IT solutions with premium support',
    features: [
      { name: 'Unlimited custom applications', included: true },
      { name: 'Enterprise cloud infrastructure', included: true },
      { name: '200 hours monthly support', included: true },
      { name: '24/7 premium support (1hr response)', included: true },
      { name: 'Real-time performance dashboard', included: true },
      { name: 'Enterprise-grade security & compliance', included: true },
      { name: 'Code repository access', included: true },
      { name: 'Technical documentation + training', included: true },
      { name: 'Dedicated account manager + tech lead', included: true },
      { name: 'Priority support', included: true },
      { name: 'Advanced security & compliance', included: true },
      { name: 'Unlimited custom integrations', included: true },
      { name: 'White-label solutions', included: true },
      { name: 'SLA guarantee (99.9%)', included: true },
    ],
    cta: 'Get Started',
    href: '/contact?plan=best',
    popular: false,
  },
];

const comparisonFeatures = [
  {
    category: 'Development',
    features: [
      { name: 'Custom Applications', good: 'Up to 3', better: 'Up to 8', best: 'Unlimited' },
      { name: 'Code Repository Access', good: true, better: true, best: true },
      { name: 'Development Environment', good: 'Standard', better: 'Advanced', best: 'Enterprise' },
      {
        name: 'Testing & QA',
        good: 'Basic',
        better: 'Comprehensive',
        best: 'Full Suite + Automation',
      },
      { name: 'Custom Integrations', good: false, better: 'Up to 5', best: 'Unlimited' },
    ],
  },
  {
    category: 'Infrastructure',
    features: [
      { name: 'Cloud Infrastructure', good: 'Basic', better: 'Advanced', best: 'Enterprise' },
      {
        name: 'Database Support',
        good: 'Standard',
        better: 'Multi-DB',
        best: 'Multi-DB + Optimization',
      },
      { name: 'CDN & Caching', good: 'Basic', better: 'Advanced', best: 'Global Multi-tier' },
      { name: 'Auto-scaling', good: false, better: true, best: true },
      {
        name: 'Disaster Recovery',
        good: 'Basic Backup',
        better: 'Auto Backup + Recovery',
        best: 'Multi-region DR',
      },
    ],
  },
  {
    category: 'Support & Maintenance',
    features: [
      { name: 'Monthly Support Hours', good: '40 hours', better: '100 hours', best: '200 hours' },
      { name: 'Response Time', good: '24 hours', better: '4 hours', best: '1 hour' },
      {
        name: 'Support Channels',
        good: 'Email',
        better: 'Email + Chat',
        best: '24/7 Phone + Email + Chat',
      },
      { name: 'Dedicated Account Manager', good: false, better: true, best: true },
      { name: 'Technical Lead', good: false, better: false, best: true },
    ],
  },
  {
    category: 'Security & Compliance',
    features: [
      {
        name: 'Security Protocols',
        good: 'Standard',
        better: 'Advanced',
        best: 'Enterprise-grade',
      },
      {
        name: 'Compliance Support',
        good: 'Basic',
        better: 'GDPR, HIPAA',
        best: 'Full Compliance Suite',
      },
      {
        name: 'Security Audits',
        good: 'Annual',
        better: 'Quarterly',
        best: 'Monthly + Penetration Testing',
      },
      {
        name: 'Data Encryption',
        good: 'In-transit',
        better: 'In-transit + At-rest',
        best: 'Full Encryption + HSM',
      },
      { name: 'SLA Guarantee', good: false, better: '99.5%', best: '99.9%' },
    ],
  },
  {
    category: 'Reporting & Analytics',
    features: [
      {
        name: 'Performance Reports',
        good: 'Monthly',
        better: 'Weekly',
        best: 'Real-time Dashboard',
      },
      { name: 'Custom Analytics', good: false, better: 'Basic', best: 'Advanced + AI Insights' },
      {
        name: 'User Analytics',
        good: 'Basic',
        better: 'Advanced',
        best: 'Enterprise + Predictive',
      },
      { name: 'API Monitoring', good: false, better: true, best: 'Advanced + Alerting' },
      { name: 'Business Intelligence', good: false, better: false, best: true },
    ],
  },
];

const faqs = [
  {
    question: 'What is included in the monthly support hours?',
    answer:
      'Monthly support hours cover bug fixes, minor feature updates, performance optimization, security patches, and technical consultation. Additional hours can be purchased if needed.',
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer:
      'Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades apply at the start of your next billing cycle. We will help you migrate smoothly between tiers.',
  },
  {
    question: 'What happens if I exceed my monthly support hours?',
    answer:
      'We will notify you when you approach 80% of your monthly hours. Additional hours can be purchased at $150/hour, or you can upgrade to a higher tier for better value and more included hours.',
  },
  {
    question: 'Do you offer custom pricing for specific needs?',
    answer:
      'Absolutely! Our Enterprise plan is fully customizable. We can tailor solutions, support hours, SLAs, and features to match your exact requirements. Contact us for a personalized quote.',
  },
  {
    question: 'What is your refund policy?',
    answer:
      'We offer a 30-day money-back guarantee for new customers. If you are not satisfied with our services within the first month, we will provide a full refund, no questions asked.',
  },
  {
    question: 'Are there any setup or onboarding fees?',
    answer:
      'No hidden fees! All plans include free onboarding, initial setup, and migration assistance. We want to ensure you have a smooth start with our services.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept major credit cards, ACH transfers, wire transfers, and can set up net-30 or net-60 payment terms for enterprise clients with approved credit.',
  },
  {
    question: 'Can I add additional services or applications mid-contract?',
    answer:
      'Yes! You can add services at any time. Additional applications or features will be prorated based on your current billing cycle, and we will provide a detailed quote before proceeding.',
  },
];

export default function PricingPage() {
  // Generate FAQ JSON-LD schema
  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      {renderJsonLd(faqSchema)}
      {/* Hero Section */}
      <section className="border-b py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-4">
              Transparent Pricing
            </Badge>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              Choose Your Perfect Plan
            </h1>
            <p className="text-xl text-muted-foreground">
              Flexible pricing designed to grow with your business. Start with what you need, scale
              when you&apos;re ready.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-3">
            {pricingTiers.map((tier) => (
              <Card
                key={tier.name}
                className={`relative flex flex-col p-8 ${
                  tier.popular ? 'border-primary shadow-lg ring-2 ring-primary' : ''
                }`}
              >
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
                )}

                <div className="mb-6">
                  <h3 className="mb-2 text-2xl font-bold">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground">{tier.tagline}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
                </div>

                <Button
                  asChild
                  className="mb-8 w-full"
                  variant={tier.popular ? 'default' : 'outline'}
                >
                  <Link href={tier.href}>{tier.cta}</Link>
                </Button>

                <div className="flex-1 space-y-3">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      {feature.included ? (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                      ) : (
                        <X className="h-5 w-5 shrink-0 text-muted-foreground" />
                      )}
                      <span
                        className={`text-sm ${
                          feature.included ? 'text-foreground' : 'text-muted-foreground'
                        }`}
                      >
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="border-y bg-muted/30 py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Need Something More?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Our Enterprise plan offers fully customized solutions with dedicated resources, custom
              SLAs, and premium support tailored to your organization&apos;s unique needs.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact?plan=enterprise">Contact Sales</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/case-studies">View Case Studies</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Detailed Feature Comparison</h2>
            <p className="text-lg text-muted-foreground">
              Compare features across all plans to find the perfect fit
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left font-bold">Features</th>
                  <th className="p-4 text-center font-bold">Good</th>
                  <th className="p-4 text-center font-bold">Better</th>
                  <th className="p-4 text-center font-bold">Best</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((category, categoryIndex) => (
                  <>
                    <tr key={`category-${categoryIndex}`} className="border-b bg-muted/30">
                      <td colSpan={4} className="p-4 font-bold">
                        {category.category}
                      </td>
                    </tr>
                    {category.features.map((feature, featureIndex) => (
                      <tr key={`feature-${categoryIndex}-${featureIndex}`} className="border-b">
                        <td className="p-4 text-sm">{feature.name}</td>
                        <td className="p-4 text-center text-sm">
                          {typeof feature.good === 'boolean' ? (
                            feature.good ? (
                              <CheckCircle2 className="mx-auto h-5 w-5 text-primary" />
                            ) : (
                              <X className="mx-auto h-5 w-5 text-muted-foreground" />
                            )
                          ) : (
                            feature.good
                          )}
                        </td>
                        <td className="p-4 text-center text-sm font-medium">
                          {typeof feature.better === 'boolean' ? (
                            feature.better ? (
                              <CheckCircle2 className="mx-auto h-5 w-5 text-primary" />
                            ) : (
                              <X className="mx-auto h-5 w-5 text-muted-foreground" />
                            )
                          ) : (
                            feature.better
                          )}
                        </td>
                        <td className="p-4 text-center text-sm font-medium">
                          {typeof feature.best === 'boolean' ? (
                            feature.best ? (
                              <CheckCircle2 className="mx-auto h-5 w-5 text-primary" />
                            ) : (
                              <X className="mx-auto h-5 w-5 text-muted-foreground" />
                            )
                          ) : (
                            feature.best
                          )}
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Got questions? We&apos;ve got answers.
              </p>
            </div>
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTABand
        title="Ready to Get Started?"
        description="Join hundreds of companies transforming their business with Harviera IT Solutions"
        ctaText="Choose Your Plan"
        ctaHref="/pricing#pricing"
      />
    </>
  );
}
