import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./Context/auth";
import { useContext } from "react";

import "./styles/index.css";

import Login from "./pages/Login";
import RecuperarSenha from "./pages/RecuperarSenha";
import CriarConta from "./pages/CriarConta";

import Home from "./pages/Home";
import CadastrarAnimal from "./pages/CadastrarAnimal";
import AtualizarCadastro from "./pages/AtualizarCadastro";
import SolicitarExame from "./pages/SolicitarExame";
import Exames from "./pages/Exames";

function App() {
  const { logged } = useContext(AuthContext);

  const Private = ({ children }) => {
    if (!logged) {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/login/recuperarSenha" element={<RecuperarSenha />} />
          <Route path="/login/criarConta" element={<CriarConta />} />

          <Route
            path="/"
            element={
              <Private>
                <Home />
              </Private>
            }
          />
          <Route
            path="/cadastrarPaciente"
            element={
              <Private>
                <CadastrarAnimal />
              </Private>
            }
          />
          <Route
            path="/atualizarCadastro/:id"
            element={
              <Private>
                <AtualizarCadastro />
              </Private>
            }
          />
          <Route
            path="/solicitarExame/:idAnimal?"
            element={
              <Private>
                <SolicitarExame />
              </Private>
            }
          />
          <Route
            path="/exames"
            element={
              <Private>
                <Exames />
              </Private>
            }
          />
          <Route
            path="/exames/:idAnimal?"
            element={
              <Private>
                <Exames />
              </Private>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
