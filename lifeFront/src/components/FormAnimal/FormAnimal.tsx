//Importações React
import React, { useState } from "react";
import axios from "axios";
import "./FormAnimal.css";

const FormFuncionario = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [species, setSpecies] = useState("");
  const [tutor, setTutor] = useState("");
  const [errorMessages, setErrorMessages] = useState("");

  const handleSubmit = async () => {
    try {
      if (!name || !species || !breed || !age || !tutor) {
        setErrorMessages("Preencha todos os campos.");
        return;
      }

      setErrorMessages("");

      const response = await axios.post("http://localhost:8000/animals/store", {
        name,
        species,
        breed,
        age,
        tutor,
      });

      console.log(response.data);

      setName("");
      setSpecies("");
      setBreed("");
      setAge("");
      setTutor("");
      window.location.href = "/";
    } catch (error) {
      console.error("Erro ao cadastrar animal", error);

      setErrorMessages("Erro ao cadastrar animal. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="container-full">
      <div className="row container-margins">
        <div
          id="alignForm"
          className="div1-margins form content content-top col-lg-6  "
        >
          <h2 className="">Cadastrar Paciente</h2>

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
            placeholder="Especie"
            id="species"
            name="species"
          />
          <p>ex: Cachorro</p>

          <label htmlFor="breed">Raça</label>
          <input
            value={breed}
            onChange={(e) => {
              setBreed(e.target.value);
            }}
            type="text"
            placeholder="Raça"
            id="breed"
            name="breed"
          />
          <p>Labrador</p>

          <div>
            <div className="row row-botton">
              <div className="content col-lg-6">
                <label htmlFor="age">Idade</label>
                <input
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                  type="number"
                  placeholder="Idade"
                  id="age"
                  name="age"
                />

                <p>4</p>
              </div>

              <div className="content col-lg-6">
                <input
                  value={tutor}
                  onChange={(e) => {
                    setTutor(e.target.value);
                  }}
                  type="text"
                  placeholder="Tutor"
                  id="tutor"
                  name="tutor"
                />
                <p>ex: Carlos</p>
              </div>

              <button
                className="mt-2 btn btn-color btn-register"
                type="button"
                onClick={handleSubmit}
              >
                Cadastrar Paciente
              </button>

              {/* Exibir mensagens de erro, se houverem */}
              {errorMessages && (
                <div className="error-message">{errorMessages}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormFuncionario;
