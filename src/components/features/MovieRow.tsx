'use client'

import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Movie } from '@/lib/tmdb'
import MovieCard from './MovieCard'

interface MovieRowProps {
  title: string
  movies: Movie[]
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current
      const scrollAmount = clientWidth * 0.8
      
      rowRef.current.scrollTo({
        left: scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
        behavior: 'smooth'
      })

      setTimeout(() => {
        if (rowRef.current) {
          const newScrollLeft = rowRef.current.scrollLeft
          setShowLeftArrow(newScrollLeft > 0)
          setShowRightArrow(newScrollLeft < scrollWidth - clientWidth - 10)
        }
      }, 300)
    }
  }

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  return (
    <div className="py-4 md:py-6">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 px-4 md:px-12">
        {title}
      </h2>
      
      <div className="relative group">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-10 w-12 md:w-16 bg-zinc-950/50 hover:bg-zinc-950/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>
        )}

        {/* Movies Container */}
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex gap-2 md:gap-3 overflow-x-scroll scrollbar-hide px-4 md:px-12 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie, index) => (
            <div key={`${movie.id}-${index}`}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-10 w-12 md:w-16 bg-zinc-950/50 hover:bg-zinc-950/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>
        )}
      </div>
    </div>
  )
}
