import cloudinary from "../utils/cloudinary.js";

export class UploadService {
  /**
   * Upload media to Cloudinary
   * @param {string} file - Base64 string or file path
   * @param {object} options - Options (type: "image"|"video", folder: string)
   */
  async uploadMedia(file, { type = "image", folder = "shreeharikripa/products" } = {}) {
    const uploadOptions = {
      folder,
      resource_type: type === "video" ? "video" : "image"
    };

    if (type === "image") {
      uploadOptions.quality = "auto";
      uploadOptions.fetch_format = "auto";
    }

    try {
      const result = await cloudinary.uploader.upload(file, uploadOptions);
      
      // Video length restriction (e.g. 30 seconds max)
      if (type === "video" && result.duration > 30) {
        await cloudinary.uploader.destroy(result.public_id, { resource_type: "video" });
        throw new Error("Video must be under 30 seconds");
      }

      return {
        public_id: result.public_id,
        url: result.secure_url,
        duration: result.duration
      };
    } catch (error) {
      console.error("Cloudinary upload error:", error.message);
      throw error;
    }
  }

  /**
   * Delete media from Cloudinary
   * @param {string} publicId - The public ID of the resource
   * @param {string} type - "image" or "video"
   */
  async deleteMedia(publicId, type = "image") {
    try {
      const resourceType = type === "video" ? "video" : "image";
      const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
      return result.result === "ok" || result.result === "not found";
    } catch (error) {
      console.error(`Cloudinary delete error for ${publicId}:`, error.message);
      throw error;
    }
  }
}

export default new UploadService();
