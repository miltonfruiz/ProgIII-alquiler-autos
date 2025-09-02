import React, { useState, useEffect, useCallback, useMemo } from "react";
import styles from "./Catalogo.module.css";
import CarCard from "../../../components/CarCard/CarCard";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/Modal/Modal";

function Catalogo({
  autos,
  limpiarFiltros,
  loggedIn,
  filtrosVisible,
  setFiltrosVisible,
}) {
  const [autoSeleccionado, setAutoSeleccionado] = useState(null);
  const navigate = useNavigate();

  // Usar useCallback para funciones que se pasan como props
  const abrirOverlay = useCallback((auto) => {
    setAutoSeleccionado(auto);
  }, []);

  const cerrarOverlay = useCallback(() => {
    setAutoSeleccionado(null);
  }, []);

  // Efecto para controlar el scroll
  useEffect(() => {
    if (autoSeleccionado) {
      document.body.classList.add("bloquear-scroll");
    } else {
      document.body.classList.remove("bloquear-scroll");
    }

    // Cleanup function
    return () => {
      document.body.classList.remove("bloquear-scroll");
    };
  }, [autoSeleccionado]);

  // Memoizar el contenido de los autos para mejorar rendimiento
  const autosContent = useMemo(() => {
    if (autos.length === 0) {
      return (
        <div className={styles.noResults}>
          <p>No se encontraron autos con los filtros seleccionados</p>
          <button className={styles.filterBtn} onClick={limpiarFiltros}>
            Limpiar filtros
          </button>
        </div>
      );
    }

    return autos.map((car) => (
      <CarCard key={car.id} {...car} onRent={() => abrirOverlay(car)} />
    ));
  }, [autos, abrirOverlay, limpiarFiltros]);

  return (
    <section className={styles.catalogoSection}>
      <h2 className={styles.title}>CATÁLOGO</h2>
      <div className={styles.headCatalogo}>
        <p className={styles.found}>
          {autos.length} Auto{autos.length !== 1 ? "s" : ""} Encontrado
          {autos.length !== 1 ? "s" : ""}
        </p>
        <button
          className={`${styles.filterBtn} ${
            filtrosVisible ? styles.active : ""
          }`}
          onClick={() => setFiltrosVisible((prev) => !prev)}
          aria-expanded={filtrosVisible}
          aria-controls="filtros-container"
        >
          {filtrosVisible ? "Ocultar filtros" : "Mostrar filtros"}
        </button>
      </div>

      <div className={styles.carsSection}>
        <div className={styles.recomendadosConteiner}>{autosContent}</div>
      </div>

      {autoSeleccionado && (
        <Modal auto={autoSeleccionado} onClose={cerrarOverlay} />
      )}
    </section>
  );
}

export default React.memo(Catalogo);
