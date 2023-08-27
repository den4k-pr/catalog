import mongoose, { Schema } from "mongoose";


const VideoSchema = new Schema(
  {
    name: String,
    href: String,
  },
  {
    timestamps: true,
  }
);

const Videos = mongoose.models.Video || mongoose.model("Video", VideoSchema);

export default Videos;
