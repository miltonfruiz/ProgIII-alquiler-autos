import React, { useState, useEffect } from "react";
import styles from "./Catalogo.module.css";
import CarCard from "../../../components/CarCard/CarCard";
import mockCars from "../../../data/mockCars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faRoad } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import Modal from "../../../components/Modal/Modal";

function Catalogo({ autos, limpiarFiltros, loggedIn }) {
  const [autoSeleccionado, setAutoSeleccionado] = useState(null);
  const navigate = useNavigate();

  const abrirOverlay = (auto) => {
    setAutoSeleccionado(auto);
  };

  const cerrarOverlay = () => {
    setAutoSeleccionado(null); // Se utiliza null, ya que en el componente "overlay" se verifica con un IF si es NULL no se muestra.
  };

  useEffect(() => {
    if (autoSeleccionado) {
      document.body.classList.add("bloquear-scroll");
    } else {
      document.body.classList.remove("bloquear-scroll");
    }
  }, [autoSeleccionado]);

  return (
    <section className={styles.catalogoSection}>
      <div className={styles.headCatalogo}>
        <p className={styles.found}>{autos.length} Autos Encontrados</p>
        <button className={styles.filterBtn} onClick={limpiarFiltros}>
          Borrar Filtros
        </button>
      </div>
      <div className={styles.carsSection}>
        <div className={styles.recomendadosConteiner}>
          {autos.length > 0 ? (
            autos.map((car) => (
              <CarCard key={car.id} {...car} onRent={() => abrirOverlay(car)} />
            ))
          ) : (
            <div className={styles.noResults}>
              <p>No se encontraron autos con los filtros seleccionados</p>
              <button className={styles.filterBtn} onClick={limpiarFiltros}>
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {autoSeleccionado && (
        <Modal auto={autoSeleccionado} onClose={cerrarOverlay} />
      )}
    </section>
  );
}

export default Catalogo;
