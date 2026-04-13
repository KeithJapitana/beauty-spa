import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const path = body.path || '/blog'
    const slug = body.slug

    // Always revalidate the blog list
    revalidatePath('/blog')

    // Also revalidate the specific post page if slug provided
    if (slug) {
      revalidatePath(`/blog/${slug}`)
    }

    // Revalidate homepage (it shows latest blog posts)
    revalidatePath('/')

    return NextResponse.json(
      { revalidated: true, paths: ['/', '/blog', slug ? `/blog/${slug}` : null].filter(Boolean) },
      { status: 200 }
    )
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { error: 'Revalidation failed' },
      { status: 500 }
    )
  }
}
