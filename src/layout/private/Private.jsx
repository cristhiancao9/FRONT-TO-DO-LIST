import React from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return (
    <>
      <Navbar />
      {token ? children : <Navigate to="/public/login" />}
    </>
  );
};

export default PrivateRoute;
