const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  items: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      quantity: Number,
      price: Number,
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Cart", cartSchema)
