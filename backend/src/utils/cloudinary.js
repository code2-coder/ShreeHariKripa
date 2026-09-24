import { v2 as cloudinary } from "cloudinary";

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
} else if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
   cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
   });
}

export default cloudinary;
