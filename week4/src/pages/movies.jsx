import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import MovieList from "../components/MovieList";

function MoviesPage() {
  const { category } = useParams();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=1`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_APP_API_KEY}`, // Bearer 토큰 확인
            },
          }
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
  }, [category]);

  return <MovieList movies={movies} />;
}

export default MoviesPage;
