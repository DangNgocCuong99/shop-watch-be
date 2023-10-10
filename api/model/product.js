const productSchema = new mongoose.Schema({
    name: String,
    originalPrice: Number,
    discountedPrice: Number,
    createdAt: { type: Date, default: Date.now }
  });

  export const Product = mongoose.model('Product', productSchema);