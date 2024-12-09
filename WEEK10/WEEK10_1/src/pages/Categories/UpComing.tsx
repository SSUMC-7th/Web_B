import React from "react";
import MovieList from "../../components/MovieList/MovieList";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../../api/api";
import LoadingSpinner from "../../style/SkeletonUI";

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
}

interface UpComingResponse {
  results: Movie[];
}

const UpComingPage: React.FC = () => {
  const fetchUpcomingMovies = async (): Promise<UpComingResponse> => {
    const response = await api.get(`/movie/upcoming?language=ko-KR&page=1`);
    return response.data;
  };

  const { data, isLoading, isError }: UseQueryResult<UpComingResponse, Error> =
    useQuery({
      queryKey: ["UpcomingMovies"],
      queryFn: fetchUpcomingMovies,
    });

  if (isLoading) return <LoadingSpinner isLoading={true} />;
  if (isError) return <div> 에러 발생...</div>;

  return <MovieList movies={data?.results || []} />;
};

export default UpComingPage;
