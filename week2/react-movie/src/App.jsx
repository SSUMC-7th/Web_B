import { useState } from "react";
import moviesData from "./mocks/movies";
import MovieList from "./components/MovieList";
import "./App.css";

function App() {
  const [movieData, setMovieData] = useState(moviesData.results);
  console.log(movieData);
  return (
    <>
      <MovieList movies={movieData} />
    </>
  );
}

export default App;
