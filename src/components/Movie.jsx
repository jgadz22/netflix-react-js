import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import noImage from "../photos/No_Image.png";

const Movie = ({ item, onSelectMovie }) => {
  const [like, setLike] = useState(false);
  const { user } = UserAuth();
  const [saved, setSaved] = useState(false);

  const movieID = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      try {
        setLike(!like);
        setSaved(true);
        await updateDoc(movieID, {
          savedShows: arrayUnion({
            id: item.id,
            title: item.title,
            img: item.backdrop_path,
          }),
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please sign in to save a movie!");
    }
  };

  const deleteShow = async (passedID) => {
    try {
      await updateDoc(movieID, {
        savedShows: item.filter((item) => item.id !== passedID),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeSavedShow = async () => {
    if (user?.email) {
      try {
        setLike(false);
        setSaved(false);
        deleteShow(item.id);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please sign in to remove a saved movie!");
    }
  };

  const handleClick = () => {
    onSelectMovie(item);
  };

  return (
    <div
      className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
      onClick={handleClick}
    >
      <img
        className="w-full h-[160px] block object-contain"
        src={
          item?.backdrop_path
            ? `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`
            : noImage
        }
        alt={item?.title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p
          className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center overflow-hidden"
          style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
        >
          {item?.title}
        </p>
        <p onClick={saveShow}>
          {saved ? (
            <FaHeart
              className="absolute top-4 left-4 text-red-500"
              onClick={removeSavedShow}
            />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
          )}
        </p>
      </div>
    </div>
  );
};

export default Movie;
