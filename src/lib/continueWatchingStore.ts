'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ContinueWatchingItem {
  movieId: number
  title: string
  posterPath: string
  currentTime: number
  duration: number
  watchedAt: string
}

interface ContinueWatchingState {
  watchingItems: ContinueWatchingItem[]
  addToContinueWatching: (item: ContinueWatchingItem) => void
  updateWatchProgress: (movieId: number, currentTime: number, duration: number) => void
  removeContinueWatching: (movieId: number) => void
  getContinueWatching: (movieId: number) => ContinueWatchingItem | undefined
}

export const useContinueWatchingStore = create<ContinueWatchingState>()(
  persist(
    (set, get) => ({
      watchingItems: [],
      addToContinueWatching: (item) =>
        set((state) => {
          const existing = state.watchingItems.find(w => w.movieId === item.movieId)
          if (existing) {
            return {
              watchingItems: state.watchingItems.map(w =>
                w.movieId === item.movieId ? item : w
              ),
            }
          }
          return {
            watchingItems: [item, ...state.watchingItems],
          }
        }),
      updateWatchProgress: (movieId, currentTime, duration) =>
        set((state) => ({
          watchingItems: state.watchingItems.map(w =>
            w.movieId === movieId
              ? { ...w, currentTime, duration, watchedAt: new Date().toISOString() }
              : w
          ),
        })),
      removeContinueWatching: (movieId) =>
        set((state) => ({
          watchingItems: state.watchingItems.filter(w => w.movieId !== movieId),
        })),
      getContinueWatching: (movieId) => get().watchingItems.find(w => w.movieId === movieId),
    }),
    {
      name: 'filmyflix-continue-watching',
    }
  )
)
