// This file provides a unified way to access environment variables
// regardless of whether we're in a Vite or Next.js environment

export const env = {
  // Supabase
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || "",
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || "",

  // Stripe
  STRIPE_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || process.env.VITE_STRIPE_PUBLISHABLE_KEY || "",

  // Mapbox
  MAPBOX_ACCESS_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || process.env.VITE_MAPBOX_ACCESS_TOKEN || "",

  // Xaman
  XAMAN_API_KEY: process.env.NEXT_PUBLIC_XAMAN_API_KEY || process.env.VITE_XAMAN_API_KEY || "",
}

// Helper function to check if required environment variables are set
export function checkRequiredEnvVars(requiredVars: string[]) {
  const missing = requiredVars.filter((key) => !env[key as keyof typeof env])

  if (missing.length > 0) {
    console.warn(`Missing required environment variables: ${missing.join(", ")}`)
    return false
  }

  return true
}

// Helper to validate a URL string
export function isValidUrl(urlString: string): boolean {
  try {
    new URL(urlString)
    return true
  } catch (err) {
    return false
  }
}
