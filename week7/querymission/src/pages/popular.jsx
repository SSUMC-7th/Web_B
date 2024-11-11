import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import MovieList from "../components/MovieList.jsx";
import useCustomFetch from "../hooks/useCustomFetch.js";
import CardListSkeleton from "../components/Skeleton/card-list-skeleton.jsx";
import * as S from "./search.style.js";
import { useGetMovies } from "../hooks/queries/useGetMovies.js";
import { useQuery } from "@tanstack/react-query";

function PopularPage() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["movies", "popular"],
    queryFn: () => useGetMovies({ category: "popular", pageParam: 1 }),
    cacheTime: 10000,
    staleTime: 10000,
  });

  const movies = data?.results;

  if (isPending) {
    return (
      <S.MovieGridContainer>
        <CardListSkeleton number={20} />
      </S.MovieGridContainer>
    );
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  return <MovieList movies={movies} />;
}

export default PopularPage;
