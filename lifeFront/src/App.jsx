import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

//Importações Estilização
import "./styles/index.css";
import CadastrarAnimal from "./pages/CadastrarAnimal";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastrarPaciente" element={<CadastrarAnimal />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
