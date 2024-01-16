//Importações React
import React from "react";
import { Link } from "react-router-dom";

//Importações Estilização
import imgLogo from "../../assets/logo.png";
import "./Header.css";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="logo navbar-brand">
          <Link to="/">
            <img src={imgLogo} alt="" className="testeTeste" />
          </Link>
          <button
            className="navbar-toggler menu-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item item-navigation mb-2 mt-2">
              {" "}
              <Link className="active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item item-navigation mb-2 mt-2">
              <Link className="active" to="/cadastrarFuncionario">
                Cadastrar Funcionário
              </Link>{" "}
            </li>
            <li className="nav-item item-navigation mb-2 mt-2">
              <a className="logout active" onClick={console.log("")}>
                Sair
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
