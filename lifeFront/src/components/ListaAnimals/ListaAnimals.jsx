//Importações React
import React from "react";
import { Link } from "react-router-dom";

import "./ListaAnimals.css";
import { RiFolderHistoryLine } from "react-icons/ri";
import { AiFillEdit, AiOutlinePlus, AiTwotoneDelete } from "react-icons/ai";

const ListaAnimals = (props) => {
  return (
    <div>
      <table className="table table-hover table-bordered">
        <thead>
          <tr className="rowTitle">
            <th scope="col">Nome</th>
            <th scope="col">Espécie</th>
            <th scope="col">Raça</th>
            <th scope="col">Idade</th>
            <th scope="col">Tutor</th>
            <th scope="col" className="col-action">
              Exames
            </th>
            <th scope="col" className="col-action">
              Editar / Apagar{" "}
            </th>
          </tr>
        </thead>
        {props.arrayAnimals.length > 0 ? (
          <tbody>
            {props.arrayAnimals.map((animal) => {
              return (
                <tr key={animal.id} className="list-row">
                  <td>{animal.name}</td>
                  <td>{animal.species}</td>
                  <td>{animal.breed}</td>
                  <td>{animal.age}</td>
                  <td>{animal.tutor}</td>
                  <td className="list">
                    <Link className="list" to={"/solicitarExame/" + animal.id}>
                      <AiOutlinePlus
                        title="Solicitar Exame"
                        className="icon-action list"
                      />
                    </Link>
                    <Link className="list" to={`/exames/${animal.id}`}>
                      <RiFolderHistoryLine
                        title="Exames Cadastrados"
                        className="icon-action list"
                      />
                    </Link>
                  </td>
                  <td className="list">
                    <Link
                      className="list"
                      to={"/atualizarCadastro/" + animal.id}
                    >
                      <AiFillEdit
                        title="Editar Paciente"
                        className="icon-action list"
                      />
                    </Link>
                    <Link
                      className="list"
                      to=""
                      onClick={() => {
                        props.deleteAnimalConfirmation(animal.id);
                      }}
                    >
                      <AiTwotoneDelete
                        title="Deletar Paciente"
                        className="icon-action list"
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
                  : "Nenhum paciente cadastrado"}
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default ListaAnimals;
