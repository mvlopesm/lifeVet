import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/auth";
import { useContext } from "react";

import imgLogo from "../../assets/logo.png";
import "./Header.css";

const Header = () => {
  const { setLogged } = useContext(AuthContext);
  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState("");

  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location.pathname]);

  const Logout = () => {
    setLogged(false);
    localStorage.removeItem("logged");
  };

  const getNavItemClass = (path) => {
    return `nav-item ${currentRoute === path ? "nav-item-selected" : ""}`;
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
              <Link className={getNavItemClass("/")} to="/">
                HOME
              </Link>
            </div>

            <div>
              <Link
                className={getNavItemClass("/cadastrarPaciente")}
                to="/cadastrarPaciente"
              >
                CADASTRAR
              </Link>
            </div>

            <div>
              <Link className={getNavItemClass("/exames")} to="/exames">
                EXAMES
              </Link>
            </div>

            <div>
              <Link
                onClick={Logout}
                className={getNavItemClass("/sair")}
                to="/login"
              >
                SAIR
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
