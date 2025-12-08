const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const orderRoutes = require("./routes/orders")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Order Service - MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/orders", orderRoutes)

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Order Service running" })
})

const PORT = process.env.PORT || 3004
app.listen(PORT, () => {
  console.log(`Order Service listening on port ${PORT}`)
})
