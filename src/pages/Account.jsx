import React, { useEffect, useState } from "react";
import SavedShows from "../components/SavedShows";
import Main from "../components/Main";
import axios from "axios";

const Account = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [showWatchLaterButton, setShowWatchLaterButton] = useState(false); // New state variable

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      if (selectedMovie) {
        const movieDetails = await getMovieDetails(selectedMovie.id);
        const updatedMovies = [{...movieDetails }];
        setMovies(updatedMovies['0']);
        setShowWatchLaterButton(false); // Hide the button when a movie is selected
      }
    };
  
    fetchMovies();
  }, [selectedMovie]);

  const getMovieDetails = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_IMDB_API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return null;
    }
  };
  
  return (
    <>
      <div className="w-full text-white">
        {selectedMovie ? (
          <Main movies={movies} showWatchLaterButton={false} />
        ) : (
          <div className="w-full h-[550px]">
            <img
              className="w-full h-[550px] object-cover"
              src="https://assets.nflxext.com/ffe/siteui/vlv3/530fc327-2ddb-4038-a3f0-2da2d9ccede1/f29fda98-a17f-4fb5-92ae-24fdc8d4332c/PH-en-20230619-popsignuptwoweeks-perspective_alpha_website_large.jpg"
              alt="netflix background"
            />
            <div className="bg-black/60 fixed top-0 left-0 w-full h-[550px]"></div>
            <div className="absolute top-[25%] p-4 md:p-8">
              <h1 className="text-3xl md:text-5xl font-bold">My Shows</h1>
            </div>
          </div>
        )}
        <SavedShows onSelectMovie={handleSelectMovie} />
      </div>
    </>
  );
};

export default Account;
