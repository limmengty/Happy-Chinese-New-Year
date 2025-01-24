import { QRCodeSVG } from "qrcode.react"
import { cn } from "@/lib/utils"
import { QRScanner } from "./qr-scanner"

interface QRCodeProps {
  value: string
  size?: number
  className?: string
}

export function QRCode({ value, size = 180, className }: QRCodeProps) {
  return (
    <div className={cn("relative p-2 bg-white rounded-2xl shadow-inner", className)}>
      <QRCodeSVG value={value} size={size} level="H" includeMargin />
      <QRScanner />
    </div>
  )
}

