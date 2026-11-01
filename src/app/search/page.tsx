'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MovieCard from '@/components/features/MovieCard'
import { Movie } from '@/lib/tmdb'

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const searchMovies = async () => {
      if (!query) {
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        // Search using TMDB API
        const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
        const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL
        
        const res = await fetch(
          `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
        )
        
        if (res.ok) {
          const data = await res.json()
          setResults(data.results || [])
        } else {
          // Fallback to sample data
          const { sampleMovies } = await import('@/lib/sampleMovies')
          const filtered = sampleMovies.filter(m => 
            m.title.toLowerCase().includes(query.toLowerCase()) ||
            m.overview.toLowerCase().includes(query.toLowerCase())
          )
          setResults(filtered)
        }
      } catch (error) {
        console.error('Search error:', error)
        // Fallback to sample data
        const { sampleMovies } = await import('@/lib/sampleMovies')
        const filtered = sampleMovies.filter(m => 
          m.title.toLowerCase().includes(query.toLowerCase()) ||
          m.overview.toLowerCase().includes(query.toLowerCase())
        )
        setResults(filtered)
      } finally {
        setLoading(false)
      }
    }

    searchMovies()
  }, [query])

  return (
    <>
      <main className="pt-24 pb-16 px-4 md:px-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Search Results
        </h1>
        <p className="text-gray-400 mb-8">
          {query ? `Showing results for "${query}"` : 'Enter a search query'}
        </p>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            <p className="text-gray-400 mt-4">Searching...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {results.map((movie) => (
              <div key={`${movie.id}-${Math.random()}`}>
                <MovieCard key={movie.id} movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl mb-4">
              No results found for "{query}"
            </p>
            <p className="text-gray-500">
              Try searching for something else
            </p>
          </div>
        )}
      </main>
    </>
  )
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      
      <Suspense fallback={
        <div className="pt-24 pb-16 px-4 md:px-12">
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        </div>
      }>
        <SearchContent />
      </Suspense>

      <Footer />
    </div>
  )
}
