import { useState } from "react";
import { axiosInstance } from "../../api.js";
import { useNavigate } from "react-router-dom";

import "./FormAnimal.css";

const FormAnimal = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [species, setSpecies] = useState("");
  const [tutor, setTutor] = useState("");
  const [errorMessages, setErrorMessages] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
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

      const response = await axiosInstance().post("/animals/store", {
        name,
        species,
        breed,
        age,
        tutor,
      });

      setName("");
      setSpecies("");
      setBreed("");
      setAge("");
      setTutor("");

      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.error("Erro ao cadastrar animal", error);
      setErrorMessages("Erro ao cadastrar. Tente novamente.");
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
            className="commentTextarea"
          />
          <p>ex: Paçoca</p>

          <label htmlFor="species">Espécie</label>
          <input
            value={species}
            onChange={(e) => {
              setSpecies(e.target.value);
            }}
            type="text"
            placeholder="Espécie"
            id="species"
            name="species"
            className="commentTextarea"
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
            className="commentTextarea"
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
                  placeholder="Idade"
                  id="age"
                  name="age"
                  className="commentTextarea"
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
                  placeholder="Tutor"
                  id="tutor"
                  name="tutor"
                  className="commentTextarea"
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
  );
};

export default FormAnimal;
