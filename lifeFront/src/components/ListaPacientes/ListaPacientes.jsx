//Importações React
import React from "react";
import "./ListaPacientes.css";
import { Link } from "react-router-dom";

//Importações Estilização
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";

//Renderização da Lista de pacientes
const ListaPacientes = (props) => {
  console.log("props", props);

  return (
    <div>
      <table className="table table-hover table-bordered">
        <thead>
          <tr className="rowTitle">
            <th scope="col">Nome</th>
            <th scope="col">Especie</th>
            <th scope="col">Raça</th>
            <th scope="col">Idade</th>
            <th scope="col">Tutor</th>
            <th scope="col" className="col-action">
              Editar / Demitir{" "}
            </th>
          </tr>
        </thead>

        <tbody>
          {props.arrayAnimals.map((paciente) => {
            return (
              <tr key={paciente.id}>
                <td>{paciente.name}</td>
                <td>{paciente.species}</td>
                <td>{paciente.breed}</td>
                <td>{paciente.age}</td>
                <td>{paciente.tutor}</td>
                <td>
                  <Link to={"/atualizarCadastro/" + paciente.id}>
                    <AiFillEdit className="icon-action" />
                  </Link>
                  <Link
                    to=""
                    onClick={() => {
                      props.clickDismiss(paciente.id);
                    }}
                  >
                    <AiTwotoneDelete className="icon-action red" />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListaPacientes;
