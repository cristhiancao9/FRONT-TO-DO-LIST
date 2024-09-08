import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

import classes from "./Public.module.css";

const { contenedorPrincipalPublic, contenedorOutlet } = classes;
const Public = () => {
  return (
    <div className={contenedorPrincipalPublic}>
      <Navbar />
      <div className={contenedorOutlet}>
        <Outlet />
      </div>
    </div>
  );
};

export default Public;
