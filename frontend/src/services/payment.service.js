import api from './api.js';

export const paymentService = {
  async createStripeSession(sessionPayload) {
    const { data } = await api.post('/payment/stripe/create-checkout-session', sessionPayload);
    return data;
  },

  async verifyStripePayment(verificationPayload) {
    const { data } = await api.post('/payment/stripe/verify', verificationPayload);
    return data;
  },
};

export default paymentService;
