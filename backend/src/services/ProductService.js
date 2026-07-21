import ProductRepository from "../repositories/ProductRepository.js";
import UploadService from "./UploadService.js";
import APIFilters from "../utils/apiFilters.js";
import Product from "../models/product.js";
import Category from "../models/category.js";
import mongoose from "mongoose";

export class ProductService {
  sanitizeFeatures(features) {
    if (!Array.isArray(features)) return [];
    const seen = new Set();
    return features
      .map(f => (typeof f === "string" ? f.trim() : ""))
      .filter(f => {
        if (!f || f.length > 120 || seen.has(f.toLowerCase())) return false;
        seen.add(f.toLowerCase());
        return true;
      });
  }

  async getProducts(queryStr) {
    const DEFAULT_PER_PAGE = 12;

    // ── Resolve category names → ObjectIds ─────────────────────────────────────
    // The frontend sends category names (e.g. "Mukut,Earrings"). We must convert
    // them to ObjectIds before passing to APIFilters, because the Product schema
    // has category as an ObjectId ref.
    if (queryStr.category) {
      const categoryNames = queryStr.category.split(',').map(c => c.trim()).filter(Boolean);
      
      // Check if any value looks like an ObjectId already
      const areObjectIds = categoryNames.every(n => mongoose.Types.ObjectId.isValid(n));
      
      if (!areObjectIds) {
        // Resolve names → ObjectIds
        const matched = await Category.find({
          name: { $in: categoryNames.map(n => new RegExp(`^${n}$`, 'i')) }
        }).select('_id').lean();
        
        queryStr.resolvedCategoryIds = matched.map(c => c._id);
      } else {
        queryStr.resolvedCategoryIds = categoryNames.map(id => new mongoose.Types.ObjectId(id));
      }
    }

    // ── Keyword → category match ────────────────────────────────────────────────
    if (queryStr.keyword) {
      const regex = new RegExp(queryStr.keyword.trim(), 'i');
      const matchedCategories = await Category.find({ name: { $regex: regex } }).select('_id').lean();
      if (matchedCategories.length > 0) {
        queryStr.matchedCategories = matchedCategories.map(c => c._id);
      }
    }

    // ── Base query: published products only ─────────────────────────────────────
    const baseFilter = { status: "published" };

    // ── Paginated results ───────────────────────────────────────────────────────
    const baseQuery = Product.find(baseFilter);
    const apiFilters = new APIFilters(baseQuery, queryStr)
      .search()
      .filters()
      .sort()
      .pagination(DEFAULT_PER_PAGE);

    const products = await apiFilters.query
      .select("name price description images category ratings stock variants sizes numOfReviews homeSection features status color material stoneType")
      .populate("category", "name")
      .lean();

    products.forEach(p => { if (!p.features) p.features = []; });

    // ── Filtered total count (mirrors the same filters, without pagination) ──────
    // Build the same filter conditions to get an accurate count
    const countFilters = new APIFilters(Product.find(baseFilter), queryStr)
      .search()
      .filters();
    
    const filteredTotal = await Product.countDocuments(
      countFilters.query.getFilter()
    );

    return {
      products,
      count: products.length,
      totalProducts: filteredTotal,
      page: Number(queryStr.page) || 1,
      perPage: Math.min(100, Number(queryStr.limit) || DEFAULT_PER_PAGE),
    };
  }

