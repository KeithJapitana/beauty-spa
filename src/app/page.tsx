'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, MapPin, Phone, Mail, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PageTransitionWrapper } from '@/components/layout/page-transition-wrapper'
import { gsap } from '@/lib/gsap/register'
import { ScrollTrigger } from '@/lib/gsap/register'
import { createClient } from '@/lib/supabase/client'
import { TestimonialCarousel } from '@/components/home/testimonial-carousel'

const services = [
  {
    title: 'Hydrafacial',
    desc: 'Deep cleansing and hydration that leaves your skin glowing from the inside out.',
    img: 'https://placehold.co/400x300/f7f3f3/c9a0a0?text=Hydrafacial',
    href: '/services#hydrafacial',
  },
  {
    title: 'Diamond Peel',
    desc: 'Gentle exfoliation for smoother, brighter skin with zero downtime.',
    img: 'https://placehold.co/400x300/f3f3f7/a0a0c9?text=Diamond+Peel',
    href: '/services#diamond-peel',
  },
  {
    title: 'Laser Hair Removal',
    desc: 'Long-lasting smoothness with our advanced, comfortable laser technology.',
    img: 'https://placehold.co/400x300/f3f7f3/a0c9a0?text=Laser+Hair',
    href: '/services#laser-hair',
  },
  {
    title: 'Anti-Aging Facial',
    desc: 'Turn back the clock with treatments that restore firmness and youthful radiance.',
    img: 'https://placehold.co/400x300/f7f5f3/c9b8a0?text=Anti-Aging',
    href: '/services#anti-aging',
  },
  {
    title: 'Acne Treatment',
    desc: 'Targeted solutions that calm inflammation and prevent future breakouts.',
    img: 'https://placehold.co/400x300/f7f3f5/c9a0b8?text=Acne+Treatment',
    href: '/services#acne',
  },
  {
    title: 'Body Contouring',
    desc: 'Sculpt and refine your silhouette with our non-invasive body treatments.',
    img: 'https://placehold.co/400x300/f3f7f7/a0c9c9?text=Body+Contouring',
    href: '/services#body-contouring',
  },
]

const whyUs = [
  {
    title: 'We Listen First',
    desc: 'Every treatment begins with a conversation. We want to understand your goals, concerns, and skin history before we recommend anything.',
  },
  {
    title: 'Science-Backed Methods',
    desc: 'Our protocols combine clinically proven techniques with the latest in dermatological research.',
  },
  {
    title: 'Genuine Products Only',
    desc: 'We never cut corners. Every product we use is authentic, certified, and sourced directly from manufacturers.',
  },
  {
    title: 'Results You Can See',
    desc: 'We track your progress and adjust treatments to make sure you see real, lasting improvement.',
  },
]

const beforeAfter = [
  { img: 'https://placehold.co/600x400/f2f2f2/6a6a6a?text=Before+%26+After+%231', label: 'Acne treatment — 6 sessions' },
  { img: 'https://placehold.co/600x400/f2f2f2/6a6a6a?text=Before+%26+After+%232', label: 'Anti-aging facial — 4 sessions' },
  { img: 'https://placehold.co/600x400/f2f2f2/6a6a6a?text=Before+%26+After+%233', label: 'Diamond peel — 3 sessions' },
]

const trustItems = [
  { number: '5,000+', label: 'Happy Clients' },
  { number: '8+', label: 'Years of Excellence' },
  { number: '100%', label: 'Genuine Products' },
  { number: 'Licensed', label: 'Certified Professionals' },
]

