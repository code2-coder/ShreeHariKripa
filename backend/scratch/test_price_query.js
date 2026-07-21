import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Product from "../src/models/product.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");

    const total = await Product.countDocuments({ status: "published" });
    console.log("Total published products:", total);

    const lteStringCount = await Product.countDocuments({
      status: "published",
      price: { $lte: "5000" }
    });
    console.log("Count with price <= '5000' (string):", lteStringCount);

    const lteNumberCount = await Product.countDocuments({
      status: "published",
      price: { $lte: 5000 }
    });
    console.log("Count with price <= 5000 (number):", lteNumberCount);

    process.exit(0);
  } catch (error) {
    console.error("Test failed:", error);
    process.exit(1);
  }
};
run();
