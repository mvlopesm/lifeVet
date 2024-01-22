import React, { useState, useEffect } from "react";
import { axiosInstance } from "../api";
import { getAnimalsById } from "../api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "../components/FormAnimal/FormAnimal.css";
import Header from "../components/Header/Header";

const AtualizarCadastro = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [species, setSpecies] = useState("");
  const [tutor, setTutor] = useState("");
  const [errorMessages, setErrorMessages] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAnimalsById(id);
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

  const handleUpdate = async () => {
    try {
      // Validar se todos os campos estão preenchidos
      if (!name || !species || !breed || !age || !tutor) {
        setErrorMessages("Preencha todos os campos.");
        return;
      }

      // Validar o nome permitindo acentos
      const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;
      if (name.length < 3 || !nameRegex.test(name)) {
        setErrorMessages(
          "O nome deve ter pelo menos 3 caracteres e pode conter apenas letras e espaços."
        );
        return;
      }

      // Validar a espécie permitindo acentos
      const speciesRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;
      if (!speciesRegex.test(species)) {
        setErrorMessages("A espécie deve conter apenas letras e espaços.");
        return;
      }

      // Validar a raça permitindo acentos
      const breedRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;
      if (!breedRegex.test(breed)) {
        setErrorMessages("A raça deve conter apenas letras e espaços.");
        return;
      }

      // Validar o tutor permitindo acentos
      const tutorRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;
      if (tutor.length < 3 || !tutorRegex.test(tutor)) {
        setErrorMessages(
          "O tutor deve ter pelo menos 3 caracteres e pode conter apenas letras e espaços."
        );
        return;
      }
      // Validar a idade
      const ageRegex = /^[0-9]+$/;
      if (!ageRegex.test(age)) {
        setErrorMessages("A idade deve conter apenas números.");
        return;
      }

      setErrorMessages("");
      setLoading(true);

      const response = await axiosInstance().put(`/animals/update/${id}`, {
        name,
        species,
        breed,
        age,
        tutor,
      });

      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
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
              placeholder={"Carregando..."}
              id="name"
              name="name"
            />
            <p>ex: Paçoca</p>

            <label htmlFor="species">Espécie</label>
            <input
              value={species}
              onChange={(e) => {
                setSpecies(e.target.value);
              }}
              type="text"
              placeholder={"Carregando..."}
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
              placeholder={"Carregando..."}
              id="breed"
              name="breed"
            />
            <p>ex: Labrador</p>

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
                    placeholder={"Carregando..."}
                    id="age"
                    name="age"
                  />

                  <p>ex: 4</p>
                </div>

                <div className="content col-lg-6">
                  <input
                    value={tutor}
                    onChange={(e) => {
                      setTutor(e.target.value);
                    }}
                    type="text"
                    placeholder={"Carregando..."}
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
        {loading && (
          <div className="d-flex justify-content-center mt-2">
            <div className="spinner-border w-[1000px]" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AtualizarCadastro;
