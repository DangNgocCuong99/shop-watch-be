"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: String,
    originalPrice: Number,
    discountedPrice: Number,
    createdAt: { type: Date, default: Date.now }
});
const ProductModel = mongoose_1.default.model('product', productSchema);
exports.default = ProductModel;
//# sourceMappingURL=product.js.map