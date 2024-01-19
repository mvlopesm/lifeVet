import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getExamsResults, getAnimals, getExams } from "../api.js";
import SweetAlert from "react-bootstrap-sweetalert";
import { useParams } from "react-router-dom";

import Header from "../components/Header/Header.jsx";
import ListaExames from "../components/ListaExames.jsx";
import "../styles/home.css";
import {
  AiOutlinePlus,
  AiOutlineSearch,
  AiOutlineUserAdd,
  AiOutlineOrderedList,
} from "react-icons/ai";

const Exames = () => {
  const [examsResults, setExamsResults] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [exams, setExams] = useState([]);
  const [processedExams, setProcessedExams] = useState([]);
  const [deleted, setDeleted] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [confirmationDeleteId, setConfirmationDeleteId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { idAnimal } = useParams();

  const deleteExamsResult = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/exams-results/destroy/${id}`
      );

      const updatedExamsResult = examsResults.filter(
        (animal) => animal.id !== id
      );
      setExamsResults(updatedExamsResult);
      setDeleted(id);
      setDeleteConfirmation(false);

      console.log(response.data);
    } catch (error) {
      console.error("Erro ao apagar o cadastro:", error);
    }
  };

  const deleteExamsResultsConfirmation = (id) => {
    setConfirmationDeleteId(id);
    setDeleteConfirmation(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getExamsResults();
        setExamsResults(response);
        const responseAnimals = await getAnimals();
        setAnimals(responseAnimals);
        const responseExams = await getExams();
        setExams(responseExams);
      } catch (error) {
        console.error("Erro na solicitação:", error);
      }
    };
    fetchData();

    if (idAnimal) {
      const foundAnimal = animals.find((animal) => animal.id == idAnimal);
      if (foundAnimal) {
        setSearchTerm(foundAnimal.name);
      }
    }
  }, [animals, idAnimal]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getExamsResults();
        setExamsResults(response);
      } catch (error) {
        console.error("Erro na solicitação:", error);
      }
    };
    fetchData();
  }, [deleted]);

  useEffect(() => {
    if (
      examsResults &&
      examsResults.length > 0 &&
      animals &&
      animals.length > 0 &&
      exams &&
      exams.length > 0
    ) {
      const response = examsResults.map((result) => {
        const matchingAnimal = animals.find(
          (animal) => animal.id === result.animal_id
        );
        const matchingExam = exams.find((exam) => exam.id === result.exam_id);

        return {
          comment: result.comment ? result.comment : "Sem comentários...",
          result: result.result ? result.result : "Aguardando Resultado...",
          animalName: matchingAnimal
            ? matchingAnimal.name
            : "Nome Desconhecido",
          examName: matchingExam ? matchingExam.name : "Exame Desconhecido",
          tutorName: matchingAnimal
            ? matchingAnimal.tutor
            : "Tutor Desconhecido",
        };
      });

      setProcessedExams(response);
    }
  }, [examsResults, animals, exams, setProcessedExams]);

  return (
    <div>
      <Header />
      <div className="container">
        <h2 className="mt-4 mb-4 home-title">Exames</h2>

        <div className="row">
          <div className="col-7">
            <Link
              to={idAnimal ? `/solicitarExame/${idAnimal}` : "/solicitarExame"}
              className="btn btn-color home-subtitle btn-space mb-2"
            >
              <AiOutlinePlus className="icon-size list home-subtitle" />{" "}
              Solicitar Exame
            </Link>

            {idAnimal ? (
              <Link
                to="/exames"
                className="btn btn-color home-subtitle btn-space mb-2"
                onClick={() => setSearchTerm("")}
              >
                <AiOutlineOrderedList className="icon-size list home-subtitle" />{" "}
                Mostrar Todos
              </Link>
            ) : (
              <></>
            )}
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

          <ListaExames
            arrayExamsResults={processedExams.filter((animal) =>
              Object.values(animal).some((value) => {
                if (typeof value === "string") {
                  const fieldValue = value.toLowerCase();
                  const searchTermLower = searchTerm.toLowerCase();
                  return fieldValue.includes(searchTermLower);
                }
                // Adicione mais lógica para tipos de dados diferentes, se necessário
                return false;
              })
            )}
            clickDelete={deleteExamsResultsConfirmation}
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
              onConfirm={() => deleteExamsResult(confirmationDeleteId)}
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
                Deseja apagar o exame?
              </div>
            </SweetAlert>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Exames;