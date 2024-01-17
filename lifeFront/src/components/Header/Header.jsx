//Importações React
import React from "react";
import { Link } from "react-router-dom";

//Importações Estilização
import imgLogo from "../../assets/logo.png";
import "./Header.css";

const Header = () => {
  return (
    <div className="navbar mt-0">
      <div className="container-fluid w-full">
        <div className="logo navbar-brand">
          <Link to="/">
            <img src={imgLogo} alt="" />
          </Link>
          <div className="navbar-links">
            <div className="">
              <Link className="nav-item active p-2" to="/">
                Home
              </Link>
            </div>
            <div>
              <Link className="nav-item active p-2" to="/cadastrarPaciente">
                Cadastrar
              </Link>
            </div>
            <div>
              <Link className="nav-item active p-2">Sair</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
