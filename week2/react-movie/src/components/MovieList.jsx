import React, { useState } from "react";

function MovieList({ movies }) {
  return (
    <div className="movies-container">
      {movies.map((movie) => (
        <div className="movie-container" key={movie.id}>
          <img
            className="movie-poster"
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          />
        </div>
      ))}
    </div>
  );
}

export default MovieList;
