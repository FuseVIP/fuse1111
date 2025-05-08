"use client"

import { PageHeader } from "@/components/page-header"
import { CtaSection } from "@/components/cta-section"
import {
  ArrowRight,
  CheckCircle2,
  BarChart3,
  TrendingUp,
  Shield,
  Search,
  MapPin,
  Building2,
  X,
  Tag,
  Sparkles,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AnimatedSection } from "@/components/animated-section"
import { AnimatedCard } from "@/components/animated-card"
import { AnimatedButton } from "@/components/animated-button"
import { motion } from "framer-motion"
import { useState, useEffect, useMemo } from "react"
import { createClient } from "@supabase/supabase-js"
import { LottieAnimation } from "@/components/lottie-animation"

// Create a Supabase client specifically for this component
const getSupabaseClient = () => {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn("Missing Supabase environment variables")
      return null
    }

    return createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error("Failed to initialize Supabase client:", error)
    return null
  }
}

export default function IndustryPage() {
  const [businesses, setBusinesses] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [stateFilter, setStateFilter] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("spotlight")
  const [loading, setLoading] = useState(true)
  const [selectedBusiness, setSelectedBusiness] = useState(null)
  const [supabaseError, setSupabaseError] = useState(null)

  useEffect(() => {
    fetchBusinesses()
  }, [])

  const fetchBusinesses = async () => {
    try {
      setLoading(true)

      // Get the Supabase client
      const supabase = getSupabaseClient()

      // Check if Supabase client is available
      if (!supabase) {
        console.warn("Supabase client not initialized - using mock data")
        // Use mock data when Supabase is not available
        const mockBusinesses = [
          {
            id: "1",
            name: "Redlands Chiropractic",
            category: "Health & Wellness",
            is_featured: true,
            description: "Specialized chiropractic care with FUSE rewards for loyal patients.",
            address: "Redlands, California, USA",
            website: "redlandschiropractic.com",
            premium_discount: 15,
          },
          {
            id: "2",
            name: "Protein Plus",
            category: "Food & Beverage",
            is_featured: true,
            description: "Healthy meal options with special discounts for FUSE members.",
            address: "San Bernardino, California, USA",
            website: "protein-plus1.square.site",
            premium_discount: 10,
          },
          {
            id: "3",
            name: "Jorritsma Therapeutics",
            category: "Health & Wellness",
            is_featured: true,
            description: "Specialized shockwave therapy with loyalty rewards.",
            address: "Redlands, California, USA",
            website: "jorritsmatherapeutics.stem-wave.com",
            premium_discount: 20,
          },
        ]
        setBusinesses(mockBusinesses)
        setSupabaseError(null)
        setLoading(false)
        return
      }

      const { data, error } = await supabase.from("businesses").select("*").order("name")

      if (error) throw error
      setBusinesses(data || [])
      setSupabaseError(null)
    } catch (error) {
      console.error("Error fetching businesses:", error)
      setSupabaseError(error.message)
      // Set some mock data as fallback
      const mockBusinesses = [
        {
          id: "1",
          name: "Redlands Chiropractic",
          category: "Health & Wellness",
          is_featured: true,
          description: "Specialized chiropractic care with FUSE rewards for loyal patients.",
          address: "Redlands, California, USA",
          website: "redlandschiropractic.com",
          premium_discount: 15,
        },
        {
          id: "2",
          name: "Protein Plus",
          category: "Food & Beverage",
          is_featured: true,
          description: "Healthy meal options with special discounts for FUSE members.",
          address: "San Bernardino, California, USA",
          website: "protein-plus1.square.site",
          premium_discount: 10,
        },
      ]
      setBusinesses(mockBusinesses)
    } finally {
      setLoading(false)
    }
  }

  const categories = useMemo(() => {
    const cats = new Set(businesses.map((b) => b.category).filter(Boolean))
    return ["spotlight", "all", ...Array.from(cats)].filter(Boolean)
  }, [businesses])

  const extractState = (address) => {
    if (!address) return ""
    const parts = address.split(",")
    if (parts.length >= 3) {
      return parts[2].trim()
    }
    return ""
  }

  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      const matchesSearch =
        business.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.description?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesState = !stateFilter || extractState(business.address) === stateFilter

      if (selectedCategory === "spotlight") {
        return matchesSearch && matchesState && business.is_featured
      } else if (selectedCategory === "all") {
        return matchesSearch && matchesState
      } else {
        return matchesSearch && matchesState && business.category === selectedCategory
      }
    })
  }, [businesses, searchTerm, stateFilter, selectedCategory])

  const industries = [
    {
      name: "Retail & Local Business",
      icon: <BarChart3 className="h-8 w-8 text-[#316bff]" />,
      description:
        "Fuse equips local businesses with enterprise-level tools to drive customer loyalty, grow exposure, and generate real revenue — all without the price tag of Big Tech.",
      challenges: [
        "Soaring ad costs with minimal ROI",
        "Customer churn in over-saturated markets",
        "No access to real-time performance insights",
        "Difficulty creating consistent recurring revenue",
      ],
      solutions: [
        "Instant onboarding into the FUSE VIP Rewards Network",
        "Membership card sales that deliver upfront cash flow",
        "Token-based loyalty rewards system with compounding incentives",
        "Fully managed marketing engine driven by customer activity",
        "Plug-and-play exposure across social, site, and print",
      ],
      stats: [
        { value: "5–10%", label: "revenue lift for merchants offering FUSE rewards" },
        { value: "30%", label: "cost savings from automating customer engagement" },
      ],
      caseStudy: {
        client: "Redlands Chiropractic",
        result: "Generated 300 member FUSE VIP customer base in Phase 1",
        url: "https://redlandschiropractic.com/",
      },
    },
    {
      name: "Health & Fitness",
      icon: <Shield className="h-8 w-8 text-[#316bff]" />,
      description:
        "Fuse helps clinics, trainers, and wellness professionals drive patient retention and increase recurring visits with loyalty tiers, frictionless payments, and automated client flows.",
      image: "/images/fuse-health-fitness.png",
      lottieUrl: "https://lottie.host/8c313ca4-afa0-43d2-851a-140eb08dba6e/kFwWHauQJI.lottie",
      challenges: [
        "High drop-off rates between appointments",
        "Lack of consistent recurring income",
        "Manual rebooking and follow-up workflows",
        "Limited marketing support or brand differentiation",
      ],
      solutions: [
        "Smart reminders and loyalty tracking with Fuse AI tools",
        "Membership incentives that boost rebookings and reduce no-shows",
        "FUSE token perks that gamify the care experience",
        "Exclusive tier unlocks for long-term patients and subscribers",
        "Performance dashboards to view client lifetime value",
      ],
      stats: [
        { value: "$22K+", label: "revenue from one FUSE-enabled practice pre-token launch" },
        { value: "2x", label: "increase in return visits from loyalty members" },
      ],
      caseStudy: {
        client: "Redlands Chiropractic",
        result: "Built monthly recurring revenue through FUSE memberships and loyalty rewards",
        url: "https://redlandschiropractic.com/",
      },
    },
    {
      name: "Food & Beverage",
      icon: <TrendingUp className="h-8 w-8 text-[#316bff]" />,
      description:
        "Fuse turns your counter into a conversion machine — boosting ticket averages and returning foot traffic with rewards customers actually use.",
      image: "/placeholder.svg?key=zafmi",
      lottieUrl: "https://lottie.host/7057d1d5-7e7b-4fef-96e9-096bd2079e01/RNEHdldOO2.lottie",
      challenges: [
        "Thin margins with increasing supply costs",
        "One-time visitors with low lifetime value",
        "Lack of differentiation from nearby competition",
        "No way to track or reward frequent spenders",
      ],
      solutions: [
        "$FUSE token utility for on-chain cash-back rewards",
        "Customer perks based on spending thresholds (e.g., $2 off at $10+)",
        "In-store and online card promotions built for mobile wallets",
        "Automated loyalty insights tied to real business outcomes",
        "Real-time business listings across FUSE directories and map-based tools",
      ],
      stats: [
        { value: "2.5x", label: "return visit frequency for reward-holding customers" },
        { value: "$10+", label: "average order size needed to trigger in-store rewards" },
      ],
      caseStudy: {
        client: "Protein Plus",
        result: "Boosted repeat customer base with $2 off for FUSE members when over $10 is spent",
        url: "https://protein-plus1.square.site/?location=11ef534af262e7cc87803cecef6d5b2a",
      },
    },
    {
      name: "Beauty & Personal Care",
      icon: <Sparkles className="h-8 w-8 text-[#316bff]" />,
      description:
        "Fuse lets beauty pros and wellness practitioners turn first-time appointments into loyal clientele — powered by digital rewards, rebooking automation, and community exposure.",
      image: "/placeholder.svg?key=beautyfuse",
      lottieUrl: "https://lottie.host/00b71ed0-37e5-4c57-9184-dbbbe46f0b0b/pLa4lOYLOt.lottie",
      challenges: [
        "Inconsistent booking patterns and low customer retention",
        "High platform fees on appointment apps and directories",
        "No VIP system to reward top-tier clients",
        "Little control over how new clients find their business",
      ],
      solutions: [
        "FUSE card perks that unlock exclusive treatment upgrades",
        "AI-assisted rebooking reminders tied to appointment intervals",
        "Token-based rewards that stack with client visits",
        "Cross-promotions with local FUSE ecosystem businesses",
        "Community-level exposure via FUSE network map and social push",
      ],
      stats: [
        { value: "100%", label: "FUSE member treatment coverage after 2 visits at select providers" },
        { value: "65%", label: "increase in return bookings with rewards programs" },
      ],
      caseStudy: {
        client: "Jorritsma Shockwave Therapy",
        result: "Customers unlock one free treatment after 2 visits — incentivizing consistent care plans",
        url: "https://jorritsmatherapeutics.stem-wave.com/",
      },
    },
  ]

  const US_STATES = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ]

  return (
    <div className="min-h-screen w-full relative">
      {/* Fixed background image */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat bg-fixed z-0"
        style={{ backgroundImage: "url('/images/cyberpunk-cityscape.jpeg')" }}
      />

      {/* Semi-transparent overlay to improve content readability */}
      <div className="fixed inset-0 bg-black/60 z-0"></div>

      {/* Page content container */}
      <div className="relative z-10">
        <div className="py-8">
          <PageHeader
            title="Industries We Serve"
            subtitle="SPECIALIZED SOLUTIONS"
            description="We deliver tailored digital transformation solutions across a wide range of industries."
          />
        </div>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4 text-white">
                  Digital Excellence Across <span className="text-[#316bff]">Every Sector</span>
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Our industry-specific expertise allows us to address the unique challenges and opportunities in your
                  sector with customized digital solutions.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {industries.map((industry, index) => (
                <AnimatedSection key={industry.name} delay={index * 0.1}>
                  <AnimatedCard className="bg-black/50 backdrop-blur-sm p-6 rounded-lg shadow-sm text-center h-full flex flex-col border border-gray-700">
                    <div className="bg-[#316bff]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      {industry.icon}
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-white">{industry.name}</h3>
                    <p className="text-gray-300 mb-4 flex-grow">{industry.description}</p>
                    <Link
                      href={`#${industry.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-[#316bff] font-medium flex items-center justify-center"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </AnimatedCard>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Explore Businesses Section */}
        <section className="py-16 bg-black/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-white">
                  Explore Our <span className="text-[#316bff]">Partner Network</span>
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Discover businesses in our network that offer exclusive benefits and discounts to Fuse.Vip members.
                </p>
              </div>
            </AnimatedSection>

            <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search businesses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-700 rounded-md w-full md:w-64 bg-black/30 text-white"
                />
              </div>

              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="px-4 py-2 border border-gray-700 rounded-md bg-black/30 text-white"
              >
                <option value="">All States</option>
                {US_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-700 rounded-md bg-black/30 text-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "spotlight"
                      ? "Featured Partners"
                      : category === "all"
                        ? "All Categories"
                        : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#316bff]"></div>
              </div>
            ) : supabaseError ? (
              <div className="text-center py-8">
                <p className="text-amber-400 mb-4">
                  We're currently using demo data while our database connection is being established.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {businesses.map((business) => (
                    <AnimatedCard
                      key={business.id}
                      className={`bg-black/40 backdrop-blur-sm p-6 rounded-lg shadow-sm cursor-pointer border ${business.is_featured ? "border-[#316bff]" : "border-gray-700"}`}
                      onClick={() => setSelectedBusiness(business)}
                    >
                      {/* Business card content remains the same */}
                      <div className="flex items-start">
                        <div className="w-16 h-16 bg-gray-800 rounded-lg mr-4 flex-shrink-0 overflow-hidden">
                          {business.logo_url ? (
                            <Image
                              src={business.logo_url || "/placeholder.svg"}
                              width={64}
                              height={64}
                              alt={`${business.name} logo`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[#316bff]/10">
                              <Building2 className="h-8 w-8 text-[#316bff]" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-white">{business.name}</h3>
                          <p className="text-sm text-gray-400">{business.category}</p>
                          {business.address && (
                            <div className="flex items-center text-xs text-gray-400 mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {extractState(business.address)}
                            </div>
                          )}
                          <div className="flex flex-wrap gap-2 mt-2">
                            {business.is_featured && (
                              <span className="inline-block bg-[#316bff] text-white text-xs px-2 py-1 rounded">
                                Featured Partner
                              </span>
                            )}
                            {business.premium_discount && (
                              <span className="inline-block bg-[#FF5722] text-white text-xs px-2 py-1 rounded flex items-center">
                                <Tag className="h-3 w-3 mr-1" />
                                {business.premium_discount}% Off
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </AnimatedCard>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBusinesses.length > 0 ? (
                  filteredBusinesses.map((business) => (
                    <AnimatedCard
                      key={business.id}
                      className={`bg-black/40 backdrop-blur-sm p-6 rounded-lg shadow-sm cursor-pointer border ${business.is_featured ? "border-[#316bff]" : "border-gray-700"}`}
                      onClick={() => setSelectedBusiness(business)}
                    >
                      <div className="flex items-start">
                        <div className="w-16 h-16 bg-gray-800 rounded-lg mr-4 flex-shrink-0 overflow-hidden">
                          {business.logo_url ? (
                            <Image
                              src={business.logo_url || "/placeholder.svg"}
                              width={64}
                              height={64}
                              alt={`${business.name} logo`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[#316bff]/10">
                              <Building2 className="h-8 w-8 text-[#316bff]" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-white">{business.name}</h3>
                          <p className="text-sm text-gray-400">{business.category}</p>
                          {business.address && (
                            <div className="flex items-center text-xs text-gray-400 mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {extractState(business.address)}
                            </div>
                          )}
                          <div className="flex flex-wrap gap-2 mt-2">
                            {business.is_featured && (
                              <span className="inline-block bg-[#316bff] text-white text-xs px-2 py-1 rounded">
                                Featured Partner
                              </span>
                            )}
                            {business.premium_discount && (
                              <span className="inline-block bg-[#FF5722] text-white text-xs px-2 py-1 rounded flex items-center">
                                <Tag className="h-3 w-3 mr-1" />
                                {business.premium_discount}% Off
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </AnimatedCard>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-400">No businesses found matching your criteria.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Industry sections */}
        {industries.map((industry, index) => (
          <section
            key={industry.name}
            id={industry.name.toLowerCase().replace(/\s+/g, "-")}
            className={`py-16 ${index % 2 === 1 ? "bg-black/50 backdrop-blur-sm" : ""}`}
          >
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                {/* Only render the image if it's not the "Retail & Local Business" industry */}
                {industry.name !== "Retail & Local Business" && (
                  <AnimatedSection className="lg:w-1/2" direction={index % 2 === 0 ? "right" : "left"}>
                    <div
                      className="bg-black/60 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-gray-700 relative overflow-hidden"
                      style={
                        industry.name === "Health & Fitness"
                          ? {
                              backgroundImage: "url('/images/vip-background.jpeg')",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundAttachment: "fixed",
                            }
                          : {}
                      }
                    >
                      {/* Add a semi-transparent overlay for better readability when the VIP background is present */}
                      {industry.name === "Health & Fitness" && (
                        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
                      )}

                      <div className="relative z-10 rounded-lg overflow-hidden">
                        {industry.lottieUrl ? (
                          <LottieAnimation src={industry.lottieUrl} width="100%" height="400px" className="w-full" />
                        ) : (
                          <Image
                            src={industry.image || "/placeholder.svg"}
                            width={600}
                            height={400}
                            alt={`${industry.name} industry`}
                            className="rounded-lg"
                          />
                        )}
                      </div>
                    </div>
                  </AnimatedSection>
                )}

                <div className={industry.name === "Retail & Local Business" ? "w-full" : "lg:w-1/2"}>
                  <AnimatedSection>
                    <h2 className="text-3xl font-bold mb-6 text-white">{industry.name}</h2>
                    <p className="text-gray-300 mb-8">{industry.description}</p>
                  </AnimatedSection>

                  <AnimatedSection delay={0.1}>
                    <h3 className="font-bold text-xl mb-4 text-white">Industry Challenges</h3>
                    <ul className="space-y-3 mb-8">
                      {industry.challenges.map((challenge, i) => (
                        <motion.li
                          key={challenge}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                          viewport={{ once: true }}
                        >
                          <CheckCircle2 className="h-5 w-5 text-[#316bff] mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{challenge}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </AnimatedSection>

                  <AnimatedSection delay={0.2}>
                    <h3 className="font-bold text-xl mb-4 text-white">Our Solutions</h3>
                    <ul className="space-y-3 mb-8">
                      {industry.solutions.map((solution, i) => (
                        <motion.li
                          key={solution}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                          viewport={{ once: true }}
                        >
                          <CheckCircle2 className="h-5 w-5 text-[#316bff] mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{solution}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </AnimatedSection>

                  <AnimatedSection delay={0.3}>
                    <div className="bg-[#316bff]/10 backdrop-blur-sm p-6 rounded-lg mb-8 border border-[#316bff]/30">
                      <h3 className="font-bold text-xl mb-4 text-white">Success Metrics</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {industry.stats.map((stat, i) => (
                          <div key={i} className="text-center">
                            <div className="text-3xl font-bold text-[#316bff] mb-2">{stat.value}</div>
                            <p className="text-sm text-gray-300">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AnimatedSection>

                  <AnimatedSection delay={0.4}>
                    <div className="bg-[#316bff] text-white p-6 rounded-lg">
                      <h3 className="font-bold text-xl mb-2">Case Study Highlight</h3>
                      <p className="mb-1">{industry.caseStudy?.client || "Client Name"}</p>
                      <p className="text-white/80 mb-4">{industry.caseStudy?.result || "Results description"}</p>
                      {industry.caseStudy?.url ? (
                        <a href={industry.caseStudy.url} target="_blank" rel="noopener noreferrer">
                          <AnimatedButton variant="secondary" className="bg-white text-[#316bff]">
                            View Case Study
                          </AnimatedButton>
                        </a>
                      ) : (
                        <AnimatedButton variant="secondary" className="bg-white text-[#316bff]">
                          View Case Study
                        </AnimatedButton>
                      )}
                    </div>
                  </AnimatedSection>
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="py-16 bg-black/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-white">Why Choose Fuse.Vip?</h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Our industry-specific approach ensures that we deliver solutions tailored to your unique challenges
                  and opportunities.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatedSection delay={0.1}>
                <AnimatedCard className="bg-black/40 backdrop-blur-sm p-8 rounded-lg shadow-sm h-full border border-gray-700">
                  <h3 className="font-bold text-xl mb-4 text-[#316bff]">Industry Expertise</h3>
                  <p className="text-gray-300">
                    Our team includes specialists with deep knowledge and experience in various industries, ensuring
                    that we understand your specific challenges and opportunities.
                  </p>
                </AnimatedCard>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <AnimatedCard className="bg-black/40 backdrop-blur-sm p-8 rounded-lg shadow-sm h-full border border-gray-700">
                  <h3 className="font-bold text-xl mb-4 text-[#316bff]">Customized Solutions</h3>
                  <p className="text-gray-300">
                    We don't believe in one-size-fits-all approaches. Our solutions are tailored to address the unique
                    needs and goals of your business and industry.
                  </p>
                </AnimatedCard>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <AnimatedCard className="bg-black/40 backdrop-blur-sm p-8 rounded-lg shadow-sm h-full border border-gray-700">
                  <h3 className="font-bold text-xl mb-4 text-[#316bff]">Proven Results</h3>
                  <p className="text-gray-300">
                    Our track record of successful digital transformations across various industries speaks for itself.
                    We've helped businesses of all sizes achieve their digital goals.
                  </p>
                </AnimatedCard>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <CtaSection />
      </div>

      {/* Business Modal */}
      {selectedBusiness && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedBusiness(null)}
        >
          <div
            className="bg-black/80 backdrop-blur-md border border-gray-700 rounded-lg p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-800 rounded-lg mr-4 flex-shrink-0 overflow-hidden">
                  {selectedBusiness.logo_url ? (
                    <Image
                      src={selectedBusiness.logo_url || "/placeholder.svg"}
                      width={64}
                      height={64}
                      alt={`${selectedBusiness.name} logo`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#316bff]/10">
                      <Building2 className="h-8 w-8 text-[#316bff]" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white">{selectedBusiness.name}</h3>
                  <p className="text-sm text-gray-400">{selectedBusiness.category}</p>
                </div>
              </div>
              <button onClick={() => setSelectedBusiness(null)} className="text-gray-400 hover:text-gray-200">
                <X className="h-6 w-6" />
              </button>
            </div>

            {selectedBusiness.description && (
              <div className="mb-4">
                <h4 className="font-medium mb-1 text-white">About</h4>
                <p className="text-gray-300">{selectedBusiness.description}</p>
              </div>
            )}

            {selectedBusiness.address && (
              <div className="mb-4">
                <h4 className="font-medium mb-1 text-white">Location</h4>
                <p className="text-gray-300">{selectedBusiness.address}</p>
              </div>
            )}

            {selectedBusiness.website && (
              <div className="mb-4">
                <h4 className="font-medium mb-1 text-white">Website</h4>
                <a
                  href={
                    selectedBusiness.website.startsWith("http")
                      ? selectedBusiness.website
                      : `https://${selectedBusiness.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#316bff] hover:underline"
                >
                  {selectedBusiness.website}
                </a>
              </div>
            )}

            {selectedBusiness.premium_discount && (
              <div className="mb-4">
                <h4 className="font-medium mb-1 text-white">Premium Member Discount</h4>
                <p className="text-[#FF5722] font-bold flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  {selectedBusiness.premium_discount}% Off
                </p>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedBusiness(null)}
                className="bg-[#316bff] text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
