import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: String,
    images: {
      type: [String],
      default: [],
    },
    description: String,
    price: Number,
    sale: Boolean,
    slug: String,
    category: String,
    categorySlug: String  },
  {
    timestamps: true,
  }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
