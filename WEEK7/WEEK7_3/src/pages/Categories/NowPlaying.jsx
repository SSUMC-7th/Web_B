import React from "react";
import { useQuery } from "@tanstack/react-query";
import MovieList from "../../components/MovieList/MovieList";
import api from "../../api/api";
import LoadingSpinner from "../../styles/SkeletonUI";
import usePagination from "../../hooks/usePagination";


const fetchNowPlayingMovies = async (page = 1) => {
    const response = await api.get(`/movie/now_playing?language=ko-KR&page=${page}`);
    return response.data;
};

function NowPlayingPage() {
    const { page, PaginationStyle } = usePagination(1);

    const {
        data,
        isLoading,
        isError,
        isFetching,
        error,
    } = useQuery({
        queryKey: ["nowPlayingMovies", page],
        queryFn: () => fetchNowPlayingMovies(page),
        keepPreviousData: true,
    });

    if (isLoading) return <LoadingSpinner isLoading={isLoading} />
    if (isError) return <div> 에러 발생: {error.message}</div>;

    return (
        <>
            <MovieList movies={data?.results || []} />
            <PaginationStyle totalPages={data?.total_pages} isFetching={isFetching} />
        </>
    );
}

export default NowPlayingPage;
