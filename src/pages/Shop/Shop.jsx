import React, { useState } from "react";
import mockCars from "../../data/mockCars";
import Navbar from "../../components/Navbar/Navbar";
import Catalogo from "./Catalogo/Catalogo";
import Footer from "../../components/Footer/Footer";
import Filtros from "../Shop/Filtros/Filtros";
import styles from "./Shop.module.css";
function Shop() {
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [marcasSeleccionadas, setMarcasSeleccionadas] = useState([]);

  const autosFiltrados = mockCars.filter((auto) => {
    const categoriaFiltro =
      categoriasSeleccionadas.length === 0 ||
      categoriasSeleccionadas.includes(auto.category);

    const marcaFiltro =
      marcasSeleccionadas.length === 0 ||
      marcasSeleccionadas.includes(auto.brand);

    return categoriaFiltro && marcaFiltro;
  });

  const limpiarFiltros = () => {
    setCategoriasSeleccionadas([]);
    setMarcasSeleccionadas([]);
  };

  return (
    <>
      <Navbar />
      <main className={styles.mainContainer}>
        <Filtros
          categoriasSeleccionadas={categoriasSeleccionadas}
          setCategoriasSeleccionadas={setCategoriasSeleccionadas}
          marcasSeleccionadas={marcasSeleccionadas}
          setMarcasSeleccionadas={setMarcasSeleccionadas}
        />
        <Catalogo autos={autosFiltrados} limpiarFiltros={limpiarFiltros} />
      </main>
      <Footer />
    </>
  );
}

export default Shop;
