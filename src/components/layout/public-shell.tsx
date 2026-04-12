'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from './navbar'
import { Footer } from './footer'

export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminOrLogin = pathname.startsWith('/admin') || pathname.startsWith('/login')

  if (isAdminOrLogin) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
    </>
  )
}
