"use client"

import { useEffect, useState } from "react"
import { RefreshCw } from "lucide-react"

export function XrpPrice() {
  const [xrpPrice, setXrpPrice] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchXrpPrice = async () => {
    try {
      setLoading(true)
      const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=usd")
      const data = await response.json()
      const price = data.ripple.usd
      setXrpPrice(price)
    } catch (error) {
      console.error("Error fetching XRP price:", error)
      setXrpPrice(0.5) // Fallback price if fetch fails
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchXrpPrice()

    // Set up interval to refresh price every minute
    const interval = setInterval(fetchXrpPrice, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center space-x-2">
      <span className="text-gray-500">Current XRP Price:</span>
      {loading ? (
        <span className="font-bold text-black flex items-center">
          <RefreshCw className="w-4 h-4 animate-spin mr-1" /> Loading...
        </span>
      ) : (
        <span className="font-bold text-black">${xrpPrice !== null ? xrpPrice.toFixed(2) : "0.50"}</span>
      )}
      <button
        onClick={fetchXrpPrice}
        className="text-[#316bff] hover:text-[#1a56ff] transition-colors ml-2"
        title="Refresh XRP price"
      >
        <RefreshCw className="w-4 h-4" />
      </button>
    </div>
  )
}
