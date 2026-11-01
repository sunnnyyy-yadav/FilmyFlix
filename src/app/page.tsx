'use client'

'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import FAQ from '@/components/features/FAQ'
import Footer from '@/components/layout/Footer'
import EducationBanner from '@/components/layout/EducationBanner'

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Education Banner */}
      <EducationBanner />
      
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1920&q=80"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/50 to-zinc-950" />
        </div>

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between px-4 md:px-12 py-6">
          <Link href="/" className="text-red-600 text-4xl font-bold tracking-wider">
            FilmyFlix
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/auth/signin"
              className="text-white hover:text-gray-300 transition"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Sign Up
            </Link>
          </div>
        </header>

        {/* Hero Content */}
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl mb-6">
            Unlimited movies, TV shows, and more
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8">
            Start watching today. Cancel anytime.
          </p>
          <p className="text-lg text-white mb-6">
            Ready to watch? Click below to get started.
          </p>

          <Link
            href="/browse"
            className="flex items-center gap-2 px-8 py-4 bg-red-600 text-white text-xl font-semibold rounded-md hover:bg-red-700 transition"
          >
            Get Started
            <ChevronRight className="w-6 h-6" />
          </Link>
        </main>
      </div>

      {/* Features Section */}
      <div className="border-t-8 border-zinc-800">
        <div className="py-16 md:py-24 px-4 md:px-12 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Enjoy on your TV
              </h2>
              <p className="text-xl text-gray-300">
                Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.
              </p>
            </div>
            <div className="bg-zinc-800 rounded-lg aspect-video flex items-center justify-center">
              <p className="text-gray-500">TV Preview</p>
            </div>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="border-t-8 border-zinc-800">
        <div className="py-16 md:py-24 px-4 md:px-12 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 bg-zinc-800 rounded-lg aspect-video flex items-center justify-center">
              <p className="text-gray-500">Download Preview</p>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Download your shows to watch offline
              </h2>
              <p className="text-xl text-gray-300">
                Save your favorites easily and always have something to watch.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="border-t-8 border-zinc-800">
        <FAQ />
      </div>

      {/* Footer */}
      <div className="border-t-8 border-zinc-800">
        <Footer />
      </div>
    </div>
  )
}
