import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 100,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    setTimeout(() => {
      process.exit(1);
    }, 200);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB Disconnected successfully");
  } catch (error) {
    console.error("Error disconnecting MongoDB:", error);
  }
};
