'use client'

import { fetchTrending, fetchTopRated, fetchByGenre, Movie } from '@/lib/tmdb'
import Header from '@/components/layout/Header'
import HeroBanner from '@/components/features/HeroBanner'
import MovieRow from '@/components/features/MovieRow'
import Footer from '@/components/layout/Footer'
import EducationBanner from '@/components/layout/EducationBanner'
import { useEffect, useState } from 'react'

export default function BrowsePage() {
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState<{
    trending: Movie[]
    topRated: Movie[]
    action: Movie[]
    comedy: Movie[]
    horror: Movie[]
    romance: Movie[]
    documentaries: Movie[]
  }>({
    trending: [],
    topRated: [],
    action: [],
    comedy: [],
    horror: [],
    romance: [],
    documentaries: []
  })

  useEffect(() => {
    async function loadMovies() {
      try {
        const [trending, topRated, action, comedy, horror, romance, documentaries] = await Promise.all([
          fetchTrending(),
          fetchTopRated(),
          fetchByGenre(28), // Action
          fetchByGenre(35), // Comedy
          fetchByGenre(27), // Horror
          fetchByGenre(10749), // Romance
          fetchByGenre(99), // Documentaries
        ])

        setMovies({
          trending,
          topRated,
          action,
          comedy,
          horror,
          romance,
          documentaries
        })
      } catch (error) {
        console.error('Error loading movies:', error)
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [])

  const heroMovie = movies.trending[0] || movies.topRated[0]

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mb-4"></div>
          <p className="text-white">Loading FilmyFlix...</p>
        </div>
      </div>
    )
  }

  if (!heroMovie) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Welcome to FilmyFlix</h1>
          <p className="text-gray-400 mb-4">
            Please add your TMDB API key to .env.local to load movies
          </p>
          <a
            href="https://www.themoviedb.org/settings/api"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Get TMDB API Key
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      <EducationBanner />
      
      {/* Hero Banner */}
      <HeroBanner movie={heroMovie} />

      {/* Movie Rows */}
      <div className="relative z-10 -mt-32 pb-16">
            {movies.action.length > 0 && <MovieRow title="Action Movies" movies={movies.action} />}
            {movies.comedy.length > 0 && <MovieRow title="Comedies" movies={movies.comedy} />}
            {movies.horror.length > 0 && <MovieRow title="Horror Movies" movies={movies.horror} />}
            {movies.romance.length > 0 && <MovieRow title="Romance" movies={movies.romance} />}
            {movies.documentaries.length > 0 && <MovieRow title="Documentaries" movies={movies.documentaries} />}
      </div>

      <Footer />
    </div>
  )
}
