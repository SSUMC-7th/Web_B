import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { TMovieCategory } from "../../types/movie";
import { Query_KEYS } from "../../constant/queryKey";
import { getMovieList } from "../../apis/movie";

function useGetMovieList(category: TMovieCategory, page: number) {
  return useQuery({
    queryFn: () => getMovieList({ category, page }),
    queryKey: [Query_KEYS.MOVIE_LIST, category, page],
    placeholderData: keepPreviousData,
  });
}

export default useGetMovieList;
