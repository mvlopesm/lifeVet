//Importações React
import React, { useState } from "react";

//Importações Estilização
import "./FormAnimal.css";

const FormFuncionario = (props) => {
  //UseStates Variáveis
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [species, setSpecies] = useState("");
  const [tutor, setTutor] = useState("");

  return (
    <div className="container-full">
      <div className="row container-margins">
        <div id="alignForm" className="div1-margins form content col-lg-6  ">
          <h2 className="">Cadastrar Paciente</h2>
          <div className="row marginDiv">
            <div className="content col-lg-8">
              <label htmlFor="name">Nome</label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                placeholder="Nome"
                id="name"
                name="name"
              />
              <p>ex: Paçoca</p>

              <label htmlFor="species">Especie</label>
              <input
                value={species}
                onChange={(e) => {
                  setSpecies(e.target.value);
                }}
                type="text"
                placeholder="Gênero"
                id="species"
                name="species"
              />
              <p>ex: Cachorro</p>
            </div>
          </div>

          <label htmlFor="breed">Raça</label>
          <input
            value={breed}
            onChange={(e) => {
              setBreed(e.target.value);
            }}
            type="text"
            placeholder="Endereço"
            id="breed"
            name="breed"
          />
          <p>Labrador</p>

          <div>
            <div className="row">
              <div className="content col-lg-6">
                <label htmlFor="age">Idade</label>
                <input
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                  type="number"
                  placeholder="Telefone"
                  id="age"
                  name="age"
                />

                <p>4</p>
              </div>

              <div className="content col-lg-6">
                <label htmlFor="tutor">Tutor</label>
                <input
                  value={tutor}
                  onChange={(e) => {
                    setTutor(e.target.value);
                  }}
                  type="text"
                  placeholder="Data de aniversário"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  id="tutor"
                  name="tutor"
                />
                <p className="cl-lg-6">ex: 10/01/1980</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormFuncionario;
