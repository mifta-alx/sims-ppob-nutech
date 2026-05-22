"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

interface NavItemProps {
  href: string
  title: string
  onClick?: () => void
  mobile?: boolean
}

export function NavItem({
  href,
  title,
  onClick,
  mobile,
}: NavItemProps) {
  const pathname = usePathname()

  const isActive = pathname === href

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "text-sm font-medium transition-colors duration-300 ease-in-out",
        isActive
          ? "text-primary"
          : "hover:text-primary",
        mobile && "py-3"
      )}
    >
      {title}
    </Link>
  )
}