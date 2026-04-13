'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap/register'

interface PageTransitionWrapperProps {
  children: React.ReactNode
  className?: string
}

/**
 * Wraps page content for smooth entrance animation
 * Staggers children elements for a cascading reveal effect
 */
export function PageTransitionWrapper({ children, className = '' }: PageTransitionWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return

      const children = Array.from(containerRef.current.children)

      // Animate container
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      )

      // Stagger children
      gsap.fromTo(
        children,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          delay: 0.1,
        }
      )
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
