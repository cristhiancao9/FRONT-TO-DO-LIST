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
    <Card title="Sign Up">
      <form className={contenedorForm} onSubmit={handleSubmit}>
        <div className={contenedorInput}>
          <p className={`${nombreInput} && ${required}`}>Name</p>
          <div className={contenedorSecundarioInput}>
            <Input
              className={styleInput}
              value={name}
              name="name"
              id="name"
              minLength="3"
              maxLength="20"
              type="text"
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
              required
              title="Enter only valid name"
            />
          </div>
        </div>
        <div className={contenedorInput}>
          <p className={`${nombreInput} && ${required}`}>last Name</p>
          <div className={contenedorSecundarioInput}>
            <Input
              className={styleInput}
              value={lastName}
              name="lastName"
              id="lastName"
              minLength="3"
              maxLength="20"
              type="text"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              required
              title="Enter only valid lastName"
            />
          </div>
        </div>
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
        <div className={contenedorBtns}>
          <button disabled={disabledBtn} className={btnEnviar} type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </Card>
  );
};

export default Register;
