'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
  {
    quote: "I've never felt so cared for at a spa. They took the time to explain everything and my skin has never looked better.",
    name: 'Maria S.',
    location: 'Quezon City',
    avatar: 'https://placehold.co/80x80/f2f2f2/6a6a6a?text=MS',
  },
  {
    quote: 'After 3 sessions of their hydrafacial, my coworkers started asking what I was doing differently. That says it all.',
    name: 'Angela R.',
    location: 'Makati',
    avatar: 'https://placehold.co/80x80/f2f2f2/6a6a6a?text=AR',
  },
  {
    quote: 'I was nervous about laser treatment but the team made me feel completely safe. The results exceeded my expectations.',
    name: 'Christine L.',
    location: 'Pasig',
    avatar: 'https://placehold.co/80x80/f2f2f2/6a6a6a?text=CL',
  },
  {
    quote: "What I love most is that they're honest. They told me which treatments I didn't need instead of upselling me.",
    name: 'Patricia M.',
    location: 'Mandaluyong',
    avatar: 'https://placehold.co/80x80/f2f2f2/6a6a6a?text=PM',
  },
  {
    quote: 'The whole experience feels premium without being intimidating. I always leave feeling beautiful and valued.',
    name: 'Joy T.',
    location: 'San Juan',
    avatar: 'https://placehold.co/80x80/f2f2f2/6a6a6a?text=JT',
  },
]

export function TestimonialCarousel() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length)
  const next = () => setActive((p) => (p + 1) % testimonials.length)

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {testimonials.map((t, i) => (
            <div key={i} className="w-full shrink-0 px-4">
              <Card className="border-0 shadow-[0_6px_24px_0_rgb(0_0_0/0.08)] rounded-2xl">
                <CardContent className="p-10 text-center">
                  <div className="flex gap-1 justify-center mb-6">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="text-[#ff385c] text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-2xl mx-auto italic">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                    <div className="text-left">
                      <p className="font-semibold text-[#222222]">{t.name}</p>
                      <p className="text-sm text-gray-400">{t.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mt-8">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#ff385c] hover:text-[#ff385c] transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? 'bg-[#ff385c] w-6' : 'bg-gray-200 w-2'
            }`}
          />
        ))}
        <button
          onClick={next}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#ff385c] hover:text-[#ff385c] transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
