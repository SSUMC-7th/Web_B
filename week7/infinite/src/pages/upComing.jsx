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
import { useGetInfiniteMovies } from "../hooks/queries/useGetInfinteMovies.js";
import { useInView } from "react-intersection-observer";
function UpComingPage() {
  const {
    data: movies,
    isLoading,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isFetchingNextPage,
    error,
    isError,
  } = useGetInfiniteMovies("upcoming");

  const { ref, inView } = useInView({
    threshold: 0,
  });
  console.log(movies);
  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  return <MovieList movies={movies} ref={ref} isFetching={isFetching} />;
}

export default UpComingPage;
