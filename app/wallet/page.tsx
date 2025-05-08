"use client"

import { PageHeader } from "@/components/page-header"
import { CtaSection } from "@/components/cta-section"
import { useWallet } from "@/hooks/use-wallet"
import { WalletConnectButton } from "@/components/wallet/wallet-connect-button"
import { AnimatedSection } from "@/components/animated-section"
import { Wallet, Copy, ExternalLink, RefreshCw } from "lucide-react"
import Image from "next/image"

export default function WalletPage() {
  const { isConnected, address, walletType, balance } = useWallet()

  return (
    <>
      <PageHeader
        title="Wallet Dashboard"
        subtitle="MANAGE YOUR WALLET"
        description="Connect your wallet to manage your tokens, track your rewards, and upgrade your membership tier."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          {isConnected ? (
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <div className="bg-[#1A1A1A] rounded-lg overflow-hidden shadow-lg">
                  <div className="p-6 border-b border-gray-700">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-white">Connected Wallet</h2>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 bg-[#2A2A2A] rounded-full text-gray-400 hover:text-white transition-colors duration-200">
                          <RefreshCw className="h-4 w-4" />
                        </button>
                        <button className="p-2 bg-[#2A2A2A] rounded-full text-gray-400 hover:text-white transition-colors duration-200">
                          <ExternalLink className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-[#2A2A2A] to-[#3A3A3A]">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center mb-2">
                          {walletType === "Xaman" ? (
                            <Image
                              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/xaman-logo-J6kQDGmHNAw1OC3KOJz5MFo9DNOUFO.png"
                              width={24}
                              height={24}
                              alt="Xaman Wallet"
                              className="mr-2"
                            />
                          ) : (
                            <Wallet className="h-5 w-5 mr-2 text-[#3A56FF]" />
                          )}
                          <span className="text-white font-medium">{walletType}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-300 text-sm mr-2">{address}</span>
                          <button className="text-gray-400 hover:text-white transition-colors duration-200">
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="bg-[#1A1A1A] px-6 py-3 rounded-lg">
                        <div className="text-sm text-gray-400">Balance</div>
                        <div className="text-2xl font-bold text-white flex items-center">
                          <Image
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fuse-token-cVZqlFSRtwajwj78HxXV8wNGxxBtqg.png"
                            width={20}
                            height={20}
                            alt="Fuse Token"
                            className="mr-2"
                          />
                          {balance} FUSE
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Membership Status</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-[#2A2A2A] p-4 rounded-lg">
                        <div className="text-sm text-gray-400 mb-1">Current Tier</div>
                        <div className="text-lg font-bold text-white">
                          {Number(balance) >= 150000
                            ? "Obsidian"
                            : Number(balance) >= 50000
                              ? "Diamond"
                              : Number(balance) >= 10000
                                ? "Platinum"
                                : Number(balance) >= 2500
                                  ? "Gold"
                                  : "Base"}
                        </div>
                      </div>
                      <div className="bg-[#2A2A2A] p-4 rounded-lg">
                        <div className="text-sm text-gray-400 mb-1">Referral Rewards</div>
                        <div className="text-lg font-bold text-white">
                          {Number(balance) >= 150000
                            ? "40%"
                            : Number(balance) >= 50000
                              ? "35%"
                              : Number(balance) >= 10000
                                ? "30%"
                                : Number(balance) >= 2500
                                  ? "25%"
                                  : "20%"}
                        </div>
                      </div>
                      <div className="bg-[#2A2A2A] p-4 rounded-lg">
                        <div className="text-sm text-gray-400 mb-1">Affiliate Rewards</div>
                        <div className="text-lg font-bold text-white">
                          {Number(balance) >= 150000
                            ? "5%"
                            : Number(balance) >= 50000
                              ? "4%"
                              : Number(balance) >= 10000
                                ? "3%"
                                : Number(balance) >= 2500
                                  ? "2%"
                                  : "1%"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-t border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-4">Next Tier Upgrade</h3>
                    {Number(balance) >= 150000 ? (
                      <div className="bg-[#2A2A2A] p-4 rounded-lg text-center">
                        <div className="text-white">You've reached the highest tier! Enjoy all premium benefits.</div>
                      </div>
                    ) : (
                      <div className="bg-[#2A2A2A] p-4 rounded-lg">
                        <div className="mb-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Progress to next tier</span>
                            <span className="text-white">
                              {Number(balance)}/
                              {Number(balance) >= 50000
                                ? "150,000"
                                : Number(balance) >= 10000
                                  ? "50,000"
                                  : Number(balance) >= 2500
                                    ? "10,000"
                                    : "2,500"}
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-[#3A56FF] h-2 rounded-full"
                              style={{
                                width: `${Math.min(
                                  100,
                                  (Number(balance) /
                                    (Number(balance) >= 50000
                                      ? 150000
                                      : Number(balance) >= 10000
                                        ? 50000
                                        : Number(balance) >= 2500
                                          ? 10000
                                          : 2500)) *
                                    100,
                                )}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-white">
                          You need{" "}
                          <span className="font-bold">
                            {Number(balance) >= 50000
                              ? (150000 - Number(balance)).toLocaleString()
                              : Number(balance) >= 10000
                                ? (50000 - Number(balance)).toLocaleString()
                                : Number(balance) >= 2500
                                  ? (10000 - Number(balance)).toLocaleString()
                                  : (2500 - Number(balance)).toLocaleString()}{" "}
                            more FUSE
                          </span>{" "}
                          to reach the next tier.
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6 border-t border-gray-700">
                    <div className="flex justify-between">
                      <button className="px-4 py-2 bg-[#3A56FF] text-white rounded-md">Buy More Tokens</button>
                      <button className="px-4 py-2 bg-[#2A2A2A] text-white rounded-md">Transaction History</button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto text-center">
              <AnimatedSection>
                <div className="bg-[#1A1A1A] rounded-lg p-8 shadow-lg">
                  <div className="w-20 h-20 bg-[#2A2A2A] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Wallet className="h-10 w-10 text-[#3A56FF]" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h2>
                  <p className="text-gray-300 mb-8">
                    Connect your wallet to view your token balance, track your rewards, and manage your membership tier.
                  </p>
                  <div className="flex justify-center">
                    <WalletConnectButton />
                  </div>
                </div>
              </AnimatedSection>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Supported Wallets</h2>
            <p className="text-[#4a4a4a] max-w-2xl mx-auto">
              We support a variety of wallets to make it easy for you to connect and manage your tokens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <AnimatedSection delay={0.1}>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Image src="/metamask-logo.png" width={64} height={64} alt="MetaMask" />
                </div>
                <h3 className="font-bold mb-2">MetaMask</h3>
                <p className="text-sm text-[#4a4a4a] mb-4">
                  The most popular Ethereum wallet with browser extension and mobile app.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/xaman-logo-J6kQDGmHNAw1OC3KOJz5MFo9DNOUFO.png"
                    width={64}
                    height={64}
                    alt="Xaman"
                  />
                </div>
                <h3 className="font-bold mb-2">Xaman</h3>
                <p className="text-sm text-[#4a4a4a] mb-4">
                  Secure and user-friendly wallet for XRP Ledger and other blockchains.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Image src="/walletconnect-logo.png" width={64} height={64} alt="WalletConnect" />
                </div>
                <h3 className="font-bold mb-2">WalletConnect</h3>
                <p className="text-sm text-[#4a4a4a] mb-4">
                  Open protocol for connecting wallets to dApps with QR code scanning.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Image src="/coinbase-wallet-logo.png" width={64} height={64} alt="Coinbase Wallet" />
                </div>
                <h3 className="font-bold mb-2">Coinbase Wallet</h3>
                <p className="text-sm text-[#4a4a4a] mb-4">
                  User-friendly wallet from Coinbase with support for multiple blockchains.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
