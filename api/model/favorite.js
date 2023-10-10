
const favoriteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    createdAt: { type: Date, default: Date.now }
  });

 export const Favorite = mongoose.model('Favorite', favoriteSchema);