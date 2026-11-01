'use client'

import { Heart, Share2 } from 'lucide-react'

export default function SocialLinks() {
  return (
    <div className="flex flex-col items-center gap-8 py-12 px-4">
      {/* Sponsor Card */}
      <div className="w-full max-w-2xl">
        <iframe
          src="https://github.com/sponsors/sunnnyyy-yadav/card"
          title="Sponsor sunnnyyy-yadav"
          height="225"
          width="100%"
          style={{ border: '0', borderRadius: '0.5rem' }}
        />
      </div>

      {/* Social Links */}
      <div className="flex flex-wrap gap-4 justify-center">
        <a
          href="https://www.linkedin.com/in/sunny-yadav-a168b2328/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Heart className="w-5 h-5" />
          LinkedIn
        </a>
        <a
          href="https://www.instagram.com/sunnnyyy_________/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
        >
          <Share2 className="w-5 h-5" />
          Instagram
        </a>
        <a
          href="https://github.com/sunnnyyy-yadav"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
        >
          <Heart className="w-5 h-5" />
          GitHub
        </a>
      </div>
    </div>
  )
}
