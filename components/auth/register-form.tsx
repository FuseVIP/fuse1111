"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { motion } from "framer-motion"
import { AlertCircle, CheckCircle, Loader2, Building2, ChevronDown } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { BusinessCombobox } from "@/components/business/business-combobox"

export function RegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isBusinessApplicant, setIsBusinessApplicant] = useState(false)
  const [businessExpanded, setBusinessExpanded] = useState(false)

  // Business fields
  const [businessName, setBusinessName] = useState("")
  const [website, setWebsite] = useState("")
  const [category, setCategory] = useState("")
  const [contactName, setContactName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [proposedDiscount, setProposedDiscount] = useState("")
  const [logoUrl, setLogoUrl] = useState("")
  const [referral, setReferral] = useState("")
  const [businessReferral, setBusinessReferral] = useState("")
  const [referringBusinessId, setReferringBusinessId] = useState("")
  const [referringBusinessName, setReferringBusinessName] = useState("")

  const { signUp } = useAuth()
  const router = useRouter()

  const categories = [
    "Retail",
    "Food & Beverage",
    "Healthcare",
    "Technology",
    "Finance",
    "Education",
    "Entertainment",
    "Hospitality",
    "Beauty & Personal Care",
    "Real Estate",
    "Other",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate form
    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      setError("All required fields must be filled")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    // Validate business fields if applying as business
    if (isBusinessApplicant) {
      if (!businessName || !category || !contactName || !contactEmail || !proposedDiscount) {
        setError("All required business fields must be filled")
        return
      }
    }

    setIsLoading(true)

    try {
      // Register the user
      const { error: signUpError, data } = await signUp(email, password)

      if (signUpError) {
        setError(signUpError.message || "Failed to register. Please try again.")
        setIsLoading(false)
        return
      }

      const userId = data?.user?.id

      if (!userId) {
        setError("User registration successful but user ID not found. Please try logging in.")
        setIsLoading(false)
        return
      }

      // Create profile
      const { error: profileError } = await supabase.from("profiles").upsert({
        id: userId,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        email: email,
        updated_at: new Date().toISOString(),
      })

      if (profileError) {
        console.error("Error creating profile:", profileError)
        setError("Error creating user profile. Please contact support.")
        setIsLoading(false)
        return
      }

      // If business applicant, create business entry
      if (isBusinessApplicant) {
        // If we have a business name but no ID, use the name as the business_referral
        const businessReferralValue = referringBusinessId ? businessReferral : referringBusinessName || businessReferral

        const { error: businessError } = await supabase.from("businesses").insert({
          user_id: userId,
          name: businessName,
          website: website,
          category: category,
          contact_name: contactName,
          contact_email: contactEmail,
          premium_discount: proposedDiscount,
          logo_url: logoUrl,
          referral: referral,
          business_referral: businessReferralValue,
          referring_business_id: referringBusinessId,
          status: "pending", // All business applications start as pending
          created_at: new Date().toISOString(),
        })

        if (businessError) {
          console.error("Error creating business:", businessError)
          setError("Error registering business. Please contact support.")
          setIsLoading(false)
          return
        }
      }

      setSuccess(true)
      setIsLoading(false)

      // Redirect to onboarding after successful registration
      setTimeout(() => {
        router.push("/onboarding")
      }, 2000)
    } catch (err) {
      console.error("Registration error:", err)
      setError("An unexpected error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-8">
        {success ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
            <p className="text-gray-600 mb-4">
              Your account has been created successfully. You will be redirected to the onboarding page shortly.
            </p>
            <Link
              href="/onboarding"
              className="inline-block bg-[#3A56FF] text-white px-4 py-2 rounded-md font-medium hover:bg-[#2A46EF] transition-colors"
            >
              Go to Onboarding
            </Link>
          </motion.div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create an Account</h2>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-start"
              >
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Personal Information Section */}
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A56FF] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A56FF] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A56FF] focus:border-transparent"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A56FF] focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password *
                      </label>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A56FF] focus:border-transparent"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password *
                      </label>
                      <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A56FF] focus:border-transparent"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Business Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                  <div className="flex items-center">
                    <Building2 className="h-5 w-5 text-[#3A56FF] mr-2" />
                    <span className="font-medium">Apply for Business Dashboard Access</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={isBusinessApplicant}
                      onChange={() => {
                        setIsBusinessApplicant(!isBusinessApplicant)
                        if (!isBusinessApplicant) {
                          setBusinessExpanded(true)
                        }
                      }}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#3A56FF] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>

                {/* Business Information Section - Conditionally Rendered */}
                {isBusinessApplicant && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-gray-50 p-4 rounded-md"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Business Information</h3>
                      <button
                        type="button"
                        onClick={() => setBusinessExpanded(!businessExpanded)}
                        className="text-[#3A56FF] flex items-center text-sm"
                      >
                        {businessExpanded ? "Collapse" : "Expand"}
                        <ChevronDown
                          className={`ml-1 h-4 w-4 transition-transform ${businessExpanded ? "rotate-180" : ""}`}
                        />
                      </button>
                    </div>

                    {businessExpanded && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                              Business Name *
                            </label>
                            <input
                              id="businessName"
                              type="text"
                              value={businessName}
                              onChange={(e) => setBusinessName(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A56FF] focus:border-transparent"
                              required={isBusinessApplicant}
                            />
                          </div>
                          <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                              Category *
                            </label>
                            <select
                              id="category"
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A56FF] focus:border-transparent"
                              required={isBusinessApplicant}
                            >
                              <option value="">Select Category</option>
                              {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                  {cat}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                              Contact Name *
                            </label>
                            <input
                              id="contactName"
                              type="text"
                              value={contactName}
                              onChange={(e) => setContactName(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A56FF] focus:border-transparent"
                              required={isBusinessApplicant}
                            />
                          </div>
                          <div>
                            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                              Contact Email *
                            </label>
                            <input
                              id="contactEmail"
                              type="email"
                              value={contactEmail}
                              onChange={(e) => setContactEmail(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A56FF] focus:border-transparent"
                              required={isBusinessApplicant}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                              Website
                            </label>
                            <input
                              id="website"
                              type="url"
                              value={website}
                              onChange={(e) => setWebsite(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A56FF] focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label htmlFor="proposedDiscount" className="block text-sm font-medium text-gray-700 mb-1">
                              Proposed Discount (%) *
                            </label>
                            <input
                              id="proposedDiscount"
                              type="number"
                              min="0"
                              max="100"
                              value={proposedDiscount}
                              onChange={(e) => setProposedDiscount(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A56FF] focus:border-transparent"
                              required={isBusinessApplicant}
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                            Logo URL
                          </label>
                          <input
                            id="logoUrl"
                            type="url"
                            value={logoUrl}
                            onChange={(e) => setLogoUrl(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A56FF] focus:border-transparent"
                          />
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                          <h4 className="text-md font-medium text-gray-700 mb-2">Referral Information</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="referral" className="block text-sm font-medium text-gray-700 mb-1">
                                Referral Code
                              </label>
                              <input
                                id="referral"
                                type="text"
                                value={referral}
                                onChange={(e) => setReferral(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A56FF] focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="businessReferral"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Business Referral
                              </label>
                              <input
                                id="businessReferral"
                                type="text"
                                value={businessReferral}
                                onChange={(e) => setBusinessReferral(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A56FF] focus:border-transparent"
                              />
                            </div>
                          </div>
                          <div className="mt-4">
                            <label
                              htmlFor="referringBusinessId"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Referring Business
                            </label>
                            <BusinessCombobox
                              value={referringBusinessId}
                              onChange={setReferringBusinessId}
                              onNameChange={setReferringBusinessName}
                            />
                            {!referringBusinessId && referringBusinessName && (
                              <input type="hidden" name="business_referral" value={referringBusinessName} />
                            )}
                            <p className="mt-1 text-xs text-gray-500">
                              Select from the dropdown or type the name of the referring business
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 bg-[#3A56FF] text-white py-2 px-4 rounded-md font-medium hover:bg-[#2A46EF] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-[#3A56FF] font-medium hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
