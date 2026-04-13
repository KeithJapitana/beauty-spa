'use client'

import { useEffect } from 'react'
import { pushDataLayer } from './gtm'

/**
 * Fires a Google Ads + GA4 conversion event when the thank-you page mounts.
 * GTM should be configured to listen for event: 'consultation_booked'.
 */
export function ConversionTracker() {
  useEffect(() => {
    // GA4 / GTM dataLayer event
    pushDataLayer({
      event: 'consultation_booked',
      event_category: 'lead',
      event_label: 'contact_form_submission',
      value: 1,
    })

    // Direct gtag call for Google Ads (fires only if gtag is loaded via GTM)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'conversion', {
        send_to: process.env.NEXT_PUBLIC_GA4_ID,
      })
    }
  }, [])

  return null
}
