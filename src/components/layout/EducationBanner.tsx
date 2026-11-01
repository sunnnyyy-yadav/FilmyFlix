'use client'

import { useState } from 'react'
import { X, GraduationCap } from 'lucide-react'

export default function EducationBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-2xl p-4 border border-blue-400/30">
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 text-white/80 hover:text-white transition"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-white font-bold text-lg mb-1">
            📚 Educational Purpose Only
          </h3>
          <p className="text-white/90 text-sm leading-relaxed">
            This project is created for <strong>educational and learning purposes</strong> to demonstrate modern web development skills with Next.js, TypeScript, and React.
          </p>
          <p className="text-white/80 text-xs mt-2 italic">
            Not affiliated with Netflix or any streaming service.
          </p>
        </div>
      </div>
    </div>
  )
}
