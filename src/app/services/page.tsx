'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageTransitionWrapper } from '@/components/layout/page-transition-wrapper'
import { gsap } from '@/lib/gsap/register'
import { useState } from 'react'
import heroImage from '@/lib/assets/hero_image_1x.webp'
import diamondPeelImg from '@/lib/assets/diamond_peel_1x.webp'
import laserHairImg from '@/lib/assets/laser_hair_removal_1x.webp'
import antiAgingImg from '@/lib/assets/anti_aging_facial_1x.webp'
import acneTreatmentImg from '@/lib/assets/acne_treatment_1x.webp'
import bodyContouringImg from '@/lib/assets/body_contouring_1x.webp'

const services = [
  {
    id: 'hydrafacial',
    title: 'Hydrafacial',
    duration: '60 minutes',
    price: 'Starting at ₱X,XXX',
    img: heroImage,
    desc: 'Our signature hydrafacial uses a multi-step process to deeply cleanse, extract impurities, and flood your skin with hydration. It\'s suitable for all skin types and there\'s absolutely no downtime — you\'ll walk out glowing.',
    expect: 'A gentle suction device cleanses each pore while simultaneously delivering nourishing serums. Most clients find it relaxing, almost like a facial massage.',
    bestFor: 'Dull skin, dehydration, clogged pores, first-time spa visitors',
    flip: false,
  },
  {
    id: 'diamond-peel',
    title: 'Diamond Peel Microdermabrasion',
    duration: '45 minutes',
    price: 'Starting at ₱X,XXX',
    img: diamondPeelImg,
    desc: 'A gentle yet effective exfoliation treatment that uses fine diamond-tipped wands to remove dead skin cells, revealing the smoother, brighter skin underneath.',
    expect: 'A mild scratching sensation as the diamond tip sweeps across your skin. No pain, no redness — just immediate improvement in texture.',
    bestFor: 'Uneven skin tone, rough texture, mild scarring, sun damage',
    flip: true,
  },
  {
    id: 'laser-hair',
    title: 'Laser Hair Removal',
    duration: '15–60 minutes (depends on area)',
    price: 'Starting at ₱X,XXX per session',
    img: laserHairImg,
    desc: 'Our advanced diode laser targets hair follicles with precision, reducing hair growth gradually over multiple sessions. It\'s fast, effective, and far more comfortable than older laser systems.',
    expect: 'A warm snapping sensation — most clients compare it to a rubber band flick. We use cooling technology to keep you comfortable throughout.',
    bestFor: 'Unwanted body or facial hair, ingrown hairs, long-term hair reduction',
    flip: false,
  },
  {
    id: 'anti-aging',
    title: 'Anti-Aging Rejuvenation Facial',
    duration: '75 minutes',
    price: 'Starting at ₱X,XXX',
    img: antiAgingImg,
    desc: 'A luxurious facial that combines deep cleansing with collagen-boosting serums, LED light therapy, and targeted massage techniques to restore firmness and reduce the appearance of fine lines.',
    expect: 'A multi-step pampering session. You\'ll feel deeply relaxed, and the visible plumping effect is often noticeable right after your first session.',
    bestFor: 'Fine lines, loss of firmness, dull or tired-looking skin, self-care ritual',
    flip: true,
  },
  {
    id: 'acne',
    title: 'Acne Treatment Program',
    duration: '45–60 minutes per session',
    price: 'Starting at ₱X,XXX per session',
    img: acneTreatmentImg,
    desc: 'A targeted treatment plan that addresses active breakouts, reduces inflammation, and works to prevent future acne through a combination of professional-grade peels, blue light therapy, and customized home care guidance.',
    expect: 'We start with a thorough skin analysis to understand your acne triggers. Each session is adjusted based on how your skin is responding.',
    bestFor: 'Active acne, recurring breakouts, acne scarring, oily skin concerns',
    flip: false,
  },
  {
    id: 'body-contouring',
    title: 'Non-Invasive Body Contouring',
    duration: '45–60 minutes',
    price: 'Starting at ₱X,XXX per session',
    img: bodyContouringImg,
    desc: 'Using advanced radiofrequency and cavitation technology, this treatment targets stubborn fat deposits and tightens skin without surgery. It\'s a comfortable, relaxing experience with visible results over a series of sessions.',
    expect: 'A warm, massage-like sensation as the device works on targeted areas. Most clients find it so relaxing they nearly fall asleep.',
    bestFor: 'Stubborn fat areas, post-weight-loss tightening, body confidence',
    flip: true,
  },
]

