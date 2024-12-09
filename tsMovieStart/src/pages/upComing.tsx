import MovieList from "../components/MovieList.jsx";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import * as S from "./search.style.js";
import { useGetMovies } from "../hooks/queries/useGetMovies.ts";
import CardListSkeleton from "../components/Skeleton/card-list-skeleton.jsx";
import usePagination from "../hooks/usePagination.js";
import PaginationButtons from "../components/PaginationButtons.jsx";
import { TMovieListResponse } from "../types/movie.ts";

function UpComingPage() {
  const { page, handlePrevPage, handleNextPage } = usePagination(1);
  const {
    isLoading,
    isError,
    data: movies,
    isFetching,
  } = useQuery<TMovieListResponse>({
    queryKey: ["upcoming", page],
    queryFn: () => useGetMovies({ category: "upcoming", pageParam: page }),
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

export default UpComingPage;
