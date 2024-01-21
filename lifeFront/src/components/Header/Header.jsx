import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/auth";
import { useContext } from "react";

import imgLogo from "../../assets/logo.png";
import "./Header.css";

const Header = () => {
  const { setLogged } = useContext(AuthContext);

  const Logout = () => {
    setLogged(false);
    localStorage.removeItem("logged");
  };

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
              <Link className="nav-item active p-2" to="/exames">
                Exames
              </Link>
            </div>

            <div>
              <Link onClick={Logout} className="nav-item active p-2">
                Sair
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
