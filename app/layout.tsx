import type React from "react"
import type { Metadata } from "next"
import { Figtree, Syne } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/components/cart-provider"
import "./globals.css"

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
})

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
})

export const metadata: Metadata = {
  title: "ShopHub — Tools for focused living",
  description: "Curated electronics and desk accessories designed for clarity, craft, and everyday flow.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${figtree.variable} ${syne.variable} font-sans antialiased`}>
        <CartProvider>
          {children}
          <Analytics />
        </CartProvider>
      </body>
    </html>
  )
}
