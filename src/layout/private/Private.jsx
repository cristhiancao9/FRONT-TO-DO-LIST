import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import classes from "./Private.module.css";
const { contenedorPrincipalPrivate, contenedorOutlet } = classes;
const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  return (
    <div className={contenedorPrincipalPrivate}>
      <Navbar />
      {token ? (
        <div className={contenedorOutlet}>
          <Outlet />
        </div>
      ) : (
        <Navigate to="/public/login" />
      )}
    </div>
  );
};

export default PrivateRoute;
