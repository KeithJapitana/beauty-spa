'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Sparkles, Mail, Lock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { useGsap } from '@/hooks/use-gsap'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // GSAP entrance animation
  useGsap(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.login-card',
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out' }
      )
    })
    return () => ctx.revert()
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast.error('Login failed', {
          description: error.message,
        })
        return
      }

      // Check if user has a profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single()

      if (!profile) {
        toast.error('Account not found', {
          description: 'Please contact an administrator to set up your account.',
        })
        return
      }

      toast.success('Welcome back!', {
        description: `Logged in as ${profile.name}`,
      })

      router.push('/admin')
      router.refresh()
    } catch (error) {
      toast.error('An error occurred', {
        description: 'Please try again later.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 text-xl font-semibold text-gray-900 mb-8">
          <Sparkles className="w-6 h-6 text-accent" />
          <span>Blossom Spa</span>
        </Link>

        {/* Login Card */}
        <Card className="login-card shadow-card-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>
              Sign in to your account to manage the website
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 radius-button"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-accent hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 radius-button"
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full radius-button bg-accent hover:bg-accent-hover text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
                {!isLoading && <ArrowRight className="ml-2 w-4 h-4" />}
              </Button>
              <p className="text-sm text-gray-600 text-center">
                Don't have an account?{' '}
                <Link href="/signup" className="text-accent hover:underline font-medium">
                  Contact admin
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>

        {/* Back to site link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-accent transition-colors inline-flex items-center gap-1"
          >
            <ArrowRight className="w-3 h-3 rotate-180" />
            Back to website
          </Link>
        </div>
      </div>
    </div>
  )
}
