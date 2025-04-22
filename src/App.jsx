import { useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Categorias from "./components/Categorias/Categorias";
import Recomendados from "./components/Recomendados/Recomendados";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categorias />
      <Recomendados />
    </>
  );
}

export default App;
