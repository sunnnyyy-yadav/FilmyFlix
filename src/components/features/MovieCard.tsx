'use client'

import { useState } from 'react'
import { Plus, Check, Play } from 'lucide-react'
import { Movie } from '@/lib/tmdb'
import { getImageUrl } from '@/lib/tmdb'
import { useWatchlistStore } from '@/stores/watchlistStore'
import MovieModal from './MovieModal'
import VideoPlayer from './VideoPlayer'

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [showModal, setShowModal] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlistStore()
  const inList = isInWatchlist(movie.id)

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (inList) {
      removeFromWatchlist(movie.id)
    } else {
      addToWatchlist({
        id: movie.id,
        title: movie.title || movie.name || '',
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        overview: movie.overview,
        vote_average: movie.vote_average,
      })
    }
  }

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowPlayer(true)
  }

  return (
    <>
      <div
        className="relative flex-shrink-0 w-[160px] md:w-[200px] cursor-pointer group"
        onClick={() => setShowModal(true)}
      >
        <div className="relative aspect-[2/3] rounded-md overflow-hidden">
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title || movie.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="text-white font-semibold text-sm line-clamp-1">
                {movie.title || movie.name}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={handlePlayClick}
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition"
                >
                  <Play className="w-4 h-4 text-black fill-current" />
                </button>
                <button
                  onClick={handleWatchlistClick}
                  className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition"
                >
                  {inList ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <Plus className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <MovieModal movie={movie} onClose={() => setShowModal(false)} />
      )}

      {showPlayer && (
        <VideoPlayer
          tmdbId={movie.id}
          title={movie.title || movie.name || ''}
          onClose={() => setShowPlayer(false)}
        />
      )}
    </>
  )
}
