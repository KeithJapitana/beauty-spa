'use client'

import { createClient } from '@/lib/supabase/client'
import { createClient as createAdminClient } from '@/lib/supabase/admin'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  FileText,
  MessageSquare,
  Eye,
  TrendingUp,
  Users,
  Clock,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useGsap } from '@/hooks/use-gsap'
import { gsap } from '@/lib/gsap/register'

interface DashboardStats {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  totalInquiries: number
  newInquiries: number
  totalViews: number
  totalUsers: number
  upcomingWebinars: number
}

interface RecentActivity {
  id: string
  type: 'inquiry' | 'post' | 'webinar'
  title: string
  date: string
  status?: string
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadDashboard() {
      try {
        const adminClient = createAdminClient()
        if (!adminClient) {
          setIsLoading(false)
          return
        }

        // Fetch stats in parallel
        const [
          postsResult,
          inquiriesResult,
          viewsResult,
          usersResult,
          webinarsResult,
        ] = await Promise.all([
          adminClient
            .from('blog_posts')
            .select('status'),
          adminClient
            .from('inquiries')
            .select('status, created_at'),
          adminClient
            .from('blog_posts')
            .select('id'),
          adminClient
            .from('profiles')
            .select('id'),
          adminClient
            .from('webinars')
            .select('status'),
        ])

        const posts = postsResult.data || []
        const inquiries = inquiriesResult.data || []
        const totalViews = viewsResult.data?.length || 0
        const users = usersResult.data?.length || 0
        const webinars = webinarsResult.data || []

        const newInquiries = inquiries.filter(
          (i) => i.status === 'new' ||
          (new Date(i.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
        ).length

        setStats({
          totalPosts: posts.length,
          publishedPosts: posts.filter((p) => p.status === 'published').length,
          draftPosts: posts.filter((p) => p.status === 'draft').length,
          totalInquiries: inquiries.length,
          newInquiries,
          totalViews,
          totalUsers: users,
          upcomingWebinars: webinars.filter((w) => w.status === 'upcoming').length,
        })

        // Fetch recent activity
        const [recentInquiries, recentPosts] = await Promise.all([
          adminClient
            .from('inquiries')
            .select('id, name, created_at, status')
            .order('created_at', { ascending: false })
            .limit(3),
          adminClient
            .from('blog_posts')
            .select('id, title, created_at, status')
            .order('created_at', { ascending: false })
            .limit(3),
        ])

        const activity: RecentActivity[] = []

        recentInquiries.data?.forEach((i) => {
          activity.push({
            id: i.id,
            type: 'inquiry',
            title: i.name,
            date: i.created_at,
            status: i.status,
          })
        })

        recentPosts.data?.forEach((p) => {
          activity.push({
            id: p.id,
            type: 'post',
            title: p.title,
            date: p.created_at,
            status: p.status,
          })
        })

        activity.sort((a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        )

        setRecentActivity(activity.slice(0, 5))
      } catch (error) {
        console.error('Error loading dashboard:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboard()
  }, [])

  // GSAP entrance animation
  useGsap(() => {
    gsap.fromTo(
      '.stat-card',
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
    )
  }, { dependencies: [stats] })

  const statCards = stats
    ? [
        {
          title: 'Total Posts',
          value: stats.totalPosts,
          change: `${stats.publishedPosts} published`,
          icon: FileText,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          href: '/admin/posts',
        },
        {
          title: 'Inquiries',
          value: stats.totalInquiries,
          change: `${stats.newInquiries} new this week`,
          icon: MessageSquare,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          href: '/admin/inquiries',
        },
        {
          title: 'Page Views',
          value: stats.totalViews,
          change: 'Last 30 days',
          icon: Eye,
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          href: '/admin/analytics',
        },
        {
          title: 'Team Members',
          value: stats.totalUsers,
          change: 'Active users',
          icon: Users,
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          href: '/admin/users',
        },
      ]
    : []

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="radius-button">
            <TrendingUp className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Button className="radius-button bg-accent hover:bg-accent-hover text-white">
            <FileText className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon
          return (
            <Link
              key={index}
              href={card.href}
              className="stat-card group"
            >
              <Card className="hover:shadow-card-lg transition-shadow duration-300 border-0">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {card.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${card.bgColor}`}>
                    <Icon className={`w-4 h-4 ${card.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">
                    {card.value}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{card.change}</p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-500" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const isPost = activity.type === 'post'
                const isInquiry = activity.type === 'inquiry'

                return (
                  <div
                    key={activity.id}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className={`p-2 rounded-full ${
                      isPost ? 'bg-blue-50' : 'bg-green-50'
                    }`}>
                      {isPost ? (
                        <FileText className="w-4 h-4 text-blue-600" />
                      ) : (
                        <MessageSquare className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.date).toLocaleDateString()} • {activity.status}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                    >
                      <Link href={
                        isPost
                          ? `/admin/posts/${activity.id}`
                          : `/admin/inquiries`
                      }>
                        View
                      </Link>
                    </Button>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No recent activity</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-card hover:shadow-card-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-base">Quick Post</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Create a new blog post with the Novel editor
            </p>
            <Button className="w-full radius-button bg-accent hover:bg-accent-hover text-white" asChild>
              <Link href="/admin/posts/new">
                <FileText className="w-4 h-4 mr-2" />
                Create Post
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card hover:shadow-card-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-base">Check Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Review and respond to new contact form submissions
            </p>
            <Button variant="outline" className="w-full radius-button" asChild>
              <Link href="/admin/inquiries">
                <MessageSquare className="w-4 h-4 mr-2" />
                View Inquiries
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card hover:shadow-card-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-base">Manage Team</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Add or remove team members and assign roles
            </p>
            <Button variant="outline" className="w-full radius-button" asChild>
              <Link href="/admin/users">
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
