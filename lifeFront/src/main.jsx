import App from "./App";
import { createRoot } from "react-dom/client";
import React from "react";
import { AuthProvider } from "./Context/auth";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
