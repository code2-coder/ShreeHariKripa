import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const urlStr = process.env.CLOUDINARY_URL || "";
if (urlStr.startsWith("cloudinary://")) {
   const details = urlStr.replace("cloudinary://", "").split("@");
   if (details.length === 2) {
      const keys = details[0].split(":");
      cloudinary.config({
         cloud_name: details[1],
         api_key: keys[0],
         api_secret: keys[1]
      });
   }
}

export default cloudinary;
