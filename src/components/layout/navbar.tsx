'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { gsap } from '@/lib/gsap/register'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/webinars', label: 'Webinars' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const navbarRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!navbarRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(navbarRef.current, {
        paddingTop: isScrolled ? '0.75rem' : '1.25rem',
        paddingBottom: isScrolled ? '0.75rem' : '1.25rem',
        duration: 0.3,
        ease: 'power2.out',
      })
    }, navbarRef)
    return () => ctx.revert()
  }, [isScrolled])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      ref={navbarRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300',
        isScrolled && 'shadow-[0_4px_12px_0_rgb(0_0_0/0.08),_0_1px_3px_0_rgb(0_0_0/0.04)]'
      )}
    >
      <nav className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-[180px] h-[48px] bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
              Logo 180×48
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors relative pb-0.5',
                    isActive(link.href)
                      ? 'text-[#ff385c]'
                      : 'text-[#222222] hover:text-[#ff385c]'
                  )}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ff385c] rounded-full" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              className="rounded-lg bg-[#ff385c] hover:bg-[#e0304f] text-white font-medium px-5"
              asChild
            >
              <Link href="/contact">Book a Consultation</Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#222222] hover:text-[#ff385c] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-gray-100 mt-4">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'text-base font-medium transition-colors block py-2.5 px-2 rounded-lg',
                      isActive(link.href)
                        ? 'text-[#ff385c] bg-[#ff385c]/5'
                        : 'text-[#222222] hover:text-[#ff385c] hover:bg-gray-50'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <Button
                className="w-full rounded-lg bg-[#ff385c] hover:bg-[#e0304f] text-white font-medium"
                asChild
              >
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Book a Consultation
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
