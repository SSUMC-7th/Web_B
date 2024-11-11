import { axiosInstance } from '../../api/axios-instance';

const useGetMovies = async({ category, pageParam }) => {
    const { data } = await axiosInstance.get(`/movie/${category}?language=ko-KR&page=${pageParam}`)

    return data;
}

export {useGetMovies}