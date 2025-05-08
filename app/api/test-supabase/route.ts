import { NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase"
import { supabase as directSupabase } from "@/lib/supabase-direct"

// This is a test endpoint to verify your Supabase connection
export async function GET() {
  try {
    // Test the lazy-loaded client
    const lazyClient = getSupabaseClient()
    let lazyClientResult = "Not tested"

    if (lazyClient) {
      const { data: lazyData, error: lazyError } = await lazyClient.from("profiles").select("count").limit(1)

      lazyClientResult = lazyError ? `Error: ${lazyError.message}` : "Connected successfully"
    }

    // Test the direct client
    let directClientResult = "Not tested"
    try {
      const { data: directData, error: directError } = await directSupabase.from("profiles").select("count").limit(1)

      directClientResult = directError ? `Error: ${directError.message}` : "Connected successfully"
    } catch (directError) {
      directClientResult = `Error: ${directError.message}`
    }

    return NextResponse.json({
      success: true,
      lazyClient: lazyClientResult,
      directClient: directClientResult,
      env: {
        hasSupabaseUrl: !!process.env.SUPABASE_URL,
        hasSupabaseAnonKey: !!process.env.SUPABASE_ANON_KEY,
        hasNextPublicSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasNextPublicSupabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      },
    })
  } catch (error) {
    console.error("Error testing Supabase connection:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
