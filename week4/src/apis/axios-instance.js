import axios from "axios";

const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_APP_API_KEY}`,
  },
  baseURL: import.meta.env.VITE_MOVIE_API_URL,
});

export default axiosInstance;
