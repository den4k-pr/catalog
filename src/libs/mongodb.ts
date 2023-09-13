import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://yakovden4k:biwpWZ9Spip6bGnj@cluster0.9yi7gcc.mongodb.net/yakovden4k");
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
