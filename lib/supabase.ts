import { createClient } from "@supabase/supabase-js"

// Create a lazy-loaded Supabase client
let supabaseInstance: ReturnType<typeof createClient> | null = null

// Update the environment variable names to match what you provided
// Replace the existing getSupabaseClient function with this updated version

export function getSupabaseClient() {
  if (supabaseInstance) return supabaseInstance

  // Use the environment variable names from your configuration
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ""
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Missing Supabase environment variables - some features may not work")
    return null
  }

  try {
    // Validate URL
    new URL(supabaseUrl)
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
    return supabaseInstance
  } catch (error) {
    console.error("Invalid Supabase URL:", error)
    return null
  }
}

// Update the supabase export to be undefined instead of null when not initialized
export const supabase = typeof window !== "undefined" ? getSupabaseClient() : undefined

// Helper functions that safely handle null Supabase client
export async function checkUserRole(userId: string, role: string): Promise<boolean> {
  const client = getSupabaseClient()
  if (!client || !userId) return false

  try {
    // First check user_roles table
    const { data: userRoleData, error: userRoleError } = await client
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", role)
      .single()

    if (userRoleData) return true

    // If not found, check portal_roles table
    const { data: portalRoleData, error: portalRoleError } = await client
      .from("portal_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", role)
      .single()

    if (portalRoleData) return true

    return false
  } catch (error) {
    console.error("Error checking user role:", error)
    return false
  }
}

export async function getUserRoles(userId: string): Promise<string[]> {
  const client = getSupabaseClient()
  if (!client || !userId) return []

  try {
    const { data, error } = await client.from("user_roles").select("role").eq("user_id", userId)

    if (error || !data) return []
    return data.map((item) => item.role)
  } catch (error) {
    console.error("Error fetching user roles:", error)
    return []
  }
}

export async function getUserProfile(userId: string) {
  const client = getSupabaseClient()
  if (!client || !userId) return null

  try {
    const { data, error } = await client.from("profiles").select("*").eq("id", userId).single()

    if (error) {
      console.error("Error fetching user profile:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return null
  }
}

export async function isBusinessOwner(userId: string): Promise<boolean> {
  const client = getSupabaseClient()
  if (!client || !userId) return false

  try {
    // Updated to check user_id column instead of owner_id
    const { data, error } = await client.from("businesses").select("id").eq("user_id", userId).single()

    if (error || !data) return false
    return true
  } catch (error) {
    console.error("Error checking business owner:", error)
    return false
  }
}

// Export functions for auth operations
export async function signInWithEmail(email: string, password: string) {
  const client = getSupabaseClient()
  if (!client) return { error: new Error("Supabase client not initialized") }

  try {
    return await client.auth.signInWithPassword({ email, password })
  } catch (error) {
    console.error("Error signing in:", error)
    return { error }
  }
}

export async function signUpWithEmail(email: string, password: string) {
  const client = getSupabaseClient()
  if (!client) return { error: new Error("Supabase client not initialized") }

  try {
    return await client.auth.signUp({ email, password })
  } catch (error) {
    console.error("Error signing up:", error)
    return { error, data: null }
  }
}

export async function signOut() {
  const client = getSupabaseClient()
  if (!client) return

  try {
    await client.auth.signOut()
  } catch (error) {
    console.error("Error signing out:", error)
  }
}

export async function getSession() {
  const client = getSupabaseClient()
  if (!client) return { data: { session: null } }

  try {
    return await client.auth.getSession()
  } catch (error) {
    console.error("Error getting session:", error)
    return { data: { session: null } }
  }
}

export function onAuthStateChange(callback: (event: string, session: any) => void) {
  const client = getSupabaseClient()
  if (!client) return { data: { subscription: { unsubscribe: () => {} } } }

  return client.auth.onAuthStateChange(callback)
}

export async function getAdminApplications() {
  const client = getSupabaseClient()
  if (!client) return []

  try {
    const { data, error } = await client
      .from("admin_applications")
      .select("*, profiles(*)")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching admin applications:", error)
      return []
    }

    return data
  } catch (error) {
    console.error("Error fetching admin applications:", error)
    return []
  }
}

export async function updateAdminApplication(applicationId: string, status: string, reviewedBy: string) {
  const client = getSupabaseClient()
  if (!client) return false

  try {
    const { error } = await client
      .from("admin_applications")
      .update({
        status,
        reviewed_by: reviewedBy,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", applicationId)

    if (error) {
      console.error("Error updating admin application:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error updating admin application:", error)
    return false
  }
}

export async function getUserCards(userId: string) {
  const client = getSupabaseClient()
  if (!client) return []

  try {
    const { data, error } = await client.from("user_cards").select("*").eq("user_id", userId)

    if (error) {
      console.error("Error fetching user cards:", error)
      return []
    }

    return data
  } catch (error) {
    console.error("Error fetching user cards:", error)
    return []
  }
}

export async function getBusinessPurchases(businessId: string) {
  const client = getSupabaseClient()
  if (!client) return []

  try {
    const { data, error } = await client
      .from("purchases")
      .select("*")
      .eq("business_id", businessId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching business purchases:", error)
      return []
    }

    return data
  } catch (error) {
    console.error("Error fetching business purchases:", error)
    return []
  }
}

export async function getBusinessReferrals(businessId: string) {
  const client = getSupabaseClient()
  if (!client) return []

  try {
    const { data, error } = await client
      .from("referrals")
      .select("*")
      .eq("business_id", businessId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching business referrals:", error)
      return []
    }

    return data
  } catch (error) {
    console.error("Error fetching business referrals:", error)
    return []
  }
}

export async function getApprovedBusinesses() {
  const client = getSupabaseClient()
  if (!client) return []

  try {
    const { data, error } = await client
      .from("businesses")
      .select("id, name, category")
      .eq("status", "approved")
      .order("name")

    if (error) {
      console.error("Error fetching businesses:", error)
      return []
    }

    return data
  } catch (error) {
    console.error("Error fetching businesses:", error)
    return []
  }
}
