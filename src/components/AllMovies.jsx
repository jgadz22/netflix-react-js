import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Row from "./Row";
import requests from "../Requests";
import Movie from "./Movie";

const AllMovies = ({ fetchURL, onSelectMovie }) => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchError, setSearchError] = useState(false); 

  const fetchMovies = useCallback(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_IMDB_API_KEY}&query=${search}&page=1&include_adult=false`
      )
      .then((response) => {
        const filteredMovies = response.data.results.filter(
          (movie) => movie.backdrop_path !== null
        );
        setMovies(filteredMovies);
        setSearchError(filteredMovies.length === 0); 
      })
      .catch((error) => {
        console.log(error);
        setSearchError(true);
      });
  }, [search]);

  const onSubmitX = (e) => {
    e.preventDefault();
    setSearch("");
    setMovies([]);
    setSearchError(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetchMovies();
  };

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <>
      <div>
        <div className="flex justify-between border border-transparent border-t-gray-700 border-t-4 mt-10 md:mt-20 mx-4 pt-4">
          <h2 className="flex text-white justify-center items-center text-left font-bold text-xl md:text-3xl mr-2">
            Movie
          </h2>
          <form className="flex justify-between">
            <label className="flex justify-center items-center text-white md:mr-5 p-2 md:px-3 text-md md:text-xl">
              Search:
            </label>
            <div className="flex justify-between bg-gray-900 text-gray-500 focus:text-white border border-gray-800 px-2 md:px-2 hover:border-gray-400 border-r-transparent">
              <input
                type="text"
                placeholder="Search Movie"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    onSubmit(e);
                  }
                }}
                className="bg-gray-900 text-white border text-sm md:text-xl border-none focus:outline-none"
              />{ search ?
              <button
                onClick={onSubmitX}
                className="flex justify-center items-center text-center text-sm md:text-xl bg-gray-900 text-white p-2 md:px-3 hover:bg-gray-700 rounded-full"
              >
                X
              </button>
              : null}
            </div>
          </form>
        </div>
        <div>
          {search === "" ? (
            <div>
              <Row
                rowID="1"
                title="Upcoming"
                fetchURL={requests.requestUpcoming}
                onSelectMovie={onSelectMovie}
              />
              <Row
                rowID="2"
                title="Popular"
                fetchURL={requests.requestPopular}
                onSelectMovie={onSelectMovie}
              />
              <Row
                rowID="3"
                title="Top Rated"
                fetchURL={requests.requestTopRated}
                onSelectMovie={onSelectMovie}
              />
              <Row
                rowID="4"
                title="Mystery"
                fetchURL={requests.requestMystery}
                onSelectMovie={onSelectMovie}
              />
              <Row
                rowID="5"
                title="Latest"
                fetchURL={requests.requestAllMovies}
                onSelectMovie={onSelectMovie}
              />
            </div>
          ) : null}
          {movies.length > 0 ? (
            <div className="flex justify-center items-center flex-wrap m-5">
              {movies.map((item, id) => (
                <Movie key={id} item={item} onSelectMovie={onSelectMovie} />
              ))}
            </div>
          ) : searchError && search !== "" ? (
            <p className="flex justify-center items-center text-center text-red-500 text-xl md:text-4xl my-10 md:my-20">No movies found.</p>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default AllMovies;
