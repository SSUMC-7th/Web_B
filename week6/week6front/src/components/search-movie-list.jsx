import { useSearchParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import MovieItem from "./MovieItem";
import * as S from "../pages/search.style.js";
import CardSkeletion from "./Skeleton/card-skeleton.jsx";
import CardListSkeleton from "./Skeleton/card-list-skeleton.jsx";
import debounce from "lodash/debounce";
import { useCallback, useEffect, useState } from "react";

const SearchMovieList = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    mq: "",
  });
  const mq = searchParams.get("mq");

  const url = `/search/movie?query=${mq}&include_adult=false&language=ko-KR&page=1`;

  const { data, isLoading, isError } = useCustomFetch(url);
  const movies = data?.data?.results || [];

  if (isError) {
    return <h1 style={{ color: "white" }}>에러 발생</h1>;
  }

  if (isLoading) {
    return (
      <S.MovieGridContainer>
        <CardListSkeleton number={20} />
      </S.MovieGridContainer>
    );
  }

  if (mq && movies.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <h1 style={{ color: "white" }}>해당하는 검색어 {mq}에</h1>
        <h1 style={{ color: "white" }}>해당하는 데이터가 없습니다.</h1>
      </div>
    );
  }

  return (
    <S.MovieGridContainer>
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </S.MovieGridContainer>
  );
};

export default SearchMovieList;
