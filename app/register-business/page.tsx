"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { CtaSection } from "@/components/cta-section"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { ProtectedRoute } from "@/components/protected-route"
import { BusinessForm } from "@/components/business/business-form"
import { CheckCircle } from "lucide-react"

export default function RegisterBusinessPage() {
  const { user, refreshSession } = useAuth()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleFormSubmit = async (formData: any) => {
    if (!user) return

    setLoading(true)

    // Create new business
    const { data, error } = await supabase
      .from("businesses")
      .insert({ ...formData, owner_id: user.id })
      .select()

    if (!error && data) {
      setSuccess(true)
      // Refresh the user session to update isBusinessOwner status
      await refreshSession()

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/dashboard/business")
      }, 2000)
    } else {
      console.error("Error registering business:", error)
    }

    setLoading(false)
  }

  return (
    <ProtectedRoute>
      <PageHeader
        title="Register Your Business"
        subtitle="BUSINESS REGISTRATION"
        description="Join our network of businesses and start offering loyalty rewards to your customers."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3A56FF]"></div>
            </div>
          ) : success ? (
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
              <p className="text-[#4a4a4a] mb-6">
                Your business has been successfully registered. You will be redirected to your business dashboard
                shortly.
              </p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <BusinessForm onSubmit={handleFormSubmit} onCancel={() => router.push("/dashboard")} />
            </div>
          )}
        </div>
      </section>

      <CtaSection />
    </ProtectedRoute>
  )
}
