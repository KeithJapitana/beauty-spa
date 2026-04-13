'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageTransitionWrapper } from '@/components/layout/page-transition-wrapper'
import { gsap } from '@/lib/gsap/register'
import { ConversionTracker } from '@/components/tracking/conversion'

export default function ThankYouPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ty-check', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' })
      gsap.fromTo('.ty-text', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.35, ease: 'power2.out' })
      gsap.fromTo('.ty-actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.55, ease: 'power2.out' })
    })
    return () => ctx.revert()
  }, [])

  return (
    <PageTransitionWrapper>
      <ConversionTracker />
      <section className="min-h-[80vh] flex items-center justify-center py-24 bg-white">
        <div className="container mx-auto px-6 text-center max-w-xl">

          {/* Animated checkmark */}
          <div className="ty-check w-24 h-24 rounded-full bg-[#ff385c]/10 flex items-center justify-center mx-auto mb-8">
            <div className="w-16 h-16 rounded-full bg-[#ff385c] flex items-center justify-center shadow-[0_8px_24px_0_rgb(255_56_92/0.35)]">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <div className="ty-text">
            <h1 className="text-3xl md:text-4xl font-bold text-[#222222] mb-4">
              Thank You, We Received Your Inquiry! 💛
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-3">
              Our team will review your message and get back to you within 2–4 hours during business hours.
            </p>
            <p className="text-gray-400 text-sm mb-10">No bots, no auto-replies — a real person will reach out to you personally.</p>
          </div>

          <div className="ty-actions flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="rounded-lg bg-[#ff385c] hover:bg-[#e0304f] text-white font-semibold px-8" asChild>
              <Link href="/blog">
                Read Our Articles <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" className="rounded-lg border-gray-200 hover:border-[#ff385c] hover:text-[#ff385c] font-semibold px-8" asChild>
              <Link href="/services">Explore Treatments</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageTransitionWrapper>
  )
}
