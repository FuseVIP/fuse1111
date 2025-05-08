"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: string
  businessOnly?: boolean
}

export function ProtectedRoute({ children, requiredRole, businessOnly = false }: ProtectedRouteProps) {
  const { user, isLoading, isAdmin, isBusinessOwner, roles, portalRoles } = useAuth()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
    if (!isLoading) {
      // Not logged in
      if (!user) {
        router.push("/login?redirect=" + encodeURIComponent(window.location.pathname))
        return
      }

      // Check if role is required
      if (requiredRole) {
        const hasRole = roles.includes(requiredRole) || portalRoles.includes(requiredRole)
        const isAdminAccess = requiredRole === "admin" && isAdmin

        if (!hasRole && !isAdminAccess) {
          router.push("/dashboard")
          return
        }
      }

      // Check if business only
      if (businessOnly && !isBusinessOwner) {
        router.push("/dashboard")
        return
      }

      setIsAuthorized(true)
      setIsCheckingAuth(false)
    }
  }, [user, isLoading, isAdmin, isBusinessOwner, roles, portalRoles, router, requiredRole, businessOnly])

  if (isLoading || isCheckingAuth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-[#3A56FF]" />
        <p className="mt-4 text-lg text-gray-600">Verifying access...</p>
      </div>
    )
  }

  return isAuthorized ? <>{children}</> : null
}
