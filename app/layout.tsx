import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageTransition } from "@/components/page-transition"
import { ScrollProgressBar } from "@/components/scroll-progress-bar"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fuse.vip - Loyalty Reimagined. Commerce Reconnected!",
  description:
    "Fuse.vip provides innovative loyalty solutions and digital transformation for businesses across various industries.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ScrollProgressBar />
          <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-grow">
              <PageTransition>{children}</PageTransition>
            </main>
            <SiteFooter />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
