import React from "react";
import MovieList from "../../components/MovieList/MovieList";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";
import LoadingSpinner from "../../style/SkeletonUI";

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
}

interface PopularMoviesResponse {
  results: Movie[];
}

const PopularPage: React.FC = () => {
  const fetchPopularMovies = async (): Promise<PopularMoviesResponse> => {
    const response = await api.get(`/movie/popular?language=ko-KR&page=1`);
    return response.data;
  };

  const { data, isLoading, isError } = useQuery<PopularMoviesResponse, Error>({
    queryKey: ["popularMovies"],
    queryFn: fetchPopularMovies,
  });

  if (isLoading) return <LoadingSpinner isLoading={true} />;
  if (isError) return <div> 에러 발생...</div>;

  return <MovieList movies={data?.results || []} />;
};

export default PopularPage;
