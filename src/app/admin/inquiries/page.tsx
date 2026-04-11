'use client'

import { createClient } from '@/lib/supabase/admin'
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
import { Search, Mail, Phone, ExternalLink } from 'lucide-react'

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

  useEffect(() => {
    loadInquiries()
  }, [])

  async function loadInquiries() {
    try {
      const supabase = createClient()
      if (!supabase) {
        toast.error('Supabase not configured')
        setIsLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setInquiries(data || [])
    } catch (error) {
      toast.error('Failed to load inquiries')
    } finally {
      setIsLoading(false)
    }
  }

  async function updateStatus(id: string, status: string | null) {
    if (!status) return
    try {
      const supabase = createClient()
      if (!supabase) {
        toast.error('Supabase not configured')
        return
      }

      const { error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', id)

      if (error) throw error

      setInquiries(inquiries.map((i) =>
        i.id === id ? { ...i, status: status as Inquiry['status'] } : i
      ))

      toast.success('Status updated')
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      new: 'default',
      contacted: 'secondary',
      closed: 'outline',
    } as const

    const colors = {
      new: 'bg-green-100 text-green-800 border-green-200',
      contacted: 'bg-blue-100 text-blue-800 border-blue-200',
      closed: 'bg-gray-100 text-gray-800 border-gray-200',
    }

    return (
      <Badge className={colors[status as keyof typeof colors]}>
        {status}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Inquiries</h1>
        <p className="text-gray-600 mt-1">Manage contact form submissions</p>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search inquiries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 radius-button"
              />
            </div>
            <Select value={statusFilter} onValueChange={(v: any) => setStatusFilter(v)}>
              <SelectTrigger className="w-full sm:w-48 radius-button">
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
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        ) : filteredInquiries.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInquiries.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell>
                    <p className="font-medium text-gray-900">{inquiry.name}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Mail className="w-3 h-3" />
                      <a href={`mailto:${inquiry.email}`} className="hover:text-accent">
                        {inquiry.email}
                      </a>
                    </div>
                    {inquiry.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Phone className="w-3 h-3" />
                        <a href={`tel:${inquiry.phone}`} className="hover:text-accent">
                          {inquiry.phone}
                        </a>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <a
                        href={`mailto:${inquiry.email}`}
                        className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <Mail className="w-4 h-4 text-gray-600" />
                      </a>
                      {inquiry.phone && (
                        <a
                          href={`tel:${inquiry.phone}`}
                          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                        >
                          <Phone className="w-4 h-4 text-gray-600" />
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {inquiry.service_interested || '-'}
                  </TableCell>
                  <TableCell>
                    <p className="max-w-xs truncate text-sm text-gray-600">
                      {inquiry.message}
                    </p>
                  </TableCell>
                  <TableCell>
                    {inquiry.utm_source ? (
                      <div className="text-xs text-gray-500">
                        <p>{inquiry.utm_source}</p>
                        {inquiry.utm_campaign && (
                          <p className="text-gray-400">{inquiry.utm_campaign}</p>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400">Direct</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={inquiry.status}
                      onValueChange={(v) => updateStatus(inquiry.id, v)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {new Date(inquiry.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No inquiries found</p>
          </div>
        )}
      </Card>
    </div>
  )
}
