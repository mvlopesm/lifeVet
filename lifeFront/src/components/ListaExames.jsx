import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getAnimals, getExams } from "../api.js";

import { AiFillEdit, AiOutlineClose, AiTwotoneDelete } from "react-icons/ai";

const ListaExames = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [animals, setAnimals] = useState([]);
  const [selectedExam, setSelectedExam] = useState([]);
  const [exams, setExams] = useState([]);
  const [updateResult, setUpdateResult] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAnimals = await getAnimals();
        setAnimals(responseAnimals);
        const responseExams = await getExams();
        setExams(responseExams);
      } catch (error) {
        console.error("Erro na solicitação:", error);
      }
    };
    fetchData();
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSelectExam = (exam) => {
    setSelectedExam(exam);
    toggleModal();
  };

  const handleUpdate = async () => {
    try {
      if (!updateResult) {
        return;
      }

      const selectedAnimal = animals.find(
        (animal) => animal.name === selectedExam.animalName
      );

      const selectedExamData = exams.find(
        (exam) => exam.name === selectedExam.examName
      );

      if (!selectedAnimal || !selectedExamData) {
        console.error("Animal or exam data not found.");
        return;
      }

      const response = await axios.put(
        `http://localhost:8000/exams-results/update/${selectedExam.id}`,
        {
          animal_id: selectedAnimal.id,
          exam_id: selectedExamData.id,
          comment: selectedExam.comment,
          result: updateResult,
        }
      );

      toggleModal();
      console.log(response.data);
      window.location.href = "/exames";
    } catch (error) {
      console.error("Erro ao atualizar resultado do exame", error);
    }
  };

  return (
    <div>
      <table className="table table-hover table-bordered">
        <thead>
          <tr className="rowTitle">
            <th scope="col">Nome</th>
            <th scope="col">Tutor</th>
            <th scope="col">Exame</th>
            <th scope="col">Comentário</th>
            <th scope="col">Resultado</th>
            <th scope="col" className="col-action iconExamDelete">
              Deletar
            </th>
          </tr>
        </thead>
        {props.arrayExamsResults.length > 0 ? (
          <tbody>
            {props.arrayExamsResults.map((exam) => {
              return (
                <tr key={exam.id} className="list-row">
                  <td>{exam.animalName}</td>
                  <td>{exam.tutorName}</td>
                  <td>{exam.examName}</td>
                  <td>{exam.comment}</td>
                  <td id="relative-position">
                    <div>
                      <p>{exam.result}</p>

                      <Link
                        onClick={() => handleSelectExam(exam)}
                        className="list"
                      >
                        <AiFillEdit
                          title="Editar Resultado"
                          className="iconResultEdit"
                        />
                      </Link>
                    </div>
                  </td>
                  <td className="iconExamDelete">
                    <Link
                      to=""
                      onClick={() => {
                        props.clickDelete(exam.id);
                      }}
                    >
                      <AiTwotoneDelete
                        title="Deletar Exame"
                        className="icon-action"
                      />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tbody>
            <tr className="list-row">
              <td className="text-center" colSpan="7">
                {props.finishLoading === false
                  ? "Carregando lista dos pacientes..."
                  : props.searchTerm.length > 0
                  ? "Nenhum resultado encontrado"
                  : "Nenhum exame cadastrado"}
              </td>
            </tr>
          </tbody>
        )}
      </table>

      {showModal && (
        <div className="blur-background">
          <div className="container-full-modal">
            <div>
              <div id="relative-position" className="form content content-top">
                <Link onClick={() => toggleModal()} className="list">
                  <AiOutlineClose title="Fechar" className="iconResultEdit" />
                </Link>

                <h2 className="mb-2">Resultado do Exame</h2>
                <textarea
                  value={updateResult}
                  onChange={(e) => setUpdateResult(e.target.value)}
                  type="text"
                  placeholder="Escreva o resultado do exame..."
                  id="texteAreaModal"
                  name="updateResult"
                />

                <button
                  className="mt-2 btn btn-color btn-register"
                  type="button"
                  onClick={handleUpdate}
                >
                  Confirmar Resultado
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaExames;
