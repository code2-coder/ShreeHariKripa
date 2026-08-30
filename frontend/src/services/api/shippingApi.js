import client from './client.js';

export const shippingApi = {
  calculateShipping: async (payload) => {
    const { data } = await client.post('/shipping/calculate', payload);
    return data;
  },

  trackShipment: async (waybill) => {
    const { data } = await client.get(`/delhivery/track/${waybill}`);
    return data;
  },

  checkPincodeServiceability: async (pincode) => {
    const { data } = await client.get(`/delhivery/pincode/${pincode}`);
    return data;
  },
};

export default shippingApi;
