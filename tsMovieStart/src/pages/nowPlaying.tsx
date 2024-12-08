import MovieList from "../components/MovieList.jsx";
import CardListSkeleton from "../components/Skeleton/card-list-skeleton.jsx";
import * as S from "./search.style.js";
import { useGetMovies } from "../hooks/queries/useGetMovies.ts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import usePagination from "../hooks/usePagination.js";
import PaginationButtons from "../components/PaginationButtons.jsx";
import { Query_KEYS } from "../constant/queryKey.ts";

function NowPlayingPage() {
  const { page, handlePrevPage, handleNextPage } = usePagination(1);
  const {
    isLoading,
    isError,
    data: movies,
    isFetching,
  } = useQuery({
    queryFn: () => useGetMovies({ category: "now_playing", pageParam: page }),
    queryKey: [Query_KEYS.NOW_PLAYING, page],
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return (
      <S.MovieGridContainer>
        <CardListSkeleton number={20} />
      </S.MovieGridContainer>
    );
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }
  console.log(movies);

  return (
    <>
      <MovieList movies={movies} isFetching={isFetching} />
      <PaginationButtons
        page={page}
        totalPages={movies?.total_pages || 0}
        onPrev={handlePrevPage}
        onNext={() => handleNextPage(movies?.total_pages || 0)}
      />
    </>
  );
}

export default NowPlayingPage;
