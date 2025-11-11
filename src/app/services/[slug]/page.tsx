import { notFound } from 'next/navigation';
import { allServices, allCaseStudies } from '.contentlayer/generated';
import { Mdx } from '@/components/mdx-components';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CaseStudyCard } from '@/components/sections/case-study-card';
import { TimelineSteps } from '@/components/sections/timeline-steps';
import { FAQAccordion } from '@/components/sections/faq-accordion';
import { CTABand } from '@/components/sections/cta-band';

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return allServices.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = allServices.find((s) => s.slug === slug);

  if (!service) {
    return {};
  }

  return {
    title: `${service.title} | Harviera IT Solutions`,
    description: service.description,
  };
}

const serviceFAQs: Record<string, Array<{ question: string; answer: string }>> = {
  'software-development': [
    {
      question: 'What technologies do you use for custom software development?',
      answer:
        'We work with modern tech stacks including React, Next.js, Node.js, Python, Java, .NET, and mobile frameworks like React Native and Flutter. We choose technologies based on your specific requirements and long-term goals.',
    },
    {
      question: 'How long does a typical software project take?',
      answer:
        'Project timelines vary based on complexity. Simple applications may take 2-3 months, while enterprise solutions can take 6-12 months. We provide detailed timelines during the planning phase and follow agile methodologies for iterative delivery.',
    },
    {
      question: 'Do you provide post-launch support?',
      answer:
        'Yes, we offer comprehensive maintenance packages including bug fixes, security updates, performance optimization, and feature enhancements. We also provide 24/7 monitoring and support options.',
    },
  ],
  'cloud-devops': [
    {
      question: 'Which cloud platforms do you support?',
      answer:
        'We are certified partners with AWS, Azure, and Google Cloud Platform. We help you choose the right platform based on your requirements, existing infrastructure, and budget.',
    },
    {
      question: 'Can you migrate our existing applications to the cloud?',
      answer:
        'Absolutely. We specialize in cloud migration strategies including lift-and-shift, re-platforming, and re-architecting. We ensure minimal downtime and data integrity throughout the migration process.',
    },
    {
      question: 'What DevOps tools do you implement?',
      answer:
        'We work with industry-standard tools like Jenkins, GitLab CI/CD, GitHub Actions, Docker, Kubernetes, Terraform, Ansible, and monitoring solutions like Prometheus, Grafana, and DataDog.',
    },
  ],
  cybersecurity: [
    {
      question: 'What types of security assessments do you perform?',
      answer:
        'We conduct vulnerability assessments, penetration testing, security audits, compliance reviews, and risk assessments. Our certified security experts follow industry standards like OWASP, NIST, and ISO 27001.',
    },
    {
      question: 'Do you help with compliance requirements?',
      answer:
        'Yes, we assist with GDPR, HIPAA, PCI DSS, SOC 2, ISO 27001, and other regulatory compliance requirements. We provide gap analysis, implementation guidance, and ongoing compliance monitoring.',
    },
    {
      question: 'What is your incident response process?',
      answer:
        'We offer 24/7 security monitoring and rapid incident response. Our process includes immediate containment, forensic analysis, remediation, and post-incident reporting with recommendations to prevent future occurrences.',
    },
  ],
  'data-ai': [
    {
      question: 'What AI/ML use cases do you specialize in?',
      answer:
        'We build solutions for predictive analytics, natural language processing, computer vision, recommendation systems, fraud detection, and process automation. We work with frameworks like TensorFlow, PyTorch, and scikit-learn.',
    },
    {
      question: 'How do you ensure data quality and governance?',
      answer:
        'We implement data quality frameworks, master data management, data lineage tracking, and governance policies. We ensure compliance with data privacy regulations and establish clear data ownership and stewardship.',
    },
    {
      question: 'Can you help with legacy data migration?',
      answer:
        'Yes, we have extensive experience migrating data from legacy systems to modern platforms. We use ETL/ELT tools, ensure data validation, and maintain data integrity throughout the migration process.',
    },
  ],
  'qa-automation': [
    {
      question: 'What testing frameworks do you use?',
      answer:
        'We work with Selenium, Cypress, Playwright, JUnit, TestNG, Jest, and specialized tools for mobile testing like Appium. We also implement BDD frameworks like Cucumber for behavior-driven development.',
    },
    {
      question: 'How do you integrate testing into CI/CD pipelines?',
      answer:
        'We automate test execution in your CI/CD pipeline using tools like Jenkins, GitLab CI, or GitHub Actions. Tests run automatically on every commit, pull request, and deployment, providing immediate feedback.',
    },
    {
      question: 'Do you provide performance and load testing?',
      answer:
        'Yes, we conduct performance testing using tools like JMeter, Gatling, and k6. We simulate realistic load scenarios, identify bottlenecks, and provide optimization recommendations.',
    },
  ],
  'managed-it': [
    {
      question: 'What is included in your managed IT services?',
      answer:
        'Our managed services include 24/7 monitoring, helpdesk support, system updates, security management, backup and disaster recovery, and proactive maintenance. We offer tiered support packages to match your needs.',
    },
    {
      question: 'What is your response time for critical issues?',
      answer:
        'For critical (P1) issues, we provide immediate response within 15 minutes with 24/7 availability. For high (P2) issues, response time is 1 hour during business hours. All SLAs are clearly defined in our service agreements.',
    },
    {
      question: 'Can you manage hybrid cloud and on-premises infrastructure?',
      answer:
        'Yes, we manage hybrid environments seamlessly. Our team has expertise in both cloud platforms and on-premises infrastructure, ensuring consistent monitoring, security, and performance across your entire IT landscape.',
    },
  ],
};

