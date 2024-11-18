import axios from "axios";

const axiosHome = axios.create({
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_HOME_TOKEN}`,
  },
  baseURL: import.meta.env.VITE_MOVIE_API_URL,
});

export { axiosHome };
