import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MovieItem = ({ movie }) => {
  const navigate = useNavigate();
  return (
    <MovieContainers
      onClick={() =>
        navigate(`/movies/${movie.id}`, {
          state: { movie: movie },
        })
      }
    >
      {/*       <StyledLink
        to={`/movies/${movie.id}`}
        state={{ movie: movie }} // state는 별도로 전달 // Link로도 할 수 있어요 !!
      > */}
      <MoviePoster
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <MovieText>
        <MovieTitle>{movie.title}</MovieTitle>
        <MovieDate>{movie.release_date}</MovieDate>
      </MovieText>
      {/* </StyledLink> */}
    </MovieContainers>
  );
};

export default MovieItem;

const MovieContainers = styled.div`
  width: 100%;
`;

const MoviePoster = styled.img`
  width: 100%; /* 이미지가 컨테이너의 가로 크기를 꽉 채우도록 설정 */
  height: 250px;
  object-fit: cover; /* 이미지가 잘리지 않도록 설정 */
  border-radius: 10px;
  transition: filter 0.3s ease-in-out;
  &:hover {
    filter: brightness(30%);
  }
`;

const MovieText = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
`;

const MovieTitle = styled.span`
  font-size: 14px;
`;

const MovieDate = styled.span`
  font-size: 12px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
