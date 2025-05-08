declare module "@xaman/connect-sdk" {
  export interface XamanConnectOptions {
    apiKey: string
    redirectUrl?: string
  }

  export interface AuthorizeClaims {
    account: boolean
    kyc?: boolean
    email?: boolean
    phone?: boolean
  }

  export interface AuthorizeOptions {
    claims: AuthorizeClaims
  }

  export interface DeeplinkUrls {
    universal: string
    ios: string
    android: string
  }

  export interface ConnectionResponse {
    uuid: string
    qrUrl: string
    deeplink: DeeplinkUrls
  }

  export interface UserInfo {
    sub: string
    account: string
    network: string
    iat: number
    exp: number
    email?: string
    phone?: string
    kyc?: {
      status: string
      level: number
    }
  }

  export interface WaitForAuthorizationOptions {
    timeout?: number
    interval?: number
  }

  export class XamanConnect {
    constructor(options: XamanConnectOptions)

    authorize(options: AuthorizeOptions): Promise<ConnectionResponse>

    waitForAuthorization(uuid: string, options?: WaitForAuthorizationOptions): Promise<UserInfo | null>

    verifyToken(token: UserInfo): Promise<boolean>
  }
}
