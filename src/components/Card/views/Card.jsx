import React from "react";
import classes from "./Card.module.css"; // Importa los estilos específicos de la tarjeta

const { contenedorRegistro, titulo } = classes;

const Card = ({ children, title }) => {
  return (
    <div className={contenedorRegistro}>
      <h2 className={titulo}>{title}</h2>
      {children}
    </div>
  );
};

export default Card;
