import axiosInstance from "../../apis/axios-instance";
import {
  MovieCast,
  MovieDetails,
  MovieVideos,
  TMovieCategory,
  TMovieListResponse,
} from "../../types/movie";

const useGetMovies = async ({
  category,
  pageParam = 1,
}: {
  category: TMovieCategory;
  pageParam?: number;
}): Promise<TMovieListResponse> => {
  const { data } = await axiosInstance.get(
    `/movie/${category}?language=ko-KR&page=${pageParam}`
  );
  return data;
};

const useGetMoviesCredit = async ({
  movieId,
}: {
  movieId: string;
}): Promise<MovieCast> => {
  const { data } = await axiosInstance.get(
    `/movie/${movieId}/credits?language=ko-KR`
  );

  return data;
};

const useGetMoviesDetail = async ({
  movieId,
}: {
  movieId: string;
}): Promise<MovieDetails> => {
  const { data } = await axiosInstance.get(`/movie/${movieId}?language=ko-KR`);

  return data;
};

const useGetMovieVideos = async ({
  movieId,
}: {
  movieId: string;
}): Promise<MovieVideos> => {
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
