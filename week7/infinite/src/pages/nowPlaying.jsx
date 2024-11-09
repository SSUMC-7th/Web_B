import React, { useState } from "react";
import MovieList from "../components/MovieList";
import CardListSkeleton from "../components/Skeleton/card-list-skeleton";
import * as S from "./search.style.js";
import { useGetInfiniteMovies } from "../hooks/queries/useGetInfinteMovies.js";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

function NowPlayingPage() {
  const {
    data: movies,
    isLoading,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isFetchingNextPage,
    error,
    isError,
  } = useGetInfiniteMovies("now_playing");

  const { ref, inView } = useInView({
    threshold: 0,
  });
  console.log(movies);
  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  /*   const { data, isLoading, isError } = useCustomFetch(
    `/movie/now_playing?language=ko-KR&page=1`
  );
  const movies = data?.data?.results || []; // 여기서 data.results를 안전하게 가져옴
 */

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  /*   const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axiosInstance.get(
          `/movie/now_playing?language=ko-KR&page=1`
        );
        setMovies(response.data.results);

        // ** response로 설정하면 배열이 아니어서 response.data.results로 바꾸어야한다.
        // console.log(response); 로 확인해봐
      } catch (error) {
        console.error(
          "API 요청 중 오류 발생:",
          error.response ? error.response.data : error.message
        );
      }
    };
    getMovies();
  }, [category]); */

  return <MovieList movies={movies} ref={ref} isFetching={isFetching} />;
}

export default NowPlayingPage;
