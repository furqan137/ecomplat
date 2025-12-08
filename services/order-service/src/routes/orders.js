const express = require("express")
const router = express.Router()
const joi = require("joi")
const Order = require("../models/Order")
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

const checkoutSchema = joi.object({
  items: joi
    .array()
    .items({
      productId: joi.string().required(),
      quantity: joi.number().required(),
      price: joi.number().required(),
    })
    .required(),
  totalAmount: joi.number().positive().required(),
})

// Create order
router.post("/checkout", verifyToken, async (req, res) => {
  try {
    const { error, value } = checkoutSchema.validate(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message })

    const order = new Order({
      userId: req.user.id,
      items: value.items,
      totalAmount: value.totalAmount,
    })

    await order.save()
    res.status(201).json(order)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get user orders
router.get("/", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get order by ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ error: "Order not found" })

    if (order.userId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Insufficient permissions" })
    }

    res.json(order)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update order status (admin only)
router.put("/:id/status", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Insufficient permissions" })
    }

    const { status } = req.body
    const order = await Order.findByIdAndUpdate(req.params.id, { status, updatedAt: new Date() }, { new: true })

    if (!order) return res.status(404).json({ error: "Order not found" })
    res.json(order)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
