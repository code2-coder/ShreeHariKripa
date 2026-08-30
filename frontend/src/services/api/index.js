import client from './client.js';
import authApi from './authApi.js';
import productApi from './productApi.js';
import categoryApi from './categoryApi.js';
import orderApi from './orderApi.js';
import adminApi from './adminApi.js';
import shippingApi from './shippingApi.js';

export {
  client,
  authApi,
  productApi,
  categoryApi,
  orderApi,
  adminApi,
  shippingApi,
};

export default {
  client,
  auth: authApi,
  product: productApi,
  category: categoryApi,
  order: orderApi,
  admin: adminApi,
  shipping: shippingApi,
};
