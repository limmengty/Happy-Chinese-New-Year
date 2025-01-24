import { useEffect, useRef } from "react"

export function useSoundEffect() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio("/public/chinese-new-year.mp3")
  }, [])

  const play = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }
  }

  return { play }
}

