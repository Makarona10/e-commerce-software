import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1/'
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(
          'http://localhost:3001/api/v1/auth/refresh',
          { refreshToken },
        );
        const { accessToken } = response.data;
        // Update tokens
        localStorage.setItem('accessToken', accessToken);
        // Update original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (err) {
        console.error('Token refresh failed:', err);
      }
    }
    return Promise.reject(error);
  },
);

