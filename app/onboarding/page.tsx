"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { OnboardingProvider } from "@/contexts/onboarding-context"
import { OnboardingContainer } from "@/components/onboarding/onboarding-container"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"

export default function OnboardingPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/onboarding")
    }
  }, [user, isLoading, router])

  return (
    <ProtectedRoute>
      <OnboardingProvider>
        <div className="min-h-screen bg-gray-50 py-12">
          <OnboardingContainer />
        </div>
      </OnboardingProvider>
    </ProtectedRoute>
  )
}
