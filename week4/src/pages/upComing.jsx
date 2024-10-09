import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import MovieList from "../components/MovieList";
import useCustomFetch from "../hooks/useCustomFetch";

function UpComingPage() {
  const { data, isLoading, isError } = useCustomFetch(
    `/movie/upcoming?language=ko-KR&page=1`
  );
  const movies = data?.data?.results || []; // 여기서 data.results를 안전하게 가져옴

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  return <MovieList movies={movies} />;
}

export default UpComingPage;
