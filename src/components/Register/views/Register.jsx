import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Register.module.css";

const { contenedorRegistro, contenedorForm, titulo } = classes;
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      setError("Error de red");
    }
  };

  return (
    <div className={contenedorRegistro}>
      <h2 className={titulo}>Sign Up</h2>
      {error && <p>{error}</p>}
      <form className={contenedorForm} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
