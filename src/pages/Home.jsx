import React, { useEffect, useState } from "react";
import Main from "../components/Main";
import requests from "../Requests";
import axios from "axios";
import AllMovies from "../components/AllMovies";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    // Fetch popular movies and set the state
    axios
      .get(requests.requestUpcoming)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // Select a random movie from the movies array if it's not null or empty
    if (movies && movies.length > 0) {
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      setSelectedMovie(randomMovie);
    }
  }, [movies]);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };
  return (
    <div>
      <div>
      {selectedMovie ? (
        <Main movies={selectedMovie} showWatchLaterButton={true} />
      ) : (
        <Main movies={null} />
      )}
      </div>
      <AllMovies
      onSelectMovie={handleSelectMovie}
       />
      
    </div>
  );
};

export default Home;
