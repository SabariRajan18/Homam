import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/Homam";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect("mongodb+srv://sabarirajanm1018:XXSWvGNCtx2Osp6W@homam.tndmy1a.mongodb.net/?retryWrites=true&w=majority&appName=Homam");
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};