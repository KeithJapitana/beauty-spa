'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Eye, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { NovelEditor } from '@/components/blog/novel-editor'
import type { JSONContent } from 'novel'

interface PostForm {
  title: string
  slug: string
  excerpt: string
  cover_image_url: string
  status: 'draft' | 'published' | 'scheduled'
  published_at: string
  seo_title: string
  seo_description: string
  seo_keywords: string
  schema_type: 'article' | 'faq' | 'howto'
}

const defaultForm: PostForm = {
  title: '',
  slug: '',
  excerpt: '',
  cover_image_url: '',
  status: 'draft',
  published_at: '',
  seo_title: '',
  seo_description: '',
  seo_keywords: '',
  schema_type: 'article',
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

interface PostEditorClientProps {
  postId: string | null
}

export default function PostEditorClient({ postId: initialPostId }: PostEditorClientProps) {
  const router = useRouter()
  const isNew = !initialPostId

  const [form, setForm] = useState<PostForm>(defaultForm)
  const [content, setContent] = useState<JSONContent>({})
  const [isLoading, setIsLoading] = useState(!isNew)
  const [isSaving, setIsSaving] = useState(false)
  const [coverPreview, setCoverPreview] = useState('')
  const [postId, setPostId] = useState<string | null>(initialPostId)

  useEffect(() => {
    if (!isNew && initialPostId) {
      loadPost(initialPostId)
    }
  }, [initialPostId, isNew])

  async function loadPost(id: string) {
    const supabase = createClient()
    if (!supabase) return
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()
    if (error || !data) {
      toast.error('Post not found')
      router.push('/admin/posts')
      return
    }
    setForm({
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || '',
      cover_image_url: data.cover_image_url || '',
      status: data.status,
      published_at: data.published_at ? data.published_at.slice(0, 16) : '',
      seo_title: data.seo_title || '',
      seo_description: data.seo_description || '',
      seo_keywords: (data.seo_keywords || []).join(', '),
      schema_type: data.schema_type || 'article',
    })
    if (data.cover_image_url) setCoverPreview(data.cover_image_url)
    if (data.content && Object.keys(data.content).length > 0) setContent(data.content)
    setIsLoading(false)
  }

  function handleField(key: keyof PostForm, value: string) {
    setForm((prev) => {
      const next = { ...prev, [key]: value }
      if (key === 'title' && isNew) {
        next.slug = slugify(value)
      }
      return next
    })
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)
    formData.append('bucket', 'blog-images')
    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    const json = await res.json()
    if (!res.ok) {
      toast.error('Image upload failed')
      return
    }
    setForm((prev) => ({ ...prev, cover_image_url: json.url }))
    setCoverPreview(json.url)
  }

  async function handleSave(publishNow = false) {
    if (!form.title.trim()) {
      toast.error('Title is required')
      return
    }
    if (!form.slug.trim()) {
      toast.error('Slug is required')
      return
    }

    setIsSaving(true)
    const supabase = createClient()
    if (!supabase) {
      toast.error('Not connected')
      setIsSaving(false)
      return
    }

    const payload: Record<string, any> = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      excerpt: form.excerpt.trim() || null,
      cover_image_url: form.cover_image_url || null,
      status: publishNow ? 'published' : form.status,
      published_at: publishNow
        ? new Date().toISOString()
        : form.published_at || null,
      seo_title: form.seo_title.trim() || null,
      seo_description: form.seo_description.trim() || null,
      seo_keywords: form.seo_keywords
        ? form.seo_keywords.split(',').map((k) => k.trim()).filter(Boolean)
        : [],
      schema_type: form.schema_type,
      content,
      updated_at: new Date().toISOString(),
    }

    try {
      if (postId) {
        const { error } = await supabase
          .from('blog_posts')
          .update(payload)
          .eq('id', postId)
        if (error) throw error
      } else {
        const { data, error } = await supabase
          .from('blog_posts')
          .insert(payload)
          .select('id')
          .single()
        if (error) throw error
        setPostId(data.id)
        router.replace(`/admin/posts/${data.id}`)
      }

      if (publishNow) {
        setForm((prev) => ({ ...prev, status: 'published' }))
        toast.success('Post published!')
      } else {
        toast.success('Post saved')
      }
    } catch (err: any) {
      toast.error(err.message || 'Save failed')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff385c]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/posts">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-[#222222]">
              {isNew ? 'New Post' : 'Edit Post'}
            </h1>
            {form.status && (
              <Badge
                variant={form.status === 'published' ? 'default' : 'secondary'}
                className="mt-1"
              >
                {form.status}
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {postId && form.slug && (
            <Button variant="outline" size="sm" className="rounded-lg" asChild>
              <Link href={`/blog/${form.slug}`} target="_blank">
                <Eye className="w-4 h-4 mr-1.5" />
                Preview
              </Link>
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg"
            onClick={() => handleSave(false)}
            disabled={isSaving}
          >
            <Save className="w-4 h-4 mr-1.5" />
            Save Draft
          </Button>
          <Button
            size="sm"
            className="rounded-lg bg-[#ff385c] hover:bg-[#e0304f] text-white"
            onClick={() => handleSave(true)}
            disabled={isSaving}
          >
            {form.status === 'published' ? 'Update' : 'Publish'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title + Slug + Excerpt */}
          <Card className="border-0 shadow-[0_6px_16px_0_rgb(0_0_0/0.12),_0_1px_4px_0_rgb(0_0_0/0.08)]">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => handleField('title', e.target.value)}
                  placeholder="Enter post title..."
                  className="text-lg font-medium rounded-lg border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400 whitespace-nowrap">/blog/</span>
                  <Input
                    id="slug"
                    value={form.slug}
                    onChange={(e) => handleField('slug', slugify(e.target.value))}
                    placeholder="post-url-slug"
                    className="rounded-lg border-gray-200"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={form.excerpt}
                  onChange={(e) => handleField('excerpt', e.target.value)}
                  placeholder="Brief summary shown in blog list..."
                  rows={2}
                  className="rounded-lg border-gray-200 resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Novel Editor */}
          <Card className="border-0 shadow-[0_6px_16px_0_rgb(0_0_0/0.12),_0_1px_4px_0_rgb(0_0_0/0.08)]">
            <CardHeader className="pb-0">
              <CardTitle className="text-base font-semibold">Content</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <NovelEditor
                initialContent={Object.keys(content).length > 0 ? content : undefined}
                onChange={setContent}
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish settings */}
          <Card className="border-0 shadow-[0_6px_16px_0_rgb(0_0_0/0.12),_0_1px_4px_0_rgb(0_0_0/0.08)]">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Publish</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(v: any) => handleField('status', v)}
                >
                  <SelectTrigger className="rounded-lg border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {form.status === 'scheduled' && (
                <div className="space-y-2">
                  <Label htmlFor="published_at">Publish date</Label>
                  <Input
                    id="published_at"
                    type="datetime-local"
                    value={form.published_at}
                    onChange={(e) => handleField('published_at', e.target.value)}
                    className="rounded-lg border-gray-200"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Cover image */}
          <Card className="border-0 shadow-[0_6px_16px_0_rgb(0_0_0/0.12),_0_1px_4px_0_rgb(0_0_0/0.08)]">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Cover Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {coverPreview ? (
                <div className="relative">
                  <img
                    src={coverPreview}
                    alt="Cover"
                    className="w-full aspect-video object-cover rounded-xl"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
                    onClick={() => {
                      setCoverPreview('')
                      setForm((prev) => ({ ...prev, cover_image_url: '' }))
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#ff385c] transition-colors">
                  <Upload className="w-6 h-6 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-400">Click to upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverUpload}
                  />
                </label>
              )}
              <Input
                value={form.cover_image_url}
                onChange={(e) => {
                  handleField('cover_image_url', e.target.value)
                  setCoverPreview(e.target.value)
                }}
                placeholder="Or paste image URL..."
                className="rounded-lg border-gray-200 text-sm"
              />
            </CardContent>
          </Card>

          {/* SEO */}
          <Card className="border-0 shadow-[0_6px_16px_0_rgb(0_0_0/0.12),_0_1px_4px_0_rgb(0_0_0/0.08)]">
            <CardHeader>
              <CardTitle className="text-base font-semibold">SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seo_title">Meta Title</Label>
                <Input
                  id="seo_title"
                  value={form.seo_title}
                  onChange={(e) => handleField('seo_title', e.target.value)}
                  placeholder={form.title || 'Defaults to post title'}
                  className="rounded-lg border-gray-200"
                  maxLength={60}
                />
                <p className="text-xs text-gray-400">{form.seo_title.length}/60</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="seo_description">Meta Description</Label>
                <Textarea
                  id="seo_description"
                  value={form.seo_description}
                  onChange={(e) => handleField('seo_description', e.target.value)}
                  placeholder={form.excerpt || 'Defaults to excerpt'}
                  rows={3}
                  className="rounded-lg border-gray-200 resize-none"
                  maxLength={160}
                />
                <p className="text-xs text-gray-400">{form.seo_description.length}/160</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="seo_keywords">Keywords</Label>
                <Input
                  id="seo_keywords"
                  value={form.seo_keywords}
                  onChange={(e) => handleField('seo_keywords', e.target.value)}
                  placeholder="keyword1, keyword2, ..."
                  className="rounded-lg border-gray-200"
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Schema Type</Label>
                <Select
                  value={form.schema_type}
                  onValueChange={(v: any) => handleField('schema_type', v)}
                >
                  <SelectTrigger className="rounded-lg border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="faq">FAQ</SelectItem>
                    <SelectItem value="How-To">How-To</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
