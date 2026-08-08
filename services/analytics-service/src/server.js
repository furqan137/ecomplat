const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const analyticsRoutes = require("./routes/analytics")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Analytics Service - MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/admin", analyticsRoutes)

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Analytics Service running" })
})

const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
  console.log(`Analytics Service listening on port ${PORT}`)
})
