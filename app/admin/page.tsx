"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/page-header"
import { AnimatedSection } from "@/components/animated-section"
import { AnimatedCard } from "@/components/animated-card"
import { useAuth } from "@/contexts/auth-context"
import { getAdminApplications, updateAdminApplication } from "@/lib/supabase"
import { ProtectedRoute } from "@/components/protected-route"
import { Users, Building2, ShieldCheck, AlertTriangle, CheckCircle, XCircle, Star } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function AdminPortalPage() {
  const { user } = useAuth()
  const [applications, setApplications] = useState<any[]>([])
  const [featureApplications, setFeatureApplications] = useState<any[]>([])
  const [businesses, setBusinesses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("pending")

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)

    // Load admin applications
    const apps = await getAdminApplications()
    setApplications(apps)

    // Load feature applications
    const { data: featureApps } = await supabase
      .from("business_feature_applications")
      .select("*, businesses(name)")
      .eq("status", "pending")

    if (featureApps) {
      setFeatureApplications(featureApps)
    }

    // Load businesses
    const { data: bizData } = await supabase
      .from("businesses")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5)

    if (bizData) {
      setBusinesses(bizData)
    }

    setLoading(false)
  }

  async function handleApprove(applicationId: string) {
    if (!user) return

    const success = await updateAdminApplication(applicationId, "approved", user.id)
    if (success) {
      await loadData()
    }
  }

  async function handleReject(applicationId: string) {
    if (!user) return

    const success = await updateAdminApplication(applicationId, "rejected", user.id)
    if (success) {
      await loadData()
    }
  }

  const pendingApplications = applications.filter((app) => app.status === "pending")
  const pendingFeatureApplications = featureApplications.filter((app) => app.status === "pending")

  return (
    <ProtectedRoute requiredRole="admin">
      <PageHeader
        title="Admin Portal"
        subtitle="ADMINISTRATION"
        description="Manage applications, users, and system settings."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <AnimatedSection>
              <AnimatedCard className="bg-[#1A1A1A] p-6 rounded-lg text-white">
                <div className="flex items-center mb-4">
                  <div className="bg-[#3A56FF]/20 p-3 rounded-full mr-4">
                    <Users className="h-6 w-6 text-[#3A56FF]" />
                  </div>
                  <div>
                    <h3 className="font-bold">Users</h3>
                    <p className="text-sm text-gray-300">Manage user accounts</p>
                  </div>
                </div>
                <Link href="/admin/users" className="block w-full bg-[#3A56FF] text-white text-center py-2 rounded-md">
                  View Users
                </Link>
              </AnimatedCard>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <AnimatedCard className="bg-[#1A1A1A] p-6 rounded-lg text-white">
                <div className="flex items-center mb  p-6 rounded-lg text-white">
                <div className="flex items-center mb-4">
                  <div className="bg-[#3A56FF]/20 p-3 rounded-full mr-4">
                    <Building2 className="h-6 w-6 text-[#3A56FF]" />
                  </div>
                  <div>
                    <h3 className="font-bold">Businesses</h3>
                    <p className="text-sm text-gray-300">Manage business accounts</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-300">Total Businesses</p>
                  <p className="font-medium">{businesses.length}</p>
                </div>
                <Link
                  href="/admin/businesses"
                  className="block w-full bg-[#3A56FF] text-white text-center py-2 rounded-md"
                >
                  View Businesses
                </Link>
              </AnimatedCard>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <AnimatedCard className="bg-[#1A1A1A] p-6 rounded-lg text-white">
                <div className="flex items-center mb-4">
                  <div className="bg-[#3A56FF]/20 p-3 rounded-full mr-4">
                    <ShieldCheck className="h-6 w-6 text-[#3A56FF]" />
                  </div>
                  <div>
                    <h3 className="font-bold">Applications</h3>
                    <p className="text-sm text-gray-300">Review pending applications</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-300">Pending Applications</p>
                  <p className="font-medium">{pendingApplications.length}</p>
                </div>
                <Link
                  href="/admin/applications"
                  className="block w-full bg-[#3A56FF] text-white text-center py-2 rounded-md"
                >
                  View Applications
                </Link>
              </AnimatedCard>
            </AnimatedSection>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Admin Applications</h2>

            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`py-2 px-4 font-medium ${
                  activeTab === "pending" ? "text-[#3A56FF] border-b-2 border-[#3A56FF]" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("pending")}
              >
                Pending ({pendingApplications.length})
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#3A56FF]"></div>
              </div>
            ) : pendingApplications.length > 0 ? (
              <div className="space-y-4">
                {pendingApplications.slice(0, 3).map((application) => (
                  <AnimatedCard key={application.id} className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center mb-2">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                          <h3 className="font-bold text-lg">
                            {application.profiles?.full_name || application.applicant_id}
                          </h3>
                        </div>
                        <p className="text-[#4a4a4a] mb-2">{application.profiles?.email || "No email provided"}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-gray-100 text-[#4a4a4a] px-2 py-1 rounded-md text-xs">
                            Applied: {new Date(application.created_at).toLocaleDateString()}
                          </span>
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs">Pending</span>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-2">
                        <button
                          onClick={() => handleApprove(application.id)}
                          className="bg-green-500 text-white px-4 py-2 rounded-md text-sm flex items-center justify-center"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" /> Approve
                        </button>
                        <button
                          onClick={() => handleReject(application.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-md text-sm flex items-center justify-center"
                        >
                          <XCircle className="h-4 w-4 mr-2" /> Reject
                        </button>
                      </div>
                    </div>
                  </AnimatedCard>
                ))}
                {pendingApplications.length > 3 && (
                  <div className="text-center mt-4">
                    <Link
                      href="/admin/applications"
                      className="inline-block bg-[#3A56FF] text-white px-6 py-2 rounded-md"
                    >
                      View All Applications
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-[#f8f9fa] p-8 rounded-lg text-center">
                <div className="bg-[#3A56FF]/10 p-4 rounded-full inline-block mb-4">
                  <ShieldCheck className="h-8 w-8 text-[#3A56FF]" />
                </div>
                <h3 className="text-xl font-bold mb-2">No Pending Applications</h3>
                <p className="text-[#4a4a4a]">There are no pending admin applications to review.</p>
              </div>
            )}
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Recent Businesses</h2>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#3A56FF]"></div>
              </div>
            ) : businesses.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-[#1A1A1A] text-white">
                    <tr>
                      <th className="py-3 px-4 text-left">Business Name</th>
                      <th className="py-3 px-4 text-left">Industry</th>
                      <th className="py-3 px-4 text-left">Created</th>
                      <th className="py-3 px-4 text-center">Featured</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {businesses.map((business) => (
                      <tr key={business.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4">{business.name}</td>
                        <td className="py-3 px-4">{business.industry || "N/A"}</td>
                        <td className="py-3 px-4">{new Date(business.created_at).toLocaleDateString()}</td>
                        <td className="py-3 px-4 text-center">
                          {business.is_featured ? (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                              Featured
                            </span>
                          ) : (
                            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">Regular</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Link
                            href={`/business/${business.id}`}
                            className="text-[#3A56FF] hover:underline text-sm"
                            target="_blank"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-[#f8f9fa] p-8 rounded-lg text-center">
                <div className="bg-[#3A56FF]/10 p-4 rounded-full inline-block mb-4">
                  <Building2 className="h-8 w-8 text-[#3A56FF]" />
                </div>
                <h3 className="text-xl font-bold mb-2">No Businesses Found</h3>
                <p className="text-[#4a4a4a]">There are no businesses in the system yet.</p>
              </div>
            )}
            <div className="text-center mt-4">
              <Link href="/admin/businesses" className="inline-block bg-[#3A56FF] text-white px-6 py-2 rounded-md">
                Manage All Businesses
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Feature Applications</h2>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#3A56FF]"></div>
              </div>
            ) : pendingFeatureApplications.length > 0 ? (
              <div className="space-y-4">
                {pendingFeatureApplications.slice(0, 3).map((application) => (
                  <AnimatedCard key={application.id} className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center mb-2">
                          <Star className="h-5 w-5 text-yellow-500 mr-2" />
                          <h3 className="font-bold text-lg">{application.businesses?.name || "Business"}</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-gray-100 text-[#4a4a4a] px-2 py-1 rounded-md text-xs">
                            Applied: {new Date(application.created_at).toLocaleDateString()}
                          </span>
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs">
                            Feature Request
                          </span>
                        </div>
                      </div>
                      <div>
                        <Link
                          href="/admin/feature-applications"
                          className="bg-[#3A56FF] text-white px-4 py-2 rounded-md text-sm flex items-center justify-center"
                        >
                          Review Application
                        </Link>
                      </div>
                    </div>
                  </AnimatedCard>
                ))}
                {pendingFeatureApplications.length > 3 && (
                  <div className="text-center mt-4">
                    <Link
                      href="/admin/feature-applications"
                      className="inline-block bg-[#3A56FF] text-white px-6 py-2 rounded-md"
                    >
                      View All Applications
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-[#f8f9fa] p-8 rounded-lg text-center">
                <div className="bg-[#3A56FF]/10 p-4 rounded-full inline-block mb-4">
                  <Star className="h-8 w-8 text-[#3A56FF]" />
                </div>
                <h3 className="text-xl font-bold mb-2">No Feature Applications</h3>
                <p className="text-[#4a4a4a]">There are no pending feature applications to review.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}
