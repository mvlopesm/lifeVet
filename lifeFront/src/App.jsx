import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

//Importações Estilização
import "./styles/index.css";
import CadastrarAnimal from "./pages/CadastrarAnimal";
import AtualizarCadastro from "./pages/AtualizarCadastro";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastrarPaciente" element={<CadastrarAnimal />} />
          <Route
            path="/atualizarCadastro/:id"
            element={<AtualizarCadastro />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
