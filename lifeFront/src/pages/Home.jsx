//Importações React
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getAnimals from "../api.js";

//Importações Estilização
import Header from "../components/Header/Header";
import "../styles/home.css";
import {
  AiOutlineSearch,
  AiOutlineUserAdd,
  AiTwotoneFilePdf,
} from "react-icons/ai";

const Home = () => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAnimals();
        if (!response) {
          throw new Error("Erro ao obter dados da API");
        }

        const data = await response.json();
        setAnimals(data);
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
        <h2 className="mt-5 mb-5">Meus Pacientes</h2>

        <div className="row">
          <div className="col-6">
            <Link
              to="/cadastrarFuncionario"
              className="btn btn-color btn-space mb-2"
            >
              <AiOutlineUserAdd className="icon-size" /> Cadastrar Funcionário
            </Link>
            <button
              onClick={() => console.log("")}
              className="btn btn-danger mb-2"
              type="button"
              id="button-addon2"
            >
              <AiTwotoneFilePdf className="icon-size" /> Gerar PDF
            </button>
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
                className="btn btn-color"
                type="button"
                id="button-addon2"
              >
                <AiOutlineSearch className="icon-size" /> Pesquisar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
