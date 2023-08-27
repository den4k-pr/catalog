import mongoose, { Schema } from "mongoose";


const LinkSchema = new Schema(
  {
    name: String,
    href: String,
  },
  {
    timestamps: true,
  }
);

const Links = mongoose.models.Link || mongoose.model("Link", LinkSchema);

export default Links;
