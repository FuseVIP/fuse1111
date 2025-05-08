"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "./auth-context"

type OnboardingStep = "welcome" | "profile" | "interests" | "wallet" | "complete"

interface OnboardingContextType {
  currentStep: OnboardingStep
  progress: number
  goToStep: (step: OnboardingStep) => void
  nextStep: () => void
  prevStep: () => void
  completeOnboarding: () => void
  skipOnboarding: () => void
  isOnboardingComplete: boolean
  setProfileData: (data: any) => void
  setInterests: (interests: string[]) => void
  profileData: any
  selectedInterests: string[]
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

const STEPS: OnboardingStep[] = ["welcome", "profile", "interests", "wallet", "complete"]

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome")
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false)
  const [profileData, setProfileData] = useState<any>({})
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const router = useRouter()
  const { user } = useAuth()

  // Calculate progress percentage based on current step
  const progress = ((STEPS.indexOf(currentStep) + 1) / STEPS.length) * 100

  useEffect(() => {
    // Check if onboarding is already complete
    const onboardingStatus = localStorage.getItem(`onboarding_complete_${user?.id}`)
    if (onboardingStatus === "true") {
      setIsOnboardingComplete(true)
    }

    // Load saved progress if available
    const savedStep = localStorage.getItem(`onboarding_step_${user?.id}`)
    if (savedStep && STEPS.includes(savedStep as OnboardingStep)) {
      setCurrentStep(savedStep as OnboardingStep)
    }

    // Load saved profile data if available
    const savedProfileData = localStorage.getItem(`onboarding_profile_${user?.id}`)
    if (savedProfileData) {
      try {
        setProfileData(JSON.parse(savedProfileData))
      } catch (e) {
        console.error("Error parsing saved profile data", e)
      }
    }

    // Load saved interests if available
    const savedInterests = localStorage.getItem(`onboarding_interests_${user?.id}`)
    if (savedInterests) {
      try {
        setSelectedInterests(JSON.parse(savedInterests))
      } catch (e) {
        console.error("Error parsing saved interests", e)
      }
    }
  }, [user?.id])

  // Save current step to localStorage whenever it changes
  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(`onboarding_step_${user.id}`, currentStep)
    }
  }, [currentStep, user?.id])

  const goToStep = (step: OnboardingStep) => {
    setCurrentStep(step)
  }

  const nextStep = () => {
    const currentIndex = STEPS.indexOf(currentStep)
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1])
    }
  }

  const prevStep = () => {
    const currentIndex = STEPS.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1])
    }
  }

  const completeOnboarding = () => {
    if (user?.id) {
      localStorage.setItem(`onboarding_complete_${user.id}`, "true")
      setIsOnboardingComplete(true)
      router.push("/dashboard")
    }
  }

  const skipOnboarding = () => {
    if (user?.id) {
      localStorage.setItem(`onboarding_complete_${user.id}`, "true")
      setIsOnboardingComplete(true)
      router.push("/dashboard")
    }
  }

  const handleSetProfileData = (data: any) => {
    setProfileData({ ...profileData, ...data })
    if (user?.id) {
      localStorage.setItem(`onboarding_profile_${user.id}`, JSON.stringify({ ...profileData, ...data }))
    }
  }

  const handleSetInterests = (interests: string[]) => {
    setSelectedInterests(interests)
    if (user?.id) {
      localStorage.setItem(`onboarding_interests_${user.id}`, JSON.stringify(interests))
    }
  }

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        progress,
        goToStep,
        nextStep,
        prevStep,
        completeOnboarding,
        skipOnboarding,
        isOnboardingComplete,
        setProfileData: handleSetProfileData,
        setInterests: handleSetInterests,
        profileData,
        selectedInterests,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export const useOnboarding = () => {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider")
  }
  return context
}
