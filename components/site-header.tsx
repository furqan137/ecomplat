"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { LogIn, LogOut, Menu, ShoppingBag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { cn } from "@/lib/utils"

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
]

export function SiteHeader({ transparent = false }: { transparent?: boolean }) {
  const pathname = usePathname()
  const { itemCount, setShowCart, isLoggedIn, setIsLoggedIn } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <header
      className={cn(
        "z-40 transition-colors",
        transparent
          ? "border-b border-white/10 bg-ink/35 text-white backdrop-blur-md"
          : "sticky top-0 border-b border-border/70 bg-mist/85 text-foreground backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-baseline gap-1">
          <span className="font-display text-2xl font-bold tracking-tight sm:text-[1.75rem]">
            ShopHub
          </span>
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full transition-transform group-hover:scale-125",
              transparent ? "bg-aqua" : "bg-accent",
            )}
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium tracking-wide transition-opacity hover:opacity-100",
                pathname === link.href ? "opacity-100" : "opacity-65",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant={transparent ? "outline" : isLoggedIn ? "outline" : "default"}
            size="sm"
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className={cn(
              transparent &&
                "border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white",
            )}
          >
            {isLoggedIn ? (
              <>
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowCart(true)}
            className={cn(
              "relative",
              transparent &&
                "border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white",
            )}
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold text-accent-foreground">
                {itemCount}
              </span>
            )}
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="p-2 md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className={cn(
            "flex flex-col gap-3 border-t px-4 pb-4 pt-3 md:hidden",
            transparent ? "border-white/10" : "border-border",
          )}
        >
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
