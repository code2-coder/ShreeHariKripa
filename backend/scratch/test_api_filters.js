import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import APIFilters from "../src/utils/apiFilters.js";
import Product from "../src/models/product.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const run = async () => {
  try {
    const query = {
      'price[lte]': '5000'
    };

    console.log("Original Query Str:", query);

    const queryCopy = { ...query };
    const removeFields = ["keyword", "page", "limit", "sort", "category", "sizes", "colors", "materials", "stoneTypes"];
    removeFields.forEach((el) => delete queryCopy[el]);

    console.log("After removing fields:", queryCopy);

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(
        /\b(gt|gte|lt|lte)\b/g,
        (key) => `$${key}`
    );

    console.log("After replace:", queryStr);

    let filterObj = JSON.parse(queryStr);
    console.log("Final Filter Obj:", filterObj);

    process.exit(0);
  } catch (error) {
    console.error("Test failed:", error);
    process.exit(1);
  }
};
run();
