import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAnimals, getExamTypes, getExams } from "../api";
import { useParams } from "react-router-dom";

import "../components/FormAnimal/FormAnimal.css";
import Header from "../components/Header/Header";

const SolicitarExame = () => {
  const [exams, setExams] = useState([]);
  const [examTypes, setExamTypes] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [selectedExamType, setSelectedExamType] = useState("");
  const [comment, setComment] = useState("");
  const [errorMessages, setErrorMessages] = useState("");

  const { idAnimal } = useParams();

  useEffect(() => {
    const fetchDataExamtypes = async () => {
      try {
        const response = await getExamTypes();
        setExamTypes(response);
      } catch (error) {
        console.error("Erro na solicitação:", error);
      }
    };
    fetchDataExamtypes();

    const fetchDataExams = async () => {
      try {
        const response = await getExams();
        setExams(response);
      } catch (error) {
        console.error("Erro na solicitação:", error);
      }
    };
    fetchDataExams();

    const fetchDataAnimal = async () => {
      try {
        const response = await getAnimals();
        setAnimals(response);
      } catch (error) {
        console.error("Erro na solicitação:", error);
      }
    };
    fetchDataAnimal();
  }, []);

  useEffect(() => {
    const fetchDataAnimal = async () => {
      try {
        if (idAnimal) {
          const response = await getAnimals();
          setAnimals(response);

          const selectedAnimal = response.find(
            (animal) => animal.id.toString() === idAnimal.toString()
          );

          if (selectedAnimal) {
            setSelectedAnimal(selectedAnimal);
          }
        }
      } catch (error) {
        console.error("Erro na solicitação:", error);
      }
    };

    fetchDataAnimal();
  }, [idAnimal]);

  const handleSubmit = async () => {
    try {
      const examElement = document.getElementById("exams");
      const animalElement = document.getElementById("animals");

      const animalId = animals.find(
        (animal) => animal.name === animalElement.value
      )?.id;
      const examId = exams.find((exam) => exam.name === examElement.value)?.id;
      const comment = document.getElementById("comment").value;

      if (!animalId || !examId) {
        setErrorMessages("Preencha todos os campos.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/api/exams-results/store",
        {
          animal_id: animalId,
          exam_id: examId,
          comment: comment,
        }
      );

      console.log("Response from Laravel:", response.data);
      setErrorMessages("");
      window.location.href = "/exames";
    } catch (error) {
      console.error("Error while submitting:", error);
      setErrorMessages(error);
    }
  };

  const handleTypeExam = (typeName) => {
    const foundType = examTypes.find((type) => type.name === typeName);

    if (foundType) {
      setSelectedExamType(foundType.id);
    } else {
      console.error("Selected exam type not found");
    }
  };

  return (
    <>
      <Header />

      <div className="container-full">
        <div className="row container-margins">
          <div
            id="alignForm"
            className="div1-margins form content content-top col-lg-6  "
          >
            <h2 className="">Solicitar Exame</h2>

            <label htmlFor="examTypes">Tipo do Exame</label>
            <select
              id="examTypes"
              name="examTypes"
              style={{ color: "#046890" }}
              onChange={(e) => handleTypeExam(e.target.value)}
            >
              <option value="" disabled selected hidden>
                Selecione um Tipo
              </option>
              {examTypes.length > 0 ? (
                examTypes.map((type, index) => (
                  <option key={index} value={type.name}>
                    {type.name}
                  </option>
                ))
              ) : (
                <option>Carregando dados...</option>
              )}
            </select>
            <p>ex: Bioquímica</p>

            <label htmlFor="exams">Exames</label>
            <select id="exams" name="exams" style={{ color: "#046890" }}>
              <option value="" disabled selected hidden>
                Selecione um Exame
              </option>
              {selectedExamType ? (
                exams
                  .filter(
                    (exam) => exam.exam_type_id.toString() == selectedExamType
                  )
                  .map((exam) => (
                    <option key={exam.id} value={exam.name}>
                      {exam.name}
                    </option>
                  ))
              ) : (
                <option>Selecione o tipo do exame</option>
              )}
            </select>
            <p>ex: Albumina</p>

            <label htmlFor="animals">Paciente</label>
            <select
              id="animals"
              name="animals"
              value={selectedAnimal ? selectedAnimal.name : ""}
              onChange={(e) => setSelectedAnimal(e.target.value)}
              style={{ color: "#046890" }}
            >
              <option value="" disabled hidden>
                Selecione o Paciente
              </option>

              {animals.length > 0 ? (
                animals.map((type, index) => (
                  <option key={index} value={type.name}>
                    {type.name}
                  </option>
                ))
              ) : (
                <option>Carregando dados...</option>
              )}
            </select>
            <p>ex: Cookie</p>

            <label htmlFor="comment">Raça</label>
            <textarea
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              type="text"
              placeholder="Comentário"
              id="comment"
              name="comment"
              className="commentTextarea"
            />
            <p>ex: Quero verificar as taxas</p>

            <div className="row row-botton">
              <button
                className="mt-2 btn btn-color btn-register"
                type="button"
                onClick={handleSubmit}
              >
                Solicitar Exame
              </button>
            </div>
            {errorMessages && (
              <div className="error-message">
                {errorMessages || "Ocorreu um erro"}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SolicitarExame;
