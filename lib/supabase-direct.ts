import { createClient } from "@supabase/supabase-js"

// This is a direct implementation using your provided code
// Use this if you need a simpler implementation without the lazy loading
export const supabase = createClient(
  process.env.SUPABASE_URL || "https://yvjzyxwmoiliyjzyrmnl.supabase.co",
  process.env.SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2anp5eHdtb2lsaXlqenlybW5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3OTEwNDIsImV4cCI6MjA1NjM2NzA0Mn0.Fz9U-ajxBiVIj9vXQ9O0ubln4CO3QjigM1zHSJsxObQ",
)

// Example function to test the connection
export async function testConnection() {
  try {
    const { data, error } = await supabase.from("profiles").select("count").limit(1)
    if (error) throw error
    console.log("Successfully connected to Supabase")
    return true
  } catch (error) {
    console.error("Error connecting to Supabase:", error)
    return false
  }
}
