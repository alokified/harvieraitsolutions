import { defineDocumentType, makeSource } from 'contentlayer2/source-files';

export const Service = defineDocumentType(() => ({
  name: 'Service',
  filePathPattern: `services/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    description: { type: 'string', required: true },
    icon: { type: 'string' },
    features: { type: 'list', of: { type: 'string' } },
    benefits: { type: 'list', of: { type: 'string' } },
    technologies: { type: 'list', of: { type: 'string' } },
    order: { type: 'number', default: 0 },
    published: { type: 'boolean', default: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (doc) => `/services/${doc.slug}` },
  },
}));

export const Industry = defineDocumentType(() => ({
  name: 'Industry',
  filePathPattern: `industries/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    description: { type: 'string', required: true },
    industry: { type: 'string', required: true },
    icon: { type: 'string' },
    challenges: { type: 'list', of: { type: 'string' } },
    solutions: { type: 'list', of: { type: 'string' } },
    benefits: { type: 'list', of: { type: 'string' } },
    image: { type: 'string' },
    order: { type: 'number', default: 0 },
    published: { type: 'boolean', default: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (doc) => `/solutions/${doc.slug}` },
  },
}));

export const CaseStudy = defineDocumentType(() => ({
  name: 'CaseStudy',
  filePathPattern: `case-studies/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    client: { type: 'string', required: true },
    industry: { type: 'string', required: true },
    description: { type: 'string', required: true },
    summary: { type: 'string' },
    challenge: { type: 'string', required: true },
    solution: { type: 'string', required: true },
    impact: { type: 'string', required: true },
    results: { type: 'list', of: { type: 'string' } },
    painPoints: { type: 'list', of: { type: 'string' } },
    approach: { type: 'list', of: { type: 'string' } },
    kpis: {
      type: 'list',
      of: {
        type: 'nested',
        def: () => ({
          fields: {
            metric: { type: 'string', required: true },
            value: { type: 'string', required: true },
            description: { type: 'string' },
          },
        }),
      },
    },
    services: { type: 'list', of: { type: 'string' } },
    technologies: { type: 'list', of: { type: 'string' } },
    testimonial: {
      type: 'json',
    },
    duration: { type: 'string' },
    image: { type: 'string' },
    date: { type: 'date', required: true },
    published: { type: 'boolean', default: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (doc) => `/case-studies/${doc.slug}` },
  },
}));

export const BlogPost = defineDocumentType(() => ({
  name: 'BlogPost',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    excerpt: { type: 'string', required: true },
    author: { type: 'string', required: true },
    date: { type: 'date', required: true },
    readTime: { type: 'string', required: true },
    category: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' } },
    image: { type: 'string' },
    published: { type: 'boolean', default: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (doc) => `/resources/blog/${doc.slug}` },
  },
}));

export const Guide = defineDocumentType(() => ({
  name: 'Guide',
  filePathPattern: `guides/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    description: { type: 'string', required: true },
    author: { type: 'string', required: true },
    date: { type: 'date', required: true },
    readTime: { type: 'string', required: true },
    category: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' } },
    difficulty: { type: 'enum', options: ['Beginner', 'Intermediate', 'Advanced'] },
    image: { type: 'string' },
    published: { type: 'boolean', default: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (doc) => `/resources/guides/${doc.slug}` },
  },
}));

export const Webinar = defineDocumentType(() => ({
  name: 'Webinar',
  filePathPattern: `webinars/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    description: { type: 'string', required: true },
    presenter: { type: 'string', required: true },
    date: { type: 'date', required: true },
    duration: { type: 'string', required: true },
    category: { type: 'string', required: true },
    level: { type: 'enum', options: ['Beginner', 'Intermediate', 'Advanced'] },
    videoUrl: { type: 'string' },
    image: { type: 'string' },
    published: { type: 'boolean', default: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (doc) => `/resources/webinars/${doc.slug}` },
  },
}));

export const Tool = defineDocumentType(() => ({
  name: 'Tool',
  filePathPattern: `tools/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    description: { type: 'string', required: true },
    category: { type: 'string', required: true },
    features: { type: 'list', of: { type: 'string' } },
    image: { type: 'string' },
    published: { type: 'boolean', default: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (doc) => `/resources/tools/${doc.slug}` },
  },
}));

export const FAQ = defineDocumentType(() => ({
  name: 'FAQ',
  filePathPattern: `faqs/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    question: { type: 'string', required: true },
    answer: { type: 'string', required: true },
    category: { type: 'string', required: true },
    order: { type: 'number', default: 0 },
    published: { type: 'boolean', default: true },
  },
}));

export const Job = defineDocumentType(() => ({
  name: 'Job',
  filePathPattern: `jobs/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    department: { type: 'string', required: true },
    location: { type: 'string', required: true },
    type: { type: 'enum', options: ['Full-time', 'Part-time', 'Contract', 'Remote'] },
    experience: { type: 'string', required: true },
    description: { type: 'string', required: true },
    responsibilities: { type: 'list', of: { type: 'string' } },
    requirements: { type: 'list', of: { type: 'string' } },
    benefits: { type: 'list', of: { type: 'string' } },
    postedDate: { type: 'date', required: true },
    published: { type: 'boolean', default: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (doc) => `/careers/${doc.slug}` },
  },
}));

export const Office = defineDocumentType(() => ({
  name: 'Office',
  filePathPattern: `offices/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    address: { type: 'string', required: true },
    city: { type: 'string', required: true },
    state: { type: 'string' },
    country: { type: 'string', required: true },
    phone: { type: 'string', required: true },
    email: { type: 'string', required: true },
    hours: { type: 'string', required: true },
    image: { type: 'string' },
    published: { type: 'boolean', default: true },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Service, Industry, CaseStudy, BlogPost, Guide, Webinar, Tool, FAQ, Job, Office],
});
