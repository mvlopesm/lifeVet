import Header from "../components/Header/Header";
import React from "react";
import FormAnimal from "../components/FormAnimal/FormAnimal";

const CadastrarAnimal = () => {
  return (
    <div>
      <Header />
      <FormAnimal textButton="Cadastrar" />
    </div>
  );
};

export default CadastrarAnimal;
