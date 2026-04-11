import { PageTransitionWrapper } from '@/components/layout/page-transition-wrapper'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Video, PlayCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/admin'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

async function getWebinars() {
  try {
    const supabase = createClient()
    if (!supabase) return { upcoming: [], past: [] }

    const { data, error } = await supabase
      .from('webinars')
      .select('*')
      .order('date', { ascending: false, nullsFirst: false })

    if (error) return { upcoming: [], past: [] }

    const upcoming = data.filter((w: any) => w.status === 'upcoming')
    const past = data.filter((w: any) => w.status === 'past')

    return { upcoming, past }
  } catch {
    return { upcoming: [], past: [] }
  }
}

export default async function WebinarsPage() {
  const { upcoming, past } = await getWebinars()

  return (
    <PageTransitionWrapper>
      <section className="py-24 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Webinars & Events
            </h1>
            <p className="text-xl text-gray-600">
              Join us for educational sessions and catch up on past recordings.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-accent" />
              Upcoming Events
              <Badge variant="secondary">{upcoming.length}</Badge>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcoming.map((webinar: any) => (
                <Card key={webinar.id} className="border-0 shadow-card hover:shadow-card-lg transition-shadow">
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
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {webinar.title}
                    </h3>
                    {webinar.description && (
                      <p className="text-gray-600 mb-4">{webinar.description}</p>
                    )}
                    {webinar.date && (
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(webinar.date).toLocaleDateString()} at{' '}
                        {new Date(webinar.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    )}
                    <Button className="w-full mt-4 radius-button bg-accent hover:bg-accent-hover text-white" asChild>
                      <Link href="/contact">Register Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Recordings */}
      {past.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Video className="w-6 h-6 text-gray-500" />
              Past Recordings
              <Badge variant="outline">{past.length}</Badge>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {past.map((webinar: any) => (
                <Card key={webinar.id} className="border-0 shadow-card hover:shadow-card-lg transition-shadow">
                  <div className="relative">
                    {webinar.thumbnail_url ? (
                      <img
                        src={webinar.thumbnail_url}
                        alt={webinar.title}
                        className="w-full aspect-video object-cover"
                      />
                    ) : (
                      <div className="w-full aspect-video bg-gray-200 flex items-center justify-center">
                        <PlayCircle className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {webinar.title}
                    </h3>
                    {webinar.date && (
                      <p className="text-sm text-gray-500 mb-4">
                        {new Date(webinar.date).toLocaleDateString()}
                      </p>
                    )}
                    {webinar.youtube_url && (
                      <Button
                        variant="outline"
                        className="w-full radius-button"
                        asChild
                      >
                        <a
                          href={webinar.youtube_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Watch Recording
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {upcoming.length === 0 && past.length === 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-500">No webinars scheduled yet. Check back soon!</p>
          </div>
        </section>
      )}
    </PageTransitionWrapper>
  )
}
