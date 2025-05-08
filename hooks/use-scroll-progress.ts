"use client"

import { useState, useEffect } from "react"

export function useScrollProgress() {
  const [completion, setCompletion] = useState(0)

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY
      const scrollHeight = document.body.scrollHeight - window.innerHeight

      if (scrollHeight > 0) {
        setCompletion(Number((currentProgress / scrollHeight).toFixed(2)) * 100)
      }
    }

    // Update scroll progress on mount
    updateScrollCompletion()

    // Add scroll event listener
    window.addEventListener("scroll", updateScrollCompletion)

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", updateScrollCompletion)
  }, [])

  return completion
}
