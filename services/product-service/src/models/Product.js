const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: "text",
  },
  description: {
    type: String,
    index: "text",
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  inventoryCount: {
    type: Number,
    required: true,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

productSchema.index({ title: "text", description: "text" })

module.exports = mongoose.model("Product", productSchema)
