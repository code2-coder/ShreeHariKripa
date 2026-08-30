import client from './client.js';

export const orderApi = {
  createOrder: async (orderData) => {
    const { data } = await client.post('/orders/new', orderData);
    return data;
  },

  getMyOrders: async () => {
    const { data } = await client.get('/orders/me');
    return data;
  },

  getOrderDetails: async (id) => {
    const { data } = await client.get(`/orders/${id}`);
    return data;
  },

  // Returns
  createReturnRequest: async (returnData) => {
    const { data } = await client.post('/returns', returnData);
    return data;
  },

  getMyReturns: async () => {
    const { data } = await client.get('/returns/me');
    return data;
  },

  getReturnDetails: async (id) => {
    const { data } = await client.get(`/returns/${id}`);
    return data;
  },
};

export default orderApi;
