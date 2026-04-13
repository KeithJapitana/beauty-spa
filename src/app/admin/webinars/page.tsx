'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Plus, Calendar, Video, PlayCircle, Edit, Trash2, Link as LinkIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Webinar {
  id: string
  title: string
  description: string | null
  date: string | null
  youtube_url: string | null
  thumbnail_url: string | null
  status: 'upcoming' | 'past'
  created_at: string
}

const emptyForm = {
  title: '',
  description: '',
  date: '',
  time: '',
  youtube_url: '',
  thumbnail_url: '',
  status: 'upcoming' as 'upcoming' | 'past',
}

function getYouTubeThumbnail(url: string): string | null {
  try {
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    )
    if (match) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
  } catch {}
  return null
}

export default function WebinarsPage() {
  const [webinars, setWebinars] = useState<Webinar[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Webinar | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    loadWebinars()
  }, [])

  async function loadWebinars() {
    try {
      const supabase = createClient()
      if (!supabase) { toast.error('Supabase not configured'); setIsLoading(false); return }
      const { data, error } = await supabase
        .from('webinars')
        .select('*')
        .order('date', { ascending: false, nullsFirst: false })
      if (error) throw error
      setWebinars(data || [])
    } catch {
      toast.error('Failed to load webinars')
    } finally {
      setIsLoading(false)
    }
  }

  function openAdd() {
    setEditingItem(null)
    setForm(emptyForm)
    setIsDialogOpen(true)
  }

  function openEdit(item: Webinar) {
    setEditingItem(item)
    let date = ''
    let time = ''
    if (item.date) {
      const d = new Date(item.date)
      date = d.toISOString().split('T')[0]
      time = d.toTimeString().slice(0, 5)
    }
    setForm({
      title: item.title,
      description: item.description || '',
      date,
      time,
      youtube_url: item.youtube_url || '',
      thumbnail_url: item.thumbnail_url || '',
      status: item.status,
    })
    setIsDialogOpen(true)
  }

  async function handleSave() {
    if (!form.title.trim()) { toast.error('Title is required'); return }
    setIsSaving(true)
    try {
      const supabase = createClient()
      if (!supabase) { toast.error('Supabase not configured'); return }

      // Combine date + time into ISO string
      let isoDate: string | null = null
      if (form.date) {
        isoDate = form.time
          ? new Date(`${form.date}T${form.time}`).toISOString()
          : new Date(`${form.date}T00:00:00`).toISOString()
      }

      // Auto-detect thumbnail from YouTube URL
      let thumbnail = form.thumbnail_url.trim() || null
      if (!thumbnail && form.youtube_url) {
        thumbnail = getYouTubeThumbnail(form.youtube_url) || null
      }

      const payload = {
        title: form.title.trim(),
        description: form.description.trim() || null,
        date: isoDate,
        youtube_url: form.youtube_url.trim() || null,
        thumbnail_url: thumbnail,
        status: form.status,
      }

      if (editingItem) {
        const { error } = await supabase
          .from('webinars')
          .update(payload)
          .eq('id', editingItem.id)
        if (error) throw error
        toast.success('Webinar updated')
      } else {
        const { error } = await supabase
          .from('webinars')
          .insert(payload)
        if (error) throw error
        toast.success('Webinar added')
      }

      setIsDialogOpen(false)
      loadWebinars()
    } catch (err: any) {
      toast.error(err.message || 'Failed to save')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(id: string) {
    try {
      const supabase = createClient()
      if (!supabase) { toast.error('Supabase not configured'); return }
      const { error } = await supabase.from('webinars').delete().eq('id', id)
      if (error) throw error
      toast.success('Webinar deleted')
      setWebinars((prev) => prev.filter((w) => w.id !== id))
      setDeleteId(null)
    } catch {
      toast.error('Failed to delete webinar')
    }
  }

  const upcoming = webinars.filter((w) => w.status === 'upcoming')
  const past = webinars.filter((w) => w.status === 'past')

  function WebinarCard({ webinar, isPast = false }: { webinar: Webinar; isPast?: boolean }) {
    const thumb = webinar.thumbnail_url ||
      (webinar.youtube_url ? getYouTubeThumbnail(webinar.youtube_url) : null)

    return (
      <Card className="border-0 shadow-card hover:shadow-card-lg transition-shadow overflow-hidden group">
        <div className="relative">
          {thumb ? (
            <img src={thumb} alt={webinar.title} className="w-full aspect-video object-cover" />
          ) : (
            <div className={`w-full aspect-video flex items-center justify-center ${
              isPast ? 'bg-gray-100' : 'bg-gradient-to-br from-[#ff385c]/10 to-[#ff385c]/5'
            }`}>
              {isPast
                ? <PlayCircle className="w-12 h-12 text-gray-300" />
                : <Video className="w-12 h-12 text-[#ff385c]/30" />
              }
            </div>
          )}

          {/* Hover actions */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              size="sm"
              onClick={() => openEdit(webinar)}
              className="bg-white text-gray-900 hover:bg-gray-100"
            >
              <Edit className="w-3 h-3 mr-1" />
              Edit
            </Button>
            <Button
              size="sm"
              onClick={() => setDeleteId(webinar.id)}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Delete
            </Button>
          </div>

          {isPast && webinar.youtube_url && (
            <a
              href={webinar.youtube_url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 hover:bg-black/80 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <PlayCircle className="w-3 h-3" />
              Watch
            </a>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{webinar.title}</h3>
          {webinar.date && (
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Calendar className="w-3 h-3 flex-shrink-0" />
              {new Date(webinar.date).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric',
              })}
              {!isPast && (
                <span className="ml-1">
                  at{' '}
                  {new Date(webinar.date).toLocaleTimeString([], {
                    hour: '2-digit', minute: '2-digit',
                  })}
                </span>
              )}
            </p>
          )}
          {webinar.description && (
            <p className="text-sm text-gray-400 mt-1 line-clamp-2">{webinar.description}</p>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Webinars</h1>
          <p className="text-gray-600 mt-1">Manage upcoming and past webinars</p>
        </div>
        <Button
          onClick={openAdd}
          className="rounded-lg bg-[#ff385c] hover:bg-[#e0304f] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Webinar
        </Button>
      </div>

      {/* Upcoming */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#ff385c]" />
          Upcoming
          <Badge variant="secondary">{upcoming.length}</Badge>
        </h2>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-48 rounded-2xl" />)}
          </div>
        ) : upcoming.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((w) => <WebinarCard key={w.id} webinar={w} />)}
          </div>
        ) : (
          <Card className="border-0 shadow-card">
            <CardContent className="text-center py-10">
              <Video className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No upcoming webinars</p>
              <Button
                size="sm"
                variant="outline"
                onClick={openAdd}
                className="mt-3 rounded-lg"
              >
                <Plus className="w-3 h-3 mr-1" />
                Schedule one
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Past */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Video className="w-5 h-5 text-gray-400" />
          Past Recordings
          <Badge variant="outline">{past.length}</Badge>
        </h2>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-48 rounded-2xl" />)}
          </div>
        ) : past.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {past.map((w) => <WebinarCard key={w.id} webinar={w} isPast />)}
          </div>
        ) : (
          <Card className="border-0 shadow-card">
            <CardContent className="text-center py-10">
              <p className="text-gray-500 text-sm">No past webinars yet</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Webinar' : 'Add Webinar'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Title */}
            <div className="space-y-1.5">
              <Label htmlFor="w-title">Title <span className="text-red-500">*</span></Label>
              <Input
                id="w-title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Skincare Secrets Live Session"
                className="rounded-lg"
              />
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) => { if (v === 'upcoming' || v === 'past') setForm((f) => ({ ...f, status: v })) }}
              >
                <SelectTrigger className="rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="past">Past Recording</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date + Time */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="w-date">Date</Label>
                <Input
                  id="w-date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="w-time">Time</Label>
                <Input
                  id="w-time"
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* YouTube URL */}
            <div className="space-y-1.5">
              <Label htmlFor="w-yt">YouTube URL</Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="w-yt"
                  value={form.youtube_url}
                  onChange={(e) => setForm((f) => ({ ...f, youtube_url: e.target.value }))}
                  placeholder="https://youtube.com/watch?v=..."
                  className="rounded-lg pl-10"
                />
              </div>
              {form.youtube_url && getYouTubeThumbnail(form.youtube_url) && !form.thumbnail_url && (
                <p className="text-xs text-gray-400">Thumbnail will be auto-fetched from YouTube</p>
              )}
            </div>

            {/* Custom Thumbnail */}
            <div className="space-y-1.5">
              <Label htmlFor="w-thumb">Custom Thumbnail URL <span className="text-gray-400 font-normal">(optional)</span></Label>
              <Input
                id="w-thumb"
                value={form.thumbnail_url}
                onChange={(e) => setForm((f) => ({ ...f, thumbnail_url: e.target.value }))}
                placeholder="https://..."
                className="rounded-lg"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label htmlFor="w-desc">Description</Label>
              <Textarea
                id="w-desc"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Brief description of this webinar..."
                rows={3}
                className="rounded-lg resize-none"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="rounded-lg"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-lg bg-[#ff385c] hover:bg-[#e0304f] text-white"
            >
              {isSaving ? 'Saving...' : editingItem ? 'Save Changes' : 'Add Webinar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Webinar</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the webinar and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-lg">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="rounded-lg bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
