import client from './client.js';

export const categoryApi = {
  getCategories: async () => {
    const { data } = await client.get('/categories');
    return data;
  },

  getCategoryById: async (id) => {
    const { data } = await client.get(`/categories/${id}`);
    return data;
  },
};

export default categoryApi;
