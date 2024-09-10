import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../../components/Card/views/Card";
import Input from "../../../components/Input/Input";
import classes from "./Register.module.css";
import { notify, notifyError } from "../../../utils/notify";

const {
  contenedorForm,
  contenedorInput,
  nombreInput,
  contenedorSecundarioInput,
  styleInput,
  required,
  btnEnviar,
  contenedorBtns,
} = classes;
const API_URL = import.meta.env.VITE_API_URL;
const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabledBtn(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, lastName, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        notify(data.message);
        navigate("/public/login");
        setDisabledBtn(false);
      } else {
        notifyError(data.message);
        setError(data.message || "Error al registrarse");
        setDisabledBtn(false);
      }
    } catch (error) {
      setError("Error al registrarse");
      setDisabledBtn(false);
    }
  };
  const handleLoginRedirect = () => {
    navigate("/public/login");
  };
  return (
    <Card title="Registro de usuario">
      {error && <p>{error}</p>}
      <form className={contenedorForm} onSubmit={handleSubmit}>
        <div className={contenedorInput}>
          <p className={`${nombreInput} && ${required}`}>Nombres</p>
          <div className={contenedorSecundarioInput}>
            <Input
              className={styleInput}
              value={name}
              name="name"
              id="name"
              type="text"
              placeholder="Nombres"
              onChange={(e) => setName(e.target.value)}
              minLength="3"
              maxLength="20"
              title="Introduzca un nombre válido"
              required
            />
          </div>
        </div>
        <div className={contenedorInput}>
          <p className={`${nombreInput} && ${required}`}>Apellidos</p>
          <div className={contenedorSecundarioInput}>
            <Input
              className={styleInput}
              value={lastName}
              name="lastName"
              id="lastName"
              type="text"
              placeholder="Apellidos"
              onChange={(e) => setLastName(e.target.value)}
              minLength="3"
              maxLength="20"
              title="Introduzca un apellido válido"
              required
            />
          </div>
        </div>
        <div className={contenedorInput}>
          <p className={`${nombreInput} && ${required}`}>Correo electrónico</p>
          <div className={contenedorSecundarioInput}>
            <Input
              className={styleInput}
              value={email}
              name="email"
              id="email"
              type="email"
              placeholder="Correo electrónico"
              onChange={(e) => setEmail(e.target.value)}
              minLength="9"
              maxLength="50"
              title="Introduzca un correo válido"
              required
            />
          </div>
        </div>
        <div className={contenedorInput}>
          <p className={`${nombreInput} && ${required}`}>Contraseña</p>
          <div className={contenedorSecundarioInput}>
            <Input
              className={styleInput}
              value={password}
              name="password"
              id="password"
              type="password"
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
              minLength="9"
              maxLength="15"
              title="Introduzca una contraseña válida"
              required
            />
          </div>
        </div>
        <div className={contenedorBtns}>
          <button disabled={disabledBtn} className={btnEnviar} type="submit">
            Registrar
          </button>
          <button
            disabled={disabledBtn}
            className={btnEnviar}
            onClick={handleLoginRedirect}
          >
            Iniciar sesión
          </button>
        </div>
      </form>
    </Card>
  );
};

export default Register;
