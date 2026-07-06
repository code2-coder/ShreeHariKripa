import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import cloudinary from "../utils/cloudinary.js";

// Upload a single media file (Image or Video)
export const uploadMedia = catchAsyncErrors(async (req, res, next) => {
  const { file, type = "image", folder = "shreeharikripa/products" } = req.body;

  if (!file) {
    return next(new ErrorHandler("No file provided", 400));
  }

  const options = {
    folder,
  };

  if (type === "video") {
    options.resource_type = "video";
  } else {
    options.quality = "auto";
    options.fetch_format = "auto";
  }

  try {
    const result = await cloudinary.uploader.upload(file, options);
    
    // Validate video duration if it's a video
    if (type === "video" && result.duration > 30) {
       await cloudinary.uploader.destroy(result.public_id, { resource_type: "video" });
       return next(new ErrorHandler("Video must be under 30 seconds", 400));
    }

    res.status(200).json({
      success: true,
      media: {
        public_id: result.public_id,
        url: result.secure_url,
      }
    });
  } catch (error) {
     return next(new ErrorHandler(error.message || "Upload failed", 500));
  }
});

// Delete media from Cloudinary
export const deleteMedia = catchAsyncErrors(async (req, res, next) => {
  const { public_id, type = "image" } = req.body;
  if (!public_id) {
     return next(new ErrorHandler("No public_id provided", 400));
  }
  
  await cloudinary.uploader.destroy(public_id, { resource_type: type === "video" ? "video" : "image" });
  
  res.status(200).json({ success: true, message: "Media deleted successfully" });
});
