"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/page-header"
import { AnimatedCard } from "@/components/animated-card"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { ProtectedRoute } from "@/components/protected-route"
import { Building2, CheckCircle, XCircle, Eye } from "lucide-react"
import Link from "next/link"

export default function AdminBusinessesPage() {
  const { user } = useAuth()
  const [businesses, setBusinesses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("pending")

  useEffect(() => {
    loadBusinesses()
  }, [activeTab])

  async function loadBusinesses() {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("businesses")
        .select("*, profiles:user_id(first_name, last_name, email)")
        .eq("status", activeTab)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error loading businesses:", error)
      } else {
        setBusinesses(data || [])
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleApprove(id: string) {
    if (!user) return

    try {
      const { error } = await supabase
        .from("businesses")
        .update({
          status: "approved",
          approved_by: user.id,
          approved_at: new Date().toISOString(),
        })
        .eq("id", id)

      if (error) {
        console.error("Error approving business:", error)
      } else {
        // Refresh the list
        loadBusinesses()
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  async function handleReject(id: string) {
    if (!user) return

    try {
      const { error } = await supabase
        .from("businesses")
        .update({
          status: "rejected",
          approved_by: user.id,
          approved_at: new Date().toISOString(),
        })
        .eq("id", id)

      if (error) {
        console.error("Error rejecting business:", error)
      } else {
        // Refresh the list
        loadBusinesses()
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <PageHeader
        title="Business Management"
        subtitle="ADMIN PORTAL"
        description="Review and manage business applications and accounts."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`py-2 px-4 font-medium ${
                  activeTab === "pending" ? "text-[#3A56FF] border-b-2 border-[#3A56FF]" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("pending")}
              >
                Pending Applications
              </button>
              <button
                className={`py-2 px-4 font-medium ${
                  activeTab === "approved" ? "text-[#3A56FF] border-b-2 border-[#3A56FF]" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("approved")}
              >
                Approved Businesses
              </button>
              <button
                className={`py-2 px-4 font-medium ${
                  activeTab === "rejected" ? "text-[#3A56FF] border-b-2 border-[#3A56FF]" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("rejected")}
              >
                Rejected Applications
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#3A56FF]"></div>
              </div>
            ) : businesses.length > 0 ? (
              <div className="space-y-4">
                {businesses.map((business) => (
                  <AnimatedCard key={business.id} className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center mb-2">
                          <Building2 className="h-5 w-5 text-[#3A56FF] mr-2" />
                          <h3 className="font-bold text-lg">{business.name}</h3>
                        </div>
                        <p className="text-[#4a4a4a] mb-2">
                          {business.profiles?.first_name} {business.profiles?.last_name} ({business.profiles?.email})
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-gray-100 text-[#4a4a4a] px-2 py-1 rounded-md text-xs">
                            Category: {business.category || "Not specified"}
                          </span>
                          <span className="bg-gray-100 text-[#4a4a4a] px-2 py-1 rounded-md text-xs">
                            Discount: {business.premium_discount || 0}%
                          </span>
                          <span className="bg-gray-100 text-[#4a4a4a] px-2 py-1 rounded-md text-xs">
                            Applied: {new Date(business.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-2">
                        {activeTab === "pending" && (
                          <>
                            <button
                              onClick={() => handleApprove(business.id)}
                              className="bg-green-500 text-white px-4 py-2 rounded-md text-sm flex items-center justify-center"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" /> Approve
                            </button>
                            <button
                              onClick={() => handleReject(business.id)}
                              className="bg-red-500 text-white px-4 py-2 rounded-md text-sm flex items-center justify-center"
                            >
                              <XCircle className="h-4 w-4 mr-2" /> Reject
                            </button>
                          </>
                        )}
                        <Link
                          href={`/admin/businesses/${business.id}`}
                          className="bg-[#1A1A1A] text-white px-4 py-2 rounded-md text-sm flex items-center justify-center"
                        >
                          <Eye className="h-4 w-4 mr-2" /> View Details
                        </Link>
                      </div>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            ) : (
              <div className="bg-[#f8f9fa] p-8 rounded-lg text-center">
                <div className="bg-[#3A56FF]/10 p-4 rounded-full inline-block mb-4">
                  <Building2 className="h-8 w-8 text-[#3A56FF]" />
                </div>
                <h3 className="text-xl font-bold mb-2">No {activeTab} Businesses</h3>
                <p className="text-[#4a4a4a]">
                  {activeTab === "pending"
                    ? "There are no pending business applications to review."
                    : activeTab === "approved"
                      ? "There are no approved businesses yet."
                      : "There are no rejected business applications."}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </ProtectedRoute>
  )
}
