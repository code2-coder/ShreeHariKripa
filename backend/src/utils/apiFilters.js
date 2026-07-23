class APIFilters {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
        this._andClauses = []; // Accumulate $and clauses to avoid overwrite conflicts
    }

    // 🔍 SEARCH — regex across all searchable text fields
    search() {
        if (this.queryStr.keyword) {
            const kw = this.queryStr.keyword.trim();
            const regex = new RegExp(kw, 'i');

            const searchOrBlock = [
                { name: { $regex: regex } },
                { description: { $regex: regex } },
                { material: { $regex: regex } },
                { color: { $regex: regex } },
                { stoneType: { $regex: regex } },
                { features: { $regex: regex } },
                { 'variants.variantName': { $regex: regex } },
                { 'variants.sizes.sku': { $regex: regex } },
                { 'sizes.sku': { $regex: regex } },
            ];

            // Category ObjectIds already resolved in ProductService
            if (this.queryStr.matchedCategories && this.queryStr.matchedCategories.length > 0) {
                searchOrBlock.push({ category: { $in: this.queryStr.matchedCategories } });
            }

            this._andClauses.push({ $or: searchOrBlock });
        }
        return this;
    }

    // 🎯 FILTERS — all filtering logic in one clean method
    filters() {
        const filterObj = {};

        // ── Price (bracket notation comes pre-parsed by Express as object) ──────
        // Handle both price[gte] style (Express parsed) and flat string keys
        const priceGte = this.queryStr['price[gte]'];
        const priceLte = this.queryStr['price[lte]'];
        if (priceGte !== undefined || priceLte !== undefined) {
            filterObj.price = {};
            if (priceGte) filterObj.price.$gte = Number(priceGte);
            if (priceLte) filterObj.price.$lte = Number(priceLte);
        }

        // ── Category (ObjectIds already resolved by service layer) ─────────────
        // The service converts category names → ObjectIds before calling APIFilters
        if (this.queryStr.resolvedCategoryIds && this.queryStr.resolvedCategoryIds.length > 0) {
            filterObj.category = { $in: this.queryStr.resolvedCategoryIds };
        }

        // ── Material (case-insensitive, multi-select) ──────────────────────────
        if (this.queryStr.materials) {
            const materials = this.queryStr.materials.split(',').map(m => m.trim()).filter(Boolean);
            if (materials.length > 0) {
                filterObj.material = { $in: materials.map(m => new RegExp(`^${m}$`, 'i')) };
            }
        }

        // ── Stone Type (case-insensitive, multi-select) ────────────────────────
        if (this.queryStr.stoneTypes) {
            const stoneTypes = this.queryStr.stoneTypes.split(',').map(s => s.trim()).filter(Boolean);
            if (stoneTypes.length > 0) {
                filterObj.stoneType = { $in: stoneTypes.map(s => new RegExp(`^${s}$`, 'i')) };
            }
        }

        // ── Color — match color name string (NOT hex code) ─────────────────────
        if (this.queryStr.colors) {
            const colors = this.queryStr.colors.split(',').map(c => c.trim()).filter(Boolean);
            if (colors.length > 0) {
                filterObj.color = { $in: colors.map(c => new RegExp(`^${c}$`, 'i')) };
            }
        }

        // ── Sizes (root sizes OR variant sizes — avoid $or overwrite via _andClauses) ─
        if (this.queryStr.sizes) {
            const sizes = this.queryStr.sizes.split(',').map(s => s.trim()).filter(Boolean);
            if (sizes.length > 0) {
                this._andClauses.push({
                    $or: [
                        { 'variants.sizes.size': { $in: sizes } },
                        { 'sizes.size': { $in: sizes } }
                    ]
                });
            }
        }

        // ── In Stock (root stock OR variant stock) ─────────────────────────────
        if (this.queryStr.inStock === 'true') {
            this._andClauses.push({
                $or: [
                    { stock: { $gt: 0 } },
                    { 'sizes.stock': { $gt: 0 } },
                    { 'variants.sizes.stock': { $gt: 0 } }
                ]
            });
        }

        // ── Merge all clauses ──────────────────────────────────────────────────
        const allClauses = [];
        if (Object.keys(filterObj).length > 0) allClauses.push(filterObj);
        allClauses.push(...this._andClauses);

        if (allClauses.length > 0) {
            this.query = this.query.find({ $and: allClauses });
        }

        return this;
    }

    // 🔀 SORTING — 10 sort modes
    sort() {
        const sortMap = {
            featured:    { homeSection: -1, createdAt: -1 },
            newest:      { createdAt: -1 },
            oldest:      { createdAt: 1 },
            price_asc:   { price: 1 },
            price_desc:  { price: -1 },
            best_seller: { numOfReviews: -1, ratings: -1 },
            rating:      { ratings: -1, numOfReviews: -1 },
            name_asc:    { name: 1 },
            name_desc:   { name: -1 },
            popular:     { numOfReviews: -1 },
        };

        const sortKey = this.queryStr.sort || 'price_asc';
        this.query = this.query.sort(sortMap[sortKey] || { createdAt: -1 });
        return this;
    }

    // 📄 PAGINATION — safe defaults, max 100 per page
    pagination(defaultPerPage = 12) {
        const currentPage = Math.max(1, Number(this.queryStr.page) || 1);
        const limit = Math.min(1000, Number(this.queryStr.limit) || defaultPerPage);
        const skip = limit * (currentPage - 1);
        this.query = this.query.limit(limit).skip(skip);
        return this;
    }
}

export default APIFilters;
