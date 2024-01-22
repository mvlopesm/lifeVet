import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getAnimals } from "../api.js";
import SweetAlert from "react-bootstrap-sweetalert";

import Header from "../components/Header/Header";
import ListaAnimals from "../components/ListaAnimals/ListaAnimals";
import "../styles/home.css";
import {
  AiOutlinePlus,
  AiOutlineSearch,
  AiOutlineUserAdd,
  AiOutlineOrderedList,
} from "react-icons/ai";

const Home = () => {
  const [animals, setAnimals] = useState([]);
  const [deleted, setDeleted] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [confirmationDeleteId, setConfirmationDeleteId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [finishLoading, setFinishLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const excludedFields = ["created_at", "updated_at", "id"];

  const deleteAnimal = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:8000/animals/destroy/${id}`
      );

      const updatedAnimals = animals.filter((animal) => animal.id !== id);
      setAnimals(updatedAnimals);
      setDeleted(id);
      setDeleteConfirmation(false);
      setLoading(false);

      console.log(response.data);
    } catch (error) {
      setLoading(false);
      console.error("Erro ao apagar o cadastro:", error.response.data.message);
    }
  };

  const deleteAnimalConfirmation = (id) => {
    setConfirmationDeleteId(id);
    setDeleteConfirmation(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAnimals();
        setAnimals(response);
        setFinishLoading(true);
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
  }, [deleted]);

  return (
    <div>
      <Header />
      <div className="container">
        <h2 className="mt-4 mb-4 home-title">Meus Pacientes</h2>

        <div className="row">
          <div className="col-7">
            <Link
              to="/cadastrarPaciente"
              className="btn btn-color home-subtitle btn-space mb-2"
            >
              <AiOutlineUserAdd className="icon-size list home-subtitle" />
              Cadastrar Paciente
            </Link>
            <Link
              to="/solicitarExame"
              className="btn btn-color home-subtitle btn-space mb-2"
            >
              <AiOutlinePlus className="icon-size list home-subtitle" />
              Solicitar Exame
            </Link>
            <Link
              to="/exames"
              className="btn btn-color home-subtitle btn-space mb-2"
            >
              <AiOutlineOrderedList className="icon-size list home-subtitle" />
              Exames Cadastrados
            </Link>
          </div>

          <div className="col-5">
            <div id="displaySearch" className="input-group mb-3">
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Pesquisar"
                aria-describedby="button-addon2"
              />
              <button
                onClick={() => console.log("")}
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
            arrayAnimals={animals.filter((animal) =>
              Object.entries(animal).some(([key, value]) => {
                const fieldValue = value.toString().toLowerCase();
                const searchTermLower = searchTerm.toLowerCase();

                if (!excludedFields.includes(key)) {
                  return fieldValue.includes(searchTermLower);
                }

                return false;
              })
            )}
            deleteAnimalConfirmation={deleteAnimalConfirmation}
            searchTerm={searchTerm}
            finishLoading={finishLoading}
          />

          {deleteConfirmation ? (
            <SweetAlert
              danger
              showCancel
              showCloseButton
              confirmBtnText="Sim"
              confirmBtnBsStyle="danger"
              cancelBtnText="Não"
              cancelBtnBsStyle="light"
              onConfirm={() => deleteAnimal(confirmationDeleteId)}
              onCancel={() => setDeleteConfirmation(false)}
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
              {loading && (
                <div className="d-flex justify-content-center mt-2">
                  <div className="spinner-border w-[1000px]" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
            </SweetAlert>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
