import axios from 'axios';

const api = axios.create({
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_APP_BEARER_TOKEN}`
  },
  baseURL: import.meta.env.VITE_TMDB_MOVIE_URL
});

export default api;
