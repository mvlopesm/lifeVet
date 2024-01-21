//Importações React
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Context/auth";

import "../styles/Login.css";
import Header from "../components/Header/Header";

const CriarConta = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const { setLogged } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios
        .post("http://localhost:8000/register", {
          name: name,
          email: email,
          password: password,
        })
        .then(() => {
          localStorage.setItem("logged", "S");
          setLogged(true);
          setSuccess("S");
        });
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
          <h2 className="h3 mb-3 mt-4 fw-normal">Criar conta</h2>

          <div className="mb-2 boxSizing">
            <input
              onChange={(e) => setName(e.target.value)}
              type="name"
              className="form-control"
              id="floatingName"
              placeholder="Nome"
            />
            <label htmlFor="floatingInput">E-mail</label>
          </div>

          <div className="mb-2 boxSizing">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="Email"
            />
            <label htmlFor="floatingInput">E-mail</label>
          </div>

          <div className="boxSizing mb-2">
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
            onClick={handleRegister}
            className="w-100 btn btn-lg btn-primary submitButton"
            type="button"
          >
            Criar Conta
          </button>

          {success === "N" ? (
            <div className="mt-2" style={{ color: "red" }} role="alert">
              Erro, entre em contato com o suporte.
            </div>
          ) : null}

          {success === "S" ? <Navigate to="/" /> : null}

          <div className="links">
            <Link to="/login" className="mx-2">
              Já tem uma conta ?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CriarConta;
