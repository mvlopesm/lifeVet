import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getAnimals } from "../api.js";
import SweetAlert from "react-bootstrap-sweetalert";

import Header from "../components/Header/Header";
import ListaAnimals from "../components/ListaAnimals/ListaAnimals";
import "../styles/home.css";
import { AiOutlineSearch, AiOutlineUserAdd } from "react-icons/ai";

const Home = () => {
  const [animals, setAnimals] = useState([]);
  const [dismiss, setDismiss] = useState("");
  const [dismissConfirmation, setDismissConfirmation] = useState(false);
  const [confirmationDismissId, setConfirmationDismissId] = useState("");

  const dismissFuncionario = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/animals/destroy/${id}`
      );

      const updatedAnimals = animals.filter((animal) => animal.id !== id);
      setAnimals(updatedAnimals);
      setDismiss(id);
      setDismissConfirmation(false);

      console.log(response.data);
    } catch (error) {
      console.error("Erro ao apagar o cadastro:", error);
    }
  };

  const dismissFuncionarioConfirmation = (id) => {
    setConfirmationDismissId(id);
    setDismissConfirmation(true);
  };

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
  }, [dismiss]);

  return (
    <div>
      <Header />
      <div className="container">
        <h2 className="mt-3 mb-5 home-title">Meus Pacientes</h2>

        <div className="row">
          <div className="col-6">
            <Link
              to="/cadastrarPaciente"
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

          <ListaAnimals
            arrayAnimals={animals}
            clickDismiss={dismissFuncionarioConfirmation}
          />

          {dismissConfirmation ? (
            <SweetAlert
              danger
              showCancel
              showCloseButton
              confirmBtnText="Sim"
              confirmBtnBsStyle="danger"
              cancelBtnText="Não"
              cancelBtnBsStyle="light"
              onConfirm={() => dismissFuncionario(confirmationDismissId)}
              onCancel={() => setDismissConfirmation(false)}
              focusCancelBtn
              style={{ background: "white", color: "black" }}
              closeBtnStyle={{ color: "#046890" }}
              cancelBtnStyle={{ backgroundColor: "lightgray" }}
            >
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#24688d",
                }}
              >
                Deseja apagar o cadastro do paciente?
              </div>
            </SweetAlert>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
