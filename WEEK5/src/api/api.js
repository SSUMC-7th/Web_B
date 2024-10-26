import axios from 'axios';

const api = axios.create({
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_APP_BEARER_TOKEN}`
  },
  baseURL: import.meta.env.VITE_MOVIE_API_URL
});

export default api;
