'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Movie {
  id: number
  title: string
  poster_path: string
  backdrop_path: string
  overview: string
  vote_average: number
}

interface WatchlistState {
  watchlist: Movie[]
  addToWatchlist: (movie: Movie) => void
  removeFromWatchlist: (id: number) => void
  isInWatchlist: (id: number) => boolean
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      watchlist: [],
      addToWatchlist: (movie) =>
        set((state) => ({
          watchlist: [...state.watchlist, movie],
        })),
      removeFromWatchlist: (id) =>
        set((state) => ({
          watchlist: state.watchlist.filter((m) => m.id !== id),
        })),
      isInWatchlist: (id) => get().watchlist.some((m) => m.id === id),
    }),
    {
      name: 'netflix-watchlist',
    }
  )
)
