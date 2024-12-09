import { TMovieCategory, TMovieListResponse } from "../types/movie";
import axiosInstance from "./axios-instance";

export const getMovieList = async ({
  category,
  page = 1,
}: {
  category: TMovieCategory;
  page?: number;
}): Promise<TMovieListResponse> => {
  const { data } = await axiosInstance.get(
    `/movie/${category}?language=ko-KR&page=${page}`
  );

  return data;
};
