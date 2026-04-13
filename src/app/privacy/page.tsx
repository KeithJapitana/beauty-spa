import Link from 'next/link'
import { PageTransitionWrapper } from '@/components/layout/page-transition-wrapper'

export const metadata = {
  title: 'Privacy Policy — Lumière Beauty Spa',
  description: 'How Lumière Beauty Spa collects, uses, and protects your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <PageTransitionWrapper>

      {/* ─── HERO ─── */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[#ff385c] uppercase tracking-widest mb-4">Legal</p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#222222] leading-tight mb-4">
              Privacy Policy
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
                At Lumière Beauty Spa, your privacy matters to us just as much as your skin does. This Privacy Policy explains what information we collect, how we use it, and how we keep it safe. By using our website or booking our services, you agree to the practices described here.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222222] mb-4">1. Information We Collect</h2>
              <p className="text-gray-500 leading-relaxed mb-4">We collect information in the following ways:</p>
              <ul className="space-y-3 text-gray-500">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] shrink-0 mt-2" />
                  <span><strong className="text-[#222222]">Information you give us</strong> — When you fill out our contact or booking form, we collect your name, email address, phone number, and any message you submit.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] shrink-0 mt-2" />
                  <span><strong className="text-[#222222]">Usage data</strong> — We collect anonymized data about how you use our website (pages visited, time spent, referral source) through Google Analytics and Google Tag Manager.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] shrink-0 mt-2" />
                  <span><strong className="text-[#222222]">Cookies</strong> — Our website uses cookies to improve your browsing experience and to track advertising performance. You can disable cookies in your browser settings at any time.</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222222] mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-500 leading-relaxed mb-4">We use the information we collect to:</p>
              <ul className="space-y-3 text-gray-500">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] shrink-0 mt-2" />
                  <span>Respond to your inquiries and consultation requests</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] shrink-0 mt-2" />
                  <span>Send appointment reminders or follow-up messages (only if you've contacted us)</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] shrink-0 mt-2" />
                  <span>Improve our website and services based on usage patterns</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] shrink-0 mt-2" />
                  <span>Comply with legal obligations</span>
                </li>
              </ul>
              <p className="text-gray-500 leading-relaxed mt-4">
                We will never sell, rent, or share your personal information with third parties for their marketing purposes.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222222] mb-4">3. Third-Party Services</h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                We use trusted third-party tools to operate our website. Each has its own privacy policy:
              </p>
              <ul className="space-y-3 text-gray-500">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] shrink-0 mt-2" />
                  <span><strong className="text-[#222222]">Google Analytics & GTM</strong> — website traffic analysis</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] shrink-0 mt-2" />
                  <span><strong className="text-[#222222]">Google reCAPTCHA</strong> — spam prevention on our contact form</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] shrink-0 mt-2" />
                  <span><strong className="text-[#222222]">Resend</strong> — transactional email delivery for inquiry confirmations</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] shrink-0 mt-2" />
                  <span><strong className="text-[#222222]">Supabase</strong> — secure database storage for form submissions</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222222] mb-4">4. Data Retention</h2>
              <p className="text-gray-500 leading-relaxed">
                We retain your contact information for as long as necessary to respond to your inquiry and maintain our business records. If you would like your data deleted, please contact us and we will remove it promptly.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222222] mb-4">5. Your Rights</h2>
              <p className="text-gray-500 leading-relaxed mb-4">You have the right to:</p>
              <ul className="space-y-3 text-gray-500">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] shrink-0 mt-2" />
                  <span>Request a copy of the personal data we hold about you</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] shrink-0 mt-2" />
                  <span>Request correction of inaccurate information</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] shrink-0 mt-2" />
                  <span>Request deletion of your personal data</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] shrink-0 mt-2" />
                  <span>Withdraw consent at any time for any communication from us</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222222] mb-4">6. Security</h2>
              <p className="text-gray-500 leading-relaxed">
                We take reasonable technical and organizational measures to protect your personal information against unauthorized access, loss, or misuse. Our database is secured with row-level security and all data is transmitted over HTTPS.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222222] mb-4">7. Changes to This Policy</h2>
              <p className="text-gray-500 leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised date. We encourage you to review this page periodically.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#222222] mb-4">8. Contact Us</h2>
              <p className="text-gray-500 leading-relaxed">
                If you have any questions about this Privacy Policy or how we handle your data, please reach out to us at{' '}
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
