"use client"

import type React from "react"

import NextLink from "next/link"
import { forwardRef } from "react"

interface LinkProps extends React.ComponentPropsWithoutRef<typeof NextLink> {
  children: React.ReactNode
  className?: string
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ href, children, className, onClick, ...props }, ref) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If it's an anchor link (starts with #), don't interfere with default behavior
    if (typeof href === "string" && href.startsWith("#")) {
      if (onClick) onClick(e)
      return
    }

    // For same-page links that don't start with #, prevent default and handle manually
    if (typeof href === "string" && !href.startsWith("/") && !href.startsWith("http")) {
      e.preventDefault()
      if (onClick) onClick(e)
      window.scrollTo({ top: 0, left: 0, behavior: "instant" })
      return
    }

    // For external links or normal navigation, just call the original onClick if it exists
    if (onClick) onClick(e)
  }

  return (
    <NextLink
      href={href}
      className={className}
      onClick={handleClick}
      ref={ref}
      scroll={true} // Ensure Next.js scrolls to top
      {...props}
    >
      {children}
    </NextLink>
  )
})

Link.displayName = "Link"

export { Link }
