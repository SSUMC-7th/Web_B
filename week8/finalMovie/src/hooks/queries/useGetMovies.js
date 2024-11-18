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

const useGetMovieVideos = async ({ movieId }) => {
  const { data } = await axiosInstance.get(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`
  );
  return data;
};

export {
  useGetMovies,
  useGetMoviesDetail,
  useGetMoviesCredit,
  useGetMovieVideos,
};
