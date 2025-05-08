"use client"

import { useState, useEffect, useCallback } from "react"
import { PageHeader } from "@/components/page-header"
import { CtaSection } from "@/components/cta-section"
import { HelpCircle, Check, X } from "lucide-react"
import Image from "next/image"
import { AnimatedSection } from "@/components/animated-section"
import { AnimatedCard } from "@/components/animated-card"
import { useAuth } from "@/contexts/auth-context"
import { motion } from "framer-motion"
import { LottieAnimation } from "@/components/lottie-animation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function UpgradePage() {
  // Initialize with null/empty values to prevent errors before auth is loaded
  const [user, setUser] = useState(null)
  const [selectedCard, setSelectedCard] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")
  const [guestEmail, setGuestEmail] = useState("")
  const [showGuestEmailInput, setShowGuestEmailInput] = useState(false)

  // Use auth context outside of conditional block
  const authContext = useAuth()

  // Use useEffect to safely set user state after component mounts
  useEffect(() => {
    if (authContext && authContext.user) {
      setUser(authContext.user)
    }
  }, [authContext])

  const cards = [
    {
      name: "Premium Card",
      requirement: "0",
      rewards: {
        referral: "20%",
        affiliate: "1%",
      },
      description: "Start your journey with our premium membership tier.",
      cardImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/premium-card-jvnxFn2cckvmHmXc3LEiYxIXgsVH9k.png",
      features: [
        { name: "Digital loyalty card", included: true },
        { name: "Basic rewards tracking", included: true },
        { name: "Access to standard promotions", included: true },
        { name: "Mobile app access", included: true },
        { name: "Premium rewards", included: false },
        { name: "Priority support", included: false },
        { name: "Exclusive events access", included: false },
      ],
      price: 100,
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Gold Card",
      requirement: "2,500",
      rewards: {
        referral: "25%",
        affiliate: "2%",
      },
      description: "Upgrade to Gold for enhanced rewards and benefits.",
      cardImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gold-card-bflkHLVolhMSi3L5RexoL9fh7wsqBq.png",
      features: [
        { name: "Digital loyalty card", included: true },
        { name: "Enhanced rewards tracking", included: true },
        { name: "Access to gold-tier promotions", included: true },
        { name: "Mobile app access", included: true },
        { name: "Premium rewards", included: true },
        { name: "Priority support", included: false },
        { name: "Exclusive events access", included: false },
      ],
      price: 250,
      cta: "Upgrade Now",
      popular: false,
    },
    {
      name: "Platinum Card",
      requirement: "10,000",
      rewards: {
        referral: "30%",
        affiliate: "3%",
      },
      description: "Experience premium benefits with our Platinum tier.",
      cardImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/platinum-card-IQekSEB3CMuXes5qUTxZc55ZeKUVOy.png",
      features: [
        { name: "Digital loyalty card", included: true },
        { name: "Advanced rewards tracking", included: true },
        { name: "Access to platinum-tier promotions", included: true },
        { name: "Mobile app access", included: true },
        { name: "Premium rewards", included: true },
        { name: "Priority support", included: true },
        { name: "Exclusive events access", included: false },
      ],
      price: 500,
      cta: "Upgrade Now",
      popular: true,
    },
    {
      name: "Diamond Card",
      requirement: "50,000",
      rewards: {
        referral: "35%",
        affiliate: "4%",
      },
      description: "Unlock elite benefits with our Diamond membership tier.",
      cardImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/diamond-card-I9uaKzc6KKTRSgl9mrz4SP2Y2myuiF.png",
      features: [
        { name: "Digital loyalty card", included: true },
        { name: "Premium rewards tracking", included: true },
        { name: "Access to diamond-tier promotions", included: true },
        { name: "Mobile app access", included: true },
        { name: "Premium rewards", included: true },
        { name: "Priority support", included: true },
        { name: "Exclusive events access", included: true },
      ],
      price: 1000,
      cta: "Upgrade Now",
      popular: false,
    },
    {
      name: "Obsidian Card",
      requirement: "150,000",
      rewards: {
        referral: "40%",
        affiliate: "5%",
      },
      description: "Our most exclusive tier with unparalleled benefits.",
      cardImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/obsidian-card-sZV0uG2g9pJ0BiQRLvn14MJIFGvzDn.png",
      features: [
        { name: "Digital loyalty card", included: true },
        { name: "Elite rewards tracking", included: true },
        { name: "Access to obsidian-tier promotions", included: true },
        { name: "Mobile app access", included: true },
        { name: "Premium rewards", included: true },
        { name: "VIP support", included: true },
        { name: "Exclusive events access", included: true },
        { name: "Concierge service", included: true },
      ],
      price: 2500,
      cta: "Upgrade Now",
      popular: false,
    },
  ]

  const faqs = [
    {
      question: "How do I upgrade my membership tier?",
      answer:
        "Your membership tier is determined by your token holdings. Simply acquire and hold the required number of tokens to automatically upgrade to the next tier.",
    },
    {
      question: "What are referral rewards?",
      answer:
        "Referral rewards are the percentage of rewards you earn when you refer new users to the platform. Higher tier cards offer increased referral percentages.",
    },
    {
      question: "What are affiliate rewards?",
      answer:
        "Affiliate rewards are the percentage you earn from transactions made by users you've referred to the platform. This creates a passive income stream that grows with your network.",
    },
    {
      question: "Can I downgrade my membership tier?",
      answer:
        "Your membership tier automatically adjusts based on your token holdings. If your holdings decrease below a tier threshold, your membership will adjust accordingly.",
    },
    {
      question: "Are there any additional fees for higher tiers?",
      answer:
        "No, there are no additional fees for higher membership tiers. Your tier is determined solely by your token holdings.",
    },
    {
      question: "How often are rewards distributed?",
      answer: "Rewards are calculated in real-time and distributed on a monthly basis to your connected wallet.",
    },
  ]

  // Function to handle direct purchase of Premium Card without conditional checks
  const handleDirectPurchase = async () => {
    setIsProcessing(true)
    setError("")

    try {
      // Find the Premium Card
      const premiumCard = cards.find((card) => card.name === "Premium Card")

      if (!premiumCard) {
        throw new Error("Premium Card not found")
      }

      // If user is not authenticated, ask for email
      if (!user) {
        if (!showGuestEmailInput) {
          setShowGuestEmailInput(true)
          setIsProcessing(false)
          return
        }

        // Validate email
        if (!guestEmail || !/\S+@\S+\.\S+/.test(guestEmail)) {
          throw new Error("Please enter a valid email address")
        }
      }

      // Create a checkout session with Stripe
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardType: premiumCard.name,
          price: premiumCard.price,
          userId: user?.id || null,
          guestEmail: !user ? guestEmail : null,
          isGuest: !user,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create checkout session")
      }

      const data = await response.json()

      // Redirect to Stripe Checkout
      window.location.href = data.url
    } catch (error) {
      console.error("Error initiating payment:", error)
      setError(error.message)
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePurchase = useCallback(
    async (card) => {
      // Only allow purchase of Premium Card
      if (card.name !== "Premium Card") {
        return
      }

      setSelectedCard(card)
      setIsProcessing(true)
      setError("")

      try {
        // If user is not authenticated, ask for email
        if (!user) {
          if (!showGuestEmailInput) {
            setShowGuestEmailInput(true)
            setIsProcessing(false)
            return
          }

          // Validate email
          if (!guestEmail || !/\S+@\S+\.\S+/.test(guestEmail)) {
            throw new Error("Please enter a valid email address")
          }
        }

        // Create a checkout session with Stripe
        const response = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cardType: card.name,
            price: card.price,
            userId: user?.id || null,
            guestEmail: !user ? guestEmail : null,
            isGuest: !user,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to create checkout session")
        }

        const data = await response.json()

        // Redirect to Stripe Checkout
        window.location.href = data.url
      } catch (error) {
        console.error("Error initiating payment:", error)
        setError(error.message)
      } finally {
        setIsProcessing(false)
      }
    },
    [user, showGuestEmailInput, guestEmail, selectedCard],
  )

  const handleGuestEmailSubmit = (e) => {
    e.preventDefault()
    if (selectedCard) {
      handlePurchase(selectedCard)
    } else {
      // If no card is selected, use the Premium Card
      handleDirectPurchase()
    }
  }

  return (
    <>
      {/* Lottie Animation above the PageHeader */}
      <div className="flex justify-center mt-8 mb-4">
        <LottieAnimation
          src="https://lottie.host/03f158b6-3f6b-4ee1-9d52-7bd6d0bcacb3/i1DzAuFSkM.lottie"
          width={300}
          height={300}
        />
      </div>

      <PageHeader
        title="Upgrade Your Rewards"
        subtitle="MEMBERSHIP TIERS"
        description="Increase your rewards and benefits by upgrading your membership tier. The more tokens you hold, the greater your rewards."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Membership Tier Benefits</h2>
            <p className="text-[#4a4a4a] max-w-2xl mx-auto">
              Each tier offers increased rewards and exclusive benefits. Your tier is determined by the number of tokens
              you hold.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mb-12">
              <thead className="bg-[#1A1A1A] text-white">
                <tr>
                  <th className="py-4 px-6 text-left">Membership Tier</th>
                  <th className="py-4 px-6 text-center">Required Tokens</th>
                  <th className="py-4 px-6 text-center">Referral Rewards</th>
                  <th className="py-4 px-6 text-center">Affiliate Rewards</th>
                  <th className="py-4 px-6 text-center">Price</th>
                </tr>
              </thead>
              <tbody>
                {cards.map((card, index) => (
                  <tr key={card.name} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="py-4 px-6 font-medium">{card.name}</td>
                    <td className="py-4 px-6 text-center">{card.requirement}</td>
                    <td className="py-4 px-6 text-center">{card.rewards.referral}</td>
                    <td className="py-4 px-6 text-center">{card.rewards.affiliate}</td>
                    <td className="py-4 px-6 text-center">{card.name === "Premium Card" ? `$${card.price}` : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showGuestEmailInput && !user && (
            <div className="max-w-md mx-auto mb-8 p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-2">Continue as Guest</h3>
              <p className="text-sm text-gray-600 mb-4">
                Please provide your email to continue with the purchase. You'll be able to create an account after
                payment.
              </p>
              <form onSubmit={handleGuestEmailSubmit}>
                <div className="mb-4">
                  <label htmlFor="guestEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="guestEmail"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowGuestEmailInput(false)}
                    className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-[#3A56FF] rounded-md hover:bg-[#2A46EF]"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {cards.map((card) => (
              <AnimatedSection key={card.name} delay={0.1}>
                <AnimatedCard className={`overflow-hidden ${card.popular ? "shadow-lg relative" : ""}`}>
                  {card.popular && (
                    <div className="bg-[#3A56FF] text-white text-center py-1 text-sm font-medium absolute top-0 left-0 right-0 z-10">
                      Most Popular
                    </div>
                  )}
                  <div className="relative">
                    <Image
                      src={card.cardImage || "/placeholder.svg"}
                      width={400}
                      height={400}
                      alt={`${card.name} Membership Card`}
                      className="w-full"
                    />
                  </div>
                  <div className="p-4 bg-[#1A1A1A] text-white">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-bold">{card.name}</h3>
                    </div>
                    <div className="mb-3">
                      <span className="text-sm text-white/80">Required Tokens: </span>
                      <span className="font-bold">{card.requirement}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <div>
                        <span className="text-sm text-white/80">Referral: </span>
                        <span className="font-bold">{card.rewards.referral}</span>
                      </div>
                      <div>
                        <span className="text-sm text-white/80">Affiliate: </span>
                        <span className="font-bold">{card.rewards.affiliate}</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      {card.name === "Premium Card" ? (
                        <>
                          <span className="text-sm text-white/80">Price: </span>
                          <span className="font-bold">${card.price}</span>
                        </>
                      ) : null}
                    </div>
                    {card.name === "Premium Card" ? (
                      <motion.button
                        className="w-full py-2 rounded-md font-medium text-sm bg-white text-[#1A1A1A] hover:bg-gray-200"
                        onClick={handleDirectPurchase}
                        disabled={isProcessing}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isProcessing ? "Processing..." : card.cta}
                      </motion.button>
                    ) : (
                      <button
                        className="w-full py-2 rounded-md font-medium text-sm bg-white text-[#1A1A1A] opacity-70 cursor-default"
                        disabled
                      >
                        Coming Soon
                      </button>
                    )}
                  </div>
                </AnimatedCard>
              </AnimatedSection>
            ))}
          </div>

          {error && (
            <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-[#1A1A1A] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Upgrading your membership tier is simple and automatic based on your token holdings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-[#2A2A2A] p-6 rounded-lg">
              <div className="w-12 h-12 bg-[#3A56FF] rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Acquire Tokens</h3>
              <p className="text-white/80">
                Purchase tokens through our platform or from supported exchanges to begin your membership journey.
              </p>
            </div>

            <div className="bg-[#2A2A2A] p-6 rounded-lg">
              <div className="w-12 h-12 bg-[#3A56FF] rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Hold Tokens</h3>
              <p className="text-white/80">
                Keep the required number of tokens in your connected wallet to maintain your membership tier.
              </p>
            </div>

            <div className="bg-[#2A2A2A] p-6 rounded-lg">
              <div className="w-12 h-12 bg-[#3A56FF] rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Enjoy Benefits</h3>
              <p className="text-white/80">
                Automatically receive increased referral and affiliate rewards based on your membership tier.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-[#4a4a4a] max-w-2xl mx-auto">
              Find answers to common questions about our membership tiers and rewards system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start mb-3">
                  <HelpCircle className="h-5 w-5 text-[#3A56FF] mr-2 flex-shrink-0 mt-0.5" />
                  <h3 className="font-bold">{faq.question}</h3>
                </div>
                <p className="text-[#4a4a4a] pl-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Card Features Comparison</h2>
            <p className="text-[#4a4a4a] max-w-2xl mx-auto">
              Compare the features of each membership tier to find the one that's right for you.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-[#1A1A1A] text-white">
                <tr>
                  <th className="py-4 px-6 text-left">Feature</th>
                  {cards.map((card) => (
                    <th key={card.name} className="py-4 px-6 text-center">
                      {card.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cards[0].features.map((feature, featureIndex) => (
                  <tr key={feature.name} className={featureIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="py-4 px-6 font-medium">{feature.name}</td>
                    {cards.map((card) => (
                      <td key={`${card.name}-${feature.name}`} className="py-4 px-6 text-center">
                        {card.features[featureIndex]?.included ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-red-500 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td className="py-4 px-6 font-medium">Price</td>
                  {cards.map((card) => (
                    <td key={`${card.name}-price`} className="py-4 px-6 text-center font-bold">
                      {card.name === "Premium Card" ? `$${card.price}` : "-"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Panther Background Section */}
      <section className="relative w-full h-[400px] mt-16">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ backgroundImage: "url('/images/upgrade-footer.jpeg')" }}
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Unleash Your Potential</h2>
            <p className="text-lg text-gray-200 mb-6">
              Join the elite community of members who have unlocked the full power of our platform.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-[#316bff] hover:bg-[#2151d3] text-white">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
