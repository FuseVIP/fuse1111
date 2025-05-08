"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface MovingCommandProps {
  command: string
  delay?: number
  duration?: number
}

export function MovingCommand({ command, delay = 0, duration = 10 }: MovingCommandProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className="font-mono text-sm sm:text-base md:text-lg overflow-hidden bg-black/80 text-green-400 p-3 rounded-md">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{
            duration,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
          className="inline-block whitespace-nowrap"
        >
          $ {command}
        </motion.span>
      </motion.div>
    </div>
  )
}
