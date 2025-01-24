import { useEffect, useState, useRef } from "react"

export function useAppOpenSound() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio("/chinese-new-year.mp3")
    audioRef.current.loop = true

    audioRef.current.addEventListener("canplaythrough", () => {
      setIsReady(true)
    })

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.removeEventListener("canplaythrough", () => {
          setIsReady(true)
        })
        audioRef.current = null
      }
    }
  }, [])

  const playSound = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((error) => {
          console.log("Playback was prevented:", error)
        })
    }
  }

  const pauseSound = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const togglePlay = () => {
    if (isPlaying) {
      pauseSound()
    } else {
      playSound()
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  return { togglePlay, toggleMute, isPlaying, isMuted, isReady, setIsPlaying }
}
