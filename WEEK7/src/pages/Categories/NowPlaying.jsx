import React from "react";
import { useQuery } from "@tanstack/react-query";
import MovieList from "../../components/MovieList/MovieList";
import api from "../../api/api";
import Skeleton from "../../styles/SkeletonUI";

function NowPlayingPage() {
    const fetchNowPlayingMovies = async () => {
        const response = await api.get(`/movie/now_playing?language=ko-KR&page=1`);
        return response.data;
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ["nowPlayingMovies"],
        queryFn: fetchNowPlayingMovies,
    });

    if (isLoading) return <Skeleton />
    if (isError) return <div>에러 발생...</div>;

    return <MovieList movies={data?.results || []} />;
}

export default NowPlayingPage;
