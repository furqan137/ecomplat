"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import type { CartItem, Product } from "@/lib/products"

interface CartContextValue {
  cartItems: CartItem[]
  isLoggedIn: boolean
  showCart: boolean
  setShowCart: (open: boolean) => void
  setIsLoggedIn: (value: boolean) => void
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  itemCount: number
  subtotal: number
  tax: number
  total: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setShowCart(true)
  }

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item)),
    )
  }

  const value = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const tax = subtotal * 0.1
    return {
      cartItems,
      isLoggedIn,
      showCart,
      setShowCart,
      setIsLoggedIn,
      addToCart,
      removeFromCart,
      updateQuantity,
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      tax,
      total: subtotal + tax,
    }
  }, [cartItems, isLoggedIn, showCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider")
  }
  return ctx
}
