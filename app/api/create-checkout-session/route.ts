import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export async function POST(request: Request) {
  try {
    const { cardType, price, userId, guestEmail, isGuest } = await request.json()

    // Validate the request
    if (!cardType || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // For guest users, ensure we have an email
    if (isGuest && !guestEmail) {
      return NextResponse.json({ error: "Guest email is required" }, { status: 400 })
    }

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${cardType} Membership`,
              description: `${cardType} tier membership for Fuse.Vip`,
            },
            unit_amount: price * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.headers.get("origin")}/checkout-success?session_id={CHECKOUT_SESSION_ID}${isGuest ? "&guest=true&email=" + encodeURIComponent(guestEmail) : ""}`,
      cancel_url: `${request.headers.get("origin")}/upgrade`,
      customer_email: isGuest ? guestEmail : undefined,
      metadata: {
        userId: userId || "guest",
        cardType,
        isGuest: isGuest ? "true" : "false",
        guestEmail: isGuest ? guestEmail : "",
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: "An error occurred while creating the checkout session" }, { status: 500 })
  }
}
