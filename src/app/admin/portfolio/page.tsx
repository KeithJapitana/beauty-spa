'use client'

import { createClient } from '@/lib/supabase/admin'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

interface PortfolioItem {
  id: string
  title: string
  description: string | null
  images: string[]
  category: string | null
  awards: Array<{ title: string; year: string; org: string }>
  display_order: number
}

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadPortfolio()
  }, [])

  async function loadPortfolio() {
    try {
      const supabase = createClient()
      if (!supabase) {
        toast.error('Supabase not configured')
        setIsLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setItems(data || [])
    } catch (error) {
      toast.error('Failed to load portfolio')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
          <p className="text-gray-600 mt-1">Manage your works and awards</p>
        </div>
        <Button className="radius-button bg-accent hover:bg-accent-hover text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      {/* Portfolio Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-64 rounded-2xl" />
          ))}
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="border-0 shadow-card hover:shadow-card-lg transition-shadow overflow-hidden group">
              <div className="aspect-video bg-gray-100 relative">
                {item.images[0] ? (
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
                {item.awards && item.awards.length > 0 && (
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                    🏆 {item.awards.length} Award{item.awards.length > 1 ? 's' : ''}
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                {item.category && (
                  <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                )}
                {item.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-0 shadow-card">
          <CardContent className="text-center py-12">
            <p className="text-gray-500 mb-4">No portfolio items yet</p>
            <Button className="radius-button bg-accent hover:bg-accent-hover text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Item
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
