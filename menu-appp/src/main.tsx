import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

// Punto de entrada principal de la aplicación.
// Aquí se monta React dentro del elemento root del index.html.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* BrowserRouter habilita el sistema de rutas para toda la aplicación */}
    <BrowserRouter>
      {/* App contiene todas las rutas y páginas del sistema */}
      <App />
    </BrowserRouter>
  </StrictMode>
);