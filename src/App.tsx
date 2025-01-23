import { AngPao } from "./components/ang-pao"
import { Particles } from "./components/particles"
import { motion } from "framer-motion"

function App() {


  return (
    <>
      <main className="relative min-h-screen bg-gradient-to-b from-red-800 via-red-700 to-red-900 flex items-center justify-center p-6 overflow-hidden">
      <Particles />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <AngPao
          amount={0.99}
          qrValue="https://pay.ababank.com/6RGAuDYU2m3mJRGm7"
          name="By QR Code"
          message="Wishing you prosperity and good fortune in the Year of the Dragon! 🐲"
        />
      </motion.div>
    </main>
    </>
  )
}

export default App
