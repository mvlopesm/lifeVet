import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

//Importações Estilização
import "./styles/index.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
