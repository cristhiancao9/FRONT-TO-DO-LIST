import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notify, notifyError } from "../../../utils/notify";
import Input from "../../../components/Input/Input";
import classes from "./Register.module.css";

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
const Register = () => {
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
        body: JSON.stringify({ email, password }),
      });
      console.log("response", response);
      if (response.ok) {
        const data = await response.json();
        notify(data?.message);
        navigate("/public/login");
        setDisabledBtn(false);
      } else {
        const data = await response.json();
        console.log("data", data);
        notifyError(data?.message);
        setError(data.message);
        setDisabledBtn(false);
      }
    } catch (error) {
      setDisabledBtn(false);
      setError("Error de red");
    }
  };

  return (
    <div className={contenedorRegistro}>
      <h2 className={titulo}>Sign Up</h2>
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
          REGISTRAR
        </button>
      </form>
    </div>
  );
};

export default Register;
