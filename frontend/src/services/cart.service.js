export const cartService = {
  getStoredCart() {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },

  saveCart(cart) {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to local storage', e);
    }
  },

  clearStoredCart() {
    try {
      localStorage.removeItem('cart');
    } catch (e) {
      console.error('Error clearing cart from local storage', e);
    }
  },
};

export default cartService;
