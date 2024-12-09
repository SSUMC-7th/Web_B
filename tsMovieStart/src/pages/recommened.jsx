import { useState } from "react";
import axiosInstance from "../apis/axios-instance";
import { useGetMovies } from "../hooks/queries/useGetMovies.ts";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function RecommededPage() {
  const [randCategory, setRandCatergory] = useState("");
  const [randPage, setRandPage] = useState(1);
  const [previousMovies, setPreviousMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = ["now_playing", "popular", "top_rated", "upcoming"];

  const navigate = useNavigate();

  useEffect(() => {
    const randCate = categories[Math.floor(Math.random() * categories.length)];
    const randP = Math.floor(Math.random() * 5) + 1;
    setRandCatergory(randCate);
    setRandPage(randP);
  }, []);

  const {
    isLoading,
    isError,
    data: movies,
  } = useQuery({
    queryKey: ["recommended", randCategory, randPage],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `https://api.themoviedb.org/3/movie/${randCategory}?language=ko-KR&page=${randPage}`
      );
      return response.data.results[Math.floor(Math.random() * 20)];
    },
    keepPreviousData: true,
    enabled: !!randCategory,
  });

  useEffect(() => {
    if (movies) {
      setPreviousMovies((prev) => [...prev, movies]);
    }
  }, [movies]);

  const handleNewRecommendation = () => {
    const newRandCate =
      categories[Math.floor(Math.random() * categories.length)];
    const newRandPage = Math.floor(Math.random() * 10) + 1;
    setRandCatergory(newRandCate);
    setRandPage(newRandPage);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousRecommendation = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const gotoDetail = (id) => {
    navigate(`/movies/${id}`, { state: { movie: displayMovie } });
  };

  const displayMovie = previousMovies[currentIndex];

  return (
    <Container>
      <Title>{"< 오늘의 추천 영화 >"}</Title>
      {isLoading ? (
        <H2>Loading...</H2>
      ) : isError ? (
        <H2>영화 정보를 불러오는데 실패했습니다.</H2>
      ) : displayMovie ? (
        <MovieContainer>
          <H2>{displayMovie.title}</H2>
          <WhiteP>{displayMovie.overview}</WhiteP>
          <img
            src={`https://image.tmdb.org/t/p/w500${displayMovie.poster_path}`}
            alt={displayMovie.title}
            onClick={() => gotoDetail(displayMovie.id)}
          />
        </MovieContainer>
      ) : (
        <H2>영화 정보가 없습니다.</H2>
      )}
      <ButtonContainer>
        <Button
          onClick={handlePreviousRecommendation}
          disabled={currentIndex <= 0}
        >
          이전 추천 영화
        </Button>
        <Button onClick={handleNewRecommendation}>다른 영화 추천</Button>
      </ButtonContainer>
    </Container>
  );
}

export default RecommededPage;

const H2 = styled.h2`
  color: white;
`;

const WhiteP = styled.p`
  color: white;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: white;
`;

const MovieContainer = styled.div`
  text-align: center;
  max-width: 500px;
  img {
    width: 50%;
    border-radius: 10px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const Button = styled.button`
  font-size: 16px;
  padding: 10px 20px;
  background-color: #fa3065;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #ff6699;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
