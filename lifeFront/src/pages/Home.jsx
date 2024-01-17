//Importações React
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getAnimals from "../api.js";

//Importações Estilização
import Header from "../components/Header/Header";
import ListaAnimals from "../components/ListaAnimals/ListaAnimals";
import "../styles/home.css";
import { AiOutlineSearch, AiOutlineUserAdd } from "react-icons/ai";

const Home = () => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAnimals();
        setAnimals(response);
      } catch (error) {
        console.error("Erro na solicitação:", error);
      }
    };
    fetchData();
  }, []);

  console.log("dsakjf", animals);

  return (
    <div>
      <Header />
      <div className="container">
        <h2 className="mt-3 mb-5 home-title">Meus Pacientes</h2>

        <div className="row">
          <div className="col-6">
            <Link
              to="/cadastrarFuncionario"
              className="btn btn-color home-subtitle btn-space mb-2"
            >
              <AiOutlineUserAdd className="icon-size list home-subtitle" />{" "}
              Cadastrar Paciente
            </Link>
          </div>
          <div className="col-6">
            <div id="displaySearch" className="input-group mb-3">
              <input
                onChange={() => console.log("")}
                type="text"
                className="form-control"
                placeholder="Pesquisar"
                aria-describedby="button-addon2"
              />
              <button
                className="btn btn-color home-subtitle"
                type="button"
                id="button-addon2"
              >
                <AiOutlineSearch className="icon-size list home-subtitle" />
                Pesquisar
              </button>
            </div>
          </div>

          <ListaAnimals arrayAnimals={animals} />
        </div>
      </div>
    </div>
  );
};

export default Home;
