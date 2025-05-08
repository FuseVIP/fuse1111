// Xaman SDK integration utilities
import { XamanConnect } from "@xaman/connect-sdk"

// Initialize the Xaman SDK with the API key
let xamanSDK: XamanConnect | null = null

export function getXamanSDK(): XamanConnect {
  if (!xamanSDK) {
    const apiKey = process.env.NEXT_PUBLIC_XAMAN_API_KEY

    if (!apiKey) {
      throw new Error("NEXT_PUBLIC_XAMAN_API_KEY is not defined")
    }

    xamanSDK = new XamanConnect({
      apiKey,
      redirectUrl: typeof window !== "undefined" ? window.location.href : undefined,
    })
  }

  return xamanSDK
}

// Types for Xaman connection response
export interface XamanConnectionResponse {
  uuid: string
  qrUrl: string
  deeplink: {
    universal: string
    ios: string
    android: string
  }
}

// Types for Xaman user info
export interface XamanUserInfo {
  sub: string
  account: string
  network: string
  iat: number
  exp: number
}

// Function to check if the device is mobile
export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}
