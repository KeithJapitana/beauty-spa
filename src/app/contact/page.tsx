'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Phone, Mail, Clock, ArrowRight, ChevronLeft, ChevronRight, CalendarDays, CheckCircle2 } from 'lucide-react'

function FacebookIcon() {
  return <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
}
function InstagramIcon() {
  return <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
}
function TikTokIcon() {
  return <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.01a8.16 8.16 0 004.77 1.52V7.08a4.85 4.85 0 01-1-.39z" /></svg>
}
function YouTubeIcon() {
  return <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" /></svg>
}

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { PageTransitionWrapper } from '@/components/layout/page-transition-wrapper'
import { gsap } from '@/lib/gsap/register'
import { ScrollTrigger } from '@/lib/gsap/register'
import { useRecaptcha } from '@/hooks/useRecaptcha'

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

const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM',
  '3:00 PM', '4:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM',
]

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December']

function BookingCalendar({
  selectedDate, selectedTime, onDateChange, onTimeChange,
}: {
  selectedDate: Date | null
  selectedTime: string
  onDateChange: (d: Date) => void
  onTimeChange: (t: string) => void
}) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const firstDay = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  function isDisabled(day: number) {
    const d = new Date(viewYear, viewMonth, day)
    return d < today || d.getDay() === 0
  }
  function isSelected(day: number) {
    if (!selectedDate) return false
    return selectedDate.getFullYear() === viewYear &&
      selectedDate.getMonth() === viewMonth &&
      selectedDate.getDate() === day
  }
  function isToday(day: number) {
    return today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === day
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Calendar */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <button
            type="button"
            onClick={prevMonth}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#ff385c]/10 text-[#222222] hover:text-[#ff385c] transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-semibold text-[#222222]">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </span>
          <button
            type="button"
            onClick={nextMonth}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#ff385c]/10 text-[#222222] hover:text-[#ff385c] transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Day labels */}
        <div className="grid grid-cols-7 mb-2">
          {DAY_LABELS.map((d) => (
            <div key={d} className={`text-center text-xs font-semibold py-1 ${d === 'Sun' ? 'text-gray-300' : 'text-gray-400'}`}>
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} />
            const disabled = isDisabled(day)
            const selected = isSelected(day)
            const todayCell = isToday(day)
            return (
              <button
                key={day}
                type="button"
                disabled={disabled}
                onClick={() => onDateChange(new Date(viewYear, viewMonth, day))}
                className={`
                  aspect-square rounded-full text-sm font-medium flex items-center justify-center transition-all
                  ${disabled ? 'text-gray-200 cursor-not-allowed' : 'hover:bg-[#ff385c]/10 hover:text-[#ff385c] cursor-pointer'}
                  ${selected ? 'bg-[#ff385c] text-white hover:bg-[#ff385c] hover:text-white shadow-[0_4px_12px_0_rgb(255_56_92/0.35)]' : ''}
                  ${todayCell && !selected ? 'ring-2 ring-[#ff385c]/40 text-[#ff385c]' : ''}
                  ${!disabled && !selected ? 'text-[#222222]' : ''}
                `}
              >
                {day}
              </button>
            )
          })}
        </div>

        <p className="text-xs text-gray-400 mt-4 flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full ring-2 ring-[#ff385c]/40 inline-block" />
          Today &nbsp;·&nbsp; Sundays unavailable
        </p>
      </div>

      {/* Time slots */}
      <div>
        {selectedDate ? (
          <>
            <p className="font-semibold text-[#222222] mb-4">
              Available times for{' '}
              <span className="text-[#ff385c]">
                {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}
              </span>
            </p>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => onTimeChange(slot)}
                  className={`
                    py-2.5 rounded-xl text-sm font-medium border transition-all
                    ${selectedTime === slot
                      ? 'bg-[#ff385c] text-white border-[#ff385c] shadow-[0_4px_12px_0_rgb(255_56_92/0.3)]'
                      : 'border-gray-200 text-[#222222] hover:border-[#ff385c] hover:text-[#ff385c]'
                    }
                  `}
                >
                  {slot}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center py-10">
            <CalendarDays className="w-10 h-10 text-gray-200 mb-3" />
            <p className="text-gray-400 text-sm">Select a date to see available time slots</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ContactPage() {
  const router = useRouter()
  const formRef = useRef<HTMLDivElement>(null)
  const { getToken } = useRecaptcha()
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-hero', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
      gsap.fromTo('.calendar-section', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: '.calendar-section', start: 'top 80%' },
      })
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

  function handleDateChange(date: Date) {
    setSelectedDate(date)
    setSelectedTime('')
  }

  function handleTimeChange(time: string) {
    setSelectedTime(time)
    // Scroll to form after picking time
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 300)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    const recaptcha_token = await getToken('contact_form')

    const preferredSlot = selectedDate && selectedTime
      ? `\n\nPreferred appointment: ${selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at ${selectedTime}`
      : ''

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || null,
          service_interested: form.service || null,
          message: form.message + preferredSlot,
          recaptcha_token,
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

      {/* ─── BOOKING CALENDAR ─── */}
      <section className="calendar-section py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="mb-10 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <p className="text-sm font-semibold text-[#ff385c] uppercase tracking-widest">Pick a Schedule</p>
                <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">Optional</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#222222] mb-2">Choose Your Preferred Date & Time</h2>
              <p className="text-gray-500 text-sm">Select a slot and we'll do our best to accommodate you — or skip this and we'll coordinate a time together.</p>
            </div>
          </div>

          <Card className="border-0 shadow-[0_8px_24px_0_rgb(0_0_0/0.07)] rounded-2xl">
            <CardContent className="p-8 md:p-10">
              <BookingCalendar
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onDateChange={handleDateChange}
                onTimeChange={handleTimeChange}
              />

              {/* Skip link */}
              {!selectedDate && (
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="text-sm text-gray-400 hover:text-[#ff385c] transition-colors underline underline-offset-2"
                  >
                    Skip — I'll let you pick a time for me
                  </button>
                </div>
              )}

              {/* Selection summary */}
              {selectedDate && selectedTime && (
                <div className="mt-8 flex items-center gap-3 bg-[#ff385c]/5 border border-[#ff385c]/20 rounded-2xl px-5 py-4">
                  <CheckCircle2 className="w-5 h-5 text-[#ff385c] shrink-0" />
                  <p className="text-sm text-[#222222]">
                    You've selected{' '}
                    <strong>
                      {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </strong>{' '}
                    at <strong>{selectedTime}</strong>. Fill in the form below to confirm.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ─── FORM + INFO ─── */}
      <section className="contact-section py-16 bg-[#f7f7f7]" ref={formRef}>
        <div className="container mx-auto px-6">
          <div className="mb-10">
            <p className="text-sm font-semibold text-[#ff385c] uppercase tracking-widest mb-3">Send a Message</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#222222] mb-2">Tell Us What You Need</h2>
            <p className="text-gray-500 text-sm max-w-xl">Fill in the form and we'll get back to you within 2–4 hours. No hard sell — just an honest conversation about what's right for your skin.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Form */}
            <div className="contact-form-col lg:col-span-2">
              <Card className="border-0 shadow-[0_8px_24px_0_rgb(0_0_0/0.08)] rounded-2xl">
                <CardContent className="p-8 md:p-10">
                  <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
                    <h2 className="text-xl font-bold text-[#222222]">Send Your Inquiry</h2>
                    {selectedDate && selectedTime && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#ff385c]/10 text-[#ff385c] px-3 py-1.5 rounded-full">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {selectedTime}
                      </span>
                    )}
                  </div>
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
                { icon: <MapPin className="w-5 h-5 text-[#ff385c]" />, title: 'Address', content: 'Rizal St, Silay,\n6116 Negros Occidental' },
                { icon: <Phone className="w-5 h-5 text-[#ff385c]" />, title: 'Phone', content: '+63 930 104 1441' },
                { icon: <Mail className="w-5 h-5 text-[#ff385c]" />, title: 'Email', content: 'keithjapitana@gmail.com' },
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
      <section className="relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d482!2d122.9716612!3d10.7899898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aed6195a566109%3A0x17d4ee02d36df626!2sOnebel%20Nail%20%26%20Beauty%20Lounge!5e0!3m2!1sen!2sph!4v1713000000000!5m2!1sen!2sph"
          width="100%"
          height="450"
          style={{ border: 0, filter: 'sepia(0.4) hue-rotate(310deg) saturate(1.8) brightness(0.92)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Onebel Nail & Beauty Lounge location"
        />
        <div className="absolute inset-0 bg-[#ff385c]/10 pointer-events-none mix-blend-multiply" />
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
              <div key={i} className="step-card text-center group">
                <div className="w-14 h-14 rounded-full bg-[#ff385c] text-white font-bold text-lg flex items-center justify-center mx-auto mb-5 shadow-[0_4px_12px_0_rgb(255_56_92/0.3)]">
                  {s.step}
                </div>
                <h3 className="font-semibold text-[#222222] text-lg mb-2 group-hover:text-[#ff385c] transition-colors">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </PageTransitionWrapper>
  )
}
