import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: String,
  originalPrice: Number,
  discountedPrice: Number,
  createdAt: { type: Date, default: Date.now }
});

const ProductModel = mongoose.model('Product', productSchema);
export default ProductModel