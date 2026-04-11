import { notFound } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, User } from 'lucide-react'
import { createClient } from '@/lib/supabase/admin'
import { PageTransitionWrapper } from '@/components/layout/page-transition-wrapper'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface BlogPost {
  id: string
  title: string
  slug: string
  content: any
  excerpt: string | null
  cover_image_url: string | null
  published_at: string | null
  seo_title: string | null
  seo_description: string | null
}

async function getBlogPost(slug: string) {
  try {
    const supabase = createClient()
    if (!supabase) return null

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error || !data) return null
    return data as BlogPost
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) return {}

  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt || undefined,
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <PageTransitionWrapper>
      <article className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="text-accent hover:underline inline-flex items-center gap-1 mb-8"
            >
              ← Back to Blog
            </Link>

            <header className="mb-12">
              {post.cover_image_url && (
                <div className="aspect-video rounded-2xl overflow-hidden mb-8 shadow-card">
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
              )}
              {post.published_at && (
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.published_at).toLocaleDateString()}
                  </span>
                </div>
              )}
            </header>

            <div className="prose prose-lg max-w-none">
              {/* Content will be rendered from Novel JSON format */}
              <p className="text-gray-700 leading-relaxed">
                This is a placeholder for the blog post content. The Novel editor content
                will be rendered here in Milestone 2.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-4">Enjoyed this article?</p>
              <Button className="radius-button bg-accent hover:bg-accent-hover text-white" asChild>
                <Link href="/contact">Book a Treatment</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </PageTransitionWrapper>
  )
}
