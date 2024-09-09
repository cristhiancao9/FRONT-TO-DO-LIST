import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../../components/Card/views/Card";
import Input from "../../../components/Input/Input";
import { notify, notifyError } from "../../../utils/notify";
import classes from "./Register.module.css";

const {
  contenedorForm,
  contenedorInput,
  nombreInput,
  contenedorSecundarioInput,
  styleInput,
  required,
  contenedorBtns,
  btnEnviar,
} = classes;

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
    setError("");
    setDisabledBtn(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, lastName, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        notify(data?.message || "Registro exitoso");
        navigate("/public/login");
      } else {
        notifyError(data?.message || "Error desconocido");
        setError(data.message || "Error desconocido");
      }
    } catch (error) {
      notifyError(error.message || "Error de red");
      setError(error.message || "Error de red");
    } finally {
      setDisabledBtn(false);
    }
  };

  return (
    <Card title="Registro de usuario">
      <form className={contenedorForm} onSubmit={handleSubmit}>
        <div className={contenedorInput}>
          <p className={`${nombreInput} && ${required}`}>Nombres</p>
          <div className={contenedorSecundarioInput}>
            <Input
              className={styleInput}
              autocomplete="none"
              value={name}
              name="name"
              id="name"
              minLength="3"
              maxLength="20"
              type="text"
              placeholder="Nombres"
              onChange={(e) => setName(e.target.value)}
              required
              title="Introduzca un nombre válido"
            />
          </div>
        </div>
        <div className={contenedorInput}>
          <p className={`${nombreInput} && ${required}`}>Apellidos</p>
          <div className={contenedorSecundarioInput}>
            <Input
              className={styleInput}
              value={lastName}
              autocomplete="none"
              name="lastName"
              id="lastName"
              minLength="3"
              maxLength="20"
              type="text"
              placeholder="Apellidos"
              onChange={(e) => setLastName(e.target.value)}
              required
              title="Introduzca un apellido válido"
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
              minLength="9"
              maxLength="50"
              type="email"
              placeholder="Correo electrónico"
              onChange={(e) => setEmail(e.target.value)}
              required
              title="Introduzca un correo válido"
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
              minLength="9"
              maxLength="15"
              type="password"
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
              required
              title="Introduzca una contraseña válida"
            />
          </div>
        </div>
        <div className={contenedorBtns}>
          <button disabled={disabledBtn} className={btnEnviar} type="submit">
            Registrar
          </button>
        </div>
      </form>
    </Card>
  );
};

export default Register;
