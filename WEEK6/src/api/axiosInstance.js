import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('AccessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('RefreshToken');

        const response = await axiosInstance.post('/auth/token/access', {
          refreshToken
        });

        const { accessToken } = response.data;

        localStorage.setItem('AccessToken', accessToken);
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('리프레시 토큰 오류:', refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
