import styled from "styled-components";
import axios from 'axios';
import { useState, useEffect } from 'react';

const Nowplaying = () => {
    const [npmovies, setnpMovies] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const npmovies = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1`, {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTJlNzM5Y2I5ZDkxNzQ3MmE5NTQzYzcwZDUxNzU5ZSIsIm5iZiI6MTcyODE0NzE3My42NzUzODgsInN1YiI6IjY2ZWJhMjg2OWJkNDI1MDQzMDc0NzBkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Dt4Gksw3Ix0KeghC3-KPVyYcfiQCRHa68sOl48Oo19g',
                }
            });
            setnpMovies(npmovies.data);
        };
        getMovies();
    }, []);

    return (
        <MovieList>
            {npmovies.results && npmovies.results.map(movie => (
                <MovieItem key={movie.id}>
                    <Movieimg
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