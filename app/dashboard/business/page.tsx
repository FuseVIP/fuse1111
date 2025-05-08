"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/page-header"
import { CtaSection } from "@/components/cta-section"
import { AnimatedSection } from "@/components/animated-section"
import { AnimatedCard } from "@/components/animated-card"
import { useAuth } from "@/contexts/auth-context"
import { supabase, getBusinessPurchases, getBusinessReferrals } from "@/lib/supabase"
import { ProtectedRoute } from "@/components/protected-route"
import { Users, BarChart3, Building2, QrCode, PlusCircle, Edit, Trash2, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { BusinessForm } from "@/components/business/business-form"
import { ApplyFeatureButton } from "@/components/business/apply-feature-button"

export default function BusinessDashboardPage() {
  const { user, isBusinessOwner, referralCount } = useAuth()
  const [business, setBusiness] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [showForm, setShowForm] = useState(false)
  const [purchases, setPurchases] = useState<any[]>([])
  const [referrals, setReferrals] = useState<any[]>([])
  const [purchasesLoading, setPurchasesLoading] = useState(false)
  const [referralsLoading, setReferralsLoading] = useState(false)

  useEffect(() => {
    async function loadBusinessData() {
      if (user && isBusinessOwner) {
        setLoading(true)
        // Updated to check user_id column instead of owner_id
        const { data, error } = await supabase.from("businesses").select("*").eq("user_id", user.id).single()

        if (error) {
          console.error("Error loading business data:", error)
        } else {
          setBusiness(data)

          // Load purchases and referrals
          if (data.id) {
            loadPurchasesAndReferrals(data.id)
          }
        }
        setLoading(false)
      }
    }

    loadBusinessData()
  }, [user, isBusinessOwner])

  async function loadPurchasesAndReferrals(businessId: string) {
    setPurchasesLoading(true)
    setReferralsLoading(true)

    try {
      // Load purchases
      const purchasesData = await getBusinessPurchases(businessId)
      setPurchases(purchasesData)

      // Load referrals
      const referralsData = await getBusinessReferrals(businessId)
      setReferrals(referralsData)
    } catch (error) {
      console.error("Error loading purchases and referrals:", error)
    } finally {
      setPurchasesLoading(false)
      setReferralsLoading(false)
    }
  }

  const handleFormSubmit = async (formData: any) => {
    if (!user) return

    setLoading(true)

    if (business) {
      // Update existing business
      const { error } = await supabase.from("businesses").update(formData).eq("id", business.id)

      if (!error) {
        setBusiness({ ...business, ...formData })
      }
    } else {
      // Create new business with user_id
      const { data, error } = await supabase
        .from("businesses")
        .insert({ ...formData, user_id: user.id })
        .select()

      if (!error && data) {
        setBusiness(data[0])
      }
    }

    setLoading(false)
    setShowForm(false)
  }

  const stats = [
    { label: "Total Customers", value: business?.customer_count || 0, icon: <Users className="h-5 w-5" /> },
    { label: "Referrals", value: referralCount, icon: <Share2 className="h-5 w-5" /> },
    { label: "Total Revenue", value: `$${business?.total_revenue || 0}`, icon: <BarChart3 className="h-5 w-5" /> },
  ]

  return (
    <ProtectedRoute>
      <PageHeader
        title="Business Dashboard"
        subtitle="MANAGE YOUR BUSINESS"
        description="Track performance, manage loyalty programs, and engage with your customers."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3A56FF]"></div>
            </div>
          ) : (
            <>
              {!business || showForm ? (
                <BusinessForm initialData={business} onSubmit={handleFormSubmit} onCancel={() => setShowForm(false)} />
              ) : (
                <>
                  <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                    <div className="flex items-center mb-4 md:mb-0">
                      {business.logo_url ? (
                        <Image
                          src={business.logo_url || "/placeholder.svg"}
                          width={80}
                          height={80}
                          alt={business.name}
                          className="rounded-lg mr-4"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-[#3A56FF]/20 rounded-lg flex items-center justify-center mr-4">
                          <Building2 className="h-8 w-8 text-[#3A56FF]" />
                        </div>
                      )}
                      <div>
                        <h2 className="text-2xl font-bold">{business.name}</h2>
                        <p className="text-[#4a4a4a]">
                          {business.premium_discount
                            ? `${business.premium_discount}% Premium Discount`
                            : "No premium discount"}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setShowForm(true)}
                        className="bg-[#3A56FF] text-white px-4 py-2 rounded-md text-sm flex items-center"
                      >
                        <Edit className="h-4 w-4 mr-2" /> Edit Business
                      </button>
                      <Link
                        href={`/business/${business.id}`}
                        className="bg-[#1A1A1A] text-white px-4 py-2 rounded-md text-sm flex items-center"
                        target="_blank"
                      >
                        <QrCode className="h-4 w-4 mr-2" /> View Verification
                      </Link>
                      {business && user && <ApplyFeatureButton businessId={business.id} userId={user.id} />}
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex border-b border-gray-200 overflow-x-auto">
                      <button
                        className={`py-2 px-4 font-medium whitespace-nowrap ${
                          activeTab === "overview" ? "text-[#3A56FF] border-b-2 border-[#3A56FF]" : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("overview")}
                      >
                        Overview
                      </button>
                      <button
                        className={`py-2 px-4 font-medium whitespace-nowrap ${
                          activeTab === "customers" ? "text-[#3A56FF] border-b-2 border-[#3A56FF]" : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("customers")}
                      >
                        Customers
                      </button>
                      <button
                        className={`py-2 px-4 font-medium whitespace-nowrap ${
                          activeTab === "referrals" ? "text-[#3A56FF] border-b-2 border-[#3A56FF]" : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("referrals")}
                      >
                        Referrals
                      </button>
                      <button
                        className={`py-2 px-4 font-medium whitespace-nowrap ${
                          activeTab === "purchases" ? "text-[#3A56FF] border-b-2 border-[#3A56FF]" : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("purchases")}
                      >
                        Purchases
                      </button>
                      <button
                        className={`py-2 px-4 font-medium whitespace-nowrap ${
                          activeTab === "loyalty" ? "text-[#3A56FF] border-b-2 border-[#3A56FF]" : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("loyalty")}
                      >
                        Loyalty Program
                      </button>
                      <button
                        className={`py-2 px-4 font-medium whitespace-nowrap ${
                          activeTab === "settings" ? "text-[#3A56FF] border-b-2 border-[#3A56FF]" : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("settings")}
                      >
                        Settings
                      </button>
                    </div>
                  </div>

                  {activeTab === "overview" && (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {stats.map((stat, index) => (
                          <AnimatedSection key={stat.label} delay={index * 0.1}>
                            <AnimatedCard className="bg-[#1A1A1A] p-6 rounded-lg text-white">
                              <div className="flex items-center mb-4">
                                <div className="bg-[#3A56FF]/20 p-3 rounded-full mr-4">{stat.icon}</div>
                                <div>
                                  <p className="text-sm text-gray-300">{stat.label}</p>
                                  <p className="text-2xl font-bold">{stat.value}</p>
                                </div>
                              </div>
                            </AnimatedCard>
                          </AnimatedSection>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <AnimatedSection>
                          <AnimatedCard className="bg-[#1A1A1A] p-6 rounded-lg text-white">
                            <h3 className="font-bold text-xl mb-4">Recent Purchases</h3>
                            {purchasesLoading ? (
                              <div className="flex justify-center py-4">
                                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#3A56FF]"></div>
                              </div>
                            ) : purchases.length > 0 ? (
                              <div className="overflow-x-auto">
                                <table className="w-full">
                                  <thead>
                                    <tr className="text-left text-gray-400 text-sm">
                                      <th className="pb-2">Customer</th>
                                      <th className="pb-2">Date</th>
                                      <th className="pb-2 text-right">Amount</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {purchases.slice(0, 5).map((purchase) => (
                                      <tr key={purchase.id} className="border-t border-gray-800">
                                        <td className="py-3">{purchase.customer_name || "Anonymous"}</td>
                                        <td className="py-3">{new Date(purchase.created_at).toLocaleDateString()}</td>
                                        <td className="py-3 text-right">${purchase.amount || 0}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <p className="text-gray-400">No recent purchases</p>
                            )}
                          </AnimatedCard>
                        </AnimatedSection>

                        <AnimatedSection delay={0.1}>
                          <AnimatedCard className="bg-[#1A1A1A] p-6 rounded-lg text-white">
                            <h3 className="font-bold text-xl mb-4">Business Information</h3>
                            <div className="space-y-4">
                              <div>
                                <p className="text-sm text-gray-400">Address</p>
                                <p>{business.business_address || "Not provided"}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-400">Contact Phone</p>
                                <p>{business.contact_phone || "Not provided"}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-400">Contact Email</p>
                                <p>{business.contact_email || "Not provided"}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-400">Website</p>
                                <p>{business.website || "Not provided"}</p>
                              </div>
                            </div>
                          </AnimatedCard>
                        </AnimatedSection>
                      </div>
                    </div>
                  )}

                  {activeTab === "customers" && (
                    <div>
                      <AnimatedCard className="bg-[#1A1A1A] p-6 rounded-lg text-white mb-8">
                        <h3 className="font-bold text-xl mb-4">Customer Management</h3>
                        <p className="text-gray-300 mb-6">
                          View and manage your customers, track their loyalty points, and send targeted promotions.
                        </p>
                        <div className="bg-[#2A2A2A] p-6 rounded-lg text-center">
                          <p className="text-gray-300 mb-4">
                            No customers found. Start adding customers to your loyalty program.
                          </p>
                          <button className="bg-[#3A56FF] text-white px-4 py-2 rounded-md text-sm flex items-center mx-auto">
                            <PlusCircle className="h-4 w-4 mr-2" /> Add Customer
                          </button>
                        </div>
                      </AnimatedCard>
                    </div>
                  )}

                  {activeTab === "referrals" && (
                    <div>
                      <AnimatedCard className="bg-[#1A1A1A] p-6 rounded-lg text-white mb-8">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-bold text-xl">Referrals</h3>
                          <div className="bg-[#3A56FF]/20 px-3 py-1 rounded-full">
                            <span className="text-[#3A56FF] font-bold">{referralCount} Total</span>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-6">
                          Track referrals to your business and reward customers for spreading the word.
                        </p>

                        {referralsLoading ? (
                          <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#3A56FF]"></div>
                          </div>
                        ) : referrals.length > 0 ? (
                          <div className="overflow-x-auto">
                            <table className="min-w-full">
                              <thead className="border-b border-gray-700">
                                <tr>
                                  <th className="py-3 px-4 text-left">Referrer</th>
                                  <th className="py-3 px-4 text-left">Referred User</th>
                                  <th className="py-3 px-4 text-left">Date</th>
                                  <th className="py-3 px-4 text-left">Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {referrals.map((referral) => (
                                  <tr key={referral.id} className="border-b border-gray-800">
                                    <td className="py-3 px-4">{referral.referrer_name || referral.referrer_id}</td>
                                    <td className="py-3 px-4">{referral.referred_name || referral.referred_id}</td>
                                    <td className="py-3 px-4">{new Date(referral.created_at).toLocaleDateString()}</td>
                                    <td className="py-3 px-4">
                                      <span
                                        className={`px-2 py-1 rounded-full text-xs ${
                                          referral.status === "completed"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-yellow-100 text-yellow-800"
                                        }`}
                                      >
                                        {referral.status || "Pending"}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="bg-[#2A2A2A] p-6 rounded-lg text-center">
                            <p className="text-gray-300">No referrals found yet.</p>
                          </div>
                        )}
                      </AnimatedCard>
                    </div>
                  )}

                  {activeTab === "purchases" && (
                    <div>
                      <AnimatedCard className="bg-[#1A1A1A] p-6 rounded-lg text-white mb-8">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-bold text-xl">Purchases</h3>
                          <div className="bg-[#3A56FF]/20 px-3 py-1 rounded-full">
                            <span className="text-[#3A56FF] font-bold">{purchases.length} Total</span>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-6">
                          Track all purchases made at your business and monitor customer spending patterns.
                        </p>

                        {purchasesLoading ? (
                          <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#3A56FF]"></div>
                          </div>
                        ) : purchases.length > 0 ? (
                          <div className="overflow-x-auto">
                            <table className="min-w-full">
                              <thead className="border-b border-gray-700">
                                <tr>
                                  <th className="py-3 px-4 text-left">Customer</th>
                                  <th className="py-3 px-4 text-left">Date</th>
                                  <th className="py-3 px-4 text-left">Items</th>
                                  <th className="py-3 px-4 text-right">Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                {purchases.map((purchase) => (
                                  <tr key={purchase.id} className="border-b border-gray-800">
                                    <td className="py-3 px-4">{purchase.customer_name || "Anonymous"}</td>
                                    <td className="py-3 px-4">{new Date(purchase.created_at).toLocaleDateString()}</td>
                                    <td className="py-3 px-4">{purchase.items || "-"}</td>
                                    <td className="py-3 px-4 text-right">${purchase.amount || 0}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="bg-[#2A2A2A] p-6 rounded-lg text-center">
                            <p className="text-gray-300">No purchases recorded yet.</p>
                          </div>
                        )}
                      </AnimatedCard>
                    </div>
                  )}

                  {activeTab === "loyalty" && (
                    <div>
                      <AnimatedCard className="bg-[#1A1A1A] p-6 rounded-lg text-white mb-8">
                        <h3 className="font-bold text-xl mb-4">Loyalty Program Settings</h3>
                        <p className="text-gray-300 mb-6">
                          Configure your loyalty program, set reward tiers, and create special promotions.
                        </p>
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-medium mb-2">Reward Points</h4>
                            <div className="bg-[#2A2A2A] p-4 rounded-lg">
                              <div className="flex justify-between mb-2">
                                <span>Points per dollar spent</span>
                                <span className="font-bold">1</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Points expiration (days)</span>
                                <span className="font-bold">365</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Premium Discount</h4>
                            <div className="bg-[#2A2A2A] p-4 rounded-lg">
                              <div className="flex justify-between mb-2">
                                <span>Current discount percentage</span>
                                <span className="font-bold">{business.premium_discount || 0}%</span>
                              </div>
                              <button
                                onClick={() => setShowForm(true)}
                                className="bg-[#3A56FF] text-white px-4 py-2 rounded-md text-sm flex items-center mt-2"
                              >
                                <Edit className="h-4 w-4 mr-2" /> Update Discount
                              </button>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Reward Tiers</h4>
                            <div className="bg-[#2A2A2A] p-4 rounded-lg">
                              <p className="text-gray-300 mb-4">No reward tiers configured yet.</p>
                              <button className="bg-[#3A56FF] text-white px-4 py-2 rounded-md text-sm flex items-center">
                                <PlusCircle className="h-4 w-4 mr-2" /> Add Reward Tier
                              </button>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Active Promotions</h4>
                            <div className="bg-[#2A2A2A] p-4 rounded-lg">
                              <p className="text-gray-300 mb-4">No active promotions.</p>
                              <button className="bg-[#3A56FF] text-white px-4 py-2 rounded-md text-sm flex items-center">
                                <PlusCircle className="h-4 w-4 mr-2" /> Create Promotion
                              </button>
                            </div>
                          </div>
                        </div>
                      </AnimatedCard>
                    </div>
                  )}

                  {activeTab === "settings" && (
                    <div>
                      <AnimatedCard className="bg-[#1A1A1A] p-6 rounded-lg text-white mb-8">
                        <h3 className="font-bold text-xl mb-4">Business Settings</h3>
                        <p className="text-gray-300 mb-6">
                          Manage your business settings, notification preferences, and account information.
                        </p>
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-medium mb-2">Notification Settings</h4>
                            <div className="bg-[#2A2A2A] p-4 rounded-lg space-y-2">
                              <div className="flex items-center justify-between">
                                <span>Email notifications</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input type="checkbox" className="sr-only peer" defaultChecked />
                                  <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-[#3A56FF] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                </label>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>SMS notifications</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input type="checkbox" className="sr-only peer" />
                                  <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-[#3A56FF] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                </label>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Push notifications</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input type="checkbox" className="sr-only peer" defaultChecked />
                                  <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-[#3A56FF] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                </label>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Danger Zone</h4>
                            <div className="bg-[#2A2A2A] p-4 rounded-lg">
                              <p className="text-gray-300 mb-4">
                                Permanently delete your business and all associated data.
                              </p>
                              <button className="bg-red-600 text-white px-4 py-2 rounded-md text-sm flex items-center">
                                <Trash2 className="h-4 w-4 mr-2" /> Delete Business
                              </button>
                            </div>
                          </div>
                        </div>
                      </AnimatedCard>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </section>

      <CtaSection />
    </ProtectedRoute>
  )
}
