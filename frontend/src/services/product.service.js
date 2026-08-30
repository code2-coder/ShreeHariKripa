import api from './api.js';

export const productService = {
  async getProducts(params = {}) {
    const { data } = await api.get('/products', { params });
    return data;
  },

  async getProductById(id) {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },

  async getFilterOptions() {
    const { data } = await api.get('/products/filter-options');
    return data;
  },

  async visualSearch(embedding) {
    const { data } = await api.post('/products/visual-search', { embedding });
    return data;
  },

  async getAdminProducts() {
    const { data } = await api.get('/admin/products');
    return data;
  },

  async createProduct(productData) {
    const { data } = await api.post('/admin/products', productData);
    return data;
  },

  async updateProduct(id, productData) {
    const { data } = await api.put(`/admin/products/${id}`, productData);
    return data;
  },

  async deleteProduct(id) {
    const { data } = await api.delete(`/admin/products/${id}`);
    return data;
  },

  async getProductReviews(productId, params = {}) {
    const { data } = await api.get(`/reviews/product/${productId}`, { params });
    return data;
  },

  async getProductReviewsSummary(productId) {
    const { data } = await api.get(`/reviews/product/${productId}/summary`);
    return data;
  },

  async submitReview(reviewData) {
    const { data } = await api.post('/reviews', reviewData);
    return data;
  },

  async checkReviewEligibility(productId) {
    const { data } = await api.get(`/reviews/eligibility?productId=${productId}`);
    return data;
  },
};

export default productService;
