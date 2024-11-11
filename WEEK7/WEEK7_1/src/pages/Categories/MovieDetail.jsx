import React from "react";
import { useLocation, useParams } from "react-router-dom";
import useCustomFetch from "../../hooks/useCustomFetch";
import MovieDetailPeople from "../../components/MovieDetail/MovieDetailPeople";
import MovieDetailInfo from "../../components/MovieDetail/MovieDetailInfo";
import Skeleton from "../../styles/SkeletonUI";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const { state } = useLocation();
  const movie = state?.movie || {};

  const { data: creditsData, isLoading: isCreditsLoading, isError: isCreditsError } = useCustomFetch(`/movie/${movieId}/credits?language=ko-KR`);
  const { data: detailsData, isLoading: isDetailsLoading, isError: isDetailsError } = useCustomFetch(`/movie/${movieId}?language=ko-KR`);

  const cast = creditsData?.cast || [];
  const movieDetails = detailsData || {};


  if (isCreditsLoading || isDetailsLoading) return <Loading />;
  if (isCreditsError || isDetailsError) return <Error />;

  return (
    <>
      <MovieDetailInfo movie={movie} detailMovies={movieDetails} />
      <MovieDetailPeople people={cast} />
    </>
  );
};

const Loading = () => <Skeleton />
const Error = () => <div> 에러 발생</div>;

export default MovieDetailPage;
