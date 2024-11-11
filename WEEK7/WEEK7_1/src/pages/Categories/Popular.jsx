import React from "react";
import MovieList from "../../components/MovieList/MovieList";
import useCustomFetch from "../../hooks/useCustomFetch";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";
import Skeleton from "../../styles/SkeletonUI";

function PopularPage() {
    const fetchPopularMovies = async () => {
        const response = await api.get(`/movie/popular?language=ko-KR&page=1`)
        return response.data;
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ["popularMovies"],
        queryFn: fetchPopularMovies,
    });

    if (isLoading) return <Skeleton />
    if (isError) return <div>에러 발생...</div>;

    return <MovieList movies={data?.results || []} />;
}

export default PopularPage;
