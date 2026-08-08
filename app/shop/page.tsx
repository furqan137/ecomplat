"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Search, SlidersHorizontal } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { CartDrawer } from "@/components/cart-drawer"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CATEGORIES, PRODUCTS } from "@/lib/products"
import { cn } from "@/lib/utils"

export default function ShopPage() {
  const { addToCart } = useCart()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured")

  const filteredProducts = useMemo(() => {
    const list = PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    return [...list].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price
      if (sortBy === "price-desc") return b.price - a.price
      if (sortBy === "rating") return b.rating - a.rating
      return 0
    })
  }, [searchQuery, selectedCategory, sortBy])

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <CartDrawer />

      {/* Shop intro — atmosphere, not cluttered hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 texture-grid opacity-70" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-forest/70 animate-rise">
            The shop
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight text-ink animate-rise-delay-1 sm:text-5xl md:text-6xl">
            ShopHub
          </h1>
          <p className="mt-4 max-w-lg text-base text-muted-foreground animate-rise-delay-2 sm:text-lg">
            A focused edit of electronics and accessories — search, filter, and build your setup.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Controls */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 border-border bg-mist/80 pl-10"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filter
            </span>
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium transition-colors",
                !selectedCategory
                  ? "bg-forest text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80",
              )}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium transition-colors",
                  selectedCategory === cat
                    ? "bg-forest text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80",
                )}
              >
                {cat}
              </button>
            ))}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="ml-auto h-9 border border-border bg-mist px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/40"
              aria-label="Sort products"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to high</option>
              <option value="price-desc">Price: High to low</option>
              <option value="rating">Top rated</option>
            </select>
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Showing {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "piece" : "pieces"}
        </p>

        {/* Creative product layout */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product, index) => {
            const featuredTile = index === 0 && !selectedCategory && !searchQuery
            return (
              <article
                key={product.id}
                className={cn(
                  "group flex flex-col overflow-hidden border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-forest/40",
                  featuredTile && "sm:col-span-2 sm:grid sm:grid-cols-2",
                )}
              >
                <div
                  className={cn(
                    "relative overflow-hidden bg-secondary",
                    featuredTile ? "aspect-[16/11] sm:aspect-auto sm:min-h-[320px]" : "aspect-square",
                  )}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3 bg-mist/90 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-forest backdrop-blur-sm">
                    {product.category}
                  </div>
                </div>

                <div className={cn("flex flex-1 flex-col p-5", featuredTile && "sm:justify-center sm:p-8")}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2
                        className={cn(
                          "font-display font-semibold tracking-tight text-ink",
                          featuredTile ? "text-2xl sm:text-3xl" : "text-xl",
                        )}
                      >
                        {product.name}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>
                    </div>
                    <span className="shrink-0 text-sm font-medium text-forest">
                      {product.rating.toFixed(1)}★
                    </span>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                    <p className="font-display text-2xl font-bold text-forest">
                      ${product.price.toFixed(2)}
                    </p>
                    <Button
                      onClick={() => addToCart(product)}
                      className="bg-forest text-primary-foreground hover:bg-forest/90"
                    >
                      Add to bag
                    </Button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="mt-16 text-center">
            <p className="font-display text-2xl font-semibold text-ink">No matches</p>
            <p className="mt-2 text-muted-foreground">Try another search or clear the filters.</p>
            <Button
              className="mt-6"
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory(null)
              }}
            >
              Reset filters
            </Button>
          </div>
        )}
      </main>

      <footer className="border-t border-border bg-ink text-white/70">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-8 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p className="font-display text-lg font-semibold text-white">ShopHub</p>
          <p className="text-sm">Curated gear for focused living.</p>
        </div>
      </footer>
    </div>
  )
}
