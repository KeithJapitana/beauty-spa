import { PageTransitionWrapper } from '@/components/layout/page-transition-wrapper'
import { Sparkles, Heart, Award, Flower } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const services = [
  {
    id: 'facials',
    icon: Sparkles,
    title: 'Luxury Facials',
    description: 'Customized facials using premium products to address your unique skin concerns.',
    treatments: ['HydraFacial Elite', 'Anti-Aging Facial', 'Acne Treatment', 'Sensitive Skin Care'],
  },
  {
    id: 'massages',
    icon: Heart,
    title: 'Therapeutic Massages',
    description: 'Release tension and melt away stress with our expert massage therapists.',
    treatments: ['Swedish Massage', 'Deep Tissue', 'Hot Stone Therapy', 'Aromatherapy'],
  },
  {
    id: 'body-treatments',
    icon: Award,
    title: 'Body Treatments',
    description: 'Detoxify and nourish your body with our premium wraps and scrubs.',
    treatments: ['Body Wrap', 'Salt Scrub', 'Cellulite Treatment', 'Body Contouring'],
  },
  {
    id: 'skincare',
    icon: Flower,
    title: 'Skincare Products',
    description: 'Take home our professional-grade products for daily maintenance.',
    treatments: ['Cleansers', 'Moisturizers', 'Serums', 'Sun Protection'],
  },
]

export default function ServicesPage() {
  return (
    <PageTransitionWrapper>
      <section className="py-24 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-600">
              Discover our comprehensive range of spa treatments designed to rejuvenate
              your body, mind, and spirit.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="space-y-16">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <div key={service.id} id={service.id} className="scroll-mt-24">
                  <div className="flex flex-col lg:flex-row gap-8 items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-accent" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                          {service.title}
                        </h2>
                      </div>
                      <p className="text-lg text-gray-600 mb-6">
                        {service.description}
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.treatments.map((treatment) => (
                          <li key={treatment} className="flex items-center gap-2 text-gray-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                            {treatment}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Card className="w-full lg:w-80 border-0 shadow-card-xl">
                      <CardContent className="p-8 text-center">
                        <p className="text-sm text-gray-500 mb-2">Starting from</p>
                        <p className="text-3xl font-bold text-gray-900 mb-4">$120</p>
                        <Button className="w-full radius-button bg-accent hover:bg-accent-hover text-white" asChild>
                          <Link href="/contact">Book Now</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-accent text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Book?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Schedule your appointment today and experience the Blossom Spa difference.
          </p>
          <Button
            size="lg"
            className="radius-button bg-white text-accent hover:bg-gray-100"
            asChild
          >
            <Link href="/contact">
              Contact Us
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </PageTransitionWrapper>
  )
}
