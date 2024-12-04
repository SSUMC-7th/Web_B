import React from "react";
import { useQuery } from "@tanstack/react-query";
import MovieList from "../../components/MovieList/MovieList";
import api from "../../api/api";
import LoadingSpinner from "../../style/SkeletonUI";

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
}

interface NowPlayingResponse {
  results: Movie[];
}

const NowPlayingPage: React.FC = () => {
  const fetchNowPlayingMovies = async (): Promise<NowPlayingResponse> => {
    const response = await api.get(`/movie/now_playing?language=ko-KR&page=1`);
    return response.data;
  };

  const { data, isLoading, isError } = useQuery<NowPlayingResponse, Error>({
    queryKey: ["nowPlayingMovies"],
    queryFn: fetchNowPlayingMovies,
  });

  if (isLoading) return <LoadingSpinner isLoading={true} />;
  if (isError) return <div> 에러 발생...</div>;

  return <MovieList movies={data?.results || []} />;
};

export default NowPlayingPage;
