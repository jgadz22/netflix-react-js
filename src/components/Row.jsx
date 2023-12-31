import axios from "axios";
import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Row = ({ rowID, title, fetchURL, onSelectMovie  }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(fetchURL)
      .then((response) => {
        const filteredMovies = response.data.results.filter((movie) => movie.backdrop_path !== null);
        setMovies(filteredMovies);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [fetchURL]);

  const slideLeft = () => {
    let slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    let slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          size={40}
          className="left-0 bg-white rounded-full absolute opacity-50 hover:opacity-100 z-10 cursor-pointer hidden group-hover:block"
        />
        <div
          id={"slider" + rowID}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, id) => (
            <Movie key={id} item={item} onSelectMovie={onSelectMovie} />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          size={40}
          className="right-0 bg-white rounded-full absolute opacity-50 hover:opacity-100 z-10 cursor-pointer hidden group-hover:block"
        />
      </div>
    </>
  );
};

export default Row;
