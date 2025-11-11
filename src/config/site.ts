export const siteConfig = {
  name: 'Harviera IT Solutions',
  description:
    'Enterprise-grade IT consulting and solutions. Delivering excellence in consulting, development, cloud/DevOps, cybersecurity, data/AI, QA automation, and managed IT services.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://harviera.com',
  ogImage: '/og-image.jpg',

  // Brand Colors
  brand: {
    colors: {
      primary: '#0B0B0C', // Jet Black
      accent: '#3B82F6', // Blue
      background: '#FFFFFF',
      foreground: '#0B0B0C',
    },
  },

  // Main Navigation Links
  mainNav: [
    {
      title: 'Services',
      href: '/services',
      description: 'Comprehensive IT services and solutions',
      items: [
        {
          title: 'Consulting',
          href: '/services/consulting',
          description: 'Strategic IT consulting and digital transformation',
        },
        {
          title: 'Development',
          href: '/services/development',
          description: 'Custom software and application development',
        },
        {
          title: 'Cloud & DevOps',
          href: '/services/cloud-devops',
          description: 'Cloud migration, infrastructure, and DevOps automation',
        },
        {
          title: 'Cybersecurity',
          href: '/services/cybersecurity',
          description: 'Security assessments, compliance, and protection',
        },
        {
          title: 'Data & AI',
          href: '/services/data-ai',
          description: 'Data engineering, analytics, and AI solutions',
        },
        {
          title: 'QA & Automation',
          href: '/services/qa-automation',
          description: 'Quality assurance and test automation',
        },
        {
          title: 'Managed IT',
          href: '/services/managed-it',
          description: '24/7 monitoring, support, and infrastructure management',
        },
      ],
    },
    {
      title: 'Solutions',
      href: '/solutions',
      description: 'Industry-specific solutions and use cases',
    },
    {
      title: 'Case Studies',
      href: '/case-studies',
      description: 'Client success stories and project showcases',
    },
    {
      title: 'Resources',
      href: '/resources',
      description: 'Insights, guides, and knowledge base',
      items: [
        {
          title: 'Blog',
          href: '/resources/blog',
          description: 'Technical insights and industry trends',
        },
        {
          title: 'Whitepapers',
          href: '/resources/whitepapers',
          description: 'In-depth guides and research',
        },
        {
          title: 'Case Studies',
          href: '/resources/case-studies',
          description: 'Real-world success stories',
        },
        {
          title: 'Documentation',
          href: '/resources/docs',
          description: 'Technical documentation and guides',
        },
        {
          title: 'Webinars',
          href: '/resources/webinars',
          description: 'Live and recorded sessions',
        },
      ],
    },
    {
      title: 'Pricing',
      href: '/pricing',
      description: 'Transparent pricing models and packages',
    },
    {
      title: 'About',
      href: '/about',
      description: 'Our story, team, and values',
      items: [
        {
          title: 'Company',
          href: '/about/company',
          description: 'Our mission, vision, and values',
        },
        {
          title: 'Team',
          href: '/about/team',
          description: 'Meet our experts',
        },
        {
          title: 'Careers',
          href: '/about/careers',
          description: 'Join our team',
        },
        {
          title: 'Partners',
          href: '/about/partners',
          description: 'Technology and strategic partners',
        },
      ],
    },
    {
      title: 'Contact',
      href: '/contact',
      description: 'Get in touch with our team',
    },
  ],

  // Footer Navigation
  footerNav: {
    services: [
      { title: 'Consulting', href: '/services/consulting' },
      { title: 'Development', href: '/services/development' },
      { title: 'Cloud & DevOps', href: '/services/cloud-devops' },
      { title: 'Cybersecurity', href: '/services/cybersecurity' },
      { title: 'Data & AI', href: '/services/data-ai' },
      { title: 'QA & Automation', href: '/services/qa-automation' },
      { title: 'Managed IT', href: '/services/managed-it' },
    ],
    company: [
      { title: 'About Us', href: '/about/company' },
      { title: 'Team', href: '/about/team' },
      { title: 'Careers', href: '/about/careers' },
      { title: 'Partners', href: '/about/partners' },
      { title: 'Contact', href: '/contact' },
    ],
    resources: [
      { title: 'Blog', href: '/resources/blog' },
      { title: 'Case Studies', href: '/resources/case-studies' },
      { title: 'Whitepapers', href: '/resources/whitepapers' },
      { title: 'Documentation', href: '/resources/docs' },
      { title: 'Webinars', href: '/resources/webinars' },
    ],
    support: [
      { title: 'Help Center', href: '/support' },
      { title: 'System Status', href: '/status' },
      { title: 'FAQs', href: '/support/faq' },
      { title: 'Contact Support', href: '/support/contact' },
    ],
    legal: [
      { title: 'Privacy Policy', href: '/legal/privacy' },
      { title: 'Terms of Service', href: '/legal/terms' },
      { title: 'Cookie Policy', href: '/legal/cookies' },
      { title: 'Security', href: '/legal/security' },
    ],
  },

  // Call-to-Action Buttons
  ctas: {
    primary: {
      title: 'Book Consultation',
      href: '/contact/consultation',
      description: 'Schedule a free discovery call with our experts',
    },
    secondary: {
      title: 'Request Proposal',
      href: '/contact/proposal',
      description: 'Get a custom quote for your project',
    },
    tertiary: {
      title: 'Contact Us',
      href: '/contact',
      description: 'General inquiries and support',
    },
    download: {
      title: 'Download Resources',
      href: '/resources',
      description: 'Access whitepapers, guides, and case studies',
    },
  },

  // Social Media Links
  social: {
    linkedin: {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/harviera-it-solutions',
      icon: 'linkedin',
    },
    twitter: {
      name: 'Twitter',
      url: 'https://twitter.com/harvierait',
      icon: 'twitter',
    },
    github: {
      name: 'GitHub',
      url: 'https://github.com/harviera',
      icon: 'github',
    },
    youtube: {
      name: 'YouTube',
      url: 'https://youtube.com/@harvierait',
      icon: 'youtube',
    },
    facebook: {
      name: 'Facebook',
      url: 'https://facebook.com/harvierait',
      icon: 'facebook',
    },
  },

  // Office Addresses
  offices: [
    {
      id: 'headquarters',
      name: 'Headquarters',
      address: {
        street: '123 Tech Boulevard',
        suite: 'Suite 500',
        city: 'San Francisco',
        state: 'CA',
        zip: '94105',
        country: 'United States',
      },
      phone: '+1 (415) 555-0100',
      email: 'hello@harviera.com',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM PST',
      coordinates: {
        lat: 37.7749,
        lng: -122.4194,
      },
    },
    {
      id: 'east-coast',
      name: 'East Coast Office',
      address: {
        street: '456 Innovation Drive',
        suite: 'Floor 12',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'United States',
      },
      phone: '+1 (212) 555-0200',
      email: 'ny@harviera.com',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM EST',
      coordinates: {
        lat: 40.7128,
        lng: -74.006,
      },
    },
    {
      id: 'emea',
      name: 'EMEA Office',
      address: {
        street: '789 Tech Park',
        suite: 'Building C',
        city: 'London',
        state: '',
        zip: 'EC2A 4BX',
        country: 'United Kingdom',
      },
      phone: '+44 20 7946 0958',
      email: 'london@harviera.com',
      hours: 'Mon-Fri: 9:00 AM - 5:30 PM GMT',
      coordinates: {
        lat: 51.5074,
        lng: -0.1278,
      },
    },
  ],

  // Contact Information
  contact: {
    general: {
      email: 'hello@harviera.com',
      phone: '+1 (415) 555-0100',
    },
    sales: {
      email: 'sales@harviera.com',
      phone: '+1 (415) 555-0101',
    },
    support: {
      email: 'support@harviera.com',
      phone: '+1 (415) 555-0102',
      available247: true,
    },
    careers: {
      email: 'careers@harviera.com',
    },
    press: {
      email: 'press@harviera.com',
    },
  },

  // SEO Metadata
  seo: {
    keywords: [
      'IT consulting',
      'software development',
      'cloud solutions',
      'DevOps',
      'cybersecurity',
      'data analytics',
      'AI solutions',
      'QA automation',
      'managed IT services',
      'digital transformation',
      'enterprise technology',
    ],
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterCreator: '@harvierait',
    twitterSite: '@harvierait',
  },

  // Business Information
  business: {
    legalName: 'Harviera IT Solutions, Inc.',
    founded: 2020,
    registrationNumber: '123456789',
    taxId: 'XX-XXXXXXX',
    duns: '123456789',
  },

  // Feature Flags
  features: {
    blog: true,
    caseStudies: true,
    pricing: true,
    careers: true,
    chat: false, // Enable in phase 2
    portal: false, // Enable in phase 2
    newsletter: true,
    webinars: true,
  },
} as const;

export type SiteConfig = typeof siteConfig;
