'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Award, ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageTransitionWrapper } from '@/components/layout/page-transition-wrapper'
import { gsap } from '@/lib/gsap/register'
import { ScrollTrigger } from '@/lib/gsap/register'
import { createClient } from '@/lib/supabase/client'

export default function PortfolioPage() {
  const [items, setItems] = useState<any[]>([])
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    const supabase = createClient()
    if (!supabase) return
    supabase
      .from('portfolio_items')
      .select('*')
      .order('display_order', { ascending: true })
      .then(({ data }) => setItems(data || []))
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.portfolio-hero-text', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
      gsap.fromTo('.filter-bar', { opacity: 0, y: 16 }, {
        opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: '.filter-bar', start: 'top 90%' },
      })
      gsap.fromTo('.portfolio-item', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.portfolio-grid', start: 'top 80%' },
      })
    })
    return () => ctx.revert()
  }, [items])

  const categories = ['All', ...Array.from(new Set(items.map((i) => i.category).filter(Boolean)))]
  const filtered = activeCategory === 'All' ? items : items.filter((i) => i.category === activeCategory)

  return (
    <PageTransitionWrapper>

      {/* ─── HERO ─── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl portfolio-hero-text">
            <p className="text-sm font-semibold text-[#ff385c] uppercase tracking-widest mb-4">Our Work</p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#222222] leading-tight mb-6">
              Results That Speak{' '}
              <em className="not-italic text-[#ff385c]">for Themselves</em>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed">
              A collection of transformations we're proud of — each one a story of care, patience, and real results.
            </p>
          </div>
        </div>
      </section>

      {/* ─── GRID ─── */}
      <section className="pb-24 bg-white">
        <div className="container mx-auto px-6">

          {/* Category filter */}
          {categories.length > 1 && (
            <div className="filter-bar flex flex-wrap gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-[#ff385c] text-white shadow-[0_4px_12px_0_rgb(255_56_92/0.3)]'
                      : 'bg-[#f7f7f7] text-[#222222] hover:bg-[#ff385c]/10 hover:text-[#ff385c]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {filtered.length > 0 ? (
            <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="portfolio-item group rounded-2xl overflow-hidden shadow-[0_6px_16px_0_rgb(0_0_0/0.08)] hover:shadow-[0_12px_32px_0_rgb(0_0_0/0.14)] transition-all duration-300 bg-white"
                >
                  <div className="overflow-hidden aspect-[4/3] bg-[#f7f7f7]">
                    {item.images?.[0] ? (
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-10 h-10 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    {item.category && (
                      <span className="text-xs font-semibold text-[#ff385c] uppercase tracking-wider">
                        {item.category}
                      </span>
                    )}
                    <h3 className="font-semibold text-[#222222] text-lg mt-1 mb-2">{item.title}</h3>
                    {item.description && (
                      <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                    )}
                    {item.awards?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.awards.map((award: string, i: number) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 text-xs bg-[#ff385c]/5 text-[#ff385c] px-3 py-1 rounded-full font-medium"
                          >
                            <Award className="w-3 h-3" /> {award}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="portfolio-grid text-center py-24">
              <div className="w-16 h-16 rounded-full bg-[#ff385c]/10 flex items-center justify-center mx-auto mb-6">
                <ImageIcon className="w-7 h-7 text-[#ff385c]" />
              </div>
              <h3 className="text-xl font-semibold text-[#222222] mb-3">Portfolio Coming Soon</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-8">
                We're curating our best work to share with you. In the meantime, book a free consultation and we'll show you what we can do for your skin.
              </p>
              <Button className="rounded-lg bg-[#ff385c] hover:bg-[#e0304f] text-white font-medium px-8" asChild>
                <Link href="/contact">
                  Book a Free Consultation <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">Ready to Start Your Story?</h2>
          <p className="text-white/85 mb-8 max-w-xl mx-auto leading-relaxed">
            Your transformation could be featured here next. Book a free consultation and let's talk about your skin goals.
          </p>
          <Button size="lg" className="rounded-lg bg-white text-[#ff385c] hover:bg-gray-100 font-semibold px-10 shadow-[0_4px_16px_0_rgb(0_0_0/0.15)]" asChild>
            <Link href="/contact">
              Book Your Free Consultation <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

    </PageTransitionWrapper>
  )
}