const faqs = [
  {
    q: 'How do I know which treatment is right for me?',
    a: "That's exactly what our free consultation is for. We'll assess your skin, discuss your goals, and recommend a personalized treatment plan — with zero pressure to commit.",
  },
  {
    q: 'Are your products genuine?',
    a: "Absolutely. We source directly from authorized distributors and manufacturers. We're happy to show you product authenticity certificates upon request.",
  },
  {
    q: 'Is there any downtime after treatments?',
    a: "Most of our treatments have zero downtime. For more intensive procedures, we'll give you clear aftercare instructions and check in with you afterward.",
  },
  {
    q: 'How many sessions will I need?',
    a: "It depends on the treatment and your skin goals. During your consultation, we'll give you an honest estimate — we'd rather set realistic expectations than overpromise.",
  },
  {
    q: "What if I'm not happy with the results?",
    a: "Your satisfaction matters deeply to us. If you're not seeing the results we discussed, we'll reassess and adjust your treatment plan at no extra charge.",
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="font-semibold text-[#222222]">{q}</span>
        <ChevronDown className={`w-5 h-5 text-[#ff385c] shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <p className="pb-5 text-gray-500 leading-relaxed text-sm">{a}</p>
      )}
    </div>
  )
}

export default function ServicesPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.services-hero-text', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
      gsap.fromTo('.service-row', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: '.services-list', start: 'top 80%' },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <PageTransitionWrapper>

      {/* ─── HERO ─── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl services-hero-text">
            <p className="text-sm font-semibold text-[#ff385c] uppercase tracking-widest mb-4">What We Offer</p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#222222] leading-tight mb-6">
              Treatments That Start With Understanding You
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed">
              We don't believe in one-size-fits-all. Every treatment plan is tailored to your skin's unique needs.
            </p>
          </div>
          <div className="mt-6">
            <Image
              src={heroImage}
              alt="Spa treatment room, clean and inviting"
              width={1200}
              height={400}
              className="w-full rounded-2xl shadow-[0_8px_24px_0_rgb(0_0_0/0.08)] object-cover"
            />
          </div>
        </div>
      </section>

      {/* ─── SERVICES LIST ─── */}
      <section className="services-list py-8 bg-white">
        <div className="container mx-auto px-6 space-y-24">
          {services.map((s, i) => (
            <div key={s.id} id={s.id} className="service-row scroll-mt-28">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center ${s.flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                <div>
                  <Image src={s.img} alt={s.title} width={600} height={400} className="w-full rounded-2xl shadow-[0_8px_24px_0_rgb(0_0_0/0.10)] object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-semibold text-[#ff385c] uppercase tracking-widest">Treatment {String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#222222] mb-4">{s.title}</h2>
                  <div className="flex items-center gap-5 mb-6">
                    <span className="flex items-center gap-1.5 text-sm text-gray-500">
                      <Clock className="w-4 h-4 text-[#ff385c]" /> {s.duration}
                    </span>
                    <span className="text-sm font-semibold text-[#ff385c]">{s.price}</span>
                  </div>
                  <p className="text-gray-500 leading-relaxed mb-6">{s.desc}</p>
                  <div className="space-y-4 mb-8">
                    <div className="bg-[#f7f7f7] rounded-xl p-4">
                      <p className="text-xs font-semibold text-[#222222] uppercase tracking-wider mb-1.5">What to Expect</p>
                      <p className="text-sm text-gray-500">{s.expect}</p>
                    </div>
                    <div className="bg-[#ff385c]/5 rounded-xl p-4">
                      <p className="text-xs font-semibold text-[#ff385c] uppercase tracking-wider mb-1.5">Best For</p>
                      <p className="text-sm text-gray-500">{s.bestFor}</p>
                    </div>
                  </div>
                  <Button className="rounded-lg bg-[#ff385c] hover:bg-[#e0304f] text-white font-medium px-8" asChild>
                    <Link href="/contact">Book This Treatment <ArrowRight className="ml-2 w-4 h-4" /></Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-24 bg-[#f7f7f7]">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-[#ff385c] uppercase tracking-widest mb-3">FAQ</p>
              <h2 className="text-3xl font-bold text-[#222222]">Common Questions</h2>
            </div>
            <div className="bg-white rounded-2xl shadow-[0_6px_16px_0_rgb(0_0_0/0.06)] p-8">
              {faqs.map((faq, i) => (
                <FaqItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 bg-[#ff385c]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Not Sure Where to Start?</h2>
          <p className="text-white/85 text-lg max-w-xl mx-auto mb-8">
            Book a free consultation and we'll help you figure out the perfect treatment for your skin — no pressure, no hard sell.
          </p>
          <Button size="lg" className="rounded-lg bg-white text-[#ff385c] hover:bg-gray-100 font-semibold px-10" asChild>
            <Link href="/contact">Book Your Free Consultation <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
      </section>

    </PageTransitionWrapper>
  )
}
