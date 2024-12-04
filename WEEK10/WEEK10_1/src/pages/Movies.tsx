import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieList from "../components/MovieList/MovieList";
import styled from "styled-components";

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
}

interface Error {
  response?: {
    data: string;
  };
  message: string;
}

const MoviesPage = () => {
  const { category } = useParams<{ category?: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      if (!category) {
        setError({ message: "해당 카테고리가 없습니다." });
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(getMoviesUrl(category), {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_APP_BEARER_TOKEN}`,
          },
        });
        setMovies(response.data.results);
        console.log("111", import.meta.env);
      } catch (error: any) {
        setError(error.response ? error.response.data : error.message);
      }
      setLoading(false);
    };

    fetchMovies();
  }, [category]);

  const getMoviesUrl = (category: string) => {
    return `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=1`;
  };

  if (loading) {
    return <Loading>Loading movies...</Loading>;
  }

  if (error) {
    return <Error>{`Error: ${error.message}`}</Error>;
  }

  return <MovieList movies={movies} />;
};

const Loading = styled.div`
  font-size: 20px;
  color: black;
  text-align: center;
  margin: 20px;
`;

const Error = styled.div`
  font-size: 20px;
  color: black;
  text-align: center;
  margin: 20px;
`;

export default MoviesPage;
