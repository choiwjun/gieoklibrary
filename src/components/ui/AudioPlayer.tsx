'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from './Button'

interface AudioPlayerProps {
  src: string
  className?: string
}

export function AudioPlayer({ src, className = '' }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const time = parseFloat(e.target.value)
    audio.currentTime = time
    setCurrentTime(time)
  }

  const changePlaybackRate = () => {
    const audio = audioRef.current
    if (!audio) return

    const rates = [1, 1.25, 1.5, 1.75, 2]
    const currentIndex = rates.indexOf(playbackRate)
    const nextRate = rates[(currentIndex + 1) % rates.length]
    audio.playbackRate = nextRate
    setPlaybackRate(nextRate)
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const skip = (seconds: number) => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = Math.max(0, Math.min(duration, currentTime + seconds))
  }

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-secondary-200 p-6 ${className}`}>
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* 진행 바 */}
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #7C3AED 0%, #7C3AED ${(currentTime / duration) * 100}%, #E5E7EB ${(currentTime / duration) * 100}%, #E5E7EB 100%)`,
          }}
        />
        <div className="flex items-center justify-between mt-2 text-sm text-secondary-600">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* 컨트롤 */}
      <div className="flex items-center justify-center gap-4">
        {/* 15초 뒤로 */}
        <button
          onClick={() => skip(-15)}
          className="w-10 h-10 rounded-full hover:bg-secondary-100 flex items-center justify-center transition-colors"
          title="15초 뒤로"
        >
          <svg className="w-6 h-6 text-secondary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
          </svg>
        </button>

        {/* 재생/일시정지 */}
        <button
          onClick={togglePlay}
          className="w-16 h-16 rounded-full bg-primary-600 hover:bg-primary-700 flex items-center justify-center transition-colors shadow-lg"
        >
          {isPlaying ? (
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* 15초 앞으로 */}
        <button
          onClick={() => skip(15)}
          className="w-10 h-10 rounded-full hover:bg-secondary-100 flex items-center justify-center transition-colors"
          title="15초 앞으로"
        >
          <svg className="w-6 h-6 text-secondary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
          </svg>
        </button>

        {/* 재생 속도 */}
        <button
          onClick={changePlaybackRate}
          className="ml-4 px-4 py-2 rounded-lg bg-secondary-100 hover:bg-secondary-200 text-secondary-700 font-medium transition-colors"
          title="재생 속도 변경"
        >
          {playbackRate}x
        </button>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #7C3AED;
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #7C3AED;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  )
}
