import React, { useState, useEffect } from "react";
import mockCars from "../../data/mockCars";
import Navbar from "../../components/Navbar/Navbar";
import Catalogo from "./Catalogo/Catalogo";
import Footer from "../../components/Footer/Footer";
import Filtros from "../Shop/Filtros/Filtros";
import styles from "./Shop.module.css";
import { useLocation } from "react-router-dom";
import UserNavbar from "../../components/UserNavbar/UserNavbar";
import { obtenerAutos } from "../../api/autos";

function Shop() {
  const [autosDB, setAutosDB] = useState([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [marcasSeleccionadas, setMarcasSeleccionadas] = useState([]);

  const location = useLocation(); // Esto sirve para recibir el state que esta en CATEGORIAS.JSX

  useEffect(() => {
    const fetchAutos = async () => {
      try {
        const data = await obtenerAutos();
        setAutosDB(data);
      } catch (error) {
        console.error("Error al cargar autos desde el backend", error);
      }
    };

    fetchAutos();
  }, []);

  useEffect(() => {
    if (location.state?.categoriaSeleccionada) {
      //Hay alguna categoriaSeleccionada?
      setCategoriasSeleccionadas([location.state.categoriaSeleccionada]); // Aqui se le pasa la categoria seleccionada, desde el HOME CATEGORIAS
    }
  }, [location.state]);

  const contarPorCampo = (autos, campo) => {
    return autos.reduce((acc, auto) => {
      const key = auto[campo];
      acc[key] = acc[key] ? acc[key] + 1 : 1;
      return acc;
    }, {});
  };

  const categoriasConCantidad = Object.entries(
    contarPorCampo(autosDB, "category")
  ).map(([nombre, cantidad]) => ({ nombre, cantidad }));

  const marcasConCantidad = Object.entries(
    contarPorCampo(autosDB, "brand")
  ).map(([nombre, cantidad]) => ({ nombre, cantidad }));

  const autosFiltrados = autosDB.filter((auto) => {
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
          categorias={categoriasConCantidad} //LE PASO AL FILTROS.JSX LAS CANT. DE CATEGORIAS
          marcas={marcasConCantidad} //LE PASO AL FILTROS.JSX LAS CANT. DE MARCAS
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
