//Configurações para autenticação de rotas com localStorage

import React, { createContext, useState } from "react";

const AuthContext = createContext({});

const AuthProvider = (props) => {
  let isLogged = localStorage.getItem("logged");

  const [logged, setLogged] = useState(isLogged === "S" ? true : false);

  return (
    <AuthContext.Provider value={{ logged, setLogged }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
