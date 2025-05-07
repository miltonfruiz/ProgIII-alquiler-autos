import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Mode } from "./components/Mode/Mode.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Mode>
      <App />
    </Mode>
  </StrictMode>
);
