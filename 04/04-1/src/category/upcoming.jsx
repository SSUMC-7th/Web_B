import styled from "styled-components";
import useCustomFetch from "../hooks/useCustomFetch";
import { useNavigate } from "react-router-dom";

const Upcomingplaying = () => {
    const {data:movies, isLoading, isError} = useCustomFetch(`/upcoming?language=ko-KR`);
    const navigate = useNavigate();

    if (isLoading) {
        return <div>
            <StyledLoad>로딩 중 입니다.... 좀만 기다려줘잉</StyledLoad>
        </div>
    }

    if (isError) {
        return <div>
            <StyledError>에러 떴어요 비상비상!!!!!</StyledError>
        </div>
    }

    return (
        <MovieList>
            {movies.data?.results.map(movie => (
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
            ))}
        </MovieList>
    );
};

export default Upcomingplaying;

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

const StyledLoad = styled.h1`
    color: white;
`

const StyledError = styled.h1`
    color: white;
`