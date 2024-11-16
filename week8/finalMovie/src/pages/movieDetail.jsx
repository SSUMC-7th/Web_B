import React from "react";
import { useLocation, useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import MovieDetailInfo from "../components/MovieDetailInfo";
import MovieDetailPeople from "../components/MovieDetailPeople";
import { useQuery } from "@tanstack/react-query";
import {
  useGetMovieVideos,
  useGetMoviesCredit,
  useGetMoviesDetail,
} from "../hooks/queries/useGetMovies";
import styled from "styled-components";

function MovieDetailPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const movie = location.state?.movie || {};

  const {
    data: creditData,
    isPending: creditisPending,
    isError: creditError,
  } = useQuery({
    queryKey: ["moviesCredit", movieId],
    queryFn: () => useGetMoviesCredit({ movieId }),
    cacheTime: 10000,
    staleTime: 10000,
  });

  const {
    data: detailData,
    isPending: detailPending,
    isError: detailErrors,
  } = useQuery({
    queryKey: ["moviesDetail", movieId],
    queryFn: () => useGetMoviesDetail({ movieId }),
    cacheTime: 10000,
    staleTime: 10000,
  });

  const {
    data: videoData,
    isLoading: videoLoading,
    isError: videoError,
  } = useQuery({
    queryKey: ["movieVideos", movieId],
    queryFn: () => useGetMovieVideos({ movieId }),
    cacheTime: 10000,
    staleTime: 10000,
  });

  const people = creditData?.cast || []; // 여기서 data.results를 안전하게 가져옴

  const video = videoData?.results[0];

  console.log(videoData?.results);

  console.log(video);

  if (creditisPending || detailPending || videoLoading) {
    return <div>Loading...</div>;
  }

  if (creditError || detailErrors || videoError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <>
      <MovieDetailInfo movie={movie} detailMovies={detailData} video={video} />
      <MovieDetailPeople people={people} />
      {videoData && videoData.results.length > 0 && (
        <VideoSection>
          <h2>Related Videos</h2>
          <VideoContainer>
            {videoData.results.map((video) => (
              <VideoItem key={video.id}>
                <h3>{video.name}</h3>
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title={video.name}
                  allowFullScreen
                ></iframe>
              </VideoItem>
            ))}
          </VideoContainer>
        </VideoSection>
      )}
    </>
  );
}

export default MovieDetailPage;

const VideoSection = styled.div`
  padding: 20px;
  background-color: #f4f4f4;
  color: #333;
  text-align: center;
`;

const VideoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const VideoItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 560px;
  margin: 10px;
`;
