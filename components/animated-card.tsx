"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cardHoverVariants } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  interactive?: boolean
}

export function AnimatedCard({ children, className, interactive = true }: AnimatedCardProps) {
  return interactive ? (
    <motion.div
      className={cn("rounded-lg overflow-hidden", className)}
      variants={cardHoverVariants}
      initial="initial"
      whileHover="hover"
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  ) : (
    <div className={cn("rounded-lg overflow-hidden", className)}>{children}</div>
  )
}
