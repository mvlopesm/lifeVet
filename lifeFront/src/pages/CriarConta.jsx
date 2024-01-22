// Importações React
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { axiosInstance } from "../api";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    // Validar o nome
    const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;
    if (name.length < 3 || !nameRegex.test(name)) {
      setError(
        "O nome deve ter pelo menos 3 caracteres e pode conter apenas letras e espaços."
      );
      return;
    }

    // Validar o email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, insira um email válido.");
      return;
    }

    // Validar a senha
    if (password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance().post("/register", {
        name: name,
        email: email,
        password: password,
      });

      localStorage.setItem("logged", "S");
      setLogged(true);
      setSuccess("S");
      setLoading(false);
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 422) {
        // Verifica se a mensagem do erro é específica de "already taken"
        if (
          error.response.data.message === "The email has already been taken."
        ) {
          setError("Este email já está cadastrado.");
        } else {
          setError("Ocorreu um erro. Por favor, tente novamente.");
        }
      } else {
        setError("Ocorreu um erro. Por favor, tente novamente.");
      }

      setSuccess("N");
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="d-flex align-itens-center text-center form-container container-register">
        <form className="form-signin content">
          <h2 className="h3 mb-3 mt-3 fw-normal">Criar conta</h2>

          <div className="mb-2 boxSizing">
            <input
              onChange={(e) => setName(e.target.value)}
              type="name"
              className="form-control"
              id="floatingName"
              placeholder="Nome"
            />
            <label htmlFor="floatingName">Nome</label>
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

          {error && (
            <div className="mt-2" style={{ color: "red" }}>
              {error}
            </div>
          )}

          {success === "S" ? <Navigate to="/" /> : null}

          <div className="links">
            <Link to="/login" className="mx-2">
              Já tem uma conta?
            </Link>
          </div>
        </form>
      </div>
      {loading && (
        <div className="d-flex justify-content-center mt-2">
          <div className="spinner-border w-[1000px]" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CriarConta;
