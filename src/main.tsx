import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppProvider } from "./utlis/providers.tsx";
// Importe la graisse par défaut (400)
import "@fontsource/lato";

// (Optionnel) Importez d'autres graisses ou styles au besoin :
import "@fontsource/lato/300.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/400-italic.css";
// import Router from './components/router.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
);
