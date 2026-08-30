import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import hpp from "hpp";
import mongoose from "mongoose";
import passport from "./config/passport.js";
import { isRedisReady } from "./config/redis.js";
import errorMiddleware from "./middleware/error.middleware.js";
import { apiLimiter } from "./middleware/rateLimit.middleware.js";

// Routes
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import forgotPasswordRoutes from "./routes/forgotPassword.routes.js";
import orderRoutes from "./routes/orderRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import subscriberRoutes from "./routes/subscriberRoutes.js";
import currencyRoutes from "./routes/currencyRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import adPosterRoutes from "./routes/adPosterRoutes.js";
import sizeRoutes from "./routes/sizeRoutes.js";
import priceRangeRoutes from "./routes/priceRangeRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import delhiveryRoutes from "./routes/delhiveryRoutes.js";
import attributeRoutes from "./routes/attributeRoutes.js";
import returnRoutes from "./routes/returnRoutes.js";
import shipmentRoutes from "./routes/shipmentRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import pageRoutes from "./routes/pageRoutes.js";
import currencySettingRoutes from "./routes/currencySettingRoutes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Trust proxy for Render/Vercel (required for rate limiting and secure cookies)
app.set("trust proxy", 1);

// Allowed Origins for CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://shreeharikripa-frontend-fullstack.vercel.app",
  "https://jewellery-app-iota.vercel.app",
  "https://jewellery-app-kappa.vercel.app",
  "https://shreeharikripa.in",
  "https://www.shreeharikripa.in",
  "https://shreeharikripa.com",
  "https://www.shreeharikripa.com",
  "https://shreeharikripa.onrender.com",
  "https://shree-hari-kripa.vercel.app",
  process.env.CLIENT_URL,
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const isLocalhost =
        origin.startsWith("http://localhost:") ||
        origin.startsWith("http://127.0.0.1:") ||
        origin === "http://localhost" ||
        origin === "http://127.0.0.1";

      const isDev = (process.env.NODE_ENV || "development").toLowerCase() === "development";
      if (isDev && isLocalhost) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
  })
);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com", "https://placehold.co"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  })
);

app.disable("x-powered-by");

app.use(
  compression({
    level: 6,
    threshold: 1024,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) return false;
      return compression.filter(req, res);
    },
  })
);

if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "PRODUCTION") {
  app.use(
    morgan("dev", {
      skip: (req) => req.url === "/health" || req.originalUrl === "/health",
    })
  );
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

// Security middleware against HTTP parameter pollution
app.use(hpp());

// API Rate Limiting
app.use("/api", apiLimiter);

// DB readiness flag — set to true in server.js after MongoDB connects
let _dbReady = false;
export const setDbReady = () => {
  _dbReady = true;
};

// Standardized Health check endpoint
app.get("/health", (req, res) => {
  const redisConnected = isRedisReady();
  const dbConnected = mongoose.connection.readyState === 1 || _dbReady;
  if (dbConnected) {
    res.status(200).json({
      success: true,
      status: "ok",
      database: "connected",
      redis: redisConnected ? "connected" : "in_memory_fallback",
      timestamp: new Date().toISOString(),
    });
  } else {
    res.status(503).json({
      success: false,
      status: "starting",
      database: "connecting",
      redis: redisConnected ? "connected" : "in_memory_fallback",
      timestamp: new Date().toISOString(),
    });
  }
});

// Register API Routes
app.use("/api/v1", categoryRoutes);
app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", forgotPasswordRoutes);
app.use("/api/auth", forgotPasswordRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", bannerRoutes);
app.use("/api/v1", paymentRoutes);
app.use("/api/v1", subscriberRoutes);
app.use("/api/v1", currencyRoutes);
app.use("/api/v1", settingsRoutes);
app.use("/api/v1", adPosterRoutes);
app.use("/api/v1", sizeRoutes);
app.use("/api/v1", priceRangeRoutes);
app.use("/api/v1/me/addresses", addressRoutes);
app.use("/api/v1/delhivery", delhiveryRoutes);
app.use("/api/v1", attributeRoutes);
app.use("/api/v1", returnRoutes);
app.use("/api/v1", shipmentRoutes);
app.use("/api/v1", uploadRoutes);
app.use("/api/v1", reviewRoutes);
app.use("/api/v1", pageRoutes);
app.use("/api/v1", currencySettingRoutes);

// Handle unmatched API routes
app.all(/^\/api\/.*/, (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  err.statusCode = 404;
  next(err);
});

// Serve client static build in production
if (
  process.env.NODE_ENV === "PRODUCTION" ||
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "Production"
) {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.get(/^.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../frontend/dist/index.html"));
  });
} else {
  // Development default landing page
  app.get("/", (req, res) => {
    res.send("Server is running in development mode!");
  });
}

// Register global centralized error handler middleware (must be last)
app.use(errorMiddleware);

export default app;
