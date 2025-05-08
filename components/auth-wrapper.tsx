"use client"

import { useEffect, useState, type ReactNode } from "react"
import { useAuth } from "@/contexts/auth-context"

interface AuthWrapperProps {
  children: ReactNode
  fallback?: ReactNode
}

export function AuthWrapper({ children, fallback }: AuthWrapperProps) {
  const [isAuthReady, setIsAuthReady] = useState(false)
  const [authContext, setAuthContext] = useState<any>(null)

  useEffect(() => {
    try {
      const context = useAuth()
      setAuthContext(context)
      setIsAuthReady(true)
    } catch (error) {
      console.error("Auth context not available:", error)
      setIsAuthReady(true) // Consider setting to true even if error occurs, depending on desired behavior
    }
  }, [])

  // If auth is not ready and we have a fallback, show it
  if (!isAuthReady && fallback) {
    return <>{fallback}</>
  }

  // Otherwise, render children
  return <>{children}</>
}
