'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MovieCard from '@/components/features/MovieCard'
import SocialLinks from '@/components/features/SocialLinks'
import { Movie } from '@/lib/tmdb'
import { useContinueWatchingStore } from '@/lib/continueWatchingStore'

export default function ProfilePage() {
  const { watchingItems } = useContinueWatchingStore()
  const [continueWatching, setContinueWatching] = useState<Movie[]>([])

  useEffect(() => {
    // Convert continue watching items to movies
    const movies = watchingItems.map(item => ({
      id: item.movieId,
      title: item.title,
      name: item.title,
      overview: '',
      poster_path: item.posterPath,
      backdrop_path: '',
      release_date: '',
      vote_average: 0,
      genre_ids: [],
      media_type: 'movie'
    }))
    setContinueWatching(movies)
  }, [watchingItems])

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />

      <main className="pt-24 pb-16 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Continue Watching Section */}
          {continueWatching.length > 0 && (
            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Continue Watching
              </h1>
              <p className="text-gray-400 mb-8">
                Resume your viewing
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {continueWatching.map((movie, index) => (
                  <div key={`continue-${movie.id}-${index}`}>
                    <MovieCard movie={movie} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* My List Section */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              My List
            </h1>
            <p className="text-gray-400 mb-8">
              Your saved movies
            </p>

            <MyWatchlist />
          </div>

          {/* Social Links Section */}
          <div className="mt-16 border-t border-zinc-800 pt-12">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Connect with me
            </h2>
            <SocialLinks />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function MyWatchlist() {
  const [watchlist, setWatchlist] = useState<any[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('netflix-watchlist')
    if (stored) {
      try {
        const data = JSON.parse(stored)
        setWatchlist(data.watchlist || [])
      } catch (e) {
        console.error('Error loading watchlist:', e)
      }
    }
  }, [])

  if (watchlist.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 text-xl mb-4">
          You haven't added any movies to your list yet.
        </p>
        <Link
          href="/browse"
          className="inline-block px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
        >
          Browse Movies
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {watchlist.map((movie, index) => (
        <div key={`watchlist-${movie.id}-${index}`} className="relative aspect-[2/3] rounded-md overflow-hidden group">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Link
              href={`/movie/${movie.id}`}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Watch
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
