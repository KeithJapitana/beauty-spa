'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  ImageIcon,
  Video,
  Users,
  Settings,
  LogOut,
  X,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const navItems = [
  {
    href: '/admin',
    icon: LayoutDashboard,
    label: 'Dashboard',
  },
  {
    href: '/admin/posts',
    icon: FileText,
    label: 'Blog Posts',
  },
  {
    href: '/admin/inquiries',
    icon: MessageSquare,
    label: 'Inquiries',
  },
  {
    href: '/admin/portfolio',
    icon: ImageIcon,
    label: 'Portfolio',
  },
  {
    href: '/admin/webinars',
    icon: Video,
    label: 'Webinars',
  },
  {
    href: '/admin/users',
    icon: Users,
    label: 'Users',
  },
]

interface AdminSidebarProps {
  className?: string
  onClose?: () => void
}

export function AdminSidebar({ className, onClose }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className={cn('flex flex-col h-full bg-gray-50', className)}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/admin" className="flex items-center gap-2 text-xl font-semibold text-gray-900">
          <Sparkles className="w-6 h-6 text-[#ff385c]" />
          <span>Lumière Admin</span>
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all',
                  isActive
                    ? 'bg-[#ff385c] text-white shadow-md'
                    : 'text-gray-700 hover:bg-white hover:shadow-sm'
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <Separator className="my-6" />

        {/* Settings */}
        <Link
          href="/admin/settings"
          onClick={onClose}
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all w-full',
            pathname === '/admin/settings'
              ? 'bg-[#ff385c] text-white shadow-md'
              : 'text-gray-700 hover:bg-white hover:shadow-sm'
          )}
        >
          <Settings className="w-5 h-5 shrink-0" />
          Settings
        </Link>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:text-[#ff385c]"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  )
}

interface AdminSidebarSheetProps {
  isOpen: boolean
  onClose: () => void
}

export function AdminSidebarSheet({ isOpen, onClose }: AdminSidebarSheetProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="absolute top-4 right-4 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        <AdminSidebar />
      </aside>

      {/* Desktop Sidebar - Always Visible */}
      <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0">
        <AdminSidebar />
      </aside>
    </>
  )
}
