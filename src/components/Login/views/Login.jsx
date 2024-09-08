import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Input/Input";
import classes from "./Login.module.css";
const {
  contenedorRegistro,
  contenedorForm,
  titulo,
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

      if (response.ok) {
        // Guardar el token en localStorage
        localStorage.setItem("token", data.token);
        navigate("/tasks");
        setDisabledBtn(false);
      } else {
        setError(data.message);
        setDisabledBtn(false);
      }
    } catch (error) {
      setDisabledBtn(false);
      setError("Error de red");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form className={contenedorForm} onSubmit={handleSubmit}>
        <div className={contenedorInput}>
          <p className={`${nombreInput} && ${required}`}>e-mail</p>
          <div className={contenedorSecundarioInput}>
            <Input
              className={styleInput}
              value={email}
              // autoComplete="none"
              name="email"
              id="email"
              minLength={"9"}
              maxLength="50"
              type="email"
              placeholder="e-mail"
              onChange={(e) => setEmail(e.target.value)}
              onInvalid={(e) => e.target.setCustomValidity("Add e-mail")}
              onInput={(e) => e.target.setCustomValidity("")}
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
              // autoComplete="none"
              name="password"
              id="password"
              minLength={"9"}
              maxLength="15"
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              onInvalid={(e) => e.target.setCustomValidity("Add password")}
              onInput={(e) => e.target.setCustomValidity("")}
              required
              title="Enter only valid password"
            />
          </div>
        </div>
        <button disabled={disabledBtn} className={btnEnviar} type="submit">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
