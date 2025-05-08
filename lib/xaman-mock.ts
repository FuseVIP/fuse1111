// Mock implementation of Xaman SDK for development/preview
export interface XamanConnectionResponse {
  uuid: string
  qrUrl: string
  deeplink: {
    universal: string
    ios: string
    android: string
  }
}

export interface XamanUserInfo {
  sub: string
  account: string
  network: string
  iat: number
  exp: number
}

class XamanConnectMock {
  private apiKey: string
  private redirectUrl?: string

  constructor(config: { apiKey: string; redirectUrl?: string }) {
    this.apiKey = config.apiKey
    this.redirectUrl = config.redirectUrl
  }

  async authorize(options: { claims: { account: boolean } }): Promise<XamanConnectionResponse> {
    // Generate a mock connection response
    const uuid = Math.random().toString(36).substring(2, 15)
    const mockQrData = `xaman://sign/${uuid}`

    return {
      uuid,
      qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(mockQrData)}`,
      deeplink: {
        universal: `xaman://sign/${uuid}`,
        ios: `xaman://sign/${uuid}`,
        android: `xaman://sign/${uuid}`,
      },
    }
  }

  async waitForAuthorization(uuid: string, options: { timeout: number }): Promise<XamanUserInfo> {
    // Simulate a delay for the authorization process
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          sub: uuid,
          account: "rHEQJRrRsRj7P9sJpZT9JEbjEEKMUrJfwR",
          network: "xrpl:testnet",
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 3600,
        })
      }, 2000) // Simulate a 2-second delay
    })
  }

  async verifyToken(userInfo: XamanUserInfo): Promise<boolean> {
    // Mock token verification - always returns true in this mock implementation
    return true
  }
}

export function getXamanSDK() {
  const apiKey = process.env.NEXT_PUBLIC_XAMAN_API_KEY || "mock_api_key"

  return new XamanConnectMock({
    apiKey,
    redirectUrl: typeof window !== "undefined" ? window.location.href : undefined,
  })
}

// Function to check if the device is mobile
export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}
