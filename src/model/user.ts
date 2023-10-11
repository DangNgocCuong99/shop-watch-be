import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  email: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});
const UserModel = mongoose.model('Product', userSchema);
export default UserModel
