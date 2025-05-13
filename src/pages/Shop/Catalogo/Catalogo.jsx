import React from "react";
import styles from "./Catalogo.module.css";
import CarCard from "../../../components/CarCard/CarCard";
import mockCars from "../../../data/mockCars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faRoad } from "@fortawesome/free-solid-svg-icons";

function Catalogo({ autos, limpiarFiltros }) {
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
            autos.map((car) => <CarCard key={car.id} {...car} />)
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
    </section>
  );
}

export default Catalogo;
