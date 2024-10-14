import styled from "styled-components";
import useCustomFetch from "../hooks/useCustomFetch";
import { useNavigate } from "react-router-dom";

const Nowplaying = () => {
    const {data:movies, isLoading, isError} = useCustomFetch(`/now_playing?language=ko-KR`);
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

export default Nowplaying;

const MovieList = styled.ul`
    display: flex; /* 수평으로 정렬 */
    flex-wrap: wrap; /* 화면 크기에 따라 줄바꿈 */
    list-style: none; /* 기본 ul 스타일 제거 */
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