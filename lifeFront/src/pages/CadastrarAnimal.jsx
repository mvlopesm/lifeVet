import Header from "../components/Header/Header";
import React from "react";
import FormAnimal from "../components/FormAnimal/FormAnimal";

const CadastrarFuncionario = () => {
  return (
    <div>
      <Header />
      <FormAnimal textButton="Cadastrar" />
    </div>
  );
};

export default CadastrarFuncionario;
