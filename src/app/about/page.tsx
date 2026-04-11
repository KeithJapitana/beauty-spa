import { PageTransitionWrapper } from '@/components/layout/page-transition-wrapper'
import { Sparkles, Heart, Award } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function AboutPage() {
  return (
    <PageTransitionWrapper>
      <section className="py-24 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Story
            </h1>
            <p className="text-xl text-gray-600">
              At Blossom Spa, we believe self-care is essential, not optional.
              Founded in 2014, we've created a sanctuary where beauty meets wellness.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-card text-center">
              <CardContent className="p-8">
                <Sparkles className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Mission</h3>
                <p className="text-gray-600">
                  To provide exceptional spa experiences that rejuvenate both body and mind.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card text-center">
              <CardContent className="p-8">
                <Heart className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Values</h3>
                <p className="text-gray-600">
                  Excellence, integrity, and genuine care for every client who walks through our doors.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card text-center">
              <CardContent className="p-8">
                <Award className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Promise</h3>
                <p className="text-gray-600">
                  Premium products, expert estheticians, and a commitment to your satisfaction.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageTransitionWrapper>
  )
}
