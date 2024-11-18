import styled from "styled-components";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useGetMovies } from "../hooks/queries/useGetMovies";
import CardListSkeleton from "../components/skeleton/cardListSkeleton";

const popularplaying = () => {
    const navigate = useNavigate();
    const [pageParam, setPageParam] = useState(1);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["popular", pageParam],
        queryFn: () => useGetMovies({ category: 'popular', pageParam }), 
        keepPreviousData: true,
    });

    const handleNextPage = () => {
        if (pageParam < data.total_pages) setPageParam(pageParam + 1);
    };

    const handlePreviousPage = () => {
        if (pageParam > 1) setPageParam(pageParam - 1);
    };

    if (isLoading) {
        return (
            <SkeletonList>
                <CardListSkeleton number={20} />
            </SkeletonList>
        );
    }

    if (isError) {
        return <StyledError>에러가 발생했습니다!</StyledError>;
    }

    return (
        <Container>
            <MovieList>
                {data.results.map((movie) => (
                    <MovieItem key={movie.id}>
                        <Movieimg
                            onClick={() => navigate(`/movie/${movie.id}`, {
                                state: { movieID: movie.id },
                            })}
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <MovieTitle>{movie.title}</MovieTitle>
                        <MovieDay>{movie.release_date}</MovieDay>
                    </MovieItem>
                ))}
            </MovieList>
            <PaginationContainer>
                <Button onClick={handlePreviousPage} disabled={pageParam === 1}>
                    이전
                </Button>

                <PageIndicator>{pageParam} 페이지</PageIndicator>

                <Button onClick={handleNextPage} disabled={pageParam === data.total_pages}>
                    다음
                </Button>
            </PaginationContainer>
        </Container>
    );
};

export default popularplaying;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

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
    &:hover {
        transform: scale(1.05);
        filter: brightness(0.5);
    }
`;

const StyledError = styled.h1`
    color: white;
`;

const SkeletonList = styled.div`
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 40px;
    padding: 0 20px;
    max-width: 100%;
    box-sizing: border-box;
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
`;

const Button = styled.button`
    background-color: #333;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 0 10px;
    &:disabled {
        background-color: #555;
        cursor: not-allowed;
    }
`;

const PageIndicator = styled.span`
    color: white;
    font-size: 16px;
`;
