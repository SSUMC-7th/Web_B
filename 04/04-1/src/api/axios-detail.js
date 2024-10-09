import axios from 'axios';

const axiosDetail = axios.create({
    headers:{
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_DETAIL_TOKEN}`
    },
    baseURL: import.meta.env.VITE_MOVIE_API_URL,
})

export { axiosDetail };