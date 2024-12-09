import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import MovieList from "../components/MovieList.jsx";
import useCustomFetch from "../hooks/useCustomFetch.js";
import CardListSkeleton from "../components/Skeleton/card-list-skeleton.jsx";
import * as S from "./search.style.js";
import { useGetMovies } from "../hooks/queries/useGetMovies.ts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import usePagination from "../hooks/usePagination.js";
import PaginationButtons from "../components/PaginationButtons.jsx";
import { TMovieListResponse } from "../types/movie.ts";

function PopularPage() {
  const { page, handlePrevPage, handleNextPage } = usePagination(1);
  const {
    isLoading,
    isError,
    data: movies,
    isFetching,
  } = useQuery<TMovieListResponse>({
    queryKey: ["popular", page],
    queryFn: () => useGetMovies({ category: "popular", pageParam: page }),
    placeholderData: keepPreviousData,
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
        totalPages={movies?.total_pages || 0}
        onPrev={handlePrevPage}
        onNext={() => handleNextPage(movies?.total_pages || 0)}
      />
    </>
  );
}

export default PopularPage;
