import React from "react";
import MovieList from "../../components/MovieList/MovieList";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";
import usePagination from "../../hooks/usePagination";
import LoadingSpinner from "../../styles/SkeletonUI";

const fetchPopularMovies = async (page = 1) => {
    const response = await api.get(`/movie/popular?language=ko-KR&page=${page}`);
    return response.data;
}

function PopularPage() {
    const { page, PaginationStyle } = usePagination(1);

    const { data, isLoading, isError, isFetching, error } = useQuery({
        queryKey: ["popularMovies", page],
        queryFn: () => fetchPopularMovies(page),
        keepPreviousData: true,
    });

    if (isLoading) return <LoadingSpinner isLoading={isLoading} />
    if (isError) return <div>에러 발생...</div>;

    return (
        <>
            <MovieList movies={data?.results || []} />
            <PaginationStyle totalPages={data?.total_pages} isFetching={isFetching} />
        </>

    )
}

export default PopularPage;
