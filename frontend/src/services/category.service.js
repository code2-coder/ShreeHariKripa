import api from './api.js';

export const categoryService = {
  async getCategories() {
    const { data } = await api.get('/categories');
    return data;
  },

  async getCategoryById(id) {
    const { data } = await api.get(`/categories/${id}`);
    return data;
  },

  async createCategory(categoryData) {
    const { data } = await api.post('/admin/categories', categoryData);
    return data;
  },

  async updateCategory(id, categoryData) {
    const { data } = await api.put(`/admin/categories/${id}`, categoryData);
    return data;
  },

  async deleteCategory(id) {
    const { data } = await api.delete(`/admin/categories/${id}`);
    return data;
  },
};

export default categoryService;
