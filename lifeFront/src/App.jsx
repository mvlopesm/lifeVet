import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

//Importações Estilização
import "./styles/index.css";
import CadastrarAnimal from "./pages/CadastrarAnimal";
import AtualizarCadastro from "./pages/AtualizarCadastro";
import SolicitarExame from "./pages/SolicitarExame";
import Exames from "./pages/Exames";

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
          <Route
            path="/solicitarExame/:idAnimal?"
            element={<SolicitarExame />}
          />
          <Route path="/exames" element={<Exames />} />
          <Route path="/exames/:idAnimal?" element={<Exames />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
