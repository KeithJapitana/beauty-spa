'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PageTransitionWrapper } from '@/components/layout/page-transition-wrapper'
import { gsap } from '@/lib/gsap/register'
import { ScrollTrigger } from '@/lib/gsap/register'

const values = [
  {
    title: 'Honesty Over Sales',
    desc: "We'll tell you what you need — and what you don't. We'd rather earn your trust than make a quick sale.",
    icon: '✦',
  },
  {
    title: 'Care Beyond Skin Deep',
    desc: 'We pay attention to how you feel, not just how you look. Your comfort and confidence matter to us.',
    icon: '♡',
  },
  {
    title: 'Excellence as a Habit',
    desc: 'Our team trains continuously, our products are always genuine, and our standards never drop.',
    icon: '◈',
  },
]

const team = [
  {
    name: '[Founder/Owner Name]',
    role: 'Founder & Lead Aesthetician',
    img: 'https://placehold.co/300x400/f7f3f3/c9a0a0?text=Team+1',
    bio: 'With [X] years in the beauty industry, brings both expertise and warmth to every client interaction.',
  },
  {
    name: '[Team Member 2]',
    role: 'Senior Skin Therapist',
    img: 'https://placehold.co/300x400/f3f3f7/a0a0c9?text=Team+2',
    bio: 'Specializes in anti-aging treatments and is known for her gentle, reassuring approach.',
  },
  {
    name: '[Team Member 3]',
    role: 'Laser Specialist',
    img: 'https://placehold.co/300x400/f3f7f3/a0c9a0?text=Team+3',
    bio: 'Certified in advanced laser technologies with a focus on safe, comfortable treatments.',
  },
  {
    name: '[Team Member 4]',
    role: 'Client Care Coordinator',
    img: 'https://placehold.co/300x400/f7f5f3/c9b8a0?text=Team+4',
    bio: 'The friendly voice you hear when you call — makes sure every visit feels seamless and welcoming.',
  },
]

const certifications = [
  { img: 'https://placehold.co/150x80/f2f2f2/888888?text=Cert+1', label: 'Certification 1' },
  { img: 'https://placehold.co/150x80/f2f2f2/888888?text=Cert+2', label: 'Certification 2' },
  { img: 'https://placehold.co/150x80/f2f2f2/888888?text=Cert+3', label: 'Certification 3' },
  { img: 'https://placehold.co/150x80/f2f2f2/888888?text=Award+1', label: 'Award 1' },
]

export default function AboutPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-hero-text', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
      gsap.fromTo('.about-hero-img', { opacity: 0, scale: 1.03 }, { opacity: 1, scale: 1, duration: 0.8, delay: 0.2, ease: 'power2.out' })
      gsap.fromTo('.value-card', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: '.values-section', start: 'top 78%' },
      })
      gsap.fromTo('.team-card', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.team-section', start: 'top 78%' },
      })
      gsap.fromTo('.cert-item', { opacity: 0, scale: 0.9 }, {
        opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.certs-section', start: 'top 80%' },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <PageTransitionWrapper>

      {/* ─── HERO ─── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="about-hero-text">
              <p className="text-sm font-semibold text-[#ff385c] uppercase tracking-widest mb-4">Our Story</p>
              <h1 className="text-4xl md:text-5xl font-bold text-[#222222] leading-tight mb-6">
                More Than a Spa —{' '}
                <em className="not-italic text-[#ff385c]">A Place That Truly Cares</em>
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed">
                We started with a simple belief: everyone deserves to feel beautiful without feeling sold to.
              </p>
            </div>
            <div className="about-hero-img">
              <img
                src="https://placehold.co/1200x500/f7f3f3/c9a0a0?text=Team+Photo+%E2%80%94+Warm+Lighting"
                alt="Team photo in the spa, smiling, warm lighting"
                className="w-full rounded-2xl shadow-[0_12px_32px_0_rgb(0_0_0/0.10)] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── OUR STORY ─── */}
      <section className="py-24 bg-[#f7f7f7]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <img
                src="https://placehold.co/600x400/f7f3f3/c9a0a0?text=Founder+Photo"
                alt="Founder or early days photo"
                className="w-full rounded-2xl shadow-[0_8px_24px_0_rgb(0_0_0/0.10)] object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#ff385c] uppercase tracking-widest mb-4">How It All Started</p>
              <h2 className="text-3xl font-bold text-[#222222] mb-6">How It All Started</h2>
              <div className="space-y-4 text-gray-500 leading-relaxed">
                <p>
                  What began as a small treatment room in Silay City has grown into a trusted beauty destination — but our heart hasn't changed. We opened our doors [X years ago] with one promise: to treat every client like family.
                </p>
                <p>
                  We saw too many spas focused on quick transactions rather than real care. Clients would come in, get a treatment, and leave without anyone asking how they truly felt about their skin. We wanted to be different.
                </p>
                <p>
                  Today, we've served over 5,000 clients, but we still start every appointment the same way — by listening. Because great skin care isn't just about the right products or the latest technology. It's about understanding each person's unique story.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="values-section py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-[#ff385c] uppercase tracking-widest mb-3">Our Beliefs</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#222222]">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <Card key={i} className="value-card border-0 shadow-[0_6px_16px_0_rgb(0_0_0/0.08)] rounded-2xl hover:shadow-[0_12px_32px_0_rgb(0_0_0/0.12)] transition-all">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-2xl bg-[#ff385c]/10 flex items-center justify-center text-[#ff385c] text-xl font-bold mb-6">
                    {v.icon}
                  </div>
                  <h3 className="font-semibold text-[#222222] text-lg mb-3">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section className="team-section py-24 bg-[#f7f7f7]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-[#ff385c] uppercase tracking-widest mb-3">Our People</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#222222]">The People Behind Your Glow</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="team-card group text-center">
                <div className="rounded-2xl overflow-hidden mb-5 shadow-[0_4px_12px_0_rgb(0_0_0/0.08)]">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-semibold text-[#222222]">{member.name}</h3>
                <p className="text-[#ff385c] text-sm font-medium mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATIONS ─── */}
      <section className="certs-section py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[#ff385c] uppercase tracking-widest mb-3">Recognition</p>
            <h2 className="text-3xl font-bold text-[#222222]">Recognized for Excellence</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {certifications.map((cert, i) => (
              <div key={i} className="cert-item">
                <img src={cert.img} alt={cert.label} className="rounded-xl shadow-[0_2px_8px_0_rgb(0_0_0/0.08)]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 bg-[#ff385c]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">Come See the Difference Care Makes</h2>
          <Button size="lg" className="rounded-lg bg-white text-[#ff385c] hover:bg-gray-100 font-semibold px-10" asChild>
            <Link href="/contact">Book Your Free Consultation <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
      </section>

    </PageTransitionWrapper>
  )
}
