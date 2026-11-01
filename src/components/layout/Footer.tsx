'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Footer() {
  const [year, setYear] = useState(2024)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="bg-zinc-950 py-12 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <p className="text-gray-500 mb-6">Questions? Contact us.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="space-y-3">
            <Link href="#" className="block text-gray-400 hover:text-gray-300 text-sm">
              FAQ
            </Link>
            <Link href="#" className="block text-gray-400 hover:text-gray-300 text-sm">
              Investor Relations
            </Link>
            <Link href="#" className="block text-gray-400 hover:text-gray-300 text-sm">
              Privacy
            </Link>
            <Link href="#" className="block text-gray-400 hover:text-gray-300 text-sm">
              Speed Test
            </Link>
          </div>

          <div className="space-y-3">
            <Link href="#" className="block text-gray-400 hover:text-gray-300 text-sm">
              Help Center
            </Link>
            <Link href="#" className="block text-gray-400 hover:text-gray-300 text-sm">
              Jobs
            </Link>
            <Link href="#" className="block text-gray-400 hover:text-gray-300 text-sm">
              Cookie Preferences
            </Link>
            <Link href="#" className="block text-gray-400 hover:text-gray-300 text-sm">
              Legal Notices
            </Link>
          </div>

          <div className="space-y-3">
            <Link href="#" className="block text-gray-400 hover:text-gray-300 text-sm">
              Account
            </Link>
            <Link href="#" className="block text-gray-400 hover:text-gray-300 text-sm">
              Ways to Watch
            </Link>
            <Link href="#" className="block text-gray-400 hover:text-gray-300 text-sm">
              Corporate Information
            </Link>
            <Link href="#" className="block text-gray-400 hover:text-gray-300 text-sm">
              Only on NEXTFLIX
            </Link>
          </div>

          <div className="space-y-3">
            <Link href="#" className="block text-gray-400 hover:text-gray-300 text-sm">
              Media Center
            </Link>
            <Link href="#" className="block text-gray-400 hover:text-gray-300 text-sm">
              Terms of Use
            </Link>
            <Link href="#" className="block text-gray-400 hover:text-gray-300 text-sm">
              Contact Us
            </Link>
          </div>
        </div>

        <p className="text-gray-500 text-sm">
          © {year} FilmyFlix. This is an educational project - not affiliated with Netflix.
        </p>
      </div>
    </footer>
  )
}
