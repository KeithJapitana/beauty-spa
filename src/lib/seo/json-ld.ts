const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourspa.com'
const BUSINESS_NAME = 'Lumière Beauty Spa'
const BUSINESS_DESCRIPTION = 'Premium beauty spa offering facials, massage, and wellness treatments.'

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: BUSINESS_NAME,
    description: BUSINESS_DESCRIPTION,
    url: SITE_URL,
    '@id': `${SITE_URL}/#organization`,
    priceRange: '$$',
    serviceType: ['Facial', 'Massage', 'Body Treatment', 'Waxing', 'Skincare'],
  }
}

export interface ArticleSchemaInput {
  title: string
  description: string | null
  slug: string
  coverImageUrl: string | null
  publishedAt: string | null
  updatedAt: string
  authorName?: string
}

export function articleSchema(input: ArticleSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description || undefined,
    image: input.coverImageUrl || undefined,
    url: `${SITE_URL}/blog/${input.slug}`,
    datePublished: input.publishedAt || undefined,
    dateModified: input.updatedAt,
    author: {
      '@type': 'Person',
      name: input.authorName || BUSINESS_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS_NAME,
      url: SITE_URL,
    },
  }
}

export interface FaqItem {
  question: string
  answer: string
}

export function faqSchema(title: string, items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: title,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export interface HowToStep {
  name: string
  text: string
  image?: string
}

export function howToSchema(title: string, description: string | null, steps: HowToStep[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description: description || undefined,
    step: steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
      image: step.image || undefined,
    })),
  }
}

export function buildPostJsonLd(post: {
  title: string
  slug: string
  excerpt: string | null
  cover_image_url: string | null
  published_at: string | null
  updated_at?: string
  created_at: string
  schema_type: 'article' | 'faq' | 'howto'
  structured_data: any
  author?: { name: string } | null
}) {
  const base: ArticleSchemaInput = {
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    coverImageUrl: post.cover_image_url,
    publishedAt: post.published_at,
    updatedAt: post.updated_at || post.created_at,
    authorName: post.author?.name,
  }

  if (post.schema_type === 'faq' && Array.isArray(post.structured_data?.items)) {
    return faqSchema(post.title, post.structured_data.items)
  }

  if (post.schema_type === 'howto' && Array.isArray(post.structured_data?.steps)) {
    return howToSchema(post.title, post.excerpt, post.structured_data.steps)
  }

  return articleSchema(base)
}
