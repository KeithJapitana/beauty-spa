'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react'

function FacebookIcon() {
  return <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
}

function InstagramIcon() {
  return <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
}
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { PageTransitionWrapper } from '@/components/layout/page-transition-wrapper'
import { gsap } from '@/lib/gsap/register'

const serviceOptions = [
  'Not sure yet — I need guidance',
  'Hydrafacial',
  'Diamond Peel',
  'Laser Hair Removal',
  'Anti-Aging Facial',
  'Acne Treatment',
  'Body Contouring',
  'Other',
]

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.01a8.16 8.16 0 004.77 1.52V7.08a4.85 4.85 0 01-1-.39z" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
    </svg>
  )
}

export default function ContactPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-hero', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
      gsap.fromTo('.contact-form-col', { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, duration: 0.6, delay: 0.2, ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-section', start: 'top 80%' },
      })
      gsap.fromTo('.contact-info-col', { opacity: 0, x: 30 }, {
        opacity: 1, x: 0, duration: 0.6, delay: 0.3, ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-section', start: 'top 80%' },
      })
      gsap.fromTo('.step-card', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: '.steps-section', start: 'top 80%' },
      })
    })
    return () => ctx.revert()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || null,
          service_interested: form.service || null,
          message: form.message,
        }),
      })
      if (!res.ok) throw new Error()
      router.push('/thank-you')
    } catch {
      toast.error('Failed to send. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const f = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }))

  return (
    <PageTransitionWrapper>

      {/* ─── HERO ─── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="contact-hero max-w-2xl">
            <p className="text-sm font-semibold text-[#ff385c] uppercase tracking-widest mb-4">Get in Touch</p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#222222] leading-tight mb-5">
              We'd Love to Hear From You
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed">
              Whether you have a question, want to book a consultation, or just want to say hello — we're here for you.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FORM + INFO ─── */}
      <section className="contact-section py-16 bg-[#f7f7f7]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Form */}
            <div className="contact-form-col lg:col-span-2">
              <Card className="border-0 shadow-[0_8px_24px_0_rgb(0_0_0/0.08)] rounded-2xl">
                <CardContent className="p-8 md:p-10">
                  <h2 className="text-xl font-bold text-[#222222] mb-8">Send Your Inquiry</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name <span className="text-[#ff385c]">*</span></Label>
                        <Input id="name" value={form.name} onChange={f('name')} className="rounded-lg border-gray-200" required placeholder="Your full name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address <span className="text-[#ff385c]">*</span></Label>
                        <Input id="email" type="email" value={form.email} onChange={f('email')} className="rounded-lg border-gray-200" required placeholder="you@email.com" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number <span className="text-gray-400 font-normal text-xs">(optional)</span></Label>
                        <Input id="phone" type="tel" value={form.phone} onChange={f('phone')} className="rounded-lg border-gray-200" placeholder="+63 XXX XXX XXXX" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service">Service Interested In</Label>
                        <select
                          id="service"
                          value={form.service}
                          onChange={f('service')}
                          className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff385c]/30 text-[#222222]"
                        >
                          <option value="">Select a service...</option>
                          {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message <span className="text-[#ff385c]">*</span></Label>
                      <Textarea
                        id="message"
                        value={form.message}
                        onChange={f('message')}
                        className="rounded-lg border-gray-200 resize-none min-h-[140px]"
                        required
                        placeholder="Tell us about your skin goals or any questions you have..."
                      />
                    </div>
                    <div>
                      <Button
                        type="submit"
                        size="lg"
                        className="rounded-lg bg-[#ff385c] hover:bg-[#e0304f] text-white font-semibold w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Your Inquiry'}
                        {!isSubmitting && <ArrowRight className="ml-2 w-4 h-4" />}
                      </Button>
                      <p className="text-xs text-gray-400 text-center mt-3">
                        We typically respond within 2–4 hours during business hours.
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Info */}
            <div className="contact-info-col space-y-5">
              {[
                { icon: <MapPin className="w-5 h-5 text-[#ff385c]" />, title: 'Address', content: '[Placeholder Address],\nQuezon City, Metro Manila' },
                { icon: <Phone className="w-5 h-5 text-[#ff385c]" />, title: 'Phone', content: '+63 XXX XXX XXXX' },
                { icon: <Mail className="w-5 h-5 text-[#ff385c]" />, title: 'Email', content: 'hello@yourspa.com' },
                { icon: <Clock className="w-5 h-5 text-[#ff385c]" />, title: 'Hours', content: 'Monday – Saturday\n9:00 AM – 8:00 PM\nSunday: Closed' },
              ].map((item, i) => (
                <Card key={i} className="border-0 shadow-[0_4px_12px_0_rgb(0_0_0/0.06)] rounded-2xl">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#ff385c]/10 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-[#222222] text-sm mb-1">{item.title}</p>
                      <p className="text-gray-500 text-sm whitespace-pre-line">{item.content}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Card className="border-0 shadow-[0_4px_12px_0_rgb(0_0_0/0.06)] rounded-2xl">
                <CardContent className="p-5">
                  <p className="font-semibold text-[#222222] text-sm mb-4">Follow Us</p>
                  <div className="flex gap-2">
                    {[
                      { icon: <FacebookIcon />, label: 'Facebook' },
                      { icon: <InstagramIcon />, label: 'Instagram' },
                      { icon: <TikTokIcon />, label: 'TikTok' },
                      { icon: <YouTubeIcon />, label: 'YouTube' },
                    ].map((s) => (
                      <a key={s.label} href="#" aria-label={s.label}
                        className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#ff385c] hover:border-[#ff385c] transition-all">
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MAP ─── */}
      <section>
        <img
          src="https://placehold.co/1200x400/e8e8e8/888888?text=Google+Maps+%E2%80%94+Quezon+City"
          alt="Map location"
          className="w-full h-[400px] object-cover"
        />
      </section>

      {/* ─── STEPS ─── */}
      <section className="steps-section py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-[#ff385c] uppercase tracking-widest mb-3">What's Next</p>
            <h2 className="text-3xl font-bold text-[#222222]">What Happens After You Reach Out</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', title: "We'll Review Your Inquiry", desc: "Our team reads every message personally — no bots, no auto-replies." },
              { step: '02', title: "We'll Reach Out Within Hours", desc: "Expect a call or message from us within 2–4 hours during business hours." },
              { step: '03', title: "We'll Listen and Suggest", desc: "Whether in person or over the phone, we'll take the time to understand what you need before recommending anything." },
            ].map((s, i) => (
              <div key={i} className="step-card text-center">
                <div className="w-14 h-14 rounded-full bg-[#ff385c] text-white font-bold text-lg flex items-center justify-center mx-auto mb-5 shadow-[0_4px_12px_0_rgb(255_56_92/0.3)]">
                  {s.step}
                </div>
                <h3 className="font-semibold text-[#222222] mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </PageTransitionWrapper>
  )
}
