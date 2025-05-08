"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { AnimatedSection } from "@/components/animated-section"
import { AnimatedCard } from "@/components/animated-card"
import { ArrowRight, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function BusinessSpotlight() {
  const [businesses, setBusinesses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFeaturedBusinesses() {
      setLoading(true)
      const { data, error } = await supabase.from("businesses").select("*").eq("is_featured", true).limit(3)

      if (!error && data) {
        setBusinesses(data)
      }
      setLoading(false)
    }

    loadFeaturedBusinesses()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#3A56FF]"></div>
      </div>
    )
  }

  if (businesses.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-[#f8f9fa]">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="bg-[#FF3A2F] text-white px-4 py-2 rounded-md inline-block mb-4">Business Spotlight</div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Our Featured <span className="text-[#FF3A2F]">Partners</span>
              </h2>
            </div>
            <Link
              href="/partners"
              className="bg-[#FF3A2F] text-white px-4 py-2 rounded-md text-sm hidden md:flex items-center"
            >
              View All Partners
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {businesses.map((business, index) => (
            <AnimatedSection key={business.id} delay={index * 0.1}>
              <AnimatedCard className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-48 relative">
                  {business.logo_url ? (
                    <Image
                      src={business.logo_url || "/placeholder.svg"}
                      fill
                      alt={business.name}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#3A56FF]/10 flex items-center justify-center">
                      <span className="text-[#3A56FF] font-bold text-2xl">{business.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < (business.rating || 5) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">{business.rating || 5}.0</span>
                  </div>
                  <h3 className="font-bold text-xl mb-2">{business.name}</h3>
                  <p className="text-[#4a4a4a] text-sm mb-4 line-clamp-2">
                    {business.description || "Join our loyalty program and earn rewards with every purchase."}
                  </p>
                  <Link href={`/business/${business.id}`} className="text-[#3A56FF] font-medium flex items-center">
                    View Business
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </AnimatedCard>
            </AnimatedSection>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link href="/partners" className="bg-[#FF3A2F] text-white px-6 py-3 rounded-md inline-flex items-center">
            View All Partners
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
