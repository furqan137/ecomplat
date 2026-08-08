const express = require("express")
const router = express.Router()
const joi = require("joi")
const Product = require("../models/Product")
const { verifyToken, requireRole } = require("../middleware/authMiddleware")

const productSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  price: joi.number().positive().required(),
  images: joi.array().items(joi.string()),
  inventoryCount: joi.number().min(0).required(),
  category: joi.string().required(),
})

// Get all products with filters
router.get("/", async (req, res) => {
  try {
    const { category, search, limit = 20, skip = 0 } = req.query
    const query = {}

    if (category) query.category = category
    if (search) query.$text = { $search: search }

    const products = await Product.find(query).limit(Number.parseInt(limit)).skip(Number.parseInt(skip))
    const total = await Product.countDocuments(query)

    res.json({ products, total })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ error: "Product not found" })
    res.json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Create product (admin only)
router.post("/", verifyToken, requireRole("admin"), async (req, res) => {
  try {
    const { error, value } = productSchema.validate(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message })

    const product = new Product(value)
    await product.save()

    res.status(201).json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update product (admin only)
router.put("/:id", verifyToken, requireRole("admin"), async (req, res) => {
  try {
    const { error, value } = productSchema.validate(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message })

    const product = await Product.findByIdAndUpdate(req.params.id, { ...value, updatedAt: new Date() }, { new: true })

    if (!product) return res.status(404).json({ error: "Product not found" })
    res.json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Delete product (admin only)
router.delete("/:id", verifyToken, requireRole("admin"), async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ error: "Product not found" })
    res.json({ message: "Product deleted" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
