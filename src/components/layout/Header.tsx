'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Search, Bell, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    
    // Load user name from localStorage
    const storedUser = localStorage.getItem('filmyflix-user')
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        setUserName(user.name || user.email)
      } catch (e) {
        console.error('Error parsing user data:', e)
      }
    }
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setShowSearch(false)
      setSearchQuery('')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('filmyflix-user')
    setUserName(null)
    setShowUserMenu(false)
    router.push('/')
  }

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-colors duration-300',
        isScrolled ? 'bg-zinc-950' : 'bg-transparent'
      )}
    >
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-red-600 text-3xl font-bold tracking-wider">
            FilmyFlix
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/browse" className="text-white hover:text-gray-300 transition">
              Home
            </Link>
            <Link href="/browse/movies" className="text-white hover:text-gray-300 transition">
              Movies
            </Link>
            <Link href="/browse/tv" className="text-white hover:text-gray-300 transition">
              TV Shows
            </Link>
            <Link href="/profile" className="text-white hover:text-gray-300 transition">
              My List
            </Link>
          </nav>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            {showSearch ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies..."
                  className="px-4 py-2 bg-zinc-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 w-64"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowSearch(false)}
                  className="ml-2 text-white hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="text-white hover:text-gray-300 transition"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Notifications */}
          <button
            onClick={() => alert('🔔 No new notifications')}
            className="text-white hover:text-gray-300 transition hidden md:block"
          >
            <Bell className="w-5 h-5" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 text-white hover:text-gray-300 transition"
            >
              <User className="w-5 h-5" />
              {userName && <span className="hidden md:inline text-sm">{userName}</span>}
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-zinc-900 rounded-md shadow-lg py-2 border border-zinc-800">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-white hover:bg-zinc-800 transition"
                  onClick={() => setShowUserMenu(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-white hover:bg-zinc-800 transition"
                  onClick={() => setShowUserMenu(false)}
                >
                  My List
                </Link>
                {userName ? (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 text-white hover:bg-zinc-800 transition"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    href="/auth/signin"
                    className="block px-4 py-2 text-white hover:bg-zinc-800 transition"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-zinc-950 border-t border-zinc-800 px-4 py-4">
          <nav className="flex flex-col gap-4">
            <Link
              href="/browse"
              className="text-white hover:text-gray-300 transition"
              onClick={() => setShowMobileMenu(false)}
            >
              Home
            </Link>
            <Link
              href="/browse/movies"
              className="text-white hover:text-gray-300 transition"
              onClick={() => setShowMobileMenu(false)}
            >
              Movies
            </Link>
            <Link
              href="/browse/tv"
              className="text-white hover:text-gray-300 transition"
              onClick={() => setShowMobileMenu(false)}
            >
              TV Shows
            </Link>
            <Link
              href="/profile"
              className="text-white hover:text-gray-300 transition"
              onClick={() => setShowMobileMenu(false)}
            >
              My List
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
