'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar, Video, PlayCircle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageTransitionWrapper } from '@/components/layout/page-transition-wrapper'
import { gsap } from '@/lib/gsap/register'
import { ScrollTrigger } from '@/lib/gsap/register'
import { createClient } from '@/lib/supabase/client'

export default function WebinarsPage() {
  const [upcoming, setUpcoming] = useState<any[]>([])
  const [past, setPast] = useState<any[]>([])

  useEffect(() => {
    const supabase = createClient()
    if (!supabase) return
    supabase
      .from('webinars')
      .select('*')
      .order('date', { ascending: false, nullsFirst: false })
      .then(({ data }) => {
        const all = data || []
        setUpcoming(all.filter((w: any) => w.status === 'upcoming'))
        setPast(all.filter((w: any) => w.status === 'past'))
      })
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.webinars-hero-text', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
      gsap.fromTo('.webinar-card', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.upcoming-grid', start: 'top 80%' },
      })
      gsap.fromTo('.past-card', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.past-grid', start: 'top 80%' },
      })
    })
    return () => ctx.revert()
  }, [upcoming, past])

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  const formatTime = (date: string) =>
    new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <PageTransitionWrapper>

      {/* ─── HERO ─── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl webinars-hero-text">
            <p className="text-sm font-semibold text-[#ff385c] uppercase tracking-widest mb-4">Learn With Us</p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#222222] leading-tight mb-6">
              Webinars &{' '}
              <em className="not-italic text-[#ff385c]">Live Events</em>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed">
              Join our free sessions to learn about skincare, treatments, and how to build a routine that actually works for your skin.
            </p>
          </div>
        </div>
      </section>

      {/* ─── UPCOMING ─── */}
      <section className="pb-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="mb-10">
            <p className="text-sm font-semibold text-[#ff385c] uppercase tracking-widest mb-2">Coming Up</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#222222]">Upcoming Events</h2>
          </div>

          {upcoming.length > 0 ? (
            <div className="upcoming-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((webinar) => (
                <div
                  key={webinar.id}
                  className="webinar-card rounded-2xl overflow-hidden shadow-[0_6px_16px_0_rgb(0_0_0/0.08)] hover:shadow-[0_12px_32px_0_rgb(0_0_0/0.14)] transition-all duration-300 bg-white"
                >
                  <div className="overflow-hidden aspect-video bg-gradient-to-br from-rose-50 to-pink-100">
                    {webinar.thumbnail_url ? (
                      <img
                        src={webinar.thumbnail_url}
                        alt={webinar.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Video className="w-10 h-10 text-[#ff385c]/30" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#ff385c]/10 text-[#ff385c] px-3 py-1 rounded-full mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] animate-pulse" />
                      Upcoming
                    </span>
                    <h3 className="font-semibold text-[#222222] text-lg mb-2">{webinar.title}</h3>
                    {webinar.description && (
                      <p className="text-gray-500 text-sm leading-relaxed mb-4">{webinar.description}</p>
                    )}
                    {webinar.date && (
                      <div className="flex flex-col gap-1.5 mb-5">
                        <p className="text-sm text-gray-500 flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-[#ff385c] shrink-0" />
                          {formatDate(webinar.date)}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-[#ff385c] shrink-0" />
                          {formatTime(webinar.date)}
                        </p>
                      </div>
                    )}
                    <Button
                      className="w-full rounded-lg bg-[#ff385c] hover:bg-[#e0304f] text-white font-medium"
                      asChild
                    >
                      <Link href="/contact">
                        Register Now <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="upcoming-grid bg-[#f7f7f7] rounded-2xl text-center py-16 px-6">
              <div className="w-14 h-14 rounded-full bg-[#ff385c]/10 flex items-center justify-center mx-auto mb-5">
                <Calendar className="w-6 h-6 text-[#ff385c]" />
              </div>
              <h3 className="text-lg font-semibold text-[#222222] mb-2">No Upcoming Events</h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto">
                Check back soon — we regularly host free skincare education sessions. Follow us on social media to be notified first.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── PAST RECORDINGS ─── */}
      <section className="py-16 bg-[#f7f7f7]">
        <div className="container mx-auto px-6">
          <div className="mb-10">
            <p className="text-sm font-semibold text-[#ff385c] uppercase tracking-widest mb-2">On Demand</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#222222]">Past Recordings</h2>
          </div>

          {past.length > 0 ? (
            <div className="past-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map((webinar) => (
                <div
                  key={webinar.id}
                  className="past-card group rounded-2xl overflow-hidden shadow-[0_6px_16px_0_rgb(0_0_0/0.08)] hover:shadow-[0_12px_32px_0_rgb(0_0_0/0.14)] transition-all duration-300 bg-white"
                >
                  <div className="relative overflow-hidden aspect-video bg-[#f7f7f7]">
                    {webinar.thumbnail_url ? (
                      <img
                        src={webinar.thumbnail_url}
                        alt={webinar.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <PlayCircle className="w-10 h-10 text-gray-300" />
                      </div>
                    )}
                    {webinar.youtube_url && (
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center">
                        <PlayCircle className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-[#222222] text-lg mb-2">{webinar.title}</h3>
                    {webinar.date && (
                      <p className="text-sm text-gray-400 mb-4">{formatDate(webinar.date)}</p>
                    )}
                    {webinar.youtube_url ? (
                      <Button
                        variant="outline"
                        className="w-full rounded-lg border-gray-200 hover:border-[#ff385c] hover:text-[#ff385c] font-medium"
                        asChild
                      >
                        <a href={webinar.youtube_url} target="_blank" rel="noopener noreferrer">
                          <PlayCircle className="w-4 h-4 mr-2" /> Watch Recording
                        </a>
                      </Button>
                    ) : (
                      <p className="text-sm text-gray-400 italic">Recording coming soon</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="past-grid bg-white rounded-2xl text-center py-16 px-6 shadow-[0_2px_8px_0_rgb(0_0_0/0.06)]">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
                <PlayCircle className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-[#222222] mb-2">No Recordings Yet</h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto">
                Past webinar recordings will appear here once events have taken place.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 bg-[#ff385c] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-2xl" />
        </div>
        <div className="container mx-auto px-6 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            Want Personalized Skin Advice?
          </h2>
          <p className="text-white/85 mb-8 max-w-xl mx-auto leading-relaxed">
            Our webinars share general knowledge, but nothing beats a one-on-one consultation tailored to your skin.
          </p>
          <Button
            size="lg"
            className="rounded-lg bg-white text-[#ff385c] hover:bg-gray-100 font-semibold px-10 shadow-[0_4px_16px_0_rgb(0_0_0/0.15)]"
            asChild
          >
            <Link href="/contact">
              Book Your Free Consultation <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

    </PageTransitionWrapper>
  )
}
