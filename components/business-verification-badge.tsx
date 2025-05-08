"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface BusinessVerificationBadgeProps {
  businessName: string
  logoUrl?: string
}

export function BusinessVerificationBadge({ businessName, logoUrl }: BusinessVerificationBadgeProps) {
  return (
    <div className="w-full p-8 flex justify-center items-center min-h-[300px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#1A1A1A] rounded-lg p-8 text-center border-2 border-[#FF8C00] shadow-[0_0_20px_rgba(255,140,0,0.3)]"
        style={{ animation: "pulse 2s infinite" }}
      >
        {logoUrl ? (
          <Image
            src={logoUrl || "/placeholder.svg"}
            width={200}
            height={200}
            alt={`${businessName} Logo`}
            className="max-w-[200px] mx-auto mb-6"
          />
        ) : (
          <div className="w-[200px] h-[100px] bg-[#2A2A2A] rounded-lg mx-auto mb-6 flex items-center justify-center">
            <span className="text-[#FF8C00] font-bold text-xl">{businessName.charAt(0)}</span>
          </div>
        )}
        <h1 className="font-bold text-2xl mb-2">
          <span className="text-[#007BFF] block mb-1">{businessName}</span>
          <span className="text-[#FF8C00]">Verified Member</span>
        </h1>

        <style jsx global>{`
          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(255, 140, 0, 0.4);
            }
            70% {
              box-shadow: 0 0 0 20px rgba(255, 140, 0, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(255, 140, 0, 0);
            }
          }
        `}</style>
      </motion.div>
    </div>
  )
}
