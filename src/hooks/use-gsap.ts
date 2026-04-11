'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap/register'

interface UseGsapOptions {
  dependencies?: any[]
  revertOnUnmount?: boolean
}

/**
 * Hook for running GSAP animations in components
 * Automatically cleans up on unmount
 */
export function useGsap(
  callback: (context: gsap.Context) => void,
  options: UseGsapOptions = {}
) {
  const { dependencies = [], revertOnUnmount = true } = options
  const contextRef = useRef<any>(undefined)

  useEffect(() => {
    const ctx = gsap.context(() => {
      callback(ctx)
    })
    contextRef.current = ctx

    return () => {
      if (revertOnUnmount) {
        ctx.revert()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return contextRef.current
}

/**
 * Hook for scroll-triggered animations
 */
export function useScrollTrigger(
  callback: () => void,
  dependencies: any[] = []
) {
  useEffect(() => {
    // Refresh ScrollTrigger after layout updates
    ScrollTrigger.refresh()
    callback()

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}

/**
 * Hook for element entrance animation
 */
export function useEntranceAnimation(
  selector: string,
  options: {
    from?: gsap.TweenVars
    to?: gsap.TweenVars
    scrollTrigger?: boolean
  } = {}
) {
  const { from = { opacity: 0, y: 30 }, to = { opacity: 1, y: 0 }, scrollTrigger = true } = options

  useGsap((ctx) => {
    const elements = document.querySelectorAll(selector)

    elements.forEach((el) => {
      const tween = gsap.fromTo(
        el,
        from,
        {
          ...to,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: scrollTrigger
            ? {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              }
            : undefined,
        }
      )
    })
  })
}
