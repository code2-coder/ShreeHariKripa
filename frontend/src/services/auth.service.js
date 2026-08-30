import api from './api.js';

export const authService = {
  async login(credentials) {
    const { data } = await api.post('/login', credentials);
    return data;
  },

  async register(userData) {
    const { data } = await api.post('/register', userData);
    return data;
  },

  async verifyEmail(payload) {
    const { data } = await api.post('/verify-email', payload);
    return data;
  },

  async resendVerification(email) {
    const { data } = await api.post('/resend-verification', { email });
    return data;
  },

  async getProfile() {
    const { data } = await api.get('/me');
    return data;
  },

  async updateProfile(profileData) {
    const { data } = await api.put('/me/update', profileData);
    return data;
  },

  async changePassword(passwordData) {
    const { data } = await api.put('/user/change-password', passwordData);
    return data;
  },

  async deleteAccount() {
    const { data } = await api.delete('/user/delete-account');
    return data;
  },

  async sendPhoneOtp(phoneNumber) {
    const { data } = await api.post('/auth/send-phone-otp', { phoneNumber });
    return data;
  },

  async verifyPhoneOtp(otp) {
    const { data } = await api.post('/auth/verify-phone-otp', { otp });
    return data;
  },

  async logout() {
    try {
      await api.post('/logout');
    } catch (e) {
      // Ignore network errors during logout
    }
  },

  async forgotPassword(email) {
    const { data } = await api.post('/forgot-password', { email });
    return data;
  },

  async verifyPasswordOtp(email, otp) {
    const { data } = await api.post('/verify-otp', { email, otp });
    return data;
  },

  async resetPassword(token, password, confirmPassword) {
    const { data } = await api.post('/reset-password', { token, password, confirmPassword });
    return data;
  },
};

export default authService;
