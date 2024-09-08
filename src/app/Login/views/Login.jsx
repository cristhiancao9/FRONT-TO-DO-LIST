import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../../components/Card/views/Card";
import Input from "../../../components/Input/Input";
import { notify, notifyError } from "../../../utils/notify";
import classes from "./Login.module.css";

const {
  contenedorForm,
  contenedorInput,
  nombreInput,
  contenedorSecundarioInput,
  styleInput,
  required,
  btnEnviar,
} = classes;

const Login = () => {
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
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); 
      console.log(data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/tasks");
        fetchUserData();
      } else {
        // Si el response no es ok, notificar el error que vino en el body
        notifyError(data?.message || "Error desconocido");
        setError(data.message || "Error desconocido");
      }
    } catch (error) {
      // Aquí se maneja cualquier error, incluidos los errores de red
      notifyError(error.message || "Error de red");
      setError(error.message || "Error de red");
    } finally {
      setDisabledBtn(false);
    }
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/auth/user", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    const data = await response.json();
    console.log("Datos del usuario:", data);
  };
  return (
    <Card title="Login">
      {error && <p>{error}</p>}
      <form className={contenedorForm} onSubmit={handleSubmit}>
        <div className={contenedorInput}>
          <p className={`${nombreInput} && ${required}`}>e-mail</p>
          <div className={contenedorSecundarioInput}>
            <Input
              className={styleInput}
              value={email}
              name="email"
              id="email"
              minLength="9"
              maxLength="50"
              type="email"
              placeholder="e-mail"
              onChange={(e) => setEmail(e.target.value)}
              required
              title="Enter only valid email"
            />
          </div>
        </div>
        <div className={contenedorInput}>
          <p className={`${nombreInput} && ${required}`}>Password</p>
          <div className={contenedorSecundarioInput}>
            <Input
              className={styleInput}
              value={password}
              name="password"
              id="password"
              minLength="9"
              maxLength="15"
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              title="Enter only valid password"
            />
          </div>
        </div>
        <button disabled={disabledBtn} className={btnEnviar} type="submit">
          Login
        </button>
      </form>
    </Card>
  );
};

export default Login;
