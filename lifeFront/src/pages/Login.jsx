//Importações React
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/auth";
import { useContext } from "react";

import "../styles/Login.css";
import Header from "../components/Header/Header";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const { setLogged } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios
        .post("http://localhost:8000/login", {
          email: email,
          password: password,
        })
        .then(() => {
          localStorage.setItem("logged", "S");
          setLogged(true);
          setSuccess("S");
        });

      setSuccess("S");
    } catch (e) {
      console.log(e);
      setSuccess("N");
    }
  };

  return (
    <div>
      <Header />
      <div className="d-flex align-itens-center text-center form-container">
        <form className="form-signin content">
          <h2 className="h3 mb-4 mt-4 fw-normal">Login</h2>

          <div className="mb-3 boxSizing">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="Email"
            />
            <label htmlFor="floatingInput">E-mail</label>
          </div>

          <div className="boxSizing mb-3">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Senha"
            />
            <label htmlFor="floatingPassword">Senha</label>
          </div>

          <button
            onClick={handleLogin}
            className="w-100 btn btn-lg btn-primary submitButton"
            type="button"
          >
            Acessar
          </button>

          {success === "N" ? (
            <div className="mt-3" style={{ color: "red" }} role="alert">
              Email ou senha inválida
            </div>
          ) : null}

          {success === "S" ? <Navigate to="/" /> : null}

          <div className="links">
            <Link to="criarConta" className="mx-3">
              Criar uma conta
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
