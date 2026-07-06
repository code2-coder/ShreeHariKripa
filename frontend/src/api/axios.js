import axios from 'axios';
import { toast } from 'sonner';

const getBaseUrl = () => {
  // If we are running in production on the live domain, ALWAYS force the Render backend URL
  // This prevents Vercel from intercepting the request and returning index.html
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return 'https://shreeharikripa.onrender.com/api/v1';
  }
  
  const url = import.meta.env.VITE_API_URL;
  if (!url) return 'https://shreeharikripa.onrender.com/api/v1';
  return url.endsWith('/api/v1') ? url : `${url}/api/v1`;
};

const api = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Routes that handle their own error toasts — skip global error handling
    const silentRoutes = ['/login', '/register', '/forgot-password', '/reset-password', '/verify-email'];
    const isSilentRoute = silentRoutes.some(route => originalRequest?.url?.includes(route));

    // Only handle global network or 500 server errors for non-auth routes
    if (!error.response) {
      toast.error('Network Error: Please check your internet connection.');
    } else if (error.response.status >= 500 && !isSilentRoute) {
      toast.error('Server Error: Our team has been notified.');
    } else if (error.response.status === 401 && !originalRequest._retry && originalRequest.url !== '/refresh-token' && originalRequest.url !== '/login') {
      originalRequest._retry = true;
      try {
        const { data } = await api.post('/refresh-token');
        // sendResponse spreads data at top-level: { success, message, token }
        const newToken = data?.token || data?.data?.token;
        if (newToken) {
          localStorage.setItem('token', newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, clear everything and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login?session_expired=true';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
