'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Search, Mail, Phone, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react'

interface Inquiry {
  id: string
  name: string
  email: string
  phone: string | null
  service_interested: string | null
  message: string
  status: 'new' | 'contacted' | 'closed'
  created_at: string
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'closed'>('all')
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    loadInquiries()
  }, [])

  async function loadInquiries() {
    try {
      const supabase = createClient()
      if (!supabase) { toast.error('Supabase not configured'); setIsLoading(false); return }
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      setInquiries(data || [])
    } catch {
      toast.error('Failed to load inquiries')
    } finally {
      setIsLoading(false)
    }
  }

  async function updateStatus(id: string, status: string | null) {
    if (!status) return
    try {
      const supabase = createClient()
      if (!supabase) { toast.error('Supabase not configured'); return }
      const { error } = await supabase.from('inquiries').update({ status }).eq('id', id)
      if (error) throw error
      setInquiries((prev) =>
        prev.map((i) => i.id === id ? { ...i, status: status as Inquiry['status'] } : i)
      )
      toast.success('Status updated')
    } catch {
      toast.error('Failed to update status')
    }
  }

  function toggleExpand(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusColors = {
    new: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    contacted: 'bg-blue-50 text-blue-700 border-blue-200',
    closed: 'bg-gray-100 text-gray-600 border-gray-200',
  }

  const newCount = inquiries.filter((i) => i.status === 'new').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inquiries</h1>
          <p className="text-gray-600 mt-1">
            Manage contact form submissions
            {newCount > 0 && (
              <span className="ml-2 inline-flex items-center gap-1 bg-[#ff385c]/10 text-[#ff385c] text-xs font-semibold px-2 py-0.5 rounded-full">
                {newCount} new
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, or message..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-lg"
              />
            </div>
            <Select value={statusFilter} onValueChange={(v: any) => setStatusFilter(v)}>
              <SelectTrigger className="w-full sm:w-44 rounded-lg">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inquiries Table */}
      <Card className="border-0 shadow-card">
        {isLoading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-20 w-full rounded-xl" />
            ))}
          </div>
        ) : filteredInquiries.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInquiries.map((inquiry) => {
                const isExpanded = expandedIds.has(inquiry.id)
                const isLong = inquiry.message.length > 100

                return (
                  <TableRow key={inquiry.id} className={inquiry.status === 'new' ? 'bg-[#ff385c]/5' : undefined}>
                    {/* Client */}
                    <TableCell className="min-w-[180px]">
                      <p className="font-semibold text-gray-900">{inquiry.name}</p>
                      <a
                        href={`mailto:${inquiry.email}`}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#ff385c] transition-colors mt-0.5"
                      >
                        <Mail className="w-3 h-3" />
                        {inquiry.email}
                      </a>
                      {inquiry.phone && (
                        <a
                          href={`tel:${inquiry.phone}`}
                          className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#ff385c] transition-colors mt-0.5"
                        >
                          <Phone className="w-3 h-3" />
                          {inquiry.phone}
                        </a>
                      )}
                    </TableCell>

                    {/* Service */}
                    <TableCell>
                      {inquiry.service_interested ? (
                        <span className="inline-block bg-[#ff385c]/10 text-[#ff385c] text-xs font-medium px-2 py-0.5 rounded-full">
                          {inquiry.service_interested}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </TableCell>

                    {/* Message — expandable */}
                    <TableCell className="max-w-xs">
                      <div>
                        <p className={`text-sm text-gray-600 ${!isExpanded ? 'line-clamp-2' : ''}`}>
                          {inquiry.message}
                        </p>
                        {isLong && (
                          <button
                            type="button"
                            onClick={() => toggleExpand(inquiry.id)}
                            className="flex items-center gap-0.5 text-xs text-[#ff385c] mt-1 hover:underline"
                          >
                            {isExpanded ? (
                              <><ChevronUp className="w-3 h-3" /> Show less</>
                            ) : (
                              <><ChevronDown className="w-3 h-3" /> Read more</>
                            )}
                          </button>
                        )}
                      </div>
                    </TableCell>

                    {/* UTM Source */}
                    <TableCell>
                      {inquiry.utm_source ? (
                        <div className="text-xs text-gray-500">
                          <p className="font-medium">{inquiry.utm_source}</p>
                          {inquiry.utm_campaign && (
                            <p className="text-gray-400 truncate max-w-[100px]">{inquiry.utm_campaign}</p>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">Direct</span>
                      )}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Select
                        value={inquiry.status}
                        onValueChange={(v) => updateStatus(inquiry.id, v)}
                      >
                        <SelectTrigger className="w-32 h-8 text-xs rounded-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>

                    {/* Date */}
                    <TableCell className="text-sm text-gray-500 whitespace-nowrap">
                      {new Date(inquiry.created_at).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                      })}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <a
                          href={`mailto:${inquiry.email}`}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Send email"
                        >
                          <Mail className="w-4 h-4 text-gray-500" />
                        </a>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8 rounded-lg"
                          title="View full message"
                          onClick={() => setSelectedInquiry(inquiry)}
                        >
                          <MessageSquare className="w-4 h-4 text-gray-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-16">
            <MessageSquare className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500">No inquiries found</p>
          </div>
        )}
      </Card>

      {/* Full message modal */}
      <Dialog open={!!selectedInquiry} onOpenChange={() => setSelectedInquiry(null)}>
        {selectedInquiry && (
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Inquiry from {selectedInquiry.name}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-2">
              {/* Client info */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-1">Email</p>
                  <a href={`mailto:${selectedInquiry.email}`} className="text-[#ff385c] hover:underline">
                    {selectedInquiry.email}
                  </a>
                </div>
                {selectedInquiry.phone && (
                  <div>
                    <p className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-1">Phone</p>
                    <a href={`tel:${selectedInquiry.phone}`} className="text-[#ff385c] hover:underline">
                      {selectedInquiry.phone}
                    </a>
                  </div>
                )}
                {selectedInquiry.service_interested && (
                  <div>
                    <p className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-1">Service Interested</p>
                    <p className="text-gray-700">{selectedInquiry.service_interested}</p>
                  </div>
                )}
                <div>
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-1">Received</p>
                  <p className="text-gray-700">
                    {new Date(selectedInquiry.created_at).toLocaleDateString('en-US', {
                      weekday: 'short', month: 'long', day: 'numeric', year: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              {/* Message */}
              <div>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-2">Message</p>
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Status + Reply */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Status:</span>
                  <Select
                    value={selectedInquiry.status}
                    onValueChange={(v) => {
                      updateStatus(selectedInquiry.id, v)
                      setSelectedInquiry({ ...selectedInquiry, status: v as Inquiry['status'] })
                    }}
                  >
                    <SelectTrigger className="w-32 h-8 text-xs rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  asChild
                  size="sm"
                  className="rounded-lg bg-[#ff385c] hover:bg-[#e0304f] text-white"
                >
                  <a href={`mailto:${selectedInquiry.email}?subject=Re: Your inquiry at Lumière Beauty Spa`}>
                    <Mail className="w-3 h-3 mr-1.5" />
                    Reply via Email
                  </a>
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
