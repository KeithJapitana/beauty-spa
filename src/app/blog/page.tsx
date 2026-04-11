import { PageTransitionWrapper } from '@/components/layout/page-transition-wrapper'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Calendar, User } from 'lucide-react'
import { createClient } from '@/lib/supabase/admin'

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
      <section className="py-24 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Blog
            </h1>
            <p className="text-xl text-gray-600">
              Skincare tips, treatment guides, and wellness inspiration from our experts.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="border-0 shadow-card hover:shadow-card-lg transition-shadow h-full">
                    {post.cover_image_url && (
                      <div className="aspect-video overflow-hidden rounded-t-2xl">
                        <img
                          src={post.cover_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      {post.published_at && (
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.published_at).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="border-0 shadow-card">
              <CardContent className="text-center py-16">
                <p className="text-gray-500 mb-4">No blog posts yet.</p>
                <p className="text-sm text-gray-400">Check back soon for updates!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </PageTransitionWrapper>
  )
}
