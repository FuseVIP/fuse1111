"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { PageHeader } from "@/components/page-header"
import { CtaSection } from "@/components/cta-section"
import { AnimatedSection } from "@/components/animated-section"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { ArrowLeft, Download, Share2, QrCode } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CardDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [card, setCard] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCard() {
      if (user && id) {
        setLoading(true)
        const { data, error } = await supabase
          .from("user_cards")
          .select("*")
          .eq("id", id)
          .eq("user_id", user.id)
          .single()

        if (error) {
          console.error("Error loading card:", error)
        } else {
          setCard(data)
        }
        setLoading(false)
      }
    }

    loadCard()
  }, [user, id])

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3A56FF]"></div>
        </div>
      </ProtectedRoute>
    )
  }

  if (!card) {
    return (
      <ProtectedRoute>
        <PageHeader
          title="Card Not Found"
          subtitle="ERROR"
          description="The card you're looking for doesn't exist or you don't have access to it."
        />
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <Link href="/dashboard" className="inline-flex items-center text-[#3A56FF]">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
            </Link>
          </div>
        </section>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <PageHeader
        title={card.name || "Membership Card"}
        subtitle="CARD DETAILS"
        description="View and manage your membership card details."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link href="/dashboard" className="inline-flex items-center text-[#3A56FF]">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <div className="bg-[#1A1A1A] rounded-lg overflow-hidden">
                <div className="relative">
                  <Image
                    src={
                      card.card_image ||
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/premium-card-jvnxFn2cckvmHmXc3LEiYxIXgsVH9k.png"
                    }
                    width={600}
                    height={380}
                    alt={`${card.tier || "Membership"} Card`}
                    className="w-full"
                  />
                  {card.tier && (
                    <div className="absolute top-4 right-4 bg-[#3A56FF] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {card.tier}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">{card.name || "Membership Card"}</h2>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-400">Card Number</p>
                      <p className="text-white font-medium">{card.card_number || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Status</p>
                      <p className="text-green-400 font-medium">Active</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Issued Date</p>
                      <p className="text-white font-medium">
                        {card.created_at ? new Date(card.created_at).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Expiry Date</p>
                      <p className="text-white font-medium">
                        {card.expiry_date ? new Date(card.expiry_date).toLocaleDateString() : "Never"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button className="flex items-center bg-[#2A2A2A] text-white px-4 py-2 rounded-md text-sm">
                      <QrCode className="h-4 w-4 mr-2" /> Show QR Code
                    </button>
                    <button className="flex items-center bg-[#2A2A2A] text-white px-4 py-2 rounded-md text-sm">
                      <Download className="h-4 w-4 mr-2" /> Download
                    </button>
                    <button className="flex items-center bg-[#2A2A2A] text-white px-4 py-2 rounded-md text-sm">
                      <Share2 className="h-4 w-4 mr-2" /> Share
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="space-y-6">
                <div className="bg-[#1A1A1A] p-6 rounded-lg text-white">
                  <h3 className="text-xl font-bold mb-4">Card Benefits</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-[#3A56FF]/20 p-1 rounded-full mr-3 mt-0.5">
                        <div className="bg-[#3A56FF] rounded-full w-2 h-2"></div>
                      </div>
                      <span>
                        {card.tier === "Diamond" || card.tier === "Obsidian"
                          ? "35% Referral Rewards"
                          : card.tier === "Platinum"
                            ? "30% Referral Rewards"
                            : card.tier === "Gold"
                              ? "25% Referral Rewards"
                              : "20% Referral Rewards"}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#3A56FF]/20 p-1 rounded-full mr-3 mt-0.5">
                        <div className="bg-[#3A56FF] rounded-full w-2 h-2"></div>
                      </div>
                      <span>
                        {card.tier === "Diamond" || card.tier === "Obsidian"
                          ? "4% Affiliate Rewards"
                          : card.tier === "Platinum"
                            ? "3% Affiliate Rewards"
                            : card.tier === "Gold"
                              ? "2% Affiliate Rewards"
                              : "1% Affiliate Rewards"}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#3A56FF]/20 p-1 rounded-full mr-3 mt-0.5">
                        <div className="bg-[#3A56FF] rounded-full w-2 h-2"></div>
                      </div>
                      <span>Digital loyalty card</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#3A56FF]/20 p-1 rounded-full mr-3 mt-0.5">
                        <div className="bg-[#3A56FF] rounded-full w-2 h-2"></div>
                      </div>
                      <span>Mobile app access</span>
                    </li>
                    {(card.tier === "Gold" ||
                      card.tier === "Platinum" ||
                      card.tier === "Diamond" ||
                      card.tier === "Obsidian") && (
                      <li className="flex items-start">
                        <div className="bg-[#3A56FF]/20 p-1 rounded-full mr-3 mt-0.5">
                          <div className="bg-[#3A56FF] rounded-full w-2 h-2"></div>
                        </div>
                        <span>Premium rewards</span>
                      </li>
                    )}
                    {(card.tier === "Platinum" || card.tier === "Diamond" || card.tier === "Obsidian") && (
                      <li className="flex items-start">
                        <div className="bg-[#3A56FF]/20 p-1 rounded-full mr-3 mt-0.5">
                          <div className="bg-[#3A56FF] rounded-full w-2 h-2"></div>
                        </div>
                        <span>Priority support</span>
                      </li>
                    )}
                    {(card.tier === "Diamond" || card.tier === "Obsidian") && (
                      <li className="flex items-start">
                        <div className="bg-[#3A56FF]/20 p-1 rounded-full mr-3 mt-0.5">
                          <div className="bg-[#3A56FF] rounded-full w-2 h-2"></div>
                        </div>
                        <span>Exclusive events access</span>
                      </li>
                    )}
                  </ul>
                </div>

                <div className="bg-[#1A1A1A] p-6 rounded-lg text-white">
                  <h3 className="text-xl font-bold mb-4">Rewards Summary</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-400">Total Rewards Earned</p>
                      <p className="text-2xl font-bold text-white">0 FUSE</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Pending Rewards</p>
                      <p className="text-2xl font-bold text-white">0 FUSE</p>
                    </div>
                  </div>
                  <Link
                    href="/dashboard/rewards"
                    className="block w-full bg-[#3A56FF] text-white text-center py-2 rounded-md"
                  >
                    View Rewards History
                  </Link>
                </div>

                <div className="bg-[#1A1A1A] p-6 rounded-lg text-white">
                  <h3 className="text-xl font-bold mb-4">Upgrade Your Card</h3>
                  <p className="text-gray-300 mb-4">
                    Upgrade to a higher tier card to unlock more benefits and higher rewards.
                  </p>
                  <Link href="/upgrade" className="block w-full bg-[#3A56FF] text-white text-center py-2 rounded-md">
                    Explore Upgrade Options
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <CtaSection />
    </ProtectedRoute>
  )
}
