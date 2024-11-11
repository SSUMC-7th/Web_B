import React from "react";
import { useLocation, useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import MovieDetailInfo from "../components/MovieDetailInfo";
import MovieDetailPeople from "../components/MovieDetailPeople";
import { useQuery } from "@tanstack/react-query";
import {
  useGetMoviesCredit,
  useGetMoviesDetail,
} from "../hooks/queries/useGetMovies";

function MovieDetailPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const { movie } = location.state || [];

  const {
    data: creditData,
    isPending: creditisPending,
    isError: creditError,
  } = useQuery({
    queryKey: ["moviesCredit", movieId],
    queryFn: () => useGetMoviesCredit({ movieId }),
    cacheTime: 10000,
    staleTime: 10000,
  });

  const {
    data: detailData,
    isPending: detailPending,
    isError: detailErrors,
  } = useQuery({
    queryKey: ["moviesDetail", movieId],
    queryFn: () => useGetMoviesDetail({ movieId }),
    cacheTime: 10000,
    staleTime: 10000,
  });

  const people = creditData?.cast || []; // 여기서 data.results를 안전하게 가져옴

  if (creditisPending || detailPending) {
    return <div>Loading...</div>;
  }

  if (creditError || detailErrors) {
    return <div>Something went wrong...</div>;
  }

  return (
    <>
      <MovieDetailInfo movie={movie} detailMovies={detailData} />
      <MovieDetailPeople people={people} />
    </>
  );
}

export default MovieDetailPage;
