"use client"

import { useState, useEffect } from "react"
import { getXamanSDK, isMobileDevice, type XamanConnectionResponse, type XamanUserInfo } from "@/lib/xaman-mock"

export type WalletState = {
  isConnected: boolean
  isConnecting: boolean
  walletAddress: string
  userInfo: XamanUserInfo | null
  connectionData: XamanConnectionResponse | null
  error: string | null
  connect: () => Promise<void>
  disconnect: () => void
  checkConnection: () => Promise<boolean>
}

const STORAGE_KEY = "xaman_wallet_state"

export function useWallet(): WalletState {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [userInfo, setUserInfo] = useState<XamanUserInfo | null>(null)
  const [connectionData, setConnectionData] = useState<XamanConnectionResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Load wallet state from localStorage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY)
    if (savedState) {
      try {
        const { isConnected, walletAddress, userInfo } = JSON.parse(savedState)
        setIsConnected(isConnected)
        setWalletAddress(walletAddress)
        setUserInfo(userInfo)

        // Verify the connection is still valid
        checkConnection().catch(() => {
          // If verification fails, reset the connection
          disconnect()
        })
      } catch (e) {
        console.error("Failed to parse saved wallet state:", e)
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [])

  // Save wallet state to localStorage whenever it changes
  useEffect(() => {
    if (isConnected && walletAddress) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ isConnected, walletAddress, userInfo }))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [isConnected, walletAddress, userInfo])

  // Check if the connection is still valid
  const checkConnection = async (): Promise<boolean> => {
    if (!userInfo) return false

    try {
      const sdk = getXamanSDK()
      const isValid = await sdk.verifyToken(userInfo)
      return isValid
    } catch (e) {
      console.error("Failed to verify connection:", e)
      return false
    }
  }

  // Connect to Xaman wallet
  const connect = async (): Promise<void> => {
    setIsConnecting(true)
    setError(null)

    try {
      const sdk = getXamanSDK()

      // Create a new connection
      const connection = await sdk.authorize({
        claims: {
          account: true,
        },
      })

      setConnectionData(connection)

      // If on mobile, redirect to the app
      if (isMobileDevice()) {
        window.location.href = connection.deeplink.universal
        return
      }

      // On desktop, we need to poll for the connection status
      const userInfo = await sdk.waitForAuthorization(connection.uuid, {
        timeout: 300000, // 5 minutes
      })

      if (userInfo) {
        setIsConnected(true)
        setWalletAddress(userInfo.account)
        setUserInfo(userInfo)
        setConnectionData(null)
      }
    } catch (e) {
      console.error("Failed to connect wallet:", e)
      setError(e instanceof Error ? e.message : "Failed to connect wallet")
    } finally {
      setIsConnecting(false)
    }
  }

  // Disconnect from Xaman wallet
  const disconnect = () => {
    setIsConnected(false)
    setWalletAddress("")
    setUserInfo(null)
    setConnectionData(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    isConnected,
    isConnecting,
    walletAddress,
    userInfo,
    connectionData,
    error,
    connect,
    disconnect,
    checkConnection,
  }
}
