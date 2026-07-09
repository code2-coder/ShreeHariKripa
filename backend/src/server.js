import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server/.env first before importing app or connection
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error(`UNCAUGHT EXCEPTION: ${err.message}`);
  console.error(err.stack);
  console.log("Shutting down due to uncaught exception...");
  process.exit(1);
});

import app from "./app.js";
import { connectDB } from "./database/connection.js";

// Connect to MongoDB
connectDB();

// Start the server
const PORT = Number(process.env.PORT) || 8080;
const HOST = process.env.HOST || "0.0.0.0";
const server = app.listen(PORT, HOST, () => {
  console.log(`Server is running on ${HOST}:${PORT} in ${process.env.NODE_ENV || "development"} mode.`);
});

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.error(`UNHANDLED REJECTION: ${err.message}`);
  console.error(err.stack);
  console.log("Shutting down server due to Unhandled Promise Rejection...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
