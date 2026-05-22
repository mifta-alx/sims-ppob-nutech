"use client"

import { Menu, X } from "lucide-react"
import { useState } from "react"

import { navigation } from "@/constants/navigations"

import { NavItem } from "./nav-item"

export function NavMenu() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="hidden items-center gap-6 md:flex">
        {navigation.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            title={item.title}
          />
        ))}
      </nav>

      <button
        onClick={() => setOpen(!open)}
        className="md:hidden"
      >
        {open ? (
          <X className="size-5" />
        ) : (
          <Menu className="size-5" />
        )}
      </button>

      {open && (
        <div className="absolute top-16 left-0 w-full border-b bg-background md:hidden">
          <nav className="flex flex-col p-4">
            {navigation.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                title={item.title}
                mobile
                onClick={() => setOpen(false)}
              />
            ))}
          </nav>
        </div>
      )}
    </>
  )
}