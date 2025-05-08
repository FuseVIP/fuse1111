"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/page-header"
import { CtaSection } from "@/components/cta-section"
import { AnimatedSection } from "@/components/animated-section"
import { AnimatedCard } from "@/components/animated-card"
import { useAuth } from "@/contexts/auth-context"
import { getUserCards } from "@/lib/supabase"
import { Building2, CreditCard, User, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ProtectedRoute } from "@/components/protected-route"

export default function DashboardPage() {
  const { user, profile, isBusinessOwner } = useAuth()
  const [cards, setCards] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCards() {
      if (user) {
        setLoading(true)
        const userCards = await getUserCards(user.id)
        setCards(userCards)
        setLoading(false)
      }
    }

    loadCards()
  }, [user])

  return (
    <ProtectedRoute>
      <PageHeader
        title="My Dashboard"
        subtitle="ACCOUNT OVERVIEW"
        description="Manage your cards, view your rewards, and access your business information."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <AnimatedSection>
              <AnimatedCard className="bg-[#1A1A1A] p-6 rounded-lg text-white">
                <div className="flex items-center mb-4">
                  <div className="bg-[#3A56FF]/20 p-3 rounded-full mr-4">
                    <User className="h-6 w-6 text-[#3A56FF]" />
                  </div>
                  <div>
                    <h3 className="font-bold">Account</h3>
                    <p className="text-sm text-gray-300">Manage your profile</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-300">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-300">Name</p>
                  <p className="font-medium">{profile?.full_name || "Not set"}</p>
                </div>
                <Link href="/profile" className="text-[#3A56FF] text-sm flex items-center">
                  Edit Profile <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </AnimatedCard>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <AnimatedCard className="bg-[#1A1A1A] p-6 rounded-lg text-white">
                <div className="flex items-center mb-4">
                  <div className="bg-[#3A56FF]/20 p-3 rounded-full mr-4">
                    <CreditCard className="h-6 w-6 text-[#3A56FF]" />
                  </div>
                  <div>
                    <h3 className="font-bold">My Cards</h3>
                    <p className="text-sm text-gray-300">View your membership cards</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-300">Active Cards</p>
                  <p className="font-medium">{cards.length}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-300">Current Tier</p>
                  <p className="font-medium">{cards.length > 0 ? cards[0].tier || "Base" : "No active card"}</p>
                </div>
                <Link href="/dashboard/cards" className="text-[#3A56FF] text-sm flex items-center">
                  View Cards <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </AnimatedCard>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <AnimatedCard className="bg-[#1A1A1A] p-6 rounded-lg text-white">
                <div className="flex items-center mb-4">
                  <div className="bg-[#3A56FF]/20 p-3 rounded-full mr-4">
                    <Building2 className="h-6 w-6 text-[#3A56FF]" />
                  </div>
                  <div>
                    <h3 className="font-bold">Business</h3>
                    <p className="text-sm text-gray-300">Manage your business</p>
                  </div>
                </div>
                {isBusinessOwner ? (
                  <>
                    <div className="mb-4">
                      <p className="text-sm text-gray-300">Status</p>
                      <p className="font-medium text-green-400">Verified Business Owner</p>
                    </div>
                    <Link href="/dashboard/business" className="text-[#3A56FF] text-sm flex items-center">
                      Manage Business <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="mb-4">
                      <p className="text-sm text-gray-300">Status</p>
                      <p className="font-medium">Not a business owner</p>
                    </div>
                    <Link href="/register-business" className="text-[#3A56FF] text-sm flex items-center">
                      Register Business <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </>
                )}
              </AnimatedCard>
            </AnimatedSection>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">My Cards</h2>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#3A56FF]"></div>
              </div>
            ) : cards.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card) => (
                  <AnimatedCard key={card.id} className="bg-[#1A1A1A] overflow-hidden rounded-lg">
                    <div className="relative">
                      <Image
                        src={
                          card.card_image ||
                          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/premium-card-jvnxFn2cckvmHmXc3LEiYxIXgsVH9k.png"
                        }
                        width={400}
                        height={250}
                        alt={`${card.tier || "Membership"} Card`}
                        className="w-full"
                      />
                      {card.tier && (
                        <div className="absolute top-4 right-4 bg-[#3A56FF] text-white px-3 py-1 rounded-full text-sm font-medium">
                          {card.tier}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-white text-xl mb-2">{card.name || "Membership Card"}</h3>
                      <div className="flex justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-400">Card Number</p>
                          <p className="text-white">{card.card_number || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Status</p>
                          <p className="text-green-400">Active</p>
                        </div>
                      </div>
                      <Link
                        href={`/dashboard/cards/${card.id}`}
                        className="block w-full bg-[#3A56FF] text-white text-center py-2 rounded-md"
                      >
                        View Card
                      </Link>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            ) : (
              <div className="bg-[#f8f9fa] p-8 rounded-lg text-center">
                <div className="bg-[#3A56FF]/10 p-4 rounded-full inline-block mb-4">
                  <CreditCard className="h-8 w-8 text-[#3A56FF]" />
                </div>
                <h3 className="text-xl font-bold mb-2">No Cards Found</h3>
                <p className="text-[#4a4a4a] mb-4">You don't have any membership cards yet.</p>
                <Link href="/upgrade" className="inline-block bg-[#3A56FF] text-white px-6 py-2 rounded-md">
                  Get Your Card
                </Link>
              </div>
            )}
          </div>

          {isBusinessOwner && (
            <div>
              <h2 className="text-2xl font-bold mb-6">My Business</h2>
              <AnimatedCard className="bg-[#1A1A1A] p-6 rounded-lg text-white">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-xl">Business Dashboard</h3>
                  <Link href="/dashboard/business" className="bg-[#3A56FF] text-white px-4 py-2 rounded-md text-sm">
                    Manage Business
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#2A2A2A] p-4 rounded-lg">
                    <p className="text-sm text-gray-300 mb-1">Total Customers</p>
                    <p className="text-2xl font-bold">0</p>
                  </div>
                  <div className="bg-[#2A2A2A] p-4 rounded-lg">
                    <p className="text-sm text-gray-300 mb-1">Rewards Issued</p>
                    <p className="text-2xl font-bold">0</p>
                  </div>
                  <div className="bg-[#2A2A2A] p-4 rounded-lg">
                    <p className="text-sm text-gray-300 mb-1">Transactions</p>
                    <p className="text-2xl font-bold">0</p>
                  </div>
                </div>
              </AnimatedCard>
            </div>
          )}
        </div>
      </section>

      <CtaSection />
    </ProtectedRoute>
  )
}
