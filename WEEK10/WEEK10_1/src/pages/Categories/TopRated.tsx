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

interface TopRatedMoviesResponse {
  results: Movie[];
}

const TopRatedPage: React.FC = () => {
  const fetchTopratedMovies = async (): Promise<TopRatedMoviesResponse> => {
    const response = await api.get(`/movie/top_rated?language=ko-KR&page=1`);
    return response.data;
  };

  const { data, isLoading, isError } = useQuery<TopRatedMoviesResponse, Error>({
    queryKey: ["TopratedMovies"],
    queryFn: fetchTopratedMovies,
  });

  if (isLoading) return <LoadingSpinner isLoading={true} />;
  if (isError) return <div> 에러 발생...</div>;

  return <MovieList movies={data?.results || []} />;
};

export default TopRatedPage;
