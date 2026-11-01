'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Eye, EyeOff } from 'lucide-react'

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    // Save user locally (for demo without Supabase)
    const userData = {
      email,
      name: email.split('@')[0],
      signedUpAt: new Date().toISOString()
    }
    localStorage.setItem('filmyflix-user', JSON.stringify(userData))

    // Try Supabase if configured
    try {
      const { error: supabaseError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (supabaseError) {
        console.log('Supabase not configured, using local storage')
      }
    } catch (err) {
      console.log('Supabase not available, using local storage')
    }

    // Always redirect to browse (works with or without Supabase)
    router.push('/browse')
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      {/* Header */}
      <Link
        href="/"
        className="absolute top-6 left-6 md:left-12 text-red-600 text-3xl font-bold tracking-wider"
      >
        FilmyFlix
      </Link>

      <div className="w-full max-w-md bg-zinc-900/90 rounded-lg p-8 md:p-12">
        <h1 className="text-3xl font-bold text-white mb-8">Sign Up</h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 pr-12"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-8">
          Already have an account?{' '}
          <Link href="/auth/signin" className="text-white hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
