import { notFound } from 'next/navigation';
import { allCaseStudies } from '.contentlayer/generated';
import { Mdx } from '@/components/mdx-components';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Quote } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CaseStudyCard } from '@/components/sections/case-study-card';
import { CTABand } from '@/components/sections/cta-band';
import { KPIChart } from '@/components/charts/kpi-chart';

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return allCaseStudies.map((cs) => ({
    slug: cs.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = allCaseStudies.find((cs) => cs.slug === slug);

  if (!caseStudy) {
    return {};
  }

  return {
    title: `${caseStudy.client} - ${caseStudy.title} | Harviera IT Solutions`,
    description: caseStudy.description,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = allCaseStudies.find((cs) => cs.slug === slug);

  if (!caseStudy) {
    notFound();
  }

  // Get related case studies (same industry or services)
  const relatedCaseStudies = allCaseStudies
    .filter(
      (cs) =>
        cs.slug !== caseStudy.slug &&
        (cs.industry === caseStudy.industry ||
          cs.services?.some((s) => caseStudy.services?.includes(s)))
    )
    .slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="border-b py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Badge variant="outline">{caseStudy.industry}</Badge>
              {caseStudy.services?.map((service) => (
                <Badge key={service} variant="secondary">
                  {service}
                </Badge>
              ))}
            </div>

            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">{caseStudy.title}</h1>

            <p className="mb-8 text-xl text-muted-foreground">{caseStudy.description}</p>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Client</div>
                <div className="text-lg font-semibold">{caseStudy.client}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Industry</div>
                <div className="text-lg font-semibold">{caseStudy.industry}</div>
              </div>
              {caseStudy.duration && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Duration</div>
                  <div className="text-lg font-semibold">{caseStudy.duration}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* KPIs Overview */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Key Performance Indicators</h2>
            <p className="text-lg text-muted-foreground">
              Measurable results achieved through our solution
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {caseStudy.kpis?.map((kpi, index) => (
              <Card key={index} className="p-6">
                <div className="mb-2 text-sm font-medium text-muted-foreground">{kpi.metric}</div>
                <div className="mb-2 text-4xl font-bold text-primary">{kpi.value}</div>
                <p className="text-sm text-muted-foreground">{kpi.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">The Challenge</h2>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-lg leading-relaxed">{caseStudy.challenge}</p>
            </div>

            {caseStudy.painPoints && caseStudy.painPoints.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-4 text-xl font-semibold">Key Pain Points</h3>
                <ul className="space-y-3">
                  {caseStudy.painPoints.map((point, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-destructive" />
                      <span className="text-lg">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="border-y bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Our Solution</h2>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-lg leading-relaxed">{caseStudy.solution}</p>
            </div>

            {caseStudy.approach && caseStudy.approach.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-4 text-xl font-semibold">Our Approach</h3>
                <ul className="space-y-3">
                  {caseStudy.approach.map((step, index) => (
                    <li key={index} className="flex gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-lg">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {caseStudy.technologies && caseStudy.technologies.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-4 text-xl font-semibold">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Impact & Results */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Impact & Results</h2>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-lg leading-relaxed">{caseStudy.impact}</p>
            </div>

            {caseStudy.results && caseStudy.results.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-4 text-xl font-semibold">Key Outcomes</h3>
                <ul className="space-y-3">
                  {caseStudy.results.map((result, index) => (
                    <li key={index} className="flex gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-lg">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Before/After KPI Charts */}
      <section className="border-y bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Before vs After</h2>
            <p className="text-lg text-muted-foreground">
              Visual representation of improvements achieved
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {caseStudy.kpis?.map((kpi, index) => (
              <KPIChart
                key={index}
                metric={kpi.metric}
                value={kpi.value}
                description={kpi.description || ''}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {caseStudy.testimonial && (
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <Card className="relative overflow-hidden border-2 p-8 md:p-12">
                <Quote className="absolute right-8 top-8 h-16 w-16 text-primary/10" />
                <blockquote className="relative">
                  <p className="mb-6 text-xl italic leading-relaxed md:text-2xl">
                    &ldquo;{caseStudy.testimonial.quote}&rdquo;
                  </p>
                  <footer className="flex items-center gap-4">
                    <div>
                      <div className="font-semibold">{caseStudy.testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {caseStudy.testimonial.role}, {caseStudy.testimonial.company}
                      </div>
                    </div>
                  </footer>
                </blockquote>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Detailed Content */}
      <section className="border-t py-16 md:py-24">
        <div className="container">
          <div className="prose prose-lg mx-auto max-w-4xl dark:prose-invert">
            <Mdx code={caseStudy.body.code} />
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <section className="border-t bg-muted/30 py-16 md:py-24">
          <div className="container">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Related Success Stories</h2>
              <p className="text-lg text-muted-foreground">
                More examples of our work in similar domains
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedCaseStudies.map((cs) => (
                <CaseStudyCard
                  key={cs.slug}
                  title={cs.title}
                  client={cs.client}
                  industry={cs.industry}
                  kpis={cs.kpis}
                  href={`/case-studies/${cs.slug}`}
                />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/case-studies"
                className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                View All Case Studies
              </Link>
            </div>
          </div>
        </section>
      )}

      <CTABand
        title="Ready to Achieve Similar Results?"
        description="Let's discuss how we can help you transform your business with proven solutions."
        primaryCTA={{ label: 'Start Your Project', href: '/contact' }}
        secondaryCTA={{ label: 'Our Services', href: '/services' }}
      />
    </>
  );
}
