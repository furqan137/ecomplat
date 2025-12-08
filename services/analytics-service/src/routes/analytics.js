const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
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

const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" })
  }
  next()
}

// Daily sales report
router.get("/analytics/sales", verifyToken, requireAdmin, async (req, res) => {
  try {
    const db = mongoose.connection
    const result = await db
      .collection("orders")
      .aggregate([
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
            totalSales: { $sum: "$totalAmount" },
            orderCount: { $sum: 1 },
          },
        },
        { $sort: { _id: -1 } },
      ])
      .toArray()

    res.json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Top products report
router.get("/analytics/products", verifyToken, requireAdmin, async (req, res) => {
  try {
    const db = mongoose.connection
    const result = await db
      .collection("orders")
      .aggregate([
        { $unwind: "$items" },
        {
          $group: {
            _id: "$items.productId",
            totalSold: { $sum: "$items.quantity" },
            revenue: { $sum: { $multiply: ["$items.quantity", "$items.price"] } },
          },
        },
        { $sort: { totalSold: -1 } },
        { $limit: 10 },
      ])
      .toArray()

    res.json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// System metrics
router.get("/analytics/metrics", verifyToken, requireAdmin, async (req, res) => {
  try {
    const db = mongoose.connection

    const totalOrders = await db.collection("orders").countDocuments()
    const totalUsers = await db.collection("users").countDocuments()
    const totalRevenue = await db
      .collection("orders")
      .aggregate([{ $group: { _id: null, total: { $sum: "$totalAmount" } } }])
      .toArray()

    res.json({
      totalOrders,
      totalUsers,
      totalRevenue: totalRevenue[0]?.total || 0,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
