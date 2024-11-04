import React from "react";
import styled from "styled-components";

const MovieDetailInfo = ({ movie, detailMovies }) => {
  return (
    <BackGroundContainer>
      <BackIMG src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} />
      <Shadow />
      <DetailContainer>
        <Title>{detailMovies.title}</Title>
        <RatingYearContainer>
          <Rating>평균: {detailMovies.vote_average}</Rating>
          <Year>{detailMovies.release_date?.slice(0, 4)}</Year>
          <RunTime>{detailMovies.runtime}분</RunTime>
        </RatingYearContainer>
        <TagLine>{detailMovies.tagline}</TagLine>
        <DetailText>{detailMovies.overview}</DetailText>
      </DetailContainer>
    </BackGroundContainer>
  );
};

export default MovieDetailInfo;

// 스타일링
const BackGroundContainer = styled.div`
  position: relative;
`;

const Shadow = styled.div`
  position: absolute;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.8),
    rgba(255, 255, 255, 0.1)
  );
  width: 100%;
  height: 50vh;
  top: 0px;
  left: 0px;
  border-radius: 20px;
  margin-bottom: 20px;
  z-index: 2;
`;

const BackIMG = styled.img`
  width: 100%;
  height: 50vh;
  object-fit: cover;
  border-radius: 20px;
  margin-bottom: 20px;
  z-index: 1;
`;

const DetailContainer = styled.div`
  position: absolute;
  text-align: left;
  color: white;
  top: 15px;
  left: 20px;
  max-width: 600px;
  z-index: 3;
`;

const Title = styled.h1`
  color: white;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const RatingYearContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Rating = styled.span`
  font-size: 24px;
  color: #f39c12;
  font-weight: bold;
  margin-right: 20px;
`;

const Year = styled.span`
  font-size: 15px;
  color: white;
  font-weight: bold;
`;

const RunTime = styled.span`
  font-size: 15px;
  color: white;
  font-weight: bold;
`;

const TagLine = styled.h1`
  color: white;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 15px;
  font-style: italic;
`;

const DetailText = styled.div`
  margin-bottom: 15px;
  font-size: 14px;
  line-height: 1.6;
`;
