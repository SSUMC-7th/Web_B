import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MovieItem = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <MovieContainer onClick={() => navigate(`/movies/${movie.id}`, { state: { movie } })}>
      <MoviePoster src={`${import.meta.env.VITE_IMAGE_API_URL}w500${movie.poster_path}`} alt={movie.title} />
      <MovieDetails>
        <MovieTitle>{movie.title}</MovieTitle>
        <MovieDate>{movie.release_date}</MovieDate>
      </MovieDetails>
    </MovieContainer>
  );
};

export default MovieItem;

const MovieContainer = styled.div`
  width: 100%;
  cursor: pointer;
  overflow: hidden;
  margin-left: 10px;
  margin-top: 10px;


  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  height: 250px;
  object-fit: fit;
  transition: filter 0.3s ease-in-out;
  
  &:hover {
    filter: brightness(0.8);
  }
`;

const MovieDetails = styled.div`
  padding: 10px;
  color: black;
`;

const MovieTitle = styled.h3`
  font-size: 15px;
  margin: 0;
  font-weight: bold;
`;

const MovieDate = styled.p`
  font-size: 13px;
  margin: 5px 0 0;
`;

