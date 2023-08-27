import mongoose, { Schema } from "mongoose";


const LogoSchema = new Schema(
  {
    href: String,
  },
  {
    timestamps: true,
  }
);

const Logo = mongoose.models.Logo || mongoose.model("Logo", LogoSchema);

export default Logo;
