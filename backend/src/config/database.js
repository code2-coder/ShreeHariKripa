import mongoose from "mongoose";
import logger from "../utils/logger.js";

/**
 * Connect to MongoDB with production-grade pool and timeout options
 */
export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MONGODB_URI environment variable is not defined");
    }

    const conn = await mongoose.connect(mongoUri, {
      maxPoolSize: 50,
      minPoolSize: 10,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    logger.info(`MongoDB connected to host: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    logger.error("MongoDB connection failed", error);
    setTimeout(() => {
      process.exit(1);
    }, 200);
  }
};

/**
 * Disconnect from MongoDB gracefully
 */
export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB Disconnected successfully");
    logger.info("MongoDB disconnected gracefully");
  } catch (error) {
    console.error("Error disconnecting MongoDB:", error.message);
    logger.error("MongoDB disconnect error", error);
  }
};

export default {
  connectDB,
  disconnectDB,
};
