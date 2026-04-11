import Link from 'next/link'
import { ArrowRight, Sparkles, Heart, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PageTransitionWrapper } from '@/components/layout/page-transition-wrapper'
import { cn } from '@/lib/utils'

const services = [
  {
    title: 'Luxury Facials',
    description: 'Rejuvenating treatments that restore your skin\'s natural glow.',
    icon: Sparkles,
    href: '/services#facials',
  },
  {
    title: 'Therapeutic Massages',
    description: 'Release tension and melt away stress with our expert massage therapists.',
    icon: Heart,
    href: '/services#massages',
  },
  {
    title: 'Body Treatments',
    description: 'Detoxify and nourish your body with our premium wraps and scrubs.',
    icon: Award,
    href: '/services#body-treatments',
  },
]

const features = [
  {
    title: 'Expert Estheticians',
    description: 'Our team brings years of experience and specialized training.',
  },
  {
    title: 'Premium Products',
    description: 'We use only the finest, clinically-proven skincare products.',
  },
  {
    title: 'Relaxing Atmosphere',
    description: 'Tranquil environment designed for your complete relaxation.',
  },
  {
    title: 'Customized Care',
    description: 'Every treatment is tailored to your unique skin needs.',
  },
]

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Regular Client',
    content: 'The best spa experience I\'ve ever had. The attention to detail and personalized care made me feel truly special.',
  },
  {
    name: 'Jennifer L.',
    role: 'First-time Visitor',
    content: 'From the moment I walked in, I felt welcomed. The facial transformed my skin and the massage was heavenly.',
  },
  {
    name: 'Michelle K.',
    role: 'Member since 2023',
    content: 'I\'ve tried many spas, but Blossom Spa stands out. The results speak for themselves.',
  },
]

export default function HomePage() {
  return (
    <PageTransitionWrapper className="flex-1">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-white via-gray-50 to-accent/5">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Welcome to Blossom Spa
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Rejuvenate Your
              <span className="text-accent"> Mind & Body</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-xl">
              Experience luxurious spa treatments tailored to your unique needs.
              Let us help you look and feel your absolute best.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="radius-button bg-accent hover:bg-accent-hover text-white text-base px-8"
                asChild
              >
                <Link href="/contact">
                  Book Your Visit
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="radius-button text-base px-8"
                asChild
              >
                <Link href="/services">
                  Explore Services
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gray-100 rounded-full blur-3xl" />
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our range of luxurious treatments designed to rejuvenate your body and soul.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Link
                  key={index}
                  href={service.href}
                  className="group"
                >
                  <Card className="border-0 shadow-card hover:shadow-card-lg transition-all duration-300 h-full">
                    <CardContent className="p-8">
                      <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent transition-colors">
                        <Icon className="w-7 h-7 text-accent group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {service.description}
                      </p>
                      <span className="text-accent font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="radius-button"
              asChild
            >
              <Link href="/services">
                View All Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Blossom Spa?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We believe that self-care is not a luxury—it's a necessity. Our spa
                offers a sanctuary where you can escape the everyday and focus on yourself.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-accent/20 to-accent/5 shadow-card-xl" />
              <div className="absolute inset-8 rounded-2xl bg-white shadow-card flex items-center justify-center">
                <div className="text-center p-8">
                  <Sparkles className="w-16 h-16 text-accent mx-auto mb-4" />
                  <p className="text-2xl font-semibold text-gray-900">
                    10+ Years
                  </p>
                  <p className="text-gray-600">of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600">
              Don't just take our word for it—hear from our satisfied clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className={cn(
                  "border-0 shadow-card hover:shadow-card-lg transition-shadow",
                  index === 1 && "md:-mt-4 md:mb-4"
                )}
              >
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-accent">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-accent text-white">
        <div className="container mx-auto px-6 text-center">
          <Sparkles className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Skin?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Book your appointment today and discover the Blossom Spa difference.
            Your journey to radiant skin starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="radius-button bg-white text-accent hover:bg-gray-100 text-base px-8"
              asChild
            >
              <Link href="/contact">
                Book Appointment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="radius-button border-white text-white hover:bg-white/10 text-base px-8"
              asChild
            >
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageTransitionWrapper>
  )
}
