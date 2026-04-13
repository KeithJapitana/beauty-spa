import { notFound } from 'next/navigation'
import { Calendar } from 'lucide-react'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient as createAdminClient } from '@/lib/supabase/admin'
import { PageTransitionWrapper } from '@/components/layout/page-transition-wrapper'
import { NovelRenderer } from '@/components/blog/novel-renderer'
import { buildPostJsonLd } from '@/lib/seo/json-ld'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourspa.com'

interface BlogPost {
  id: string
  title: string
  slug: string
  content: any
  excerpt: string | null
  cover_image_url: string | null
  published_at: string | null
  created_at: string
  updated_at?: string
  seo_title: string | null
  seo_description: string | null
  schema_type: 'article' | 'faq' | 'howto'
  structured_data: any
  author?: { name: string } | null
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    // Use server client at runtime (supports cookies/auth context)
    const supabase = await createServerClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*, author:profiles(name)')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
    if (error || !data) return null
    return data as BlogPost
  } catch {
    return null
  }
}

// generateStaticParams runs at build time — no HTTP context, can't use cookies.
// Use the admin client (service role, no cookies needed) instead.
export async function generateStaticParams() {
  try {
    const supabase = createAdminClient()
    if (!supabase) return []
    const { data, error } = await supabase
      .from('blog_posts')
      .select('slug')
      .eq('status', 'published')
    if (error) return []
    return (data || []).map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug)
  if (!post) return {}

  const title = post.seo_title || post.title
  const description = post.seo_description || post.excerpt || undefined
  const image = post.cover_image_url || undefined
  const url = `${SITE_URL}/blog/${post.slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: post.published_at || undefined,
      images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  }
}

export const revalidate = 3600 // ISR: revalidate hourly
export const dynamicParams = true // Render new posts on-demand without a redeploy

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getBlogPost(params.slug)
  if (!post) notFound()

  const jsonLd = buildPostJsonLd(post)

  return (
    <PageTransitionWrapper>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="text-[#ff385c] hover:underline inline-flex items-center gap-1 mb-8 text-sm font-medium"
            >
              ← Back to Blog
            </Link>

            <header className="mb-12">
              {post.cover_image_url && (
                <div className="aspect-video rounded-2xl overflow-hidden mb-8 shadow-[0_6px_16px_0_rgb(0_0_0/0.12)]">
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h1 className="text-4xl md:text-5xl font-bold text-[#222222] mb-6 leading-tight">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">{post.excerpt}</p>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                {post.published_at && (
                  <time
                    dateTime={post.published_at}
                    className="flex items-center gap-1.5"
                  >
                    <Calendar className="w-4 h-4" />
                    {new Date(post.published_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                )}
                {post.author?.name && (
                  <span className="text-gray-400">by {post.author.name}</span>
                )}
              </div>
            </header>

            <NovelRenderer content={post.content} />

            <div className="mt-16 pt-8 border-t border-gray-100">
              <p className="text-gray-600 mb-4 font-medium">Enjoyed this article?</p>
              <Button
                className="rounded-lg bg-[#ff385c] hover:bg-[#e0304f] text-white"
                asChild
              >
                <Link href="/contact">Book a Treatment</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </PageTransitionWrapper>
  )
}
