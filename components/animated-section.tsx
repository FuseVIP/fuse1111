"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  duration?: number
  threshold?: number
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.5,
  threshold = 0.2,
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold])

  // Define the animations for different directions
  const getAnimationProps = () => {
    switch (direction) {
      case "up":
        return {
          initial: { opacity: 0, y: 40 },
          animate: isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
        }
      case "down":
        return {
          initial: { opacity: 0, y: -40 },
          animate: isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 },
        }
      case "left":
        return {
          initial: { opacity: 0, x: 40 },
          animate: isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 },
        }
      case "right":
        return {
          initial: { opacity: 0, x: -40 },
          animate: isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 },
        }
      case "none":
        return {
          initial: { opacity: 0 },
          animate: isVisible ? { opacity: 1 } : { opacity: 0 },
        }
      default:
        return {
          initial: { opacity: 0, y: 20 },
          animate: isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
        }
    }
  }

  return (
    <div ref={ref} className={cn(className)}>
      <motion.div {...getAnimationProps()} transition={{ duration, delay, ease: "easeOut" }}>
        {children}
      </motion.div>
    </div>
  )
}
