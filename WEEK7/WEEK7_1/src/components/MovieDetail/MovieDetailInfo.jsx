import React from "react";
import styled from "styled-components";

const MovieDetailInfo = ({ movie, detailMovies }) => {
  return (
    <BackgroundWrapper>
      <BackgroundImage src={`${import.meta.env.VITE_IMAGE_API_URL}w500${movie.backdrop_path}`} />
      <Overlay />
      <DetailContent>
        <MovieTitle>{detailMovies.title}</MovieTitle>
        <InfoWrapper>
          <Rating>★ {detailMovies.vote_average}</Rating>
          <Year>{detailMovies.release_date?.slice(0, 4)}</Year>
          <Runtime>{detailMovies.runtime} min</Runtime>
        </InfoWrapper>
        {detailMovies.tagline && <Tagline>"{detailMovies.tagline}"</Tagline>}
        <Overview>{detailMovies.overview}</Overview>
      </DetailContent>
    </BackgroundWrapper>
  );
};

export default MovieDetailInfo;


const BackgroundWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 60vh;
  overflow: hidden;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(50%);
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
`;

const DetailContent = styled.div`
  position: absolute;
  color: white;
  text-align: left;
  z-index: 2;
  max-width: 300px;
  padding: 20px;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.4);
`;

const MovieTitle = styled.h1`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 15px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;

const InfoWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: bold;
`;

const Rating = styled.span`
  color: white;
`;

const Year = styled.span`
  color: #ecf0f1;
`;

const Runtime = styled.span`
  color: #ecf0f1;
`;

const Tagline = styled.h2`
  font-size: 15px;
  font-style: italic;
  margin-bottom: 20px;
  color: #bdc3c7;
`;

const Overview = styled.p`
  font-size: 15px;
  line-height: 1.8;
  color: #ecf0f1;
`;
