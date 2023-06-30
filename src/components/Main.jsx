import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import noImage from "../photos/No_Image.png";


const Main = ({ movies }) => {
  const [movie, setMovie] = useState(null);
  const { user } = UserAuth();

  useEffect(() => {
    setMovie(movies);
  }, [movies]);

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
        console.log(error);
      }
    } else {
      alert("Please sign in to save a movie!");
    }
  };

  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-cover"
          src={
            movie?.backdrop_path
              ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
              : noImage
          }
          alt={movie?.title}
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
          <div className="my-4">
            <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5 hover:bg-transparent hover:text-white active:text-white active:bg-red-600">
              Play
            </button>
            <button
              className="border text-white border-gray-300 py-2 px-5 ml-4 hover:bg-gray-300 hover:text-black active:text-white active:bg-red-600"
              onClick={saveShow}
            >
              Watch Later
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            Released: {movie?.release_date}
          </p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
            {truncateString(movie?.overview, 150)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
