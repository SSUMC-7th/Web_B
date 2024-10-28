import styled from "styled-components";
import axios from 'axios';
import { React, useState, useEffect } from 'react';

const topratedplaying = () => {

    const [topmovies, settopMovies] = useState([])
    
    useEffect(() => {
        const getMovies = async () => {
            const topmovies = await axios.get('https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1', {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTJlNzM5Y2I5ZDkxNzQ3MmE5NTQzYzcwZDUxNzU5ZSIsIm5iZiI6MTcyODE0NzE3My42NzUzODgsInN1YiI6IjY2ZWJhMjg2OWJkNDI1MDQzMDc0NzBkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Dt4Gksw3Ix0KeghC3-KPVyYcfiQCRHa68sOl48Oo19g',
                }
            })
            settopMovies(topmovies.data)
        }
        getMovies()
    }, []);
    console.log(topmovies);

    return (
        <MovieList>
            {topmovies.results && topmovies.results.map(movie => (
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

export default topratedplaying;

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