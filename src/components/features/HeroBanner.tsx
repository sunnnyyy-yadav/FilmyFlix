'use client'

import { useState } from 'react'
import { Play, Info } from 'lucide-react'
import { Movie } from '@/lib/tmdb'
import { getImageUrl } from '@/lib/tmdb'
import VideoPlayer from './VideoPlayer'
import MovieModal from './MovieModal'

interface HeroBannerProps {
  movie: Movie
}

export default function HeroBanner({ movie }: HeroBannerProps) {
  const [showPlayer, setShowPlayer] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const title = movie.title || movie.name || ''
  const overview = movie.overview || ''

  return (
    <>
      <div className="relative h-[85vh] w-full">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={getImageUrl(movie.backdrop_path, 'original')}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-center px-4 md:px-12 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            {title}
          </h1>
          <p className="text-lg text-gray-200 mb-8 line-clamp-3 md:line-clamp-4">
            {overview}
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => setShowPlayer(true)}
              className="flex items-center gap-2 px-8 py-3 bg-white text-black font-semibold rounded-md hover:bg-opacity-80 transition"
            >
              <Play className="w-6 h-6 fill-current" />
              Play
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-8 py-3 bg-gray-500/70 text-white font-semibold rounded-md hover:bg-opacity-60 transition"
            >
              <Info className="w-6 h-6" />
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Video Player */}
      {showPlayer && (
        <VideoPlayer
          tmdbId={movie.id}
          title={title}
          onClose={() => setShowPlayer(false)}
        />
      )}

      {/* Movie Modal */}
      {showModal && (
        <MovieModal movie={movie} onClose={() => setShowModal(false)} />
      )}
    </>
  )
}
