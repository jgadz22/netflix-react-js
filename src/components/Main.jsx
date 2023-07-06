import React, { useCallback, useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import noImage from "../photos/No_Image.png";
import Youtube from "react-youtube";
import axios from "axios";

const Main = ({ movies, showWatchLaterButton }) => {
  // Receive showWatchLaterButton prop
  const [movie, setMovie] = useState(null);
  const { user } = UserAuth();
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  const fetchTrailerKey = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movies?.id}/videos?api_key=${process.env.REACT_APP_IMDB_API_KEY}`
      );
      const videos = response.data.results;
      
      const trailer = videos.find((video) => video.type === "Trailer");
      
      if (trailer) {
        setTrailerKey(trailer.key);
      }else {
        setTrailerKey(false);
      }
    } catch (error) {
      console.error("Error fetching trailer key:", error);
    }
  }, [movies]);

  useEffect(() => {
    const fetchData = async () => {
      setMovie(movies);
      if (movies?.id) {
        await fetchTrailerKey();
      }
    };

    fetchData();
  }, [movies, fetchTrailerKey]);

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const saveShow = async () => {
    if (user?.email) {
      try {
        const movieID = doc(db, "users", `${user?.email}`);
        await updateDoc(movieID, {
          savedShows: arrayUnion({
            id: movie?.id,
            title: movie?.title,
            img: movie?.backdrop_path,
          }),
        });
        alert("Movie saved to your account!");
      } catch (error) {
        console.error("Error saving show:", error);
      }
    } else {
      alert("Please sign in to save a movie!");
    }
  };

  const handlePlayButtonClick = () => {
    // Verify the origin of the window before showing the trailer
    if (window.location.origin === "http://localhost:3000" || window.location.origin === "https://jgadz22.github.io") {
      if (trailerKey) {
        setShowTrailer(true);
      } else {
        alert("This movie doesn't have a trailer.");
      }
    } else {
      console.log("Invalid origin. Trailer cannot be shown.");
    }
  };

  const renderTrailer = () => {
    if (!trailerKey) return null;

    return (
      <div className="flex justify-center items-center w-full h-full bg-black px-2 md:px-5 pt-5 flex-col">
        <Youtube
          className="w-[100%] h-[100%]"
          videoId={trailerKey}
          opts={{
            playerVars: {
              autoplay: 1,
              controls: 1,
              cc_load_policy: 1,
              fs: 1,
              iv_load_policy: 0,
              modestbranding: 0,
              rel: 0,
              showinfo: 0,
            },
            height: "100%",
            width: "100%",
          }}
          onReady={(event) => event.target.playVideo()}
        />
        <button
          onClick={() => setShowTrailer(false)}
          className="my-5 flex hover:text-black active:text-white hover:ease-in text-white px-2 md:px-6 py-2 mr-2 md:mr-4 text-xs md:text-xl bg-red-600 hover:bg-red-300 active:bg-red-900"
        >
          Close
        </button>
      </div>
    );
  };

  return (
    <div className="relative w-full h-[350px] md:h-[550px] text-white z-10 ">
      <div className="absolute top-0 left-0 z-20 w-full h-[350px] md:h-[550px]">
      <div className="absolute w-full h-[350px] md:h-[550px] bg-gradient-to-tr from-black"></div>
        {showTrailer && (
          <div className="flex absolute scrollbar-hide top-0 right-0 h-full w-[100%] z-[100]">
            {showTrailer && renderTrailer()}
          </div>
        )}
        <img
          className="w-full h-[350px] md:h-[550px] object-cover"
          src={
            movie?.backdrop_path
              ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
              : noImage
          }
          alt={movie?.title}
        />

        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-2xl md:text-5xl font-bold">{movie?.title}</h1>
          <div className="my-4">
            <button
              className="border bg-gray-300 text-black border-gray-300 py-2 px-5 hover:bg-transparent hover:text-white active:text-white active:bg-red-600"
              onClick={handlePlayButtonClick}
            >
              Play Trailer
            </button>
            {showWatchLaterButton && ( // Render watch later button based on showWatchLaterButton prop
              <button
                className="border bg-black/50 text-white border-gray-300 py-2 px-5 ml-4 hover:bg-gray-600 hover:text-black active:text-white active:bg-red-600"
                onClick={saveShow}
              >
                Watch Later
              </button>
            )}
          </div>
          <p className="text-gray-400 text-sm">
            Released: {movie?.release_date}
          </p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200 text-sm md:text-xl">
            {truncateString(movie?.overview, 150)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
