'use client'

import { useEffect, useState, Suspense } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Play, Plus, Check, Star } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import VideoPlayer from '@/components/features/VideoPlayer'
import { Movie, fetchMovieDetails, MovieDetails, getImageUrl } from '@/lib/tmdb'
import { useWatchlistStore } from '@/stores/watchlistStore'
import { useContinueWatchingStore } from '@/lib/continueWatchingStore'
import { sampleMovies } from '@/lib/sampleMovies'

function MovieContent() {
  const params = useParams()
  const movieId = Number(params.id)
  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [showPlayer, setShowPlayer] = useState(false)
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlistStore()
  const { getContinueWatching } = useContinueWatchingStore()
  const inList = isInWatchlist(movieId)
  const continueWatching = getContinueWatching(movieId)

  useEffect(() => {
    async function loadMovie() {
      try {
        const details = await fetchMovieDetails(movieId)
        if (details) {
          setMovie(details)
        } else {
          // Fallback to sample
          const sample = sampleMovies.find(m => m.id === movieId)
          if (sample) {
            setMovie({
              ...sample,
              runtime: 120,
              genres: [{ id: 1, name: 'Drama' }],
              videos: { results: [] }
            } as MovieDetails)
          }
        }
      } catch (error) {
        console.error('Error loading movie:', error)
      } finally {
        setLoading(false)
      }
    }

    loadMovie()
  }, [movieId])

  const handleAddToWatchlist = () => {
    if (inList) {
      removeFromWatchlist(movieId)
    } else if (movie) {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Movie not found</h1>
          <Link href="/browse" className="text-red-600 hover:underline">
            Back to Browse
          </Link>
        </div>
      </div>
    )
  }

  const title = movie.title || movie.name || ''

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />

      {showPlayer && (
        <VideoPlayer
          tmdbId={movieId}
          title={title}
          onClose={() => setShowPlayer(false)}
        />
      )}

      {/* Hero Section with Backdrop */}
      <div className="relative h-96 mt-20 overflow-hidden">
        <img
          src={getImageUrl(movie.backdrop_path, 'original')}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />

        {/* Back Button */}
        <Link
          href="/browse"
          className="absolute top-4 left-4 z-10 flex items-center gap-2 px-4 py-2 bg-black/50 hover:bg-black/70 rounded-lg transition"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
          <span className="text-white">Back</span>
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10 -mt-24 px-4 md:px-12 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="flex-shrink-0 md:w-64">
              <img
                src={getImageUrl(movie.poster_path)}
                alt={title}
                className="w-full rounded-lg shadow-2xl"
              />
            </div>

            {/* Details */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {title}
              </h1>

              {/* Rating and Info */}
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-white font-semibold">
                    {Math.round(movie.vote_average * 10)}%
                  </span>
                </div>
                {movie.release_date && (
                  <span className="text-gray-400">
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                )}
                {movie.runtime && (
                  <span className="text-gray-400">{movie.runtime} min</span>
                )}
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-red-600/30 text-red-300 text-sm rounded-full"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {movie.overview}
              </p>

              {/* Continue Watching */}
              {continueWatching && (
                <div className="mb-6 p-4 bg-red-600/20 border border-red-600/50 rounded-lg">
                  <p className="text-sm text-gray-300 mb-2">
                    Continue Watching at {Math.floor(continueWatching.currentTime / 60)}m {Math.floor(continueWatching.currentTime % 60)}s
                  </p>
                  <div className="w-full bg-zinc-700 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${(continueWatching.currentTime / continueWatching.duration) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setShowPlayer(true)}
                  className="flex items-center gap-2 px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                >
                  <Play className="w-5 h-5 fill-current" />
                  {continueWatching ? 'Resume' : 'Play'}
                </button>
                <button
                  onClick={handleAddToWatchlist}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition"
                >
                  {inList ? (
                    <>
                      <Check className="w-5 h-5" />
                      In My List
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Add to List
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function MoviePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    }>
      <MovieContent />
    </Suspense>
  )
}
