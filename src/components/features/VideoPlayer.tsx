'use client'

import { useEffect, useRef, useState } from 'react'
import { X, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react'

interface VideoPlayerProps {
  tmdbId: number
  title: string
  season?: number
  episode?: number
  onClose: () => void
}

export default function VideoPlayer({
  tmdbId,
  title,
  season,
  episode,
  onClose,
}: VideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Build frameXTV embed URL
  const embedUrl = season && episode
    ? `${process.env.NEXT_PUBLIC_FRAMEXTV_BASE_URL || 'https://framextv.xyz/embed'}/${tmdbId}/${season}/${episode}?autoplay=1&muted=0&controls=1`
    : `${process.env.NEXT_PUBLIC_FRAMEXTV_BASE_URL || 'https://framextv.xyz/embed'}/${tmdbId}?autoplay=1&muted=0&controls=1`

  // PostMessage controls
  const sendCommand = (action: string, params?: any) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { action, ...params },
        '*'
      )
    }
  }

  const toggleMute = () => {
    sendCommand(isMuted ? 'unmute' : 'mute')
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Listen to player events
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.event === 'frameXTV:timeupdate') {
        // console.log('Progress:', event.data.currentTime, '/', event.data.duration)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <div ref={containerRef} className="relative w-full h-full">
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="w-10 h-10 rounded-full bg-zinc-900/80 hover:bg-zinc-800 flex items-center justify-center transition"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-white" />
            ) : (
              <Volume2 className="w-5 h-5 text-white" />
            )}
          </button>
          
          <button
            onClick={toggleFullscreen}
            className="w-10 h-10 rounded-full bg-zinc-900/80 hover:bg-zinc-800 flex items-center justify-center transition"
          >
            {isFullscreen ? (
              <Minimize className="w-5 h-5 text-white" />
            ) : (
              <Maximize className="w-5 h-5 text-white" />
            )}
          </button>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-zinc-900/80 hover:bg-zinc-800 flex items-center justify-center transition"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Title Overlay */}
        <div className="absolute top-4 left-4 z-10 bg-zinc-900/80 px-4 py-2 rounded-md">
          <h2 className="text-white font-semibold">
            {title}
            {season && episode && ` - S${season}E${episode}`}
          </h2>
        </div>

        {/* frameXTV Video Player */}
        <iframe
          ref={iframeRef}
          src={embedUrl}
          className="w-full h-full border-0"
          allowFullScreen
          allow="autoplay; encrypted-media; picture-in-picture"
          title={`${title} - frameXTV Stream Player`}
        />
      </div>
    </div>
  )
}
