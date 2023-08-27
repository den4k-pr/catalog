import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    categoryName: String,
    categorySlug: String 
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
