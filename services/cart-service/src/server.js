const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const http = require("http")
const socketIo = require("socket.io")
require("dotenv").config()

const cartRoutes = require("./routes/cart")

const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Cart Service - MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/cart", cartRoutes)

// Socket.IO Events
const connectedUsers = {}

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`)

  socket.on("user:join", (userId) => {
    connectedUsers[userId] = socket.id
    socket.join(`user:${userId}`)
  })

  socket.on("cart:update", (data) => {
    io.to(`user:${data.userId}`).emit("cart:sync", data)
  })

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`)
    Object.keys(connectedUsers).forEach((key) => {
      if (connectedUsers[key] === socket.id) delete connectedUsers[key]
    })
  })
})

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Cart Service running" })
})

const PORT = process.env.PORT || 3003
server.listen(PORT, () => {
  console.log(`Cart Service listening on port ${PORT}`)
})
