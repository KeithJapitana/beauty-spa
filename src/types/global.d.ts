declare global {
  interface Window {
    dataLayer: Record<string, any>[]
    grecaptcha: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, opts: { action: string }) => Promise<string>
    }
  }
}

export {}
