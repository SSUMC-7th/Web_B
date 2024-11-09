import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import MovieList from "../components/MovieList";
import useCustomFetch from "../hooks/useCustomFetch";
import { useQuery } from "@tanstack/react-query";
import * as S from "./search.style.js";
import { useGetMovies } from "../hooks/queries/useGetMovies";
import CardListSkeleton from "../components/Skeleton/card-list-skeleton.jsx";
import usePagination from "../hooks/usePagination.js";
import PaginationButtons from "../components/PaginationButtons.jsx";

function UpComingPage() {
  const { page, handlePrevPage, handleNextPage } = usePagination(1);
  const {
    isLoading,
    isError,
    error,
    data: movies,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ["upcoming", page],
    queryFn: () => useGetMovies({ category: "upcoming", pageParam: page }),
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

export default UpComingPage;
