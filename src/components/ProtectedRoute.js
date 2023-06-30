import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();

  if (!user.uid) {
    return <Navigate to="/netflix-react-js/" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
