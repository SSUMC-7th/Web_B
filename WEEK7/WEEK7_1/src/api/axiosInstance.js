import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('AccessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('RefreshToken');

        const response = await axios.post('http://localhost:3000/auth/token/access', null, {
          headers: { Authorization: `Bearer ${refreshToken}` }
        });

        const { accessToken } = response.data;

        localStorage.setItem('AccessToken', accessToken);

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('리프레시 토큰 오류:', refreshError);

        localStorage.removeItem('AccessToken');
        localStorage.removeItem('RefreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
