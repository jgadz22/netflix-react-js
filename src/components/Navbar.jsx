import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 z-[100] w-full absolute">
      <Link to="/">
        <h1 className="text-red-600 text-4xl font-extrabold cursor-pointer">
          NETFLIX
        </h1>
      </Link>
      {user?.email ? (
        <div>
          <Link to="/account">
            <button className=" text-white px-2 md:px-6 py-2 mr-2 md:mr-4 text-xs rounded md:text-base border border-red-600 hover:bg-red-600 active:bg-gray-300 active:text-black">Account</button>
          </Link>
            <button onClick={handleLogout} className="px-2 md:px-6 py-2 text-xs md:text-base bg-red-600 rounded cursor-pointer text-white">
              Logout
            </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="text-white px-2 md:px-6 py-2 mr-2 md:mr-4 text-xs md:text-base border border-red-600 hover:bg-red-600 active:bg-gray-300 active:text-black rounded">Sign In</button>
          </Link>
          <Link to="/signup">
            <button className="px-2 md:px-6 py-2 text-xs md:text-base bg-red-600 rounded cursor-pointer text-white">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
