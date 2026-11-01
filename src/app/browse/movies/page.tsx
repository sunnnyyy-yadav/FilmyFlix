'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MovieCard from '@/components/features/MovieCard'
import { fetchTopRated, Movie } from '@/lib/tmdb'

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMovies() {
      try {
        const topRated = await fetchTopRated()
        setMovies(topRated)
      } catch (error) {
        console.error('Error loading movies:', error)
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [])

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />

      <main className="pt-24 pb-16 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Movies
          </h1>
          <p className="text-gray-400 mb-8">
            Browse all available movies
          </p>

          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
              <p className="text-gray-400 mt-4">Loading movies...</p>
            </div>
          ) : movies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {movies.map((movie, index) => (
                <div key={`movies-${movie.id}-${index}`}>
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-400 text-xl mb-4">
                No movies found
              </p>
              <Link href="/browse" className="text-red-600 hover:underline">
                Back to Browse
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
