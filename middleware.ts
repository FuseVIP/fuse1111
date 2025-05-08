import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if the request is for the old incorrect register route
  if (request.nextUrl.pathname === "/register" && request.nextUrl.searchParams.has("redirect_to_reviews")) {
    // Redirect to the proper registration page
    return NextResponse.redirect(new URL("/register", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/register"],
}
