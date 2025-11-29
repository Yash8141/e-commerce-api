import mongoose from "mongoose";

export async function connectDb(url, dbName) {
  try {
    await mongoose.connect(url, {
      dbName: dbName,
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.log("MongoDB Connection Error", error);
    process.exit(1);
  }
}
