import axiosInstance from "../../apis/axios-instance";

const useGetMovies = async ({ category, pageParam }) => {
  const { data } = await axiosInstance.get(
    `/movie/${category}?language=ko-KR&page=${pageParam}`
  );

  return data;
};

const useGetMoviesCredit = async ({ movieId }) => {
  const { data } = await axiosInstance.get(
    `/movie/${movieId}/credits?language=ko-KR`
  );

  return data;
};

const useGetMoviesDetail = async ({ movieId }) => {
  const { data } = await axiosInstance.get(`/movie/${movieId}?language=ko-KR`);

  return data;
};

export { useGetMovies, useGetMoviesDetail, useGetMoviesCredit };
