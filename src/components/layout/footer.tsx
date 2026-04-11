'use client'

import Link from 'next/link'
import { Sparkles, Mail, Phone, MapPin, PlayCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const footerLinks = {
  services: [
    { href: '/services#facials', label: 'Facials' },
    { href: '/services#massages', label: 'Massages' },
    { href: '/services#body-treatments', label: 'Body Treatments' },
    { href: '/services#skincare', label: 'Skincare Products' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/webinars', label: 'Webinars' },
    { href: '/blog', label: 'Blog' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/contact', label: 'Contact Us' },
  ],
}

const socialLinks = [
  { href: '#', icon: Mail, label: 'Email' },
  { href: '#', icon: PlayCircle, label: 'YouTube' },
]

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-gray-900 mb-4">
              <Sparkles className="w-6 h-6 text-accent" />
              <span>Blossom Spa</span>
            </Link>
            <p className="text-gray-600 mb-6 max-w-sm">
              Rejuvenate your mind and body with our luxurious spa treatments.
              Experience the perfect blend of relaxation and skincare science.
            </p>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-900">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 radius-button"
                />
                <Button className="radius-button bg-accent hover:bg-accent-hover text-white shrink-0">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-gray-600 text-sm">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>123 Wellness Street<br />San Francisco, CA 94102</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 text-sm">
                <Phone className="w-4 h-4 shrink-0" />
                <a href="tel:+14155551234" className="hover:text-accent transition-colors">
                  +1 (415) 555-1234
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-600 text-sm">
                <Mail className="w-4 h-4 shrink-0" />
                <a href="mailto:hello@blossomspa.com" className="hover:text-accent transition-colors">
                  hello@blossomspa.com
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-accent hover:border-accent transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Blossom Spa. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
