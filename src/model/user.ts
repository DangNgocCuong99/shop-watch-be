import mongoose from "mongoose";
import { typeStatus } from "../ulti/types";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  email: { type: String},
  status: { type: String ,default : typeStatus.inactive},
  createdAt: { type: Date, default: Date.now }
});
const UserModel = mongoose.model('user', userSchema);
export default UserModel
