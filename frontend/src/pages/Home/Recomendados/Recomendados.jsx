import React from "react";
import styles from "./Recomendados.module.css";
import CarCard from "../../../components/CarCard/CarCard";

function Recomendados({ autos }) {
  return (
    <section className={styles.recomendadosSection}>
      <div className={styles.titleConteiner}>
        <h3>Recomendados</h3>
        <p>Los más usados entre nuestros clientes</p>
      </div>

      <div className={styles.recomendadosConteiner}>
        {autos.map((car) => (
          <CarCard key={car.id} {...car} />
        ))}
      </div>
    </section>
  );
}

export default Recomendados;
