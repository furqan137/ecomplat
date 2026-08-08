export interface Product {
  id: string
  name: string
  price: number
  category: string
  image: string
  rating: number
  tagline: string
}

export interface CartItem extends Product {
  quantity: number
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 129.99,
    category: "Electronics",
    image: "/wireless-headphones.png",
    rating: 4.5,
    tagline: "Studio clarity, all-day comfort",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 249.99,
    category: "Electronics",
    image: "/smartwatch-lifestyle.png",
    rating: 4.8,
    tagline: "Pulse, pace, and presence",
  },
  {
    id: "3",
    name: "Laptop Stand",
    price: 49.99,
    category: "Accessories",
    image: "/laptop-stand.png",
    rating: 4.3,
    tagline: "Elevate your line of sight",
  },
  {
    id: "4",
    name: "USB-C Hub",
    price: 79.99,
    category: "Accessories",
    image: "/usb-hub.png",
    rating: 4.6,
    tagline: "One port, every connection",
  },
  {
    id: "5",
    name: "Mechanical Keyboard",
    price: 159.99,
    category: "Electronics",
    image: "/mechanical-keyboard.png",
    rating: 4.7,
    tagline: "Tactile precision, every keystroke",
  },
  {
    id: "6",
    name: "Mouse Pad",
    price: 29.99,
    category: "Accessories",
    image: "/simple-mouse-pad.png",
    rating: 4.2,
    tagline: "Soft glide, grounded focus",
  },
]

export const CATEGORIES = Array.from(new Set(PRODUCTS.map((p) => p.category)))
