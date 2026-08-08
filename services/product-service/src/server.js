const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const productRoutes = require("./routes/products")
const authMiddleware = require("./middleware/authMiddleware")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Product Service - MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/products", productRoutes)

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Product Service running" })
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Product Service listening on port ${PORT}`)
})
