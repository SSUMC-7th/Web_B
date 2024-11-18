import React from "react";
import styled from "styled-components";
import MovieItem from "./MovieItem";
import ClipLoader from "react-spinners/ClipLoader";
import CardListSkeleton from "./Skeleton/card-list-skeleton";

const MovieList = ({ movies, isFetching }) => {
  return (
    <>
      <MovieContainer>
        {movies?.results.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
        {/*          
        {movies.pages.map((page) =>
          page.results.map((movie) => {
            return <MovieItem key={movie.id} movie={movie} />;
          })
        )} */}
        {isFetching && <CardListSkeleton number={20} />}
      </MovieContainer>
      <ObserveDiv>{isFetching && <ClipLoader color={"#fff"} />}</ObserveDiv>
    </>
  );
};

export default MovieList;

const MovieContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-auto-rows: auto;
  gap: 20px;
  justify-items: center;
`;

const ObserveDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;
