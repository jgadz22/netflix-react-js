import React, { useEffect, useState } from "react";
import Main from "../components/Main";
import Row from "../components/Row";
import requests from "../Requests";
import axios from "axios";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    // Fetch popular movies and set the state
    axios
      .get(requests.requestPopular)
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
      {selectedMovie ? (
        <Main movies={selectedMovie} />
      ) : (
        <Main movies={null} />
      )}

      <Row
        rowID="1"
        title="Upcoming"
        fetchURL={requests.requestUpcoming}
        onSelectMovie={handleSelectMovie}
      />
      <Row
        rowID="2"
        title="Popular"
        fetchURL={requests.requestPopular}
        onSelectMovie={handleSelectMovie}
      />
      <Row
        rowID="3"
        title="Trending"
        fetchURL={requests.requestTrending}
        onSelectMovie={handleSelectMovie}
      />
      <Row
        rowID="4"
        title="Top Rated"
        fetchURL={requests.requestTopRated}
        onSelectMovie={handleSelectMovie}
      />
      <Row
        rowID="5"
        title="Mystery"
        fetchURL={requests.requestMystery}
        onSelectMovie={handleSelectMovie}
      />
    </div>
  );
};

export default Home;
