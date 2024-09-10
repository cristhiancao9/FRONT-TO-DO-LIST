import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./NavBar.module.css";
const {
  checkbtn,
  checkBox,
  hamburger,
  bar,
  enlace,
  contenedorSesion,
  cerrarSesion,
  iniciarSesion,
  registrar,
  logo,
  fixedNavbar,
  nombreUser,
} = classes;
const API_URL = import.meta.env.VITE_API_URL;
function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData();
      setIsLoggedIn(true);
    }
  }, []);
  const fetchUserData = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/auth/user`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    const data = await response.json();
    setUser(
      data?.name && data?.lastName ? `${data.name} ${data.lastName}` : "Usuario"
    );
    // console.log("Datos del nav:", data);
  };
  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // Marcar como no autenticado

    navigate("/public/login");
  };
  return (
    <nav className={isLoggedIn ? fixedNavbar : fixedNavbar}>
      <input type="checkbox" id="check" className={checkBox} />
      <label htmlFor="check" className={checkbtn}>
        <div className={hamburger}>
          <div className={bar}></div>
          <div className={bar}></div>
          <div className={bar}></div>
        </div>
      </label>
      <div className={enlace}>
        <img src="/publicDir/logo.png" alt="logo principal" className={logo} />
        <label htmlFor=""> QuickTasks</label>
      </div>
      <ul>
        {isLoggedIn ? (
          <>
            <label className={nombreUser}>{user}</label>
            <li>
              <button className={cerrarSesion} onClick={() => handleLogout()}>
                Cerrar sesíon
              </button>
            </li>
          </>
        ) : (
          ""
          // <li>
          //   <div className={contenedorSesion}>
          //     <button className={cerrarSesion} onClick={() => handleLogout()}>
          //       Cerrar sesíon
          //     </button>
          //   </div>
          // </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
