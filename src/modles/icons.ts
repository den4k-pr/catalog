import mongoose, { Schema } from "mongoose";


const IconsSchema = new Schema(
  {
    name: String,
    href: String,
  },
  {
    timestamps: true,
  }
);

const Icons = mongoose.models.Icons || mongoose.model("Icons", IconsSchema);

export default Icons;
