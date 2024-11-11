import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CardListSkeleton  from "../components/skeleton/cardListSkeleton"
import { useGetInfiniteMovies } from "../hooks/queries/useGetInfiniteMovies";
import { useInView } from "react-intersection-observer"
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader"

const popularplaying = () => {
    const navigate = useNavigate();

    const {
        data: movies, 
        isFetching, 
        hasNextPage, 
        isPending, 
        fetchNextPage, 
        isError, 
    } = useGetInfiniteMovies('popular')

    const {ref, inView} = useInView({
        threshold: 0,
    })

    useEffect(() => {
        if(inView) {
            !isFetching && hasNextPage && fetchNextPage();
        }
    }), [inView, isFetching, hasNextPage, fetchNextPage]

    if (isPending) {
        return (
            <SkeletonList>
                <CardListSkeleton number={20}/>
            </SkeletonList>
        )
    }

    if (isError) {
        return <div>
            <StyledError>에러 떴어요 비상비상!!!!!</StyledError>
        </div>
    }

    return (
        <>
            <MovieList>
                {movies?.pages.map((page) => (
                    page.results.map(movie => (
                        <MovieItem key={movie.id}>
                            <Movieimg
                                onClick={() => navigate(`/movie/:${movie.id}`,{
                                replace: false,
                                state: {movieID: movie.id}
                            })}
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title} 
                            />
                            <MovieTitle>{movie.title}</MovieTitle>
                            <MovieDay>{movie.release_date}</MovieDay>
                        </MovieItem>
                    ))
                ))}
                {!isFetching && <CardListSkeleton number={10}/>}
            </MovieList>
            <div ref = {ref} style ={{marginTop: '50px', display: 'flex', justifyContent: 'center', width: '100%'}}>
                {!isFetching && <ClipLoader color={'#fff'}/>}
            </div>
        </>
    );
};

export default popularplaying;

const MovieList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 0;
`;

const MovieItem = styled.li`
    margin: 10px;
    text-align: center;
`;

const MovieTitle = styled.h3`
    color: white;
    margin-top: 10px;
`;

const MovieDay = styled.div`
    color: gray;
    margin-top: 5px;
`;

const Movieimg = styled.img`
    border-radius: 12px;
    transition: transform 0.2s ease-in-out;
    &:hover{
        transform: scale(1.05);
        filter: brightness(0.5);
    }    
`;

const StyledError = styled.h1`
    color: white;
`

const SkeletonList = styled.div`
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 40px;
    padding: 0 20px;
    max-width: 100%;
    box-sizing: border-box;
`;