  /**
   * Returns dynamic filter options derived from actual published products.
   * Single aggregation pipeline — efficient, no over-fetching.
   */
  async getFilterOptions() {
    const [aggregateResult, categoryCounts] = await Promise.all([
      // Distinct materials, stoneTypes, colors from published products
      Product.aggregate([
        { $match: { status: "published" } },
        {
          $group: {
            _id: null,
            materials:  { $addToSet: "$material" },
            stoneTypes: { $addToSet: "$stoneType" },
            colors:     { $addToSet: "$color" },
          }
        },
        {
          $project: {
            _id: 0,
            materials:  { $filter: { input: "$materials",  as: "v", cond: { $and: [{ $ne: ["$$v", null] }, { $ne: ["$$v", ""] }] } } },
            stoneTypes: { $filter: { input: "$stoneTypes", as: "v", cond: { $and: [{ $ne: ["$$v", null] }, { $ne: ["$$v", ""] }] } } },
            colors:     { $filter: { input: "$colors",     as: "v", cond: { $and: [{ $ne: ["$$v", null] }, { $ne: ["$$v", ""] }] } } },
          }
        }
      ]),

      // Product count per category
      Product.aggregate([
        { $match: { status: "published" } },
        { $group: { _id: "$category", count: { $sum: 1 } } },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "_id",
            as: "categoryInfo"
          }
        },
        { $unwind: { path: "$categoryInfo", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 1,
            count: 1,
            name: { $ifNull: ["$categoryInfo.name", "Uncategorised"] }
          }
        }
      ])
    ]);

    const opts = aggregateResult[0] || { materials: [], stoneTypes: [], colors: [] };

    return {
      materials:  opts.materials.sort(),
      stoneTypes: opts.stoneTypes.sort(),
      colors:     opts.colors.sort(),
      categoryCounts: categoryCounts.map(c => ({
        _id:   c._id,
        name:  c.name,
        count: c.count,
      })),
    };
  }

  async getAdminProducts() {
    const products = await ProductRepository.find({}, {
      populate: { path: "category", select: "name" },
      lean: true
    });
    products.forEach(p => { if (!p.features) p.features = []; });
    return products;
  }

  async getProductById(id) {
    const product = await ProductRepository.findById(id, {
      populate: [
        { path: "category", select: "name" },
        { path: "reviews.user", select: "name" }
      ],
      lean: true
    });

    if (!product || product.status !== "published") {
      throw new Error("Product not found");
    }

    if (!product.features) product.features = [];
    return product;
  }

  async _processMediaArray(mediaArray, type = "image") {
    if (!mediaArray || !Array.isArray(mediaArray)) return [];
    const uploadPromises = mediaArray.map(async (media) => {
      if (typeof media === "string" && media.startsWith(`data:${type}`)) {
        const res = await UploadService.uploadMedia(media, { type, folder: "shreeharikripa/products" });
        return { public_id: res.public_id, url: res.url };
      }
      if (typeof media === "object" && media.public_id && media.url) {
        return { public_id: media.public_id, url: media.url };
      }
      return null;
    });
    const results = await Promise.all(uploadPromises);
    return results.filter(Boolean);
  }

  async createProduct(productData, userId) {
    productData.user = userId;
    productData.status = productData.status || "draft";
    if (productData.features) {
      productData.features = this.sanitizeFeatures(productData.features);
    }

    productData.images = await this._processMediaArray(productData.images, "image");
    productData.videos = await this._processMediaArray(productData.videos, "video");

    if (productData.variants && Array.isArray(productData.variants)) {
      for (const variant of productData.variants) {
        variant.images = await this._processMediaArray(variant.images, "image");
        variant.videos = await this._processMediaArray(variant.videos, "video");
      }
    }

    return ProductRepository.create(productData);
  }

  async updateProduct(id, updateData) {
    const product = await ProductRepository.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }

    if (updateData.status !== undefined) {
      updateData.status = updateData.status || "draft";
    }

    const { images, videos, variants } = updateData;

    if (images !== undefined) {
      const uploadedImages = Array.isArray(images) ? images : [images];
      const existingPublicIdsToKeep = uploadedImages
        .filter(img => typeof img === "object" && img.public_id)
        .map(img => img.public_id);

      await Promise.all(
        product.images.map(img => {
          if (img.public_id && !existingPublicIdsToKeep.includes(img.public_id)) {
            return UploadService.deleteMedia(img.public_id, "image").catch(err =>
              console.error("Cloudinary delete image failed:", err.message)
            );
          }
          return Promise.resolve();
        })
      );
      updateData.images = await this._processMediaArray(uploadedImages, "image");
    }

    if (videos !== undefined) {
      const uploadedVideos = Array.isArray(videos) ? videos : [videos];
      const existingPublicIdsToKeep = uploadedVideos
        .filter(vid => typeof vid === "object" && vid.public_id)
        .map(vid => vid.public_id);

      await Promise.all(
        product.videos.map(vid => {
          if (vid.public_id && !existingPublicIdsToKeep.includes(vid.public_id)) {
            return UploadService.deleteMedia(vid.public_id, "video").catch(err =>
              console.error("Cloudinary delete video failed:", err.message)
            );
          }
          return Promise.resolve();
        })
      );
      updateData.videos = await this._processMediaArray(uploadedVideos, "video");
    }

    if (variants !== undefined && Array.isArray(variants)) {
      for (const variant of variants) {
        variant.images = await this._processMediaArray(variant.images, "image");
        variant.videos = await this._processMediaArray(variant.videos, "video");
      }
      updateData.variants = variants;
    }

    if (updateData.features !== undefined) {
      updateData.features = this.sanitizeFeatures(updateData.features);
    }

    return ProductRepository.updateById(id, updateData, { new: true });
  }

  async deleteProduct(id) {
    const product = await ProductRepository.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }

    await Promise.all(
      product.images.map(img =>
        UploadService.deleteMedia(img.public_id, "image").catch(err =>
          console.error("Failed to delete product image:", err.message)
        )
      )
    );

    await Promise.all(
      product.videos.map(vid =>
        UploadService.deleteMedia(vid.public_id, "video").catch(err =>
          console.error("Failed to delete product video:", err.message)
        )
      )
    );

    return ProductRepository.deleteById(id);
  }

  // --- REVIEWS ---
  async addProductReview(productId, { rating, comment }, userId) {
    const product = await ProductRepository.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const review = {
      user: userId,
      rating: Number(rating),
      comment
    };

    const isReviewed = product.reviews.find(
      r => r.user.toString() === userId.toString()
    );

    if (isReviewed) {
      product.reviews.forEach(r => {
        if (r.user.toString() === userId.toString()) {
          r.comment = comment;
          r.rating = Number(rating);
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    return product;
  }

  async getProductReviews(productId) {
    const product = await ProductRepository.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    return product.reviews;
  }

  async deleteProductReview(productId, reviewId) {
    const product = await ProductRepository.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const reviews = product.reviews.filter(
      r => r._id.toString() !== reviewId.toString()
    );

    const numOfReviews = reviews.length;
    const ratings =
      numOfReviews === 0
        ? 0
        : reviews.reduce((acc, item) => item.rating + acc, 0) / numOfReviews;

    return ProductRepository.updateById(
      productId,
      { reviews, ratings, numOfReviews },
      { new: true }
    );
  }

  // --- VISUAL SEARCH ---
  async visualSearch(embedding) {
    if (!embedding || !Array.isArray(embedding)) {
      throw new Error("Valid visual embedding array is required");
    }

    const products = await ProductRepository.findWithVisualEmbeddings();
    if (!products || products.length === 0) {
      return [];
    }

    const scoredProducts = products.map(product => {
      const score = this.calculateCosineSimilarity(embedding, product.visualEmbedding);
      delete product.visualEmbedding;
      return { ...product, similarityScore: score };
    });

    return scoredProducts
      .sort((a, b) => b.similarityScore - a.similarityScore)
      .slice(0, 10);
  }

  calculateCosineSimilarity(vecA, vecB) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }
}

export default new ProductService();
