// App.js or MainPage.js (your main component)
import React from 'react';
import { MOVIES } from './mocks/movies'; // Adjust the path to where your movies.js is located
import './App.css'

function App() {
  return (
    <div>
      <ul>
        {MOVIES.results.map(movie => (
          <span key={movie.id} className="img-dec">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="img-list"
            />
          </span>
        ))}
      </ul>
    </div>
  );
}

export default App;
