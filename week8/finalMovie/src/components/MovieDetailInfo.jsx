import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import styled from "styled-components";

const MovieDetailInfo = ({ movie, detailMovies, video }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  const handleTrailerClick = () => {
    setShowTrailer(true);
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

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
        {video && (
          <TrailerButton onClick={handleTrailerClick}>
            <FaPlay />
            관련 영상 보기
          </TrailerButton>
        )}
      </DetailContainer>

      {showTrailer && (
        <TrailerModal>
          <TrailerContent>
            <CloseButton onClick={handleCloseTrailer}>X</CloseButton>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${video.key}`}
              title="예고편"
              allowFullScreen
            ></iframe>
          </TrailerContent>
        </TrailerModal>
      )}
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

const TrailerButton = styled.button`
  margin-top: 10px;
  padding: 0;
  background: none;
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;

  &:hover {
    color: #ff6699; /* 마우스 오버 시 색상 변경 */
    text-decoration: underline;
  }

  &:focus {
    outline: none;
  }

  svg {
    margin-right: 8px;
  }
`;

const TrailerModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const TrailerContent = styled.div`
  width: 80%;
  max-width: 700px;
  background-color: #000;
  padding: 20px;
  border-radius: 8px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  color: white;
  font-size: 18px;
  border: none;
  cursor: pointer;
`;
