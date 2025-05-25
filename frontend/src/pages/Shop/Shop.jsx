import React, { useState, useEffect } from "react";
import mockCars from "../../data/mockCars";
import Navbar from "../../components/Navbar/Navbar";
import Catalogo from "./Catalogo/Catalogo";
import Footer from "../../components/Footer/Footer";
import Filtros from "../Shop/Filtros/Filtros";
import styles from "./Shop.module.css";
import { useLocation } from "react-router-dom";
import UserNavbar from "../../components/UserNavbar/UserNavbar";

function Shop() {
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [marcasSeleccionadas, setMarcasSeleccionadas] = useState([]);

  const location = useLocation(); // Esto sirve para recibir el state que esta en CATEGORIAS.JSX

  useEffect(() => {
    if (location.state?.categoriaSeleccionada) {
      //Hay alguna categoriaSeleccionada?
      setCategoriasSeleccionadas([location.state.categoriaSeleccionada]); // Aqui se le pasa la categoria seleccionada, desde el HOME CATEGORIAS
    }
  }, [location.state]);

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
      <UserNavbar />
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
