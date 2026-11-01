const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL
const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL

export interface Movie {
  id: number
  title: string
  name?: string
  overview: string
  poster_path: string
  backdrop_path: string
  release_date?: string
  first_air_date?: string
  vote_average: number
  genre_ids: number[]
  media_type?: string
}

export interface MovieDetails extends Movie {
  runtime: number
  genres: { id: number; name: string }[]
  videos?: {
    results: {
      key: string
      type: string
      site: string
    }[]
  }
}

// Check if TMDB API is configured
const isTMDBConfigured = TMDB_API_KEY && TMDB_API_KEY !== 'demo_key_replace_with_real_one'

async function fetchWithErrorHandling(url: string): Promise<any> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) {
      console.warn(`TMDB API Error: ${res.status} - Using sample data instead`)
      return { results: [] }
    }
    const data = await res.json()
    return data
  } catch (error) {
    console.warn('TMDB API Error - Using sample data:', error)
    return { results: [] }
  }
}

export async function fetchTrending(): Promise<Movie[]> {
  if (!isTMDBConfigured) {
    const { getSampleMovies } = await import('./sampleMovies')
    return getSampleMovies(20)
  }
  const data = await fetchWithErrorHandling(
    `${TMDB_BASE_URL}/trending/all/week?api_key=${TMDB_API_KEY}`
  )
  if (!data.results || data.results.length === 0) {
    const { getSampleMovies } = await import('./sampleMovies')
    return getSampleMovies(20)
  }
  return data.results || []
}

export async function fetchTopRated(): Promise<Movie[]> {
  if (!isTMDBConfigured) {
    const { getSampleMovies } = await import('./sampleMovies')
    return getSampleMovies(20)
  }
  const data = await fetchWithErrorHandling(
    `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`
  )
  if (!data.results || data.results.length === 0) {
    const { getSampleMovies } = await import('./sampleMovies')
    return getSampleMovies(20)
  }
  return data.results || []
}

export async function fetchByGenre(genreId: number): Promise<Movie[]> {
  if (!isTMDBConfigured) {
    const { getSampleMovies } = await import('./sampleMovies')
    return getSampleMovies(15)
  }
  const data = await fetchWithErrorHandling(
    `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}`
  )
  if (!data.results || data.results.length === 0) {
    const { getSampleMovies } = await import('./sampleMovies')
    return getSampleMovies(15)
  }
  return data.results || []
}

export async function fetchMovieDetails(
  id: number,
  mediaType: string = 'movie'
): Promise<MovieDetails | null> {
  if (!isTMDBConfigured) {
    const { sampleMovies } = await import('./sampleMovies')
    const movie = sampleMovies.find(m => m.id === id)
    if (movie) {
      return {
        ...movie,
        runtime: 120,
        genres: [{ id: 1, name: 'Drama' }],
        videos: { results: [] }
      } as MovieDetails
    }
    return null
  }
  
  try {
    const data = await fetchWithErrorHandling(
      `${TMDB_BASE_URL}/${mediaType}/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos`
    )
    return data.id ? data : null
  } catch (error) {
    console.error('Error fetching movie details:', error)
    return null
  }
}

export function getImageUrl(path: string, size: string = 'w500'): string {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image'
  return `${TMDB_IMAGE_URL}/${size}${path}`
}
