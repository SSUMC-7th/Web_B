import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom'
import styled from 'styled-components';

const MovieList = () => {
    const { category } = useParams();
    const [movies, setMovies] = useState([]);
    const defaultCategory = 'now-playing';

    useEffect(() => {
        const fetchMovies = async () => {
            const currentCategory = category || defaultCategory;
            try {
                const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${currentCategory}?language=ko&page=1&region=KR`, {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_APP_BEARER_TOKEN}`,
                    }
                });
                setMovies(data.results);
            } catch (error) {
                console.error("데이터 가져오기 실패", error);
            }
        };

        fetchMovies();
    }, [category]);


    return (
        <Container>
            {movies?.map((movie) => (
                <Cards key={movie.id}>
                    <Image
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={movie.title}
                    />
                    <Title>{movie.title}</Title>
                    <Date>{movie.release_date}</Date>
                </Cards>
            ))}
        </Container>
    );
}

export default MovieList;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
`
const Cards = styled.div`
    width: 150px;
    height: auto;
    cursor: pointer;

`;
const Image = styled.img`
    width: 100%;
    height: 70%;
    object-fit: cover;
    border-radius: 5px;
`;

const Title = styled.div`
    font-weight: bold;
    font-size: 15px;
    margin-top: 10px;
    text-align: center;
`;

const Date = styled.div`
    font-size: 12px;
    text-align: center;
    margin-top: 2px;
`;