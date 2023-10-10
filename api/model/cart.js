const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    createdAt: { type: Date, default: Date.now }
  });
export  const Cart = mongoose.model('Cart', cartSchema);