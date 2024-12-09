import axios, {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("AccessToken") ?? "";
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("RefreshToken") ?? "";

        if (!refreshToken) {
          throw new Error("리프레시 토큰이 없습니다");
        }

        const response = await axios.post(
          "http://localhost:3000/auth/token/access",
          null,
          {
            headers: { Authorization: `Bearer ${refreshToken}` },
          }
        );

        const { accessToken } = response.data;

        if (!accessToken) {
          throw new Error("액세스 토큰이 응답에 없습니다");
        }

        localStorage.setItem("AccessToken", accessToken);

        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("리프레시 토큰 오류:", refreshError);

        localStorage.removeItem("AccessToken");
        localStorage.removeItem("RefreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
