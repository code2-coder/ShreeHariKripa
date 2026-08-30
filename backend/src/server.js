import "./config/env.js";

// Validate ZeptoMail Configuration on startup
import zeptoMailService, { ZeptoMailService } from "./services/zeptoMail.service.js";
try {
  ZeptoMailService.logDebugInfo();
  ZeptoMailService.validateConfig();
} catch (error) {
  console.error("FATAL: Startup validation failed!");
  console.error(error.message);
  process.exit(1);
}

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error(`UNCAUGHT EXCEPTION: ${err.message}`);
  console.error(err.stack);
  console.log("Shutting down due to uncaught exception...");
  setTimeout(() => {
    process.exit(1);
  }, 200);
});

import app, { setDbReady } from "./app.js";
import { connectDB } from "./database/connection.js";
import { initRedis, closeRedis } from "./config/redis.js";
import { seedPages } from "./database/pageSeeder.js";
import { seedPriceRanges } from "./database/priceRangeSeeder.js";
import mongoose from "mongoose";

let server;

// Start HTTP Server and initialize database
const startServer = async () => {
  try {
    const PORT = Number(process.env.PORT) || 8085;
    const HOST = process.env.HOST || "0.0.0.0";

    // 1. Start HTTP server immediately so /health endpoint is available
    server = app.listen(PORT, HOST, () => {
      console.log(`Server is running on ${HOST}:${PORT} in ${process.env.NODE_ENV || "development"} mode.`);
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use. Please terminate existing processes.`);
      } else {
        console.error("Server listener error:", err);
      }
      process.exit(1);
    });

    // 2. Connect to MongoDB and mark DB ready
    await connectDB();
    setDbReady();

    // 3. Run seeders and initialize Redis (non-blocking)
    seedPages().catch((err) => console.error("seedPages error:", err.message));
    seedPriceRanges().catch((err) => console.error("seedPriceRanges error:", err.message));
    initRedis().catch((err) => {
      console.warn("Redis init warning:", err.message);
    });
  } catch (error) {
    console.error("Fatal error starting server:", error);
    process.exit(1);
  }
};

startServer();

// Graceful Shutdown Handler
const gracefulShutdown = async (signal) => {
  console.log(`\nReceived ${signal}. Starting graceful shutdown...`);
  if (server) {
    server.close(async () => {
      console.log("HTTP server closed.");
      try {
        await closeRedis();
        await mongoose.connection.close(false);
        console.log("Database and Redis connections closed.");
      } catch (err) {
        console.error("Error during graceful shutdown:", err);
      }
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.error(`UNHANDLED REJECTION: ${err?.message || err}`);
  if (err?.stack) {
    console.error(err.stack);
  }
  const isProd = (process.env.NODE_ENV || "").toLowerCase() === "production";
  if (isProd) {
    console.log("Shutting down server due to Unhandled Promise Rejection in production...");
    if (server) {
      server.close(() => {
        setTimeout(() => {
          process.exit(1);
        }, 200);
      });
    } else {
      setTimeout(() => {
        process.exit(1);
      }, 200);
    }
  }
});

