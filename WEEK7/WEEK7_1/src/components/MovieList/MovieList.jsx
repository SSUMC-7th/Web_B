import React from "react";
import styled from "styled-components";
import MovieItem from "./MovieItem";

const MovieList = ({ movies }) => {
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
  grid-template-columns: repeat(9, 1fr);
  grid-auto-rows: auto;
  gap: 15px;
`;