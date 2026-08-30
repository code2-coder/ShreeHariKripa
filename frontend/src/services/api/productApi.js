import client from './client.js';

export const productApi = {
  getProducts: async (params = {}) => {
    const { data } = await client.get('/products', { params });
    return data;
  },

  getProductById: async (id) => {
    const { data } = await client.get(`/products/${id}`);
    return data;
  },

  getFilterOptions: async () => {
    const { data } = await client.get('/products/filter-options');
    return data;
  },

  getBanners: async () => {
    const { data } = await client.get('/banners');
    return data;
  },

  getAdPosters: async () => {
    const { data } = await client.get('/ad-posters');
    return data;
  },

  getReviews: async (productId) => {
    const { data } = await client.get(`/reviews/product/${productId}`);
    return data;
  },

  getReviewsSummary: async (productId) => {
    const { data } = await client.get(`/reviews/product/${productId}/summary`);
    return data;
  },

  createReview: async (reviewData) => {
    const { data } = await client.post('/reviews', reviewData);
    return data;
  },

  visualSearch: async (embedding) => {
    const { data } = await client.post('/products/visual-search', { embedding });
    return data;
  },
};

export default productApi;
