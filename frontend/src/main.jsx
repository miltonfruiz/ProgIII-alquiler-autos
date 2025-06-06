import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Mode } from "./components/Mode/Mode.jsx";
import "./components/Languages/Languages.jsx";
import { Contexts } from "./pages/Contexts/Contexts.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {" "}
    {
      // se utiliza para detectar errores en la aplicacion
    }
    <Mode>
      <Contexts>
        <App />
      </Contexts>
    </Mode>
  </StrictMode>
);
