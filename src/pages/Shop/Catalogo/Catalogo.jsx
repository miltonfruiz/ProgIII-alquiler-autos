import React from "react";
import styles from "./Catalogo.module.css";
import CarCard from "../../../components/CarCard/CarCard";
import mockCars from "../../../data/mockCars";
import toyotaCar from "../../../assets/toyota_etios.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faRoad } from "@fortawesome/free-solid-svg-icons";

function Catalogo() {
  return (
    <section className={styles.catalogoSection}>
      <div className={styles.headCatalogo}>
        <p className={styles.found}>54 Autos Encontrados</p>
        <button className={styles.filterBtn}>Borrar Filtros</button>
      </div>
      <div className={styles.carsSection}>
        <div className={styles.recomendadosConteiner}>
          {mockCars.map((car) => (
            <CarCard key={car.id} {...car} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Catalogo;
