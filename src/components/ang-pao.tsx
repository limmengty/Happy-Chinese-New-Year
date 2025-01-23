import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCode } from "./qr-code";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useConfetti } from "./confetti";
import { useSoundEffect } from "./sound-effect";
import { Coins, Sparkles } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { fireConfetti } = useConfetti();
  const { play } = useSoundEffect();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleOpen = async () => {
    setIsLoading(true);
    play();
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsOpen(true);
    fireConfetti();
    setIsLoading(false);
  };

  return (
    <div className={cn("relative w-full max-w-sm mx-auto", className)}>
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="front"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative bg-gradient-to-b from-red-500 via-red-600 to-red-700 rounded-3xl shadow-2xl overflow-hidden aspect-[3/4]"
          >
            <motion.div
              className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mEMMhoeAKA5mFjp9ROCA4aNMTQffR8.png')] opacity-20 bg-repeat"
              style={{ backgroundSize: "200px 200px" }}
              animate={{
                backgroundPosition: ["0px 0px", "200px 200px"],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-red-950/50 to-transparent" />
            <div className="relative h-full flex flex-col items-center justify-between p-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <h1 className="text-yellow-300 text-5xl font-bold tracking-tight">
                  恭喜发财
                </h1>
                <p className="text-yellow-200/80 text-lg">
                  Happy Chinese New Year
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleOpen}
                  disabled={isLoading}
                  className="relative bg-yellow-300 hover:bg-yellow-200 text-red-600 px-8 py-6 rounded-full text-xl font-semibold shadow-lg group"
                >
                  <span className="relative z-10">Click Here</span>
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

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <p className="text-yellow-300 text-2xl">新年快乐</p>
                <p className="text-yellow-200/80">Gong Xi Fa Cai</p>
              </motion.div>
            </div>

            <motion.div
              className="absolute top-4 right-4"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <Coins className="w-8 h-8 text-yellow-300/50" />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative bg-gradient-to-b from-red-500 via-red-600 to-red-700 rounded-3xl shadow-2xl overflow-hidden aspect-auto"
          >
            <motion.div
              className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mEMMhoeAKA5mFjp9ROCA4aNMTQffR8.png')] opacity-20 bg-repeat"
              style={{ backgroundSize: "200px 200px" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-red-950/50 to-transparent" />
            <div className="relative h-full flex flex-col items-center justify-between p-10 ">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-2"
              >
                <p className="text-yellow-200/80">Give me</p>
                <p className="text-yellow-300 pb-2 text-2xl font-bold">
                  {name}
                </p>
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
                <p className="text-yellow-300 text-lg">{message}</p>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="outline"
                  className="bg-transparent border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-red-600"
                >
                  Close
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
