"use client"

import { Logo } from "./logo"
import { NavMenu } from "./layout/nav-menu"
import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-center border-b bg-background">
      <div className="flex h-(--header-height) w-full max-w-6xl items-center justify-between gap-2 px-4">
        <Link href="/">
          <Logo size="sm" />
        </Link>
        <NavMenu />
      </div>
    </header>
  )
}
