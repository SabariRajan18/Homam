import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = undefined || "mongodb://localhost:27017/Homam";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};