import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieList from "../components/MovieList/MovieList";
import styled from "styled-components";

const MoviesPage = () => {
    const { category } = useParams();
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = await axios.get(getMoviesUrl(category), {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_APP_BEARER_TOKEN}`,
                    },
                });
                setMovies(response.data.results);
            } catch (error) {
                setError(error.response ? error.response.data : error.message);
            }
            setLoading(false);

        };

        fetchMovies();
    }, [category]);

    const getMoviesUrl = (category) => {
        return `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=1`;
    };

    if (loading) {
        return <Loading>Loading movies...</Loading>;
    }

    if (error) {
        return <Error>{`Error: ${error}`}</Error>;
    }

    return <MovieList movies={movies} />;
};

const Loading = styled.div`
  font-size: 20px;
  color: black;
  text-align: center;
  margin: 20px;
`;

const Error = styled.div`
  font-size: 20px;
  color: black;
  text-align: center;
  margin: 20px;
`;

export default MoviesPage;