const processSteps: Record<string, Array<{ title: string; description: string }>> = {
  'software-development': [
    {
      title: 'Requirements Gathering',
      description: 'Deep dive into your business needs, user stories, and technical requirements.',
    },
    {
      title: 'Architecture & Design',
      description: 'Create scalable system architecture and intuitive UX/UI designs.',
    },
    {
      title: 'Agile Development',
      description: 'Iterative development with 2-week sprints and continuous feedback.',
    },
    {
      title: 'Testing & QA',
      description: 'Comprehensive testing including unit, integration, and user acceptance tests.',
    },
    {
      title: 'Deployment & Support',
      description: 'Seamless launch with ongoing monitoring and maintenance.',
    },
  ],
  'cloud-devops': [
    {
      title: 'Assessment & Planning',
      description: 'Evaluate current infrastructure and define cloud strategy.',
    },
    {
      title: 'Architecture Design',
      description: 'Design cloud-native architecture with security and scalability.',
    },
    {
      title: 'Migration & Implementation',
      description: 'Execute migration with minimal downtime and data integrity.',
    },
    {
      title: 'Automation Setup',
      description: 'Implement CI/CD pipelines and infrastructure as code.',
    },
    {
      title: 'Optimization & Monitoring',
      description: 'Continuous optimization with 24/7 monitoring and alerts.',
    },
  ],
  cybersecurity: [
    {
      title: 'Security Assessment',
      description: 'Comprehensive evaluation of current security posture and risks.',
    },
    {
      title: 'Strategy Development',
      description: 'Create security roadmap aligned with business objectives.',
    },
    {
      title: 'Implementation',
      description: 'Deploy security controls, tools, and best practices.',
    },
    {
      title: 'Testing & Validation',
      description: 'Penetration testing and security audits to validate controls.',
    },
    {
      title: 'Monitoring & Response',
      description: '24/7 security monitoring with incident response capabilities.',
    },
  ],
  'data-ai': [
    {
      title: 'Data Discovery',
      description: 'Identify data sources, quality issues, and opportunities.',
    },
    {
      title: 'Architecture & Modeling',
      description: 'Design data pipelines and ML model architecture.',
    },
    {
      title: 'Development & Training',
      description: 'Build data pipelines and train machine learning models.',
    },
    {
      title: 'Validation & Testing',
      description: 'Validate model accuracy and test with real-world data.',
    },
    {
      title: 'Deployment & Monitoring',
      description: 'Deploy to production with continuous monitoring and retraining.',
    },
  ],
  'qa-automation': [
    {
      title: 'Test Strategy',
      description: 'Define test scope, frameworks, and automation approach.',
    },
    {
      title: 'Framework Setup',
      description: 'Implement test automation frameworks and infrastructure.',
    },
    {
      title: 'Test Development',
      description: 'Create automated test scripts for all critical scenarios.',
    },
    { title: 'CI/CD Integration', description: 'Integrate tests into your deployment pipeline.' },
    {
      title: 'Maintenance & Reporting',
      description: 'Continuous test maintenance with detailed reporting.',
    },
  ],
  'managed-it': [
    {
      title: 'Assessment & Onboarding',
      description: 'Evaluate infrastructure and establish baseline metrics.',
    },
    { title: 'Monitoring Setup', description: 'Deploy monitoring tools and configure alerts.' },
    {
      title: 'Proactive Management',
      description: 'Regular maintenance, updates, and optimization.',
    },
    { title: 'Incident Response', description: '24/7 support with rapid issue resolution.' },
    {
      title: 'Continuous Improvement',
      description: 'Regular reviews and recommendations for improvements.',
    },
  ],
};

