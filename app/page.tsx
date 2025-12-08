"use client"

import { useState } from "react"
import { ShoppingCart, Search, Menu, X, LogOut, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: string
  name: string
  price: number
  category: string
  image: string
  rating: number
}

interface CartItem extends Product {
  quantity: number
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 129.99,
    category: "Electronics",
    image: "/wireless-headphones.png",
    rating: 4.5,
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 249.99,
    category: "Electronics",
    image: "/smartwatch-lifestyle.png",
    rating: 4.8,
  },
  {
    id: "3",
    name: "Laptop Stand",
    price: 49.99,
    category: "Accessories",
    image: "/laptop-stand.png",
    rating: 4.3,
  },
  {
    id: "4",
    name: "USB-C Hub",
    price: 79.99,
    category: "Accessories",
    image: "/usb-hub.png",
    rating: 4.6,
  },
  {
    id: "5",
    name: "Mechanical Keyboard",
    price: 159.99,
    category: "Electronics",
    image: "/mechanical-keyboard.png",
    rating: 4.7,
  },
  {
    id: "6",
    name: "Mouse Pad",
    price: 29.99,
    category: "Accessories",
    image: "/simple-mouse-pad.png",
    rating: 4.2,
  },
]

export default function EcommercePlatform() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find((item) => item.id === product.id)
    if (existingItem) {
      setCartItems(cartItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCartItems(cartItems.map((item) => (item.id === productId ? { ...item, quantity } : item)))
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const categories = Array.from(new Set(PRODUCTS.map((p) => p.category)))

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-slate-900">ShopHub</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden gap-8 md:flex">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                  className={`text-sm font-medium transition-colors ${
                    selectedCategory === cat ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              <Button variant={isLoggedIn ? "outline" : "default"} size="sm" onClick={() => setIsLoggedIn(!isLoggedIn)}>
                {isLoggedIn ? (
                  <>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </>
                )}
              </Button>

              <Button variant="outline" size="icon" onClick={() => setShowCart(!showCart)} className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -right-2 -top-2 h-5 w-5 p-0 flex items-center justify-center bg-red-500">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>

              {/* Mobile Menu */}
              <button onClick={() => setShowMenu(!showMenu)} className="md:hidden p-2 text-slate-600">
                {showMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMenu && (
            <nav className="flex flex-col gap-3 border-t border-slate-200 pb-4 pt-4 md:hidden">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(selectedCategory === cat ? null : cat)
                    setShowMenu(false)
                  }}
                  className={`text-left font-medium transition-colors ${
                    selectedCategory === cat ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Products Section */}
          <div className="lg:col-span-2">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden bg-slate-200">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-slate-900">{product.name}</h3>
                        <p className="text-sm text-slate-500">{product.category}</p>
                      </div>
                      <Badge variant="secondary">{product.rating}★</Badge>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</span>
                      <Button size="sm" onClick={() => addToCart(product)}>
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="h-fit">
            <Card className="p-6 sticky top-20">
              <h2 className="mb-4 text-xl font-bold text-slate-900">Shopping Cart</h2>

              {cartItems.length === 0 ? (
                <p className="text-center text-slate-500">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="border-b border-slate-200 pb-4 last:border-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <p className="font-medium text-slate-900">{item.name}</p>
                          <p className="text-sm text-slate-500">${item.price.toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          −
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          +
                        </Button>
                        <span className="ml-auto text-sm font-medium text-slate-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="space-y-2 border-t border-slate-200 pt-4">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Tax (10%):</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 pt-2 text-lg font-bold text-slate-900">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg" disabled={!isLoggedIn}>
                    {isLoggedIn ? "Proceed to Checkout" : "Login to Checkout"}
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
