// models/Productos.js

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: { type: Number },
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, trim: true },
    image: { type: String, required: true },
    category: { type: String, trim: true },
    stock: { type: Number, default: 20 },
  },
  {
    timestamps: true,
  },
);

//listo para exportar el modelo de producto

module.exports = mongoose.model("Producto", productSchema);
