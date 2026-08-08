const express = require("express")
const router = express.Router()
const User = require("../models/User")

// Get user profile
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash")
    if (!user) return res.status(404).json({ error: "User not found" })
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update user profile
router.patch("/:id", async (req, res) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Insufficient permissions" })
    }

    const { name } = req.body
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, updatedAt: new Date() },
      { new: true },
    ).select("-passwordHash")

    res.json(updatedUser)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
