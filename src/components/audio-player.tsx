"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
// import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface AudioPlayerProps {
  src: string
  autoPlay?: boolean
}

export function AudioPlayer({ src, autoPlay = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const setAudioData = () => {
      setDuration(audio.duration)
      setCurrentTime(audio.currentTime)
    }

    const setAudioTime = () => setCurrentTime(audio.currentTime)

    // Add event listeners
    audio.addEventListener("loadeddata", setAudioData)
    audio.addEventListener("timeupdate", setAudioTime)

    // Autoplay if enabled
    if (autoPlay) {
      audio.play().catch((error) => console.log("Autoplay prevented:", error))
    }

    // Remove event listeners on cleanup
    return () => {
      audio.removeEventListener("loadeddata", setAudioData)
      audio.removeEventListener("timeupdate", setAudioTime)
    }
  }, [autoPlay])

  const togglePlay = () => {
    if (audioRef.current?.paused) {
      audioRef.current.play()
      setIsPlaying(true)
    } else {
      audioRef.current?.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  // const handleSliderChange = (newValue: number[]) => {
  //   const [value] = newValue
  //   if (audioRef.current) {
  //     audioRef.current.currentTime = value
  //     setCurrentTime(value)
  //   }
  // }

  return (
    <div className="bg-red-800 p-4 rounded-lg shadow-lg">
      <audio ref={audioRef} src={src} />
      <div className="flex items-center justify-between mb-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlay}
          className="text-yellow-300 hover:text-yellow-200 hover:bg-red-700/50"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>
        {/* <Slider
          value={[currentTime]}
          max={duration}
          step={0.1}
          onValueChange={handleSliderChange}
          className="w-full mx-4"
          aria-label="Song progress"
        /> */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMute}
          className="text-yellow-300 hover:text-yellow-200 hover:bg-red-700/50"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
        </Button>
      </div>
      <div className="text-yellow-300 text-sm text-center">
        {new Date(currentTime * 1000).toISOString().substr(14, 5)} /{" "}
        {new Date(duration * 1000).toISOString().substr(14, 5)}
      </div>
    </div>
  )
}

