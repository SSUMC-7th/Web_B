import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import MovieList from "../components/MovieList";
import useCustomFetch from "../hooks/useCustomFetch";
import CardListSkeleton from "../components/Skeleton/card-list-skeleton";
import * as S from "./search.style.js";
import { useQuery } from "@tanstack/react-query";
import { useGetMovies } from "../hooks/queries/useGetMovies.js";
import usePagination from "../hooks/usePagination.js";
import PaginationButtons from "../components/PaginationButtons.jsx";

function TopRatedPage() {
  const { page, handlePrevPage, handleNextPage } = usePagination(1);
  const {
    isLoading,
    isError,
    error,
    data: movies,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ["top_rated", page],
    queryFn: () => useGetMovies({ category: "top_rated", pageParam: page }),
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

export default TopRatedPage;
