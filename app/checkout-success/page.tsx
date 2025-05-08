"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Check, ArrowRight } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { AnimatedCard } from "@/components/animated-card"
import Link from "next/link"

export default function CheckoutSuccess() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isGuest, setIsGuest] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showSignupForm, setShowSignupForm] = useState(false)
  const [accountCreated, setAccountCreated] = useState(false)

  useEffect(() => {
    // Check if this is a guest purchase
    const isGuestPurchase = searchParams.get("guest") === "true"
    setIsGuest(isGuestPurchase)

    // If guest purchase, show signup form and pre-fill email if available
    if (isGuestPurchase) {
      setShowSignupForm(true)
      const guestEmail = searchParams.get("email")
      if (guestEmail) {
        setEmail(decodeURIComponent(guestEmail))
      }
    }

    // Redirect authenticated users to profile portal after a delay
    if (!isGuestPurchase) {
      const redirectTimer = setTimeout(() => {
        router.push("/dashboard?tab=card")
      }, 5000)

      return () => clearTimeout(redirectTimer)
    }
  }, [searchParams, router])

  const handleSignup = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Sign up with email and password
      const { error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard?tab=card`,
        },
      })

      if (signupError) throw signupError

      // Show success message
      setShowSignupForm(false)
      setAccountCreated(true)

      // Redirect to profile portal after a delay
      setTimeout(() => {
        router.push("/dashboard?tab=card")
      }, 3000)
    } catch (error) {
      console.error("Error signing up:", error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <AnimatedSection>
        <AnimatedCard className="max-w-md w-full p-8">
          <div className="text-center mb-6">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-gray-900">Payment Successful!</h1>
            <p className="mt-2 text-gray-600">Thank you for your purchase. Your VIP card has been activated.</p>
          </div>

          {isGuest && showSignupForm ? (
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900">Complete Your Account</h2>
              <p className="mt-1 text-sm text-gray-600">Create a password to access your VIP benefits</p>

              <form onSubmit={handleSignup} className="mt-4 space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    readOnly={email !== ""}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                {error && <div className="text-red-600 text-sm">{error}</div>}

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3A56FF] hover:bg-[#2A46EF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>
            </div>
          ) : (
            <div className="mt-6">
              <p className="text-center text-gray-600">
                {isGuest && accountCreated
                  ? "Your account has been created. You can now access your VIP benefits."
                  : isGuest
                    ? "Create an account to access your VIP benefits."
                    : "You will be redirected to your dashboard in a few seconds."}
              </p>

              <div className="mt-6 flex justify-center">
                {isGuest && !accountCreated ? (
                  <button
                    onClick={() => setShowSignupForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3A56FF] hover:bg-[#2A46EF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                ) : (
                  <Link
                    href="/dashboard?tab=card"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3A56FF] hover:bg-[#2A46EF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View My VIP Card
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          )}
        </AnimatedCard>
      </AnimatedSection>
    </div>
  )
}
