//Importações React
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/FormAnimal/FormAnimal.css";
import Header from "../components/Header/Header";
import { getAnimalsById } from "../api";
import { useParams } from "react-router-dom";

const FormFuncionario = () => {
  const [animals, setAnimals] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [species, setSpecies] = useState("");
  const [tutor, setTutor] = useState("");
  const [errorMessages, setErrorMessages] = useState("");

  const { id } = useParams();
  console.log("id", id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAnimalsById(id);
        setAnimals(response);
        // Preencher os campos do formulário com os dados obtidos
        setName(response.name);
        setSpecies(response.species);
        setBreed(response.breed);
        setAge(response.age);
        setTutor(response.tutor);
      } catch (error) {
        console.error("Erro na solicitação:", error);
      }
    };
    fetchData();
  }, [id]);
  console.log("oppppa", animals);

  const handleUpdate = async () => {
    try {
      if (!name || !species || !breed || !age || !tutor) {
        setErrorMessages("Preencha todos os campos.");
        return;
      }

      setErrorMessages("");

      const response = await axios.put(
        `http://localhost:8000/animals/update/${id}`,
        {
          name,
          species,
          breed,
          age,
          tutor,
        }
      );

      console.log(response.data);

      window.location.href = "/";
    } catch (error) {
      console.error("Erro ao atualizar animal", error);
      setErrorMessages("Erro ao atualizar animal. Tente novamente mais tarde.");
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
            <h2 className="">Atualizar Cadastro</h2>

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
                  onClick={handleUpdate}
                >
                  Atualizar Cadastro
                </button>
                {errorMessages && (
                  <div className="error-message">{errorMessages}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormFuncionario;
