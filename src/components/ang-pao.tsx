import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCode } from "./qr-code";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useConfetti } from "./confetti";
import { Music, Pause, Play, Sparkles, Volume2, VolumeX } from "lucide-react";
import { useAppOpenSound } from "./app-open-sound";
import { Toast } from "@/components/ui/toast";

interface AngPaoProps {
  amount: number;
  qrValue: string;
  name: string;
  message: string;
  className?: string;
}

export function AngPao({
  amount,
  qrValue,
  name,
  message,
  className,
}: AngPaoProps) {
  const [, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { fireConfetti } = useConfetti();
  const [mounted, setMounted] = useState(false);
  const { togglePlay, toggleMute, isPlaying, isMuted, isReady } =
    useAppOpenSound();
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setMounted(true);
    fireConfetti();
  }, [fireConfetti]);

  if (!mounted) return null;

  const handleOpen = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    togglePlay();
    setIsOpen(true);
    fireConfetti();
    setIsLoading(false);
  
    // Redirect to another link
    window.location.href = "https://pay.ababank.com/xzqkJj6MGq85CKNh7"; // Replace "/new-link" with your target URL
  };
  

  return (
    <div className={cn("relative w-full max-w-sm mx-auto", className)}>
      <>
        <div className="absolute top-4 right-4 z-50 flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlay}
            className={`text-yellow-300 hover:text-yellow-200 hover:bg-red-700/50 ${
              isReady ? "animate-pulse" : ""
            }`}
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="text-yellow-300 hover:text-yellow-200 hover:bg-red-700/50"
            aria-label={isMuted ? "Unmute sound" : "Mute sound"}
          >
            {isMuted ? (
              <VolumeX className="h-6 w-6" />
            ) : (
              <Volume2 className="h-6 w-6" />
            )}
          </Button>
          {isReady && !isPlaying && (
            <Music className="h-6 w-6 text-yellow-300 animate-bounce" />
          )}
        </div>
        {showToast && isReady && !isPlaying && (
          <Toast
            title="Music is ready!"
            description="Click the play button to start the music."
            duration={5000}
          />
        )}
      </>
      <AnimatePresence mode="wait">
        <motion.div
          key="back"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="relative bg-gradient-to-b from-red-500 via-red-600 to-red-700 rounded-3xl shadow-2xl overflow-hidden aspect-auto"
        >
          <motion.div
            className="absolute inset-0 opacity-20 bg-repeat"
            style={{ backgroundSize: "200px 200px" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-red-950/50 to-transparent" />
          <div className="relative h-full flex flex-col items-center justify-between p-10 ">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-2"
            >
              <h1 className="text-yellow-300 text-2xl pb-4 font-bold tracking-tight">
                {name}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-6 text-center"
            >
              <div className="relative">
                <QRCode value={qrValue} />
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="text-yellow-300 text-5xl font-bold"
              >
                ${amount.toFixed(2)}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center space-y-2"
            >
              <p className="text-yellow-300 text-md">{message}</p>
              <Button
                onClick={handleOpen}
                disabled={isLoading}
                className="relative bg-yellow-300 hover:bg-yellow-200 text-red-600 px-8 py-6 rounded-full text-xl font-semibold shadow-lg group"
              >
                <span className="relative z-10">Give Me</span>
                <motion.div
                  className="absolute inset-0 rounded-full bg-yellow-200/50"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
