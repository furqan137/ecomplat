const express = require("express")
const router = express.Router()
const joi = require("joi")
const Cart = require("../models/Cart")
const jwt = require("jwt-simple")

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) return res.status(401).json({ error: "No token provided" })

  try {
    const decoded = jwt.decode(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ error: "Invalid token" })
  }
}

// Get cart
router.get("/", verifyToken, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id })
    if (!cart) cart = { userId: req.user.id, items: [] }
    res.json(cart)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Add item to cart
router.post("/items", verifyToken, async (req, res) => {
  try {
    const { productId, quantity, price } = req.body

    let cart = await Cart.findOne({ userId: req.user.id })
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] })
    }

    const existingItem = cart.items.find((item) => item.productId.toString() === productId)
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.items.push({ productId, quantity, price })
    }

    cart.updatedAt = new Date()
    await cart.save()

    res.json(cart)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update cart item
router.patch("/items/:itemId", verifyToken, async (req, res) => {
  try {
    const { quantity } = req.body
    const cart = await Cart.findOne({ userId: req.user.id })

    if (!cart) return res.status(404).json({ error: "Cart not found" })

    const item = cart.items.id(req.params.itemId)
    if (!item) return res.status(404).json({ error: "Item not found" })

    item.quantity = quantity
    cart.updatedAt = new Date()
    await cart.save()

    res.json(cart)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Remove item from cart
router.delete("/items/:itemId", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id })

    if (!cart) return res.status(404).json({ error: "Cart not found" })

    cart.items.id(req.params.itemId).deleteOne()
    cart.updatedAt = new Date()
    await cart.save()

    res.json(cart)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
