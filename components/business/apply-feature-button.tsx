"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Star } from "lucide-react"
import Link from "next/link"

interface ApplyFeatureButtonProps {
  businessId: string
  userId: string
}

export function ApplyFeatureButton({ businessId, userId }: ApplyFeatureButtonProps) {
  const [hasApplied, setHasApplied] = useState(false)
  const [isFeatured, setIsFeatured] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkStatus() {
      setLoading(true)

      // Check if business is already featured
      const { data: business } = await supabase.from("businesses").select("is_featured").eq("id", businessId).single()

      if (business) {
        setIsFeatured(business.is_featured)
      }

      // Check if there's a pending application
      const { data: application } = await supabase
        .from("business_feature_applications")
        .select("id")
        .eq("business_id", businessId)
        .eq("status", "pending")
        .maybeSingle()

      setHasApplied(!!application)
      setLoading(false)
    }

    checkStatus()
  }, [businessId])

  if (loading) {
    return (
      <button className="bg-gray-300 text-white px-4 py-2 rounded-md text-sm flex items-center opacity-50 cursor-not-allowed">
        <Star className="h-4 w-4 mr-2" />
        Loading...
      </button>
    )
  }

  if (isFeatured) {
    return (
      <button className="bg-yellow-500 text-white px-4 py-2 rounded-md text-sm flex items-center cursor-default">
        <Star className="h-4 w-4 mr-2 fill-white" />
        Featured Business
      </button>
    )
  }

  if (hasApplied) {
    return (
      <button className="bg-gray-500 text-white px-4 py-2 rounded-md text-sm flex items-center cursor-default">
        <Star className="h-4 w-4 mr-2" />
        Application Pending
      </button>
    )
  }

  return (
    <Link href="/apply-for-feature" className="bg-[#3A56FF] text-white px-4 py-2 rounded-md text-sm flex items-center">
      <Star className="h-4 w-4 mr-2" />
      Apply for Featured Status
    </Link>
  )
}
