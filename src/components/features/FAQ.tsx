'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqData = [
  {
    question: 'What is FilmyFlix?',
    answer: 'FilmyFlix is a Netflix-inspired streaming platform built for educational purposes. It demonstrates modern web development with Next.js, TypeScript, and React.',
  },
  {
    question: 'Is this a real streaming service?',
    answer: 'No, FilmyFlix is an educational project created to showcase web development skills. It is not affiliated with Netflix or any commercial streaming service.',
  },
  {
    question: 'Where can I watch?',
    answer: 'You can browse content, watch trailers, and explore features right in your browser. This is a demonstration of a streaming platform UI with real video integration.',
  },
  {
    question: 'How do I add movies to my watchlist?',
    answer: 'Simply hover over any movie poster and click the + button, or open the movie modal and click "Add to My List". Your watchlist is saved locally in your browser.',
  },
  {
    question: 'What is this project built with?',
    answer: 'FilmyFlix is built with Next.js 16, TypeScript, Tailwind CSS, TMDB API for movie data, and frameXTV for video streaming. All for educational purposes.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="py-16 md:py-24 px-4 md:px-12">
      <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-8 md:mb-12">
        Frequently Asked Questions
      </h2>

      <div className="max-w-3xl mx-auto space-y-2">
        {faqData.map((item, index) => (
          <div key={index} className="bg-zinc-800">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-zinc-700 transition"
            >
              <span className="text-lg md:text-xl text-white font-medium">
                {item.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="w-6 h-6 text-white flex-shrink-0 ml-4" />
              ) : (
                <ChevronDown className="w-6 h-6 text-white flex-shrink-0 ml-4" />
              )}
            </button>

            {openIndex === index && (
              <div className="px-5 md:px-6 pb-5 md:pb-6 pt-2 border-t border-zinc-700">
                <p className="text-gray-300 text-base md:text-lg">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
