'use client'

import { useState, useEffect } from 'react'
import { X, Play, Plus, Check } from 'lucide-react'
import YouTube from 'react-youtube'
import { Movie, fetchMovieDetails, MovieDetails, getImageUrl } from '@/lib/tmdb'
import { useWatchlistStore } from '@/stores/watchlistStore'

interface MovieModalProps {
  movie: Movie
  onClose: () => void
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const [details, setDetails] = useState<MovieDetails | null>(null)
  const [trailerKey, setTrailerKey] = useState<string | null>(null)
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlistStore()
  const inList = isInWatchlist(movie.id)

  useEffect(() => {
    const loadDetails = async () => {
      const mediaType = movie.media_type || 'movie'
      const data = await fetchMovieDetails(movie.id, mediaType)
      if (!data) return
      
      setDetails(data)
      
      // Find trailer
      const trailer = data.videos?.results.find(
        (video) => video.type === 'Trailer' && video.site === 'YouTube'
      )
      if (trailer) {
        setTrailerKey(trailer.key)
      }
    }
    loadDetails()
  }, [movie.id, movie.media_type])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="relative w-full max-w-4xl bg-zinc-900 rounded-lg overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-zinc-900/80 flex items-center justify-center hover:bg-zinc-800 transition"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Trailer / Image */}
        <div className="relative aspect-video bg-zinc-800">
          {trailerKey ? (
            <YouTube
              videoId={trailerKey}
              opts={{
                width: '100%',
                height: '100%',
                playerVars: {
                  autoplay: 0,
                  modestbranding: 1,
                },
              }}
              className="w-full h-full"
            />
          ) : (
            <img
              src={getImageUrl(movie.backdrop_path, 'original')}
              alt={movie.title || movie.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Details */}
        <div className="p-6 md:p-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            {movie.title || movie.name}
          </h2>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => {
                onClose()
                // Open video player
                const event = new CustomEvent('playMovie', { detail: { movie } })
                window.dispatchEvent(event)
              }}
              className="flex items-center gap-2 px-6 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition"
            >
              <Play className="w-5 h-5 fill-current" />
              Play
            </button>
            <button
              onClick={() => {
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
              }}
              className="flex items-center gap-2 px-6 py-2 bg-zinc-800 text-white font-semibold rounded-md hover:bg-zinc-700 transition"
            >
              {inList ? (
                <>
                  <Check className="w-5 h-5" />
                  In My List
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  My List
                </>
              )}
            </button>
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-4 mb-4 text-sm">
            <span className="text-green-500 font-semibold">
              {Math.round(movie.vote_average * 10)}% Match
            </span>
            <span className="text-gray-400">
              {details?.release_date?.split('-')[0] || details?.first_air_date?.split('-')[0]}
            </span>
            {details?.runtime && (
              <span className="text-gray-400">{details.runtime} min</span>
            )}
          </div>

          {/* Overview */}
          <p className="text-gray-300 leading-relaxed mb-6">
            {movie.overview}
          </p>

          {/* Genres */}
          {details?.genres && (
            <div className="flex flex-wrap gap-2">
              {details.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-zinc-800 text-gray-300 text-sm rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
