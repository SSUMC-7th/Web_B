import React from "react";
import styled from "styled-components";
import MovieItem from "./MovieItem";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
}

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <MovieContainer>
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </MovieContainer>
  );
};

export default MovieList;

const MovieContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  background-color: #000;
`;
