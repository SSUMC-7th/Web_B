import React from "react";
import { useLocation, useParams } from "react-router-dom";
import useCustomFetch from "../../hooks/useCustomFetch";
import MovieDetailPeople from "../../components/MovieDetail/MovieDetailPeople";
import MovieDetailInfo from "../../components/MovieDetail/MovieDetailInfo";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const { state } = useLocation();
  const movie = state?.movie || {};

  const creditsFetchUrl = `/movie/${movieId}/credits?language=ko-KR`;
  const detailsFetchUrl = `/movie/${movieId}?language=ko-KR`;

  const { data: creditsData, isLoading: isCreditsLoading, isError: isCreditsError } = useCustomFetch(creditsFetchUrl);
  const { data: detailsData, isLoading: isDetailsLoading, isError: isDetailsError } = useCustomFetch(detailsFetchUrl);

  const cast = creditsData?.data?.cast || [];
  const movieDetails = detailsData?.data || {};


  if (isCreditsLoading || isDetailsLoading) return <Loading />;
  if (isCreditsError || isDetailsError) return <Error />;

  return (
    <>
      <MovieDetailInfo movie={movie} detailMovies={movieDetails} />
      <MovieDetailPeople people={cast} />
    </>
  );
};

const Loading = () => <div> 로딩중 </div>;
const Error = () => <div> 에러 발생</div>;

export default MovieDetailPage;
