const express = require("express")
const router = express.Router()
const bcryptjs = require("bcryptjs")
const jwt = require("jwt-simple")
const joi = require("joi")
const User = require("../models/User")

const registerSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
})

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
})

// Register
router.post("/register", async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message })

    const existingUser = await User.findOne({ email: value.email })
    if (existingUser) return res.status(400).json({ error: "Email already exists" })

    const passwordHash = await bcryptjs.hash(value.password, 10)
    const user = new User({
      name: value.name,
      email: value.email,
      passwordHash,
    })

    await user.save()

    const token = jwt.encode(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
    )

    const refreshToken = jwt.encode(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_REFRESH_SECRET,
    )

    res.status(201).json({ user: { id: user._id, email: user.email, name: user.name }, token, refreshToken })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Login
router.post("/login", async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message })

    const user = await User.findOne({ email: value.email })
    if (!user) return res.status(401).json({ error: "Invalid credentials" })

    const isPasswordValid = await bcryptjs.compare(value.password, user.passwordHash)
    if (!isPasswordValid) return res.status(401).json({ error: "Invalid credentials" })

    const token = jwt.encode(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
    )

    const refreshToken = jwt.encode(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_REFRESH_SECRET,
    )

    res.json({ user: { id: user._id, email: user.email, name: user.name, role: user.role }, token, refreshToken })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Refresh Token
router.post("/refresh", (req, res) => {
  try {
    const { refreshToken } = req.body
    if (!refreshToken) return res.status(401).json({ error: "Refresh token required" })

    const decoded = jwt.decode(refreshToken, process.env.JWT_REFRESH_SECRET)
    const token = jwt.encode(
      {
        id: decoded.id,
        email: decoded.email,
      },
      process.env.JWT_SECRET,
    )

    res.json({ token })
  } catch (err) {
    res.status(401).json({ error: "Invalid refresh token" })
  }
})

module.exports = router
