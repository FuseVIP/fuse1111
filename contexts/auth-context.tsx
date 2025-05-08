"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import {
  getSession,
  onAuthStateChange,
  getUserRoles,
  getUserProfile,
  signInWithEmail,
  signUpWithEmail,
  signOut as supabaseSignOut,
  supabase,
} from "@/lib/supabase"
import type { User, Session } from "@supabase/supabase-js"

// Create a default context value to prevent the "must be used within a provider" error
const defaultContextValue: AuthContextType = {
  user: null,
  session: null,
  profile: null,
  isLoading: false,
  isAdmin: false,
  isBusinessOwner: false,
  roles: [],
  portalRoles: [],
  referralCount: 0,
  signIn: async () => ({ error: new Error("Auth context not initialized") }),
  signUp: async () => ({ error: new Error("Auth context not initialized"), data: null }),
  signOut: async () => {},
  refreshSession: async () => {},
}

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: any | null
  isLoading: boolean
  isAdmin: boolean
  isBusinessOwner: boolean
  roles: string[]
  portalRoles: string[]
  referralCount: number
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string) => Promise<{ error: any; data: any }>
  signOut: () => Promise<void>
  refreshSession: () => Promise<void>
}

// Update the context creation line to use the default value:
const AuthContext = createContext<AuthContextType>(defaultContextValue)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(false) // Start with false to avoid unnecessary loading
  const [roles, setRoles] = useState<string[]>([])
  const [portalRoles, setPortalRoles] = useState<string[]>([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [isBusinessOwnerState, setIsBusinessOwner] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [referralCount, setReferralCount] = useState(0)

  // Only initialize auth state if user interacts with auth features
  useEffect(() => {
    // We'll only check for an existing session if the user has interacted with auth
    if (!isInitialized) return

    setIsLoading(true)

    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
        } = await getSession()
        setSession(session)
        setUser(session?.user ?? null)

        if (session?.user) {
          await loadUserData(session.user)
        } else {
          setIsLoading(false)
        }
      } catch (error) {
        console.error("Error getting initial session:", error)
        setIsLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = onAuthStateChange(async (_event, session) => {
      try {
        setSession(session)
        setUser(session?.user ?? null)

        if (session?.user) {
          await loadUserData(session.user)
        } else {
          setProfile(null)
          setRoles([])
          setPortalRoles([])
          setIsAdmin(false)
          setIsBusinessOwner(false)
          setReferralCount(0)
          setIsLoading(false)
        }
      } catch (error) {
        console.error("Error in auth state change:", error)
        setIsLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [isInitialized])

  async function loadUserData(user: User) {
    setIsLoading(true)

    try {
      // Load user profile
      const profileData = await getUserProfile(user.id)
      setProfile(profileData)

      // Load user roles - first check user_roles
      const userRoles = await getUserRoles(user.id)
      setRoles(userRoles)

      // Then check portal_roles
      const { data: portalRolesData } = await supabase.from("portal_roles").select("role").eq("user_id", user.id)

      const extractedPortalRoles = portalRolesData ? portalRolesData.map((item) => item.role) : []
      setPortalRoles(extractedPortalRoles)

      // Set admin status based on both role tables
      setIsAdmin(userRoles.includes("admin") || extractedPortalRoles.includes("admin"))

      // Check if business owner - now checking user_id column in businesses table
      const { data: businessData } = await supabase.from("businesses").select("id").eq("user_id", user.id).single()

      setIsBusinessOwner(!!businessData)

      // Get referral count for business owners
      if (businessData) {
        const { count } = await supabase
          .from("referrals")
          .select("id", { count: "exact" })
          .eq("business_id", businessData.id)

        setReferralCount(count || 0)
      }
    } catch (error) {
      console.error("Error loading user data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    // Initialize auth state when user tries to sign in
    setIsInitialized(true)
    setIsLoading(true)

    try {
      const { error } = await signInWithEmail(email, password)
      setIsLoading(false)
      return { error }
    } catch (error) {
      console.error("Error signing in:", error)
      setIsLoading(false)
      return { error }
    }
  }

  const signUp = async (email: string, password: string) => {
    // Initialize auth state when user tries to sign up
    setIsInitialized(true)
    setIsLoading(true)

    try {
      const { data, error } = await signUpWithEmail(email, password)
      setIsLoading(false)
      return { data, error }
    } catch (error) {
      console.error("Error signing up:", error)
      setIsLoading(false)
      return { data: null, error }
    }
  }

  const signOut = async () => {
    setIsLoading(true)
    try {
      await supabaseSignOut()
      setIsLoading(false)
    } catch (error) {
      console.error("Error signing out:", error)
      setIsLoading(false)
    }
  }

  const refreshSession = async () => {
    if (user) {
      try {
        await loadUserData(user)
      } catch (error) {
        console.error("Error refreshing session:", error)
      }
    }
  }

  const value = {
    user,
    session,
    profile,
    isLoading,
    isAdmin,
    isBusinessOwner: isBusinessOwnerState,
    roles,
    portalRoles,
    referralCount,
    signIn,
    signUp,
    signOut,
    refreshSession,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
