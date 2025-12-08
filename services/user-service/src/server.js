const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/users")
const authMiddleware = require("./middleware/authMiddleware")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("User Service - MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/auth", authRoutes)
app.use("/users", authMiddleware.verifyToken, userRoutes)

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "User Service running" })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`User Service listening on port ${PORT}`)
})
