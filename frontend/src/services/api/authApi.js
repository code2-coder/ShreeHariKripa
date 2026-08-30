import client from './client.js';

export const authApi = {
  login: async (credentials) => {
    const { data } = await client.post('/login', credentials);
    return data;
  },

  register: async (userData) => {
    const { data } = await client.post('/register', userData);
    return data;
  },

  verifyEmail: async (payload) => {
    const { data } = await client.post('/verify-email', payload);
    return data;
  },

  resendVerification: async (email) => {
    const { data } = await client.post('/resend-verification', { email });
    return data;
  },

  forgotPassword: async (email) => {
    const { data } = await client.post('/forgot-password', { email });
    return data;
  },

  verifyOtp: async (payload) => {
    const { data } = await client.post('/verify-otp', payload);
    return data;
  },

  resetPassword: async (payload) => {
    const { data } = await client.post('/reset-password', payload);
    return data;
  },

  getProfile: async () => {
    const { data } = await client.get('/me');
    return data;
  },

  updateProfile: async (profileData) => {
    const { data } = await client.put('/me/update', profileData);
    return data;
  },

  changePassword: async (passwordData) => {
    const { data } = await client.put('/user/change-password', passwordData);
    return data;
  },

  logout: async () => {
    const { data } = await client.post('/logout');
    return data;
  },
};

export default authApi;
