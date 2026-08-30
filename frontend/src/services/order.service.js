import api from './api.js';

export const orderService = {
  async createOrder(orderData) {
    const { data } = await api.post('/orders/new', orderData);
    return data;
  },

  async getMyOrders() {
    const { data } = await api.get('/me/orders');
    return data;
  },

  async getOrderDetails(orderId) {
    const { data } = await api.get(`/orders/${orderId}`);
    return data;
  },

  async getAllAdminOrders() {
    const { data } = await api.get('/admin/orders');
    return data;
  },

  async updateOrder(orderId, updateData) {
    const { data } = await api.put(`/admin/orders/${orderId}`, updateData);
    return data;
  },

  async deleteOrder(orderId) {
    const { data } = await api.delete(`/admin/orders/${orderId}`);
    return data;
  },
};

export default orderService;
