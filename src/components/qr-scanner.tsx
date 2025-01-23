import { useState } from "react"
import { motion } from "framer-motion"

export function QRScanner() {
  const [isScanning, setIsScanning] = useState(true)

  return (
    <div className="relative">
      <motion.div
        className="absolute inset-0 bg-green-500/20"
        animate={{
          top: isScanning ? "100%" : "0%",
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        onAnimationComplete={() => setIsScanning((prev) => !prev)}
      />
    </div>
  )
}

