import React, { useState } from "react";
import styled from "styled-components";
import { useGetHome } from "../hooks/queries/useGetHome";
import { useGetDetails } from "../hooks/queries/useGetDetails";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const navigate = useNavigate();

  const {
    data: list,
    isLoading: FirstLoad,
    isError: FirstError,
  } = useQuery({
    queryKey: ["HomeMovieList"],
    queryFn: () => useGetHome(),
    keepPreviousData: true,
  });

  const {
    data: DetailList,
    isLoading: SecondLoad,
    isError: SecondError,
  } = useQuery({
    queryKey: ["HomeMovieDetail", list?.results?.map((movie) => movie.id)],
    queryFn: async () => {
      if (!list || !list.results) return [];
      const detailPromises = list.results.map((movie) =>
        useGetDetails({ movieID: movie.id })
      );
      return await Promise.all(detailPromises);
    },
    enabled: !!list,
  });

  if (FirstLoad || SecondLoad) return <div>Loading...</div>;
  if (FirstError || SecondError) return <div>Error occurred</div>;

  const paginatedDetails = DetailList.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNext = () => {
    if ((currentPage + 1) * itemsPerPage < DetailList.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Container>
      <SectionTitle>새로운 에피소드</SectionTitle>
      <SliderContainer>
        <ScrollButton onClick={handlePrev}>&lt;</ScrollButton>
        <EpisodeContainer>
          {paginatedDetails.map((detail, index) => (
            <EpisodeCard key={index}>
              <EpisodeImage
                onClick={() =>
                  navigate(`/movie/${detail.id}`, {
                    state: { movieID: detail.id },
                  })
                }
                src={
                  detail.poster_path
                    ? `https://image.tmdb.org/t/p/w400${detail.poster_path}`
                    : "https://via.placeholder.com/300x450"
                }
                alt={detail.title}
              />
              <EpisodeTitle>{detail.title}</EpisodeTitle>
              <EpisodeTitle>{detail.release_date}</EpisodeTitle>
            </EpisodeCard>
          ))}
        </EpisodeContainer>
        <ScrollButton onClick={handleNext}>&gt;</ScrollButton>
      </SliderContainer>
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  padding: 20px;
  background-color: black;
  color: white;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ScrollButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
  &:hover {
    color: #ccc;
  }
`;

const EpisodeContainer = styled.div`
  display: flex;
  gap: 15px;
  padding: 10px;
`;

const EpisodeCard = styled.div`
  max-width: 250px;
  flex: 0 0 auto;
  text-align: center;
`;

const EpisodeImage = styled.img`
  width: 100%;
  height: 450px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    filter: brightness(0.5);
  }
`;

const EpisodeTitle = styled.p`
  font-size: 14px;
`;
