import React, { useEffect, useState } from "react";
import Main from "../components/Main";
import Row from "../components/Row";
import requests from "../Requests";
import axios from "axios";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch popular movies and set the state
    axios.get(requests.requestPopular)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      {movies.length > 0 && <Main movies={movies} />}
      <Row rowID='1' title="Upcoming" fetchURL={requests.requestUpcoming} />
      <Row rowID='2' title="Popular" fetchURL={requests.requestPopular} />
      <Row rowID='3' title="Trending" fetchURL={requests.requestTrending} />
      <Row rowID='4' title="Top Rated" fetchURL={requests.requestTopRated} />
      <Row rowID='5' title="Horror" fetchURL={requests.requestHorror} />
    </div>
  );
};

export default Home;
