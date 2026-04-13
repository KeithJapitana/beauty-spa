import { NextResponse, NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/admin'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug') || 'top-5-facial-treatments'

  const supabase = createClient()
  if (!supabase) {
    return NextResponse.json({ error: 'Admin client null' }, { status: 500 })
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  return NextResponse.json({
    slug,
    found: !!data,
    post: data ? { id: data.id, title: data.title, status: data.status } : null,
    error: error ? { message: error.message, hint: error.hint } : null,
  })
}
