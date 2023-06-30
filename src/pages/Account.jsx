import React from "react";
import SavedShows from "../components/SavedShows";

const Account = () => {
  return (
    <>
      <div className="w-full text-white">
        <img
          className="w-full h-[400px] object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/530fc327-2ddb-4038-a3f0-2da2d9ccede1/f29fda98-a17f-4fb5-92ae-24fdc8d4332c/PH-en-20230619-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="netflix background"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-[550px]"></div>
        <div className="absolute top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">My Shows</h1>
        </div>
        <SavedShows />
      </div>
    </>
  );
};

export default Account;
