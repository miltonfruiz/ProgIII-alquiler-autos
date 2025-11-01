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
  pagination,
  onPageChange,
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

  // Función para cambiar de página
  const handlePageChange = (newPage) => {
    onPageChange(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generar array de números de página para mostrar
  const getPageNumbers = () => {
    if (!pagination) return [];

    const { currentPage, totalPages } = pagination;
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Si hay pocas páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Lógica para mostrar páginas con "..."
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

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
          {pagination?.totalItems || 0} Auto
          {pagination?.totalItems !== 1 ? "s" : ""} Encontrado
          {pagination?.totalItems !== 1 ? "s" : ""}
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

      {pagination && pagination.totalPages > 1 && (
        <div className={styles.paginationContainer}>
          <div className={styles.pageNumbers}>
            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  className={`${styles.pageNumber} ${
                    page === pagination.currentPage ? styles.active : ""
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              )
            )}
          </div>
        </div>
      )}

      {autoSeleccionado && (
        <Modal auto={autoSeleccionado} onClose={cerrarOverlay} />
      )}
    </section>
  );
}

export default React.memo(Catalogo);
