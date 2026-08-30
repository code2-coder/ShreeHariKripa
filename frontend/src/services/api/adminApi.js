import client from './client.js';

export const adminApi = {
  // Products
  getAdminProducts: async () => {
    const { data } = await client.get('/admin/products');
    return data;
  },

  createProduct: async (productData) => {
    const { data } = await client.post('/admin/products/new', productData);
    return data;
  },

  updateProduct: async (id, productData) => {
    const { data } = await client.put(`/admin/products/${id}`, productData);
    return data;
  },

  deleteProduct: async (id) => {
    const { data } = await client.delete(`/admin/products/${id}`);
    return data;
  },

  // Returns
  getAllReturns: async () => {
    const { data } = await client.get('/admin/returns');
    return data;
  },

  getAdminReturnDetails: async (id) => {
    const { data } = await client.get(`/admin/returns/${id}`);
    return data;
  },

  updateReturnStatus: async (id, statusData) => {
    const { data } = await client.put(`/admin/returns/${id}`, statusData);
    return data;
  },

  // Couriers & Shipments
  getCouriers: async () => {
    const { data } = await client.get('/admin/couriers');
    return data;
  },

  getShipments: async () => {
    const { data } = await client.get('/admin/shipments');
    return data;
  },

  getShipmentDetails: async (id) => {
    const { data } = await client.get(`/admin/shipments/${id}`);
    return data;
  },

  createShipment: async (shipmentData) => {
    const { data } = await client.post('/admin/shipments', shipmentData);
    return data;
  },

  updateShipment: async (id, shipmentData) => {
    const { data } = await client.put(`/admin/shipments/${id}`, shipmentData);
    return data;
  },
};

export default adminApi;
