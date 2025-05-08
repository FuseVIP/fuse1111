"use client"

import { Link } from "@/components/ui/link" // Import our custom Link component
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X, LogIn, UserPlus } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { WalletConnectButton } from "./wallet/wallet-connect-button"

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    { name: "Solutions", path: "/solutions", hasDropdown: false },
    { name: "Industry", path: "/industry", hasDropdown: false },
    { name: "FUSE", path: "/fuse", hasDropdown: false },
    { name: "Upgrade", path: "/upgrade", hasDropdown: false },
    { name: "About Us", path: "/about-us", hasDropdown: false },
    { name: "Reviews", path: "/reviews", hasDropdown: false },
    { name: "Resources", path: "/resources", hasDropdown: false },
  ]

  const headerVariants = {
    initial: {
      backgroundColor: "rgba(26, 26, 26, 1)",
      boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
    },
    scrolled: {
      backgroundColor: "rgba(26, 26, 26, 0.95)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    },
  }

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: 300,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const mobileItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 },
  }

  return (
    <motion.header
      className="sticky top-0 z-40 w-full py-4 text-white"
      variants={headerVariants}
      animate={scrolled ? "scrolled" : "initial"}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex items-center">
            <div className="mr-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fuse-token-cVZqlFSRtwajwj78HxXV8wNGxxBtqg.png"
                width={40}
                height={40}
                alt="Fuse.vip Logo"
                className="w-10 h-10"
              />
            </div>
            <span className="font-medium text-white">Fuse.Vip</span>
          </Link>
        </motion.div>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Link
                href={item.path}
                className={`flex items-center space-x-1 cursor-pointer ${
                  isActive(item.path) ? "text-[#3A56FF] font-medium" : "text-white"
                }`}
              >
                <span className="text-sm">{item.name}</span>
                {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/register">
            <motion.button
              className="flex items-center space-x-1 bg-[#3A56FF] text-white px-3 py-1.5 rounded-md text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <UserPlus className="h-4 w-4 mr-1" />
              <span>Register</span>
            </motion.button>
          </Link>

          <Link href="/login">
            <motion.button
              className="flex items-center space-x-1 bg-white text-[#1A1A1A] px-3 py-1.5 rounded-md text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LogIn className="h-4 w-4 mr-1" />
              <span>Sign In</span>
            </motion.button>
          </Link>

          <WalletConnectButton />

          <motion.button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden fixed inset-0 z-50 bg-[#1A1A1A] pt-16"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="container mx-auto px-4">
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <motion.div key={item.path} variants={mobileItemVariants}>
                      <Link
                        href={item.path}
                        className={`flex items-center justify-between py-2 border-b border-gray-800 ${
                          isActive(item.path) ? "text-[#3A56FF] font-medium" : "text-white"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span>{item.name}</span>
                        {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div variants={mobileItemVariants} className="pt-4 flex flex-col space-y-4">
                    <Link
                      href="/register"
                      className="flex items-center py-2 border-b border-gray-800 text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      <span>Register</span>
                    </Link>
                    <Link
                      href="/login"
                      className="flex items-center py-2 border-b border-gray-800 text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      <span>Sign In</span>
                    </Link>
                    <WalletConnectButton />
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