export default function HomePage() {
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const supabase = createClient()
    if (!supabase) return
    supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, cover_image_url, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(3)
      .then(({ data }) => setBlogPosts(data || []))
  }, [])

  // Hero animation
  useEffect(() => {
    if (!heroRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      gsap.fromTo('.hero-heading', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.15, ease: 'power2.out' })
      gsap.fromTo('.hero-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: 'power2.out' })
      gsap.fromTo('.hero-ctas', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.45, ease: 'power2.out' })
      gsap.fromTo('.hero-image', { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.9, delay: 0.2, ease: 'power2.out' })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  // Scroll-triggered animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Trust bar count
      gsap.fromTo('.trust-item', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.trust-section', start: 'top 80%' },
      })
      // Services cards
      gsap.fromTo('.service-card', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.services-section', start: 'top 75%' },
      })
      // Why us cards slide from left
      gsap.fromTo('.why-card', { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.why-section', start: 'top 75%' },
      })
      gsap.fromTo('.why-image', { opacity: 0, x: 30 }, {
        opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.why-section', start: 'top 75%' },
      })
      // Before after
      gsap.fromTo('.ba-card', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.55, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: '.ba-section', start: 'top 78%' },
      })
      // Blog
      gsap.fromTo('.blog-card', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.55, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: '.blog-section', start: 'top 78%' },
      })
    })
    return () => ctx.revert()
  }, [blogPosts])

  return (
    <PageTransitionWrapper className="flex-1">

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-white">
        <div className="container mx-auto px-6 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="hero-label inline-flex items-center gap-2 text-sm font-semibold text-[#ff385c] uppercase tracking-widest mb-6">
                <span className="w-8 h-px bg-[#ff385c]" />
                Welcome to Lumière Beauty Spa
              </p>
              <h1 className="hero-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[#222222] leading-[1.1] mb-6">
                Your Skin Deserves More Than a Treatment —{' '}
                <em className="not-italic text-[#ff385c]">It Deserves Care</em>
              </h1>
              <p className="hero-sub text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
                We blend advanced beauty science with heartfelt attention to help you look radiant and feel truly cared for.
              </p>
              <div className="hero-ctas flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-lg bg-[#ff385c] hover:bg-[#e0304f] text-white font-semibold px-8" asChild>
                  <Link href="/contact">Book Your Free Consultation <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-lg border-gray-200 text-[#222222] font-semibold px-8 hover:border-[#ff385c] hover:text-[#ff385c]" asChild>
                  <Link href="/services">Explore Our Services</Link>
                </Button>
              </div>
            </div>
            <div className="hero-image relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#ff385c]/8 to-transparent rounded-3xl" />
              <img
                src="https://placehold.co/720x580/f7f3f3/c9a0a0?text=Hero+Image+%E2%80%94+Warm+Spa+Interior"
                alt="A warm, inviting spa interior with soft lighting"
                className="relative w-full rounded-2xl shadow-[0_24px_48px_0_rgb(0_0_0/0.12)] object-cover"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-[0_8px_24px_0_rgb(0_0_0/0.12)] px-5 py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ff385c]/10 flex items-center justify-center text-lg">✦</div>
                <div>
                  <p className="text-xs text-gray-400">Trusted by</p>
                  <p className="font-bold text-[#222222]">5,000+ Clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="trust-section bg-[#ff385c] py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {trustItems.map((item, i) => (
              <div key={i} className="trust-item text-center text-white">
                <p className="text-3xl md:text-4xl font-bold mb-1">{item.number}</p>
                <p className="text-white/80 text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES PREVIEW ─── */}
      <section className="services-section py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-[#ff385c] uppercase tracking-widest mb-3">Our Treatments</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#222222] mb-4">Treatments Designed Around You</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Every service we offer starts with understanding what your skin truly needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <Link key={i} href={s.href} className="service-card group">
                <Card className="border-0 shadow-[0_6px_16px_0_rgb(0_0_0/0.08),_0_1px_4px_0_rgb(0_0_0/0.05)] hover:shadow-[0_12px_32px_0_rgb(0_0_0/0.14)] transition-all duration-300 rounded-2xl overflow-hidden h-full">
                  <div className="overflow-hidden">
                    <img src={s.img} alt={s.title} className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-[#222222] text-lg mb-2 group-hover:text-[#ff385c] transition-colors">{s.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                    <span className="text-[#ff385c] text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" className="rounded-lg border-gray-200 hover:border-[#ff385c] hover:text-[#ff385c] font-medium px-8" asChild>
              <Link href="/services">View All Services <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="why-section py-24 bg-[#f7f7f7]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-[#ff385c] uppercase tracking-widest mb-3">Why Us</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#222222] mb-10">Why Thousands Trust Us With Their Skin</h2>
              <div className="space-y-5">
                {whyUs.map((item, i) => (
                  <div key={i} className="why-card bg-white rounded-2xl p-6 shadow-[0_2px_8px_0_rgb(0_0_0/0.06)]">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#ff385c]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[#ff385c] text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#222222] mb-1.5">{item.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="why-image">
              <img
                src="https://placehold.co/600x800/f7f3f3/c9a0a0?text=Why+Choose+Us"
                alt="Close-up of a client receiving a facial treatment, looking relaxed"
                className="w-full rounded-2xl shadow-[0_16px_40px_0_rgb(0_0_0/0.12)] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-[#ff385c] uppercase tracking-widest mb-3">Client Stories</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#222222]">What Our Clients Say</h2>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* ─── BEFORE & AFTER ─── */}
      <section className="ba-section py-24 bg-[#f7f7f7]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-[#ff385c] uppercase tracking-widest mb-3">Results</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#222222] mb-4">Real Results, Real People</h2>
            <p className="text-gray-500 max-w-xl mx-auto">With their permission, here are some of the transformations we're proud of.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {beforeAfter.map((item, i) => (
              <div key={i} className="ba-card rounded-2xl overflow-hidden shadow-[0_6px_16px_0_rgb(0_0_0/0.08)]">
                <img src={item.img} alt={item.label} className="w-full aspect-[3/2] object-cover" />
                <div className="bg-white px-5 py-4">
                  <p className="text-sm font-medium text-[#222222]">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button variant="outline" className="rounded-lg border-gray-200 hover:border-[#ff385c] hover:text-[#ff385c] font-medium px-8" asChild>
              <Link href="/portfolio">See More Results in Our Portfolio <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-24 bg-[#ff385c] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-2xl" />
        </div>
        <div className="container mx-auto px-6 text-center relative">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5">
            Ready to Start Your Skin Journey?
          </h2>
          <p className="text-white/85 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Book a free consultation and let's talk about what your skin needs. No pressure, no hard sell — just honest advice.
          </p>
          <Button size="lg" className="rounded-lg bg-white text-[#ff385c] hover:bg-gray-100 font-semibold px-10 shadow-[0_4px_16px_0_rgb(0_0_0/0.2)]" asChild>
            <Link href="/contact">Book Your Free Consultation <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
      </section>

      {/* ─── BLOG PREVIEW ─── */}
      <section className="blog-section py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
            <div>
              <p className="text-sm font-semibold text-[#ff385c] uppercase tracking-widest mb-3">Care Journal</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#222222]">From Our Care Journal</h2>
              <p className="text-gray-500 mt-3">Tips, insights, and stories to help you feel confident in your skin.</p>
            </div>
            <Button variant="outline" className="rounded-lg border-gray-200 hover:border-[#ff385c] hover:text-[#ff385c] font-medium shrink-0" asChild>
              <Link href="/blog">Read More Articles <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
          {blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="blog-card group">
                  <Card className="border-0 shadow-[0_6px_16px_0_rgb(0_0_0/0.08)] hover:shadow-[0_12px_32px_0_rgb(0_0_0/0.14)] transition-all duration-300 rounded-2xl overflow-hidden h-full">
                    <div className="overflow-hidden">
                      {post.cover_image_url ? (
                        <img src={post.cover_image_url} alt={post.title} className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full aspect-video bg-gradient-to-br from-rose-50 to-pink-100" />
                      )}
                    </div>
                    <CardContent className="p-6">
                      {post.published_at && (
                        <p className="text-xs text-gray-400 mb-3">
                          {new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                      )}
                      <h3 className="font-semibold text-[#222222] mb-2 line-clamp-2 group-hover:text-[#ff385c] transition-colors">{post.title}</h3>
                      {post.excerpt && <p className="text-gray-500 text-sm line-clamp-2">{post.excerpt}</p>}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="blog-card rounded-2xl overflow-hidden shadow-[0_6px_16px_0_rgb(0_0_0/0.08)]">
                  <div className="aspect-video bg-gray-100" />
                  <div className="bg-white p-6">
                    <div className="h-3 bg-gray-100 rounded mb-3 w-24" />
                    <div className="h-4 bg-gray-100 rounded mb-2" />
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── LOCATION ─── */}
      <section className="py-24 bg-[#f7f7f7]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-[0_8px_24px_0_rgb(0_0_0/0.10)]">
              <img
                src="https://placehold.co/600x400/e8e8e8/888888?text=Map+Embed+%E2%80%94+Quezon+City"
                alt="Location map"
                className="w-full aspect-[3/2] object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#ff385c] uppercase tracking-widest mb-3">Find Us</p>
              <h2 className="text-3xl font-bold text-[#222222] mb-8">Visit Us</h2>
              <ul className="space-y-5">
                {[
                  { icon: <MapPin className="w-5 h-5 text-[#ff385c]" />, text: '[Placeholder Address], Quezon City, Metro Manila' },
                  { icon: <Phone className="w-5 h-5 text-[#ff385c]" />, text: '+63 XXX XXX XXXX' },
                  { icon: <Mail className="w-5 h-5 text-[#ff385c]" />, text: 'hello@yourspa.com' },
                  { icon: <Clock className="w-5 h-5 text-[#ff385c]" />, text: 'Mon–Sat, 9:00 AM – 8:00 PM' },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#ff385c]/10 flex items-center justify-center shrink-0">{item.icon}</div>
                    <span className="text-gray-600">{item.text}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8 rounded-lg bg-[#ff385c] hover:bg-[#e0304f] text-white font-medium px-8" asChild>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                  Get Directions <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </PageTransitionWrapper>
  )
}
