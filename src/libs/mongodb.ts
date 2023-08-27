import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://den4ikyakov:ZmyTAuTR77yZ4INz@cluster0.ranzlq2.mongodb.net/den4ikyakov");
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
