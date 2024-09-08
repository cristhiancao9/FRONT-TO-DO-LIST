import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
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
} = classes;
function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // Marcar como no autenticado
    setTasks([]); // Limpiar las tareas
    navigate("/login");
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
      <a href="#" className={enlace}>
        <img src="/publicDir/logo.png" alt="logo principal" className={logo} />
      </a>
      <ul>
        {isLoggedIn ? (
          <>
            <li>
              <NavLink className={registrar} to="/register">
                Regístrate
              </NavLink>
            </li>
            <li>
              <NavLink className={iniciarSesion} to="/login">
                Inicia sesión
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <div className={contenedorSesion}>
              <button className={cerrarSesion} onClick={() => handleLogout()}>
                Cerrar sesíon
              </button>
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
