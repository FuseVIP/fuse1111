import { NextResponse } from "next/server"
import Stripe from "stripe"
import { supabase } from "@/lib/supabase"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || ""

export async function POST(request: Request) {
  const payload = await request.text()
  const signature = request.headers.get("stripe-signature") || ""

  let event

  try {
    event = stripe.webhooks.constructEvent(payload, signature, endpointSecret)
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`)
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 })
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    // Extract metadata
    const userId = session.metadata?.userId
    const cardType = session.metadata?.cardType
    const isGuest = session.metadata?.isGuest === "true"
    const guestEmail = session.metadata?.guestEmail

    try {
      if (isGuest) {
        // For guest purchases, we'll create a temporary record
        // that will be associated with their account when they sign up
        await supabase.from("guest_purchases").insert({
          email: guestEmail,
          card_type: cardType,
          session_id: session.id,
          amount: session.amount_total ? session.amount_total / 100 : 0,
          status: "completed",
          created_at: new Date().toISOString(),
        })
      } else if (userId && userId !== "guest") {
        // For authenticated users, update their profile and create a card record

        // Update user profile to mark them as a card holder
        await supabase.from("profiles").update({ is_card_holder: true }).eq("id", userId)

        // Create a record in the user_cards table
        await supabase.from("user_cards").insert({
          user_id: userId,
          card_type: cardType,
          purchase_date: new Date().toISOString(),
          status: "active",
        })
      }

      return NextResponse.json({ received: true })
    } catch (error) {
      console.error("Error processing webhook:", error)
      return NextResponse.json({ error: "Error processing webhook" }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
