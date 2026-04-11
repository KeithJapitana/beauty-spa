'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AdminSidebarSheet } from './admin-sidebar'
import { useGsap } from '@/hooks/use-gsap'
import { ScrollTrigger } from '@/lib/gsap/register'

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Set up GSAP ScrollTrigger refresh
  useGsap(() => {
    ScrollTrigger.refresh()
  })

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Admin Dashboard</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </Button>
      </header>

      {/* Sidebar */}
      <AdminSidebarSheet
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Desktop Header */}
        <header className="hidden lg:block fixed top-0 left-72 right-0 z-30 bg-white border-b border-gray-200 px-8 py-4">
          <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
        </header>

        {/* Page Content */}
        <main className="lg:pt-20 min-h-screen">
          <div className="p-4 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
