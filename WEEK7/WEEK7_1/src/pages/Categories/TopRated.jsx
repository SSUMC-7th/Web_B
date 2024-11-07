import React from "react";
import MovieList from "../../components/MovieList/MovieList";
import useCustomFetch from "../../hooks/useCustomFetch";
import api from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "../../styles/SkeletonUI";


function TopRatedPage() {
    const fetchTopratedMovies = async () => {
        const response = await api.get(`/movie/top_rated?language=ko-KR&page=1`);
        return response.data;
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ["TopratedMovies"],
        queryFn: fetchTopratedMovies,
    })


    if (isLoading) return <Skeleton />
    if (isError) return <div>에러 발생...</div>;

    return <MovieList movies={data?.results || []} />;
}

export default TopRatedPage;
