'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Sparkles } from 'lucide-react'
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // GSAP shrink animation on scroll
  useEffect(() => {
    if (!navbarRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(navbarRef.current, {
        padding: isScrolled ? '0.75rem 0' : '1.25rem 0',
        boxShadow: isScrolled ? '0 4px 12px 0 rgb(0 0 0 / 0.08), 0 1px 3px 0 rgb(0 0 0 / 0.04)' : 'none',
        duration: 0.3,
        ease: 'power2.out',
      })
    }, navbarRef)

    return () => ctx.revert()
  }, [isScrolled])

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <header
      ref={navbarRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white',
        isScrolled && 'shadow-nav'
      )}
    >
      <nav className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-semibold text-gray-900 hover:text-accent transition-colors"
          >
            <Sparkles className="w-6 h-6 text-accent" />
            <span>Blossom Spa</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors relative',
                    isActiveLink(link.href)
                      ? 'text-accent'
                      : 'text-gray-700 hover:text-accent'
                  )}
                >
                  {link.label}
                  {isActiveLink(link.href) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/contact">
              <Button className="radius-button bg-accent hover:bg-accent-hover text-white font-medium px-6">
                Book Now
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="font-medium">
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-gray-200 mt-4">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'text-base font-medium transition-colors block py-2',
                      isActiveLink(link.href)
                        ? 'text-accent'
                        : 'text-gray-700 hover:text-accent'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 mt-6">
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full radius-button bg-accent hover:bg-accent-hover text-white font-medium">
                  Book Now
                </Button>
              </Link>
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full font-medium">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
