'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState, useRef } from 'react'
import { toast } from 'sonner'
import {
  Plus, Edit, Trash2, Trophy, ImageIcon, X, Upload, GripVertical,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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

interface PortfolioItem {
  id: string
  title: string
  description: string | null
  images: string[]
  category: string | null
  awards: Array<{ title: string; year: string; org: string }>
  display_order: number
}

const CATEGORIES = [
  'Facial Treatment',
  'Body Treatment',
  'Nail Art',
  'Hair & Scalp',
  'Laser Treatment',
  'Skin Brightening',
  'Anti-Aging',
  'Acne Treatment',
  'Other',
]

const emptyForm = {
  title: '',
  description: '',
  category: '' as string,
  images: [] as string[],
  display_order: 0,
}

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadPortfolio()
  }, [])

  async function loadPortfolio() {
    try {
      const supabase = createClient()
      if (!supabase) { toast.error('Supabase not configured'); setIsLoading(false); return }
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('display_order', { ascending: true })
      if (error) throw error
      setItems(data || [])
    } catch {
      toast.error('Failed to load portfolio')
    } finally {
      setIsLoading(false)
    }
  }

  function openAdd() {
    setEditingItem(null)
    setForm({ ...emptyForm, display_order: items.length })
    setIsDialogOpen(true)
  }

  function openEdit(item: PortfolioItem) {
    setEditingItem(item)
    setForm({
      title: item.title,
      description: item.description || '',
      category: item.category || '',
      images: item.images || [],
      display_order: item.display_order,
    })
    setIsDialogOpen(true)
  }

  async function handleUploadImage(file: File) {
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('bucket', 'portfolio')
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      setForm((f) => ({ ...f, images: [...f.images, data.url] }))
      toast.success('Image uploaded')
    } catch (err: any) {
      toast.error(err.message || 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  function removeImage(index: number) {
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== index) }))
  }

  async function handleSave() {
    if (!form.title.trim()) { toast.error('Title is required'); return }
    setIsSaving(true)
    try {
      const supabase = createClient()
      if (!supabase) { toast.error('Supabase not configured'); return }

      const payload = {
        title: form.title.trim(),
        description: form.description.trim() || null,
        category: form.category || null,
        images: form.images,
        display_order: form.display_order,
        awards: editingItem?.awards || [],
      }

      if (editingItem) {
        const { error } = await supabase
          .from('portfolio_items')
          .update(payload)
          .eq('id', editingItem.id)
        if (error) throw error
        toast.success('Item updated')
      } else {
        const { error } = await supabase
          .from('portfolio_items')
          .insert(payload)
        if (error) throw error
        toast.success('Item added')
      }

      setIsDialogOpen(false)
      loadPortfolio()
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
      const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', id)
      if (error) throw error
      toast.success('Item deleted')
      setItems((prev) => prev.filter((i) => i.id !== id))
      setDeleteId(null)
    } catch {
      toast.error('Failed to delete item')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
          <p className="text-gray-600 mt-1">Manage your works and transformations</p>
        </div>
        <Button
          onClick={openAdd}
          className="rounded-lg bg-[#ff385c] hover:bg-[#e0304f] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-64 rounded-2xl" />
          ))}
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card
              key={item.id}
              className="border-0 transition-shadow overflow-hidden group"
              style={{
                boxShadow: '0 6px 16px 0 rgb(0 0 0 / 0.12), 0 1px 4px 0 rgb(0 0 0 / 0.08)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 32px 0 rgb(0 0 0 / 0.12), 0 2px 8px 0 rgb(0 0 0 / 0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 16px 0 rgb(0 0 0 / 0.12), 0 1px 4px 0 rgb(0 0 0 / 0.08)'
              }}
            >
              <div className="aspect-video bg-gray-100 relative">
                {item.images[0] ? (
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-2">
                    <ImageIcon className="w-8 h-8" />
                    <span className="text-xs">No image</span>
                  </div>
                )}

                {item.images.length > 1 && (
                  <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                    +{item.images.length - 1} more
                  </div>
                )}

                {item.awards?.length > 0 && (
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700 flex items-center gap-1">
                    <Trophy className="w-3 h-3 text-amber-500" />
                    {item.awards.length}
                  </div>
                )}

                {/* Action overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => openEdit(item)}
                    className="bg-white text-gray-900 hover:bg-gray-100"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setDeleteId(item.id)}
                    className="bg-red-600 text-white hover:bg-red-700"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                {item.category && (
                  <p className="text-xs text-[#ff385c] font-medium mb-1">{item.category}</p>
                )}
                {item.description && (
                  <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-0" style={{ boxShadow: '0 6px 16px 0 rgb(0 0 0 / 0.12), 0 1px 4px 0 rgb(0 0 0 / 0.08)' }}>
          <CardContent className="text-center py-16">
            <ImageIcon className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No portfolio items yet</p>
            <Button
              onClick={openAdd}
              className="rounded-lg bg-[#ff385c] hover:bg-[#e0304f] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Item
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add / Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Portfolio Item' : 'Add Portfolio Item'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Title */}
            <div className="space-y-1.5">
              <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Diamond Peel Transformation"
                className="rounded-lg"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm((f) => ({ ...f, category: v ?? '' }))}
              >
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Brief description of this treatment result..."
                rows={3}
                className="rounded-lg resize-none"
              />
            </div>

            {/* Display Order */}
            <div className="space-y-1.5">
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                min={0}
                value={form.display_order}
                onChange={(e) => setForm((f) => ({ ...f, display_order: Number(e.target.value) }))}
                className="rounded-lg w-24"
              />
            </div>

            {/* Images */}
            <div className="space-y-2">
              <Label>Images</Label>

              {form.images.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {form.images.map((url, i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden group">
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                      {i === 0 && (
                        <div className="absolute bottom-1 left-1 bg-[#ff385c] text-white text-[10px] px-1.5 py-0.5 rounded-full font-medium">
                          Cover
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleUploadImage(file)
                  e.target.value = ''
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-lg w-full"
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
              >
                {isUploading ? (
                  <>
                    <div className="w-3 h-3 border-2 border-gray-400 border-t-gray-700 rounded-full animate-spin mr-2" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-3 h-3 mr-2" />
                    Upload Image
                  </>
                )}
              </Button>
              <p className="text-xs text-gray-400">First image is used as the cover photo</p>
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
              {isSaving ? 'Saving...' : editingItem ? 'Save Changes' : 'Add Item'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Portfolio Item</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the item and cannot be undone.
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
