import React from 'react';
import { MOVIES } from '../mocks/movies';

const MovieList = () => {
    return (
        <div>
            {MOVIES.results.map(movie => (
                <span key={movie.id}>
                    <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        className="poster"
                    />
                </span>
            ))}
        </div>
    );
};

export default MovieList;
