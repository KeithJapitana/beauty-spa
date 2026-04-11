import { PageTransitionWrapper } from '@/components/layout/page-transition-wrapper'
import { Card, CardContent } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/admin'

async function getPortfolioItems() {
  try {
    const supabase = createClient()
    if (!supabase) return []

    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) return []
    return data || []
  } catch {
    return []
  }
}

export default async function PortfolioPage() {
  const items = await getPortfolioItems()

  return (
    <PageTransitionWrapper>
      <section className="py-24 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Works & Awards
            </h1>
            <p className="text-xl text-gray-600">
              Explore our portfolio of transformative treatments and industry recognition.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          {items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item: any) => (
                <Card key={item.id} className="border-0 shadow-card hover:shadow-card-lg transition-shadow overflow-hidden">
                  {item.images?.[0] ? (
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full aspect-video object-cover"
                    />
                  ) : (
                    <div className="w-full aspect-video bg-gray-100" />
                  )}
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-gray-600 mb-4">{item.description}</p>
                    )}
                    {item.category && (
                      <span className="text-sm text-accent font-medium">
                        {item.category}
                      </span>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-0 shadow-card">
              <CardContent className="text-center py-16">
                <p className="text-gray-500">Portfolio coming soon!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </PageTransitionWrapper>
  )
}
