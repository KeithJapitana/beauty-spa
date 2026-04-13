import { PageTransitionWrapper } from '@/components/layout/page-transition-wrapper'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar } from 'lucide-react'
import { createClient } from '@/lib/supabase/admin'
import type { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourspa.com'

export const metadata: Metadata = {
  title: 'Blog — Skincare Tips & Wellness Guides',
  description:
    'Expert skincare tips, treatment guides, and wellness inspiration from the Lumière Beauty Spa team.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'Blog — Lumière Beauty Spa',
    description:
      'Expert skincare tips, treatment guides, and wellness inspiration from the Lumière Beauty Spa team.',
    url: `${SITE_URL}/blog`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Lumière Beauty Spa',
    description: 'Expert skincare tips, treatment guides, and wellness inspiration.',
  },
}

export const revalidate = 3600 // ISR: revalidate every hour

// Blog list uses admin client (no cookies) so it can be statically generated
async function getBlogPosts() {
  try {
    const supabase = createClient()
    if (!supabase) return []
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, cover_image_url, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(12)
    if (error) return []
    return data || []
  } catch {
    return []
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <PageTransitionWrapper>
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[#ff385c] uppercase tracking-widest mb-4">
              Our Journal
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#222222] mb-6 leading-tight">
              Skincare Tips &amp; Wellness Guides
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Expert advice, treatment insights, and beauty inspiration from our team.
            </p>
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <Card className="border-0 shadow-[0_6px_16px_0_rgb(0_0_0/0.12),_0_1px_4px_0_rgb(0_0_0/0.08)] hover:shadow-[0_12px_32px_0_rgb(0_0_0/0.16)] transition-shadow duration-300 h-full rounded-2xl overflow-hidden">
                    {post.cover_image_url ? (
                      <div className="aspect-video overflow-hidden">
                        <Image
                          src={post.cover_image_url}
                          alt={post.title}
                          width={400}
                          height={225}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-rose-50 to-pink-100" />
                    )}
                    <CardContent className="p-6">
                      {post.published_at && (
                        <time
                          dateTime={post.published_at}
                          className="flex items-center gap-1.5 text-xs text-gray-400 mb-3"
                        >
                          <Calendar className="w-3 h-3" />
                          {new Date(post.published_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>
                      )}
                      <h2 className="text-lg font-semibold text-[#222222] mb-2 line-clamp-2 group-hover:text-[#ff385c] transition-colors">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}
                      <p className="mt-4 text-sm font-medium text-[#ff385c]">
                        Read more →
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-gray-400 text-lg mb-2">No posts yet.</p>
              <p className="text-gray-300 text-sm">Check back soon for updates!</p>
            </div>
          )}
        </div>
      </section>
    </PageTransitionWrapper>
  )
}
