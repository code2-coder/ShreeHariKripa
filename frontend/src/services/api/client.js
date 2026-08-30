import axios from 'axios';
import { toast } from 'sonner';

/**
 * Resolve Base API URL
 */
const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) {
    return envUrl.endsWith('/api/v1') ? envUrl : `${envUrl}/api/v1`;
  }

  // Production or Vercel environment fallback
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'https://shreeharikripa.onrender.com/api/v1';
  }

  return 'http://localhost:8085/api/v1';
};

export const client = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Bearer token if present
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Response Interceptor: Handle Refresh Token Queue and Error Toasting
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Routes that handle their own explicit error messages
    const silentRoutes = [
      '/login',
      '/register',
      '/forgot-password',
      '/reset-password',
      '/verify-email',
      '/verify-otp',
      '/refresh-token',
    ];
    const isSilentRoute = silentRoutes.some((route) => originalRequest?.url?.includes(route));

    // Handle Network / 500 errors
    if (!error.response) {
      toast.error('Network Error: Please check your internet connection.');
    } else if (error.response.status >= 500 && !isSilentRoute) {
      toast.error('Server Error: Our team has been notified.');
    } else if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== '/refresh-token' &&
      originalRequest.url !== '/login'
    ) {
      const storedRefreshToken = localStorage.getItem('refreshToken');
      if (!storedRefreshToken) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = 'Bearer ' + token;
            return client(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        client
          .post('/refresh-token', { refreshToken: storedRefreshToken })
          .then(({ data }) => {
            const newToken = data?.token || data?.data?.token;
            const newRefreshToken = data?.refreshToken || data?.data?.refreshToken;
            if (newToken) {
              localStorage.setItem('token', newToken);
              if (newRefreshToken) {
                localStorage.setItem('refreshToken', newRefreshToken);
              }
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              processQueue(null, newToken);
              resolve(client(originalRequest));
            } else {
              processQueue(new Error('No token returned'));
              reject(error);
            }
          })
          .catch((refreshError) => {
            processQueue(refreshError);
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            window.location.href = '/login?session_expired=true';
            reject(refreshError);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

export default client;