const packages = [
  {
    name: 'Starter',
    description: 'Perfect for small projects and MVPs',
    features: [
      'Core features implementation',
      'Basic testing',
      '3 months support',
      'Documentation',
    ],
  },
  {
    name: 'Professional',
    description: 'Ideal for growing businesses',
    features: [
      'Full feature set',
      'Comprehensive testing',
      '6 months support',
      'Training included',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    description: 'For large-scale, mission-critical systems',
    features: ['Custom solutions', 'Advanced security', '12 months support', 'Dedicated team'],
  },
];

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = allServices.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const relatedCaseStudies = allCaseStudies
    .filter((cs) => cs.services?.includes(service.title))
    .slice(0, 3);

  const faqs = serviceFAQs[service.slug] || [];
  const steps = processSteps[service.slug] || [];

  return (
    <>
      <section className="border-b py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="mb-4">
              {service.icon} Service
            </Badge>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">{service.title}</h1>
            <p className="mb-8 text-xl text-muted-foreground">{service.description}</p>
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
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-3xl font-bold">Problem → Solution</h2>
              <ul className="space-y-4">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex gap-3">
                    <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-lg">{feature}</span>
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
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Our Capabilities</h2>
            <p className="text-lg text-muted-foreground">
              Technologies and methodologies we excel at
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {service.technologies.map((tech, index) => (
              <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Technology Stack</h2>
            <p className="text-lg text-muted-foreground">Industry-leading tools and platforms</p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {service.technologies.slice(0, 12).map((tech, index) => (
              <Card key={index} className="flex items-center justify-center p-6">
                <span className="text-center text-sm font-medium">{tech}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {steps.length > 0 && (
        <section className="border-y bg-muted/30 py-16 md:py-24">
          <div className="container">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Our Process</h2>
              <p className="text-lg text-muted-foreground">
                A proven approach to delivering excellence
              </p>
            </div>

            <TimelineSteps steps={steps} />
          </div>
        </section>
      )}

      {relatedCaseStudies.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Success Stories</h2>
              <p className="text-lg text-muted-foreground">
                See how we&apos;ve helped clients achieve their goals
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

      <section className="border-y bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Choose Your Package</h2>
            <p className="text-lg text-muted-foreground">
              Flexible options to match your needs and budget
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className={`p-8 ${pkg.highlighted ? 'border-primary shadow-lg' : ''}`}
              >
                {pkg.highlighted && <Badge className="mb-4">Most Popular</Badge>}
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
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Common questions about {service.title.toLowerCase()}
              </p>
            </div>

            <div className="mx-auto max-w-3xl">
              <FAQAccordion faqs={faqs} />
            </div>
          </div>
        </section>
      )}

      <section className="border-t py-16">
        <div className="container">
          <div className="prose prose-lg mx-auto max-w-4xl dark:prose-invert">
            <Mdx code={service.body.code} />
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to Get Started?"
        description={`Let's discuss how our ${service.title.toLowerCase()} can help your business.`}
        primaryCTA={{ label: 'Schedule Consultation', href: '/contact' }}
        secondaryCTA={{ label: 'View All Services', href: '/services' }}
      />
    </>
  );
}
