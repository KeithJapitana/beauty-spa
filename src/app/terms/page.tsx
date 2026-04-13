import Link from 'next/link'
import { PageTransitionWrapper } from '@/components/layout/page-transition-wrapper'

export const metadata = {
  title: 'Terms of Service — Lumière Beauty Spa',
  description: 'Terms and conditions for using Lumière Beauty Spa services and website.',
}

export default function TermsPage() {
  return (
    <PageTransitionWrapper>

      {/* ─── HERO ─── */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[#ff385c] uppercase tracking-widest mb-4">Legal</p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#222222] leading-tight mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-500">Last updated: April 2026</p>
          </div>
        </div>
      </section>

      {/* ─── CONTENT ─── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl space-y-12 text-[#222222]">

            <div>
              <p className="text-gray-500 leading-relaxed">
                These Terms of Service govern your use of the Lumière Beauty Spa website and the services we provide. By accessing our website or booking a treatment, you agree to these terms. Please read them carefully.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222222] mb-4">1. Use of Our Website</h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                You may use our website for lawful purposes only. You agree not to:
              </p>
              <ul className="space-y-3 text-gray-500">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] shrink-0 mt-2" />
                  <span>Use the website in any way that violates applicable laws or regulations</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] shrink-0 mt-2" />
                  <span>Submit false, misleading, or fraudulent information through our forms</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] shrink-0 mt-2" />
                  <span>Attempt to gain unauthorized access to any part of our website or systems</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] shrink-0 mt-2" />
                  <span>Reproduce, distribute, or republish any content from this website without written permission</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222222] mb-4">2. Appointments & Cancellations</h2>
              <ul className="space-y-3 text-gray-500">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] shrink-0 mt-2" />
                  <span>Consultation requests submitted through our website are not confirmed bookings until you receive a confirmation from our team.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] shrink-0 mt-2" />
                  <span>We ask that you notify us at least 24 hours in advance if you need to cancel or reschedule an appointment.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] shrink-0 mt-2" />
                  <span>Repeated no-shows may affect your ability to book future appointments.</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222222] mb-4">3. Treatment Services</h2>
              <ul className="space-y-3 text-gray-500">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] shrink-0 mt-2" />
                  <span>Results from beauty treatments vary by individual. We make no guarantee of specific outcomes.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] shrink-0 mt-2" />
                  <span>It is your responsibility to disclose any medical conditions, allergies, or skin sensitivities before receiving any treatment.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] shrink-0 mt-2" />
                  <span>We reserve the right to decline or discontinue a service if we believe it may be harmful to you.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] shrink-0 mt-2" />
                  <span>Prices listed on our website are indicative and may vary. Final pricing will be confirmed during your consultation.</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222222] mb-4">4. Intellectual Property</h2>
              <p className="text-gray-500 leading-relaxed">
                All content on this website — including text, images, graphics, logos, and design — is the property of Lumière Beauty Spa and is protected by copyright law. You may not copy, reproduce, or use any content without our prior written consent.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222222] mb-4">5. Limitation of Liability</h2>
              <p className="text-gray-500 leading-relaxed">
                To the fullest extent permitted by law, Lumière Beauty Spa shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or services. Our total liability to you shall not exceed the amount you paid for the specific service in question.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222222] mb-4">6. Third-Party Links</h2>
              <p className="text-gray-500 leading-relaxed">
                Our website may contain links to third-party websites (such as social media or YouTube). We are not responsible for the content or privacy practices of those sites. Visiting third-party links is at your own risk.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222222] mb-4">7. Changes to These Terms</h2>
              <p className="text-gray-500 leading-relaxed">
                We reserve the right to update these Terms of Service at any time. Changes will be posted on this page with a revised date. Continued use of our website after any changes constitutes your acceptance of the new terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222222] mb-4">8. Governing Law</h2>
              <p className="text-gray-500 leading-relaxed">
                These terms are governed by the laws of the Republic of the Philippines. Any disputes shall be resolved under the jurisdiction of the appropriate courts in Metro Manila.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222222] mb-4">9. Contact Us</h2>
              <p className="text-gray-500 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:keithjapitana@gmail.com" className="text-[#ff385c] hover:underline font-medium">
                  keithjapitana@gmail.com
                </a>{' '}
                or visit our{' '}
                <Link href="/contact" className="text-[#ff385c] hover:underline font-medium">
                  contact page
                </Link>.
              </p>
            </div>

          </div>
        </div>
      </section>

    </PageTransitionWrapper>
  )
}
