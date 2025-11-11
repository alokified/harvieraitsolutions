'use client';

import { useState, useMemo } from 'react';
import { allCaseStudies } from '.contentlayer/generated';
import { HeroSplit } from '@/components/sections/hero-split';
import { CaseStudyCard } from '@/components/sections/case-study-card';
import { CTABand } from '@/components/sections/cta-band';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function CaseStudiesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<string>('all');
  const [selectedTech, setSelectedTech] = useState<string>('all');
  const [selectedKPI, setSelectedKPI] = useState<string>('all');

  // Extract unique values for filters
  const industries = useMemo(
    () => ['all', ...new Set(allCaseStudies.map((cs) => cs.industry))],
    []
  );

  const services = useMemo(() => {
    const allServices = allCaseStudies.flatMap((cs) => cs.services || []);
    return ['all', ...new Set(allServices)];
  }, []);

  const technologies = useMemo(() => {
    const allTech = allCaseStudies.flatMap((cs) => cs.technologies || []);
    return ['all', ...new Set(allTech)];
  }, []);

  const kpiTypes = useMemo(() => {
    const allKPIs = allCaseStudies.flatMap((cs) => cs.kpis.map((kpi) => kpi.metric));
    return ['all', ...new Set(allKPIs)];
  }, []);

  // Filter case studies
  const filteredCaseStudies = useMemo(() => {
    return allCaseStudies.filter((cs) => {
      const matchesIndustry = selectedIndustry === 'all' || cs.industry === selectedIndustry;
      const matchesService = selectedService === 'all' || cs.services?.includes(selectedService);
      const matchesTech = selectedTech === 'all' || cs.technologies?.includes(selectedTech);
      const matchesKPI = selectedKPI === 'all' || cs.kpis.some((kpi) => kpi.metric === selectedKPI);

      return matchesIndustry && matchesService && matchesTech && matchesKPI;
    });
  }, [selectedIndustry, selectedService, selectedTech, selectedKPI]);

  const resetFilters = () => {
    setSelectedIndustry('all');
    setSelectedService('all');
    setSelectedTech('all');
    setSelectedKPI('all');
  };

  const hasActiveFilters =
    selectedIndustry !== 'all' ||
    selectedService !== 'all' ||
    selectedTech !== 'all' ||
    selectedKPI !== 'all';

  return (
    <>
      <HeroSplit
        headline="Real Results from Real Clients"
        description="Discover how we've helped organizations transform their business through technology with measurable outcomes."
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
              Filter by industry, service, technology, or key metrics
            </p>
          </div>

          {/* Filters */}
          <div className="mb-12 space-y-6">
            {/* Industry Filter */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Industry
              </h3>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <Badge
                    key={industry}
                    variant={selectedIndustry === industry ? 'default' : 'outline'}
                    className="cursor-pointer px-4 py-2"
                    onClick={() => setSelectedIndustry(industry)}
                  >
                    {industry === 'all' ? 'All Industries' : industry}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Service Filter */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Service
              </h3>
              <div className="flex flex-wrap gap-2">
                {services.map((service) => (
                  <Badge
                    key={service}
                    variant={selectedService === service ? 'default' : 'outline'}
                    className="cursor-pointer px-4 py-2"
                    onClick={() => setSelectedService(service)}
                  >
                    {service === 'all' ? 'All Services' : service}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Technology Filter */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Technology
              </h3>
              <div className="flex flex-wrap gap-2">
                {technologies.slice(0, 12).map((tech) => (
                  <Badge
                    key={tech}
                    variant={selectedTech === tech ? 'default' : 'outline'}
                    className="cursor-pointer px-4 py-2"
                    onClick={() => setSelectedTech(tech)}
                  >
                    {tech === 'all' ? 'All Technologies' : tech}
                  </Badge>
                ))}
                {technologies.length > 12 && (
                  <Badge variant="outline" className="px-4 py-2">
                    +{technologies.length - 12} more
                  </Badge>
                )}
              </div>
            </div>

            {/* KPI Filter */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Key Metrics
              </h3>
              <div className="flex flex-wrap gap-2">
                {kpiTypes.map((kpi) => (
                  <Badge
                    key={kpi}
                    variant={selectedKPI === kpi ? 'default' : 'outline'}
                    className="cursor-pointer px-4 py-2"
                    onClick={() => setSelectedKPI(kpi)}
                  >
                    {kpi === 'all' ? 'All Metrics' : kpi}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            {hasActiveFilters && (
              <div className="flex justify-center pt-4">
                <Button variant="outline" onClick={resetFilters}>
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="mb-8 text-center text-sm text-muted-foreground">
            Showing {filteredCaseStudies.length} of {allCaseStudies.length} case{' '}
            {filteredCaseStudies.length === 1 ? 'study' : 'studies'}
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredCaseStudies.map((caseStudy) => (
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

          {filteredCaseStudies.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-lg text-muted-foreground">
                No case studies match your current filters. Try adjusting your selection.
              </p>
            </div>
          )}
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
