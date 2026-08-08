"use client"

import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"

export function CartDrawer() {
  const {
    showCart,
    setShowCart,
    cartItems,
    removeFromCart,
    updateQuantity,
    subtotal,
    tax,
    total,
    isLoggedIn,
  } = useCart()

  if (!showCart) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-ink/45 backdrop-blur-[2px]"
        aria-label="Close cart"
        onClick={() => setShowCart(false)}
      />
      <aside className="relative flex h-full w-full max-w-md flex-col bg-mist shadow-2xl animate-rise">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <p className="font-display text-xl font-semibold text-foreground">Your bag</p>
            <p className="text-sm text-muted-foreground">
              {cartItems.length === 0 ? "Ready when you are" : `${cartItems.length} selected`}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setShowCart(false)} aria-label="Close">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <p className="font-display text-2xl font-semibold text-forest">Nothing here yet</p>
              <p className="max-w-xs text-sm text-muted-foreground">
                Browse the shop and add pieces that sharpen your daily rhythm.
              </p>
            </div>
          ) : (
            <ul className="space-y-5">
              {cartItems.map((item) => (
                <li key={item.id} className="flex gap-3 border-b border-border/70 pb-5 last:border-0">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-secondary">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        −
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                      <span className="ml-auto text-sm font-semibold text-forest">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="space-y-3 border-t border-border bg-card px-5 py-5">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Tax (10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-3 font-display text-lg font-semibold text-foreground">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button className="w-full bg-forest text-primary-foreground hover:bg-forest/90" size="lg" disabled={!isLoggedIn}>
              {isLoggedIn ? "Proceed to checkout" : "Login to checkout"}
            </Button>
          </div>
        )}
      </aside>
    </div>
  )
}
