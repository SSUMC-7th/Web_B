import MovieList from "../../components/MovieList/MovieList";
import useInfinityQuery from "../../hooks/useInfiniteQuery";
import LoadingSpinner from "../../styles/SkeletonUI";

function NowPlayingPage() {
    const {
        data,
        isLoading,
        isError,
        isFetchingNextPage,
        bottomRef,
    } = useInfinityQuery("/movie/now_playing");


    if (isLoading) return <LoadingSpinner isLoading={isLoading} />
    if (isError) return <div>에러 발생...</div>;

    return (
        <div>
            <MovieList movies={data.pages.flatMap(page => page.results) || []} />
            {isFetchingNextPage && <LoadingSpinner isLoading={isFetchingNextPage} />}
            <div ref={bottomRef} />
        </div>
    );
}

export default NowPlayingPage;
