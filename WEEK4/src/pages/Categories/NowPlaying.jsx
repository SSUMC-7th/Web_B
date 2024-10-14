import React from "react";
import MovieList from "../../components/MovieList/MovieList";
import useCustomFetch from "../../hooks/useCustomFetch";

function NowPlayingPage() {
    const { data, isLoading, isError } = useCustomFetch(
        `/movie/now_playing?language=ko-KR&page=1`
    );

    if (isLoading) return <div>로딩중...</div>;
    if (isError) return <div>에러 발생...</div>;

    return <MovieList movies={data?.data?.results || []} />;
}

export default NowPlayingPage;
