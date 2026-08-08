import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { CartDrawer } from "@/components/cart-drawer"
import { PRODUCTS } from "@/lib/products"

export default function LandingPage() {
  const featured = PRODUCTS.slice(0, 3)

  return (
    <div className="min-h-screen">
      <CartDrawer />

      {/* Hero — one composition, brand-first, full-bleed */}
      <section className="relative min-h-[100svh] overflow-hidden bg-ink text-white">
        <div className="absolute inset-x-0 top-0 z-40">
          <SiteHeader transparent />
        </div>
        <div className="absolute inset-0">
          <Image
            src="/wireless-headphones.png"
            alt="ShopHub wireless headphones"
            fill
            priority
            className="object-cover object-center animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30" />
        </div>

        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          <p className="font-display animate-rise text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            ShopHub
          </p>
          <div className="mt-5 h-px w-24 origin-left bg-aqua animate-fade-line" />
          <h1 className="mt-6 max-w-xl font-display text-2xl font-semibold leading-tight tracking-tight text-white/95 animate-rise-delay-1 sm:text-3xl md:text-4xl">
            Tools that quiet the noise around your day.
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/75 animate-rise-delay-2 sm:text-lg">
            Electronics and desk essentials chosen for clarity, comfort, and lasting craft.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 animate-rise-delay-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-aqua px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              Enter the shop
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#craft"
              className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-sm font-medium text-white/90 transition-colors hover:bg-white/10"
            >
              Our approach
            </a>
          </div>
        </div>
      </section>

      {/* Craft — one job */}
      <section id="craft" className="relative overflow-hidden texture-grid">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-28">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest/70">The approach</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
              Fewer objects.
              <br />
              Better ones.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Every piece in ShopHub earns its place — tuned for daily use, built to last, and
              designed to disappear into a focused routine.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-forest">
            <Image
              src="/mechanical-keyboard.png"
              alt="Mechanical keyboard on a focused desk"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Featured strip — editorial, not a card grid */}
      <section className="bg-forest text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aqua">Collection</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Start with these
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-medium text-aqua transition-opacity hover:opacity-80"
            >
              View all products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-px bg-white/10 sm:grid-cols-3">
            {featured.map((product, index) => (
              <Link
                key={product.id}
                href="/shop"
                className="group relative bg-forest transition-colors hover:bg-forest/80"
              >
                <div className="relative aspect-[5/4] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-xs uppercase tracking-widest text-aqua/90">0{index + 1}</p>
                  <p className="mt-1 font-display text-xl font-semibold">{product.name}</p>
                  <p className="mt-1 text-sm text-white/70">{product.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/smartwatch-lifestyle.png"
            alt=""
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-mist/85" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:py-32">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl animate-float-soft">
            Build a desk that works with you.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Explore the full ShopHub catalog and assemble your setup in minutes.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-2 bg-forest px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Shop the collection
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border bg-ink text-white/70">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-8 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p className="font-display text-lg font-semibold text-white">ShopHub</p>
          <p className="text-sm">Curated gear for focused living.</p>
        </div>
      </footer>
    </div>
  )
}
