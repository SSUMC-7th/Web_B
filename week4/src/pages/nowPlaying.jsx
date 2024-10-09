import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import MovieList from "../components/MovieList";
import axiosInstance from "../apis/axios-instance";
import useCustomFetch from "../hooks/useCustomFetch";

function NowPlayingPage() {
  const { data, isLoading, isError } = useCustomFetch(
    `/movie/now_playing?language=ko-KR&page=1`
  );
  const movies = data?.data?.results || []; // 여기서 data.results를 안전하게 가져옴

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  /*   const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axiosInstance.get(
          `/movie/now_playing?language=ko-KR&page=1`
        );
        setMovies(response.data.results);

        // ** response로 설정하면 배열이 아니어서 response.data.results로 바꾸어야한다.
        // console.log(response); 로 확인해봐
      } catch (error) {
        console.error(
          "API 요청 중 오류 발생:",
          error.response ? error.response.data : error.message
        );
      }
    };
    getMovies();
  }, [category]); */

  return <MovieList movies={movies} />;
}

export default NowPlayingPage;
