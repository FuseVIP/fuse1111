"use client"

import { motion, useScroll } from "framer-motion"

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[#FF3A2F] z-50"
      style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
    />
  )
}
