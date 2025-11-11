const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://harviera.com';

// Organization Schema
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Harviera IT Solutions',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      'Enterprise-grade IT consulting and solutions. Delivering excellence in consulting, development, cloud/DevOps, cybersecurity, data/AI, QA automation, and managed IT services.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-800-HARVIERA',
      contactType: 'Customer Service',
      email: 'contact@harviera.com',
      areaServed: 'Worldwide',
      availableLanguage: ['English'],
    },
    sameAs: [
      'https://www.linkedin.com/company/harviera',
      'https://twitter.com/harviera',
      'https://github.com/harviera',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Tech Boulevard',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      postalCode: '94105',
      addressCountry: 'US',
    },
  };
}

// WebSite Schema with SearchAction
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Harviera IT Solutions',
    url: baseUrl,
    description:
      'Enterprise-grade IT consulting and solutions. Delivering excellence in consulting, development, cloud/DevOps, cybersecurity, data/AI, QA automation, and managed IT services.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// Service Schema
interface ServiceSchemaParams {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
  provider?: string;
  areaServed?: string;
}

export function generateServiceSchema(params: ServiceSchemaParams) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    description: params.description,
    url: params.url,
    serviceType: params.serviceType || 'IT Services',
    provider: {
      '@type': 'Organization',
      name: params.provider || 'Harviera IT Solutions',
      url: baseUrl,
    },
    areaServed: params.areaServed || 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${params.name} Services`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: params.name,
            description: params.description,
          },
        },
      ],
    },
  };
}

// Article Schema (for Blog Posts and Guides)
interface ArticleSchemaParams {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image?: string;
  articleSection?: string;
  keywords?: string[];
}

export function generateArticleSchema(params: ArticleSchemaParams) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.headline,
    description: params.description,
    url: params.url,
    datePublished: params.datePublished,
    dateModified: params.dateModified || params.datePublished,
    author: {
      '@type': 'Person',
      name: params.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Harviera IT Solutions',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    image: params.image || `${baseUrl}/og-image.jpg`,
    articleSection: params.articleSection,
    keywords: params.keywords?.join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': params.url,
    },
  };
}

// BreadcrumbList Schema
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// FAQPage Schema
interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
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
  };
}

// JobPosting Schema
interface JobPostingSchemaParams {
  title: string;
  description: string;
  url: string;
  datePosted: string;
  validThrough?: string;
  employmentType?: string;
  hiringOrganization?: string;
  jobLocation?: string;
  baseSalary?: {
    min: number;
    max: number;
    currency: string;
  };
}

export function generateJobPostingSchema(params: JobPostingSchemaParams) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: params.title,
    description: params.description,
    url: params.url,
    datePosted: params.datePosted,
    validThrough: params.validThrough,
    employmentType: params.employmentType || 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: params.hiringOrganization || 'Harviera IT Solutions',
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: params.jobLocation || 'San Francisco',
        addressRegion: 'CA',
        addressCountry: 'US',
      },
    },
    ...(params.baseSalary && {
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: params.baseSalary.currency,
        value: {
          '@type': 'QuantitativeValue',
          minValue: params.baseSalary.min,
          maxValue: params.baseSalary.max,
          unitText: 'YEAR',
        },
      },
    }),
  };
}

// LocalBusiness Schema (for offices)
interface LocalBusinessSchemaParams {
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  telephone?: string;
  email?: string;
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
}

export function generateLocalBusinessSchema(params: LocalBusinessSchemaParams) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}/#office-${params.address.city.toLowerCase().replace(/\s+/g, '-')}`,
    name: params.name,
    url: baseUrl,
    telephone: params.telephone,
    email: params.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: params.address.street,
      addressLocality: params.address.city,
      addressRegion: params.address.state,
      postalCode: params.address.postalCode,
      addressCountry: params.address.country,
    },
    ...(params.geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: params.geo.latitude,
        longitude: params.geo.longitude,
      },
    }),
    ...(params.openingHours && {
      openingHoursSpecification: params.openingHours.map((hours) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: hours.split('-')[0],
        closes: hours.split('-')[1],
      })),
    }),
  };
}

// Helper to render JSON-LD
export function renderJsonLd(data: object) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
