import React, { useState } from "react";
import MovieList from "../components/MovieList.jsx";
import CardListSkeleton from "../components/Skeleton/card-list-skeleton.jsx";
import * as S from "./search.style.js";
import { useGetInfiniteMovies } from "../hooks/queries/useGetInfinteMovies.js";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useGetMovies } from "../hooks/queries/useGetMovies.js";
import { useQuery } from "@tanstack/react-query";
import usePagination from "../hooks/usePagination.js";
import PaginationButtons from "../components/PaginationButtons.jsx";

function NowPlayingPage() {
  const { page, handlePrevPage, handleNextPage } = usePagination(1);
  const {
    isLoading,
    isError,
    error,
    data: movies,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ["now_playing", page],
    queryFn: () => useGetMovies({ category: "now_playing", pageParam: page }),
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <S.MovieGridContainer>
        <CardListSkeleton number={20} />
      </S.MovieGridContainer>
    );
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <>
      <MovieList movies={movies} isFetching={isFetching} />
      <PaginationButtons
        page={page}
        totalPages={movies?.total_pages}
        onPrev={handlePrevPage}
        onNext={() => handleNextPage(movies?.total_pages)}
      />
    </>
  );
}

export default NowPlayingPage;
