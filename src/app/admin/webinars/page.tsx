'use client'

import { createClient } from '@/lib/supabase/admin'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Plus, Calendar, Video, PlayCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

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

export default function WebinarsPage() {
  const [webinars, setWebinars] = useState<Webinar[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadWebinars()
  }, [])

  async function loadWebinars() {
    try {
      const supabase = createClient()
      if (!supabase) {
        toast.error('Supabase not configured')
        setIsLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('webinars')
        .select('*')
        .order('date', { ascending: false, nullsFirst: false })

      if (error) throw error
      setWebinars(data || [])
    } catch (error) {
      toast.error('Failed to load webinars')
    } finally {
      setIsLoading(false)
    }
  }

  const upcoming = webinars.filter((w) => w.status === 'upcoming')
  const past = webinars.filter((w) => w.status === 'past')

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Webinars</h1>
          <p className="text-gray-600 mt-1">Manage upcoming and past webinars</p>
        </div>
        <Button className="radius-button bg-accent hover:bg-accent-hover text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Webinar
        </Button>
      </div>

      {/* Upcoming Webinars */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-accent" />
          Upcoming
          <Badge variant="secondary">{upcoming.length}</Badge>
        </h2>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48 rounded-2xl" />
            ))}
          </div>
        ) : upcoming.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((webinar) => (
              <Card key={webinar.id} className="border-0 shadow-card hover:shadow-card-lg transition-shadow overflow-hidden">
                {webinar.thumbnail_url ? (
                  <img
                    src={webinar.thumbnail_url}
                    alt={webinar.title}
                    className="w-full aspect-video object-cover"
                  />
                ) : (
                  <div className="w-full aspect-video bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                    <Video className="w-12 h-12 text-accent/40" />
                  </div>
                )}
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{webinar.title}</h3>
                  {webinar.date && (
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(webinar.date).toLocaleDateString()} at{' '}
                      {new Date(webinar.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-card">
            <CardContent className="text-center py-8">
              <p className="text-gray-500">No upcoming webinars</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Past Webinars */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Video className="w-5 h-5 text-gray-500" />
          Past Recordings
          <Badge variant="outline">{past.length}</Badge>
        </h2>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48 rounded-2xl" />
            ))}
          </div>
        ) : past.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {past.map((webinar) => (
              <Card key={webinar.id} className="border-0 shadow-card hover:shadow-card-lg transition-shadow overflow-hidden group">
                <div className="relative">
                  {webinar.thumbnail_url ? (
                    <img
                      src={webinar.thumbnail_url}
                      alt={webinar.title}
                      className="w-full aspect-video object-cover"
                    />
                  ) : (
                    <div className="w-full aspect-video bg-gray-100 flex items-center justify-center">
                      <PlayCircle className="w-12 h-12 text-gray-300" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {webinar.youtube_url && (
                      <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100" asChild>
                        <a
                          href={webinar.youtube_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Watch
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{webinar.title}</h3>
                  {webinar.date && (
                    <p className="text-sm text-gray-500">
                      {new Date(webinar.date).toLocaleDateString()}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-card">
            <CardContent className="text-center py-8">
              <p className="text-gray-500">No past webinars yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
