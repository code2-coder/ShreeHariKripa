import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Override process handlers before doing anything else
process.on("uncaughtException", (err) => {
  const errorMsg = err && err.stack ? err.stack : String(err);
  fs.writeFileSync(path.resolve(__dirname, "./debug.log"), `[UNCAUGHT EXCEPTION] ${errorMsg}\n`, { flag: "a" });
  console.error("[UNCAUGHT EXCEPTION]", errorMsg);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  const errorMsg = reason && reason.stack ? reason.stack : String(reason);
  fs.writeFileSync(path.resolve(__dirname, "./debug.log"), `[UNHANDLED REJECTION] ${errorMsg}\n`, { flag: "a" });
  console.error("[UNHANDLED REJECTION]", errorMsg);
  process.exit(1);
});

// Load dotenv
dotenv.config({ path: path.resolve(__dirname, "./.env") });

import app, { setDbReady } from "./src/app.js";
import { connectDB } from "./src/database/connection.js";
import { seedPages } from "./src/database/pageSeeder.js";

connectDB().then(() => {
  setDbReady();
  seedPages();
});

const PORT = Number(process.env.PORT) || 8085;
const HOST = process.env.HOST || "0.0.0.0";
const server = app.listen(PORT, HOST, () => {
  console.log(`Debug server running on ${HOST}:${PORT}`);
});
