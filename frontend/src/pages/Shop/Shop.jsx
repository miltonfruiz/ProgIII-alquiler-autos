import { useState, useEffect, use } from "react";
import Catalogo from "./Catalogo/Catalogo";
import Footer from "../../components/Footer/Footer";
import Filtros from "../Shop/Filtros/Filtros";
import styles from "./Shop.module.css";
import { useLocation } from "react-router-dom";
import UserNavbar from "../../components/UserNavbar/UserNavbar";
import { obtenerAutos } from "../../api/autos";

function Shop({ loggedIn }) {
  const [autosDB, setAutosDB] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [marcasSeleccionadas, setMarcasSeleccionadas] = useState([]);
  const [filtrosVisible, setFiltrosVisible] = useState(false);

  const location = useLocation(); // Esto sirve para recibir el state que esta en CATEGORIAS.JSX

  // Función para cargar autos con paginación
  const fetchAutos = async (page = 1) => {
    setLoading(true);
    try {
      const data = await obtenerAutos(page, 20);
      console.log("Datos recibidos:", data);

      // Ajuste para manejar diferentes estructuras de respuesta
      setAutosDB(data.autos || data);
      setPagination(data.pagination || null);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error al cargar autos desde el backend", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAutos(1);
  }, []);

  // Manejar categoría seleccionada desde el estado de la ubicación
  useEffect(() => {
    if (location.state?.categoriaSeleccionada) {
      //Hay alguna categoriaSeleccionada?
      setCategoriasSeleccionadas([location.state.categoriaSeleccionada]); // Aqui se le pasa la categoria seleccionada, desde el HOME CATEGORIAS
      setCurrentPage(1);
    }
  }, [location.state]);

  // Función para manejar cambio de página
  const handlePageChange = (newPage) => {
    fetchAutos(newPage);
    // Scroll al inicio de la página
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        {filtrosVisible && (
          <Filtros
            categorias={categoriasConCantidad} //LE PASO AL FILTROS.JSX LAS CANT. DE CATEGORIAS
            marcas={marcasConCantidad} //LE PASO AL FILTROS.JSX LAS CANT. DE MARCAS
            categoriasSeleccionadas={categoriasSeleccionadas}
            setCategoriasSeleccionadas={setCategoriasSeleccionadas}
            marcasSeleccionadas={marcasSeleccionadas}
            setMarcasSeleccionadas={setMarcasSeleccionadas}
            setFiltrosVisible={setFiltrosVisible}
            filtrosVisible={filtrosVisible}
          />
        )}

        {loading ? (
          <div className={styles.loadingContainer}>
            <p>Cargando autos...</p>
          </div>
        ) : (
          <Catalogo
            autos={autosFiltrados}
            limpiarFiltros={limpiarFiltros}
            loggedIn={loggedIn}
            setFiltrosVisible={setFiltrosVisible}
            filtrosVisible={filtrosVisible}
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default Shop;
