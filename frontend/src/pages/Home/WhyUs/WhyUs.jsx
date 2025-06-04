import React from "react";
import styles from "./WhyUs.module.css";
import imagenConcesionaria from "../../../../public/images/image-car.png";

function WhyUs() {
  return (
    <section className={styles.whyUsSection}>
      <div className={styles.whyUsConteiner}>
        <img
          className={styles.imagenConsensionaria}
          src={imagenConcesionaria}
          alt="Concesionaria"
        />
        <div className={styles.whyUsText}>
          <span className={styles.trustText}>
            ¿Porque confiar en (nom marca)?
          </span>
          <span className={styles.whyUs}>
            En (nombre de la marca) nos comprometemos a ofrecerte vehículos en
            excelente estado, con mantenimiento constante y garantía de calidad.
            Nuestro equipo te brinda una atención personalizada desde el primer
            contacto, ayudándote a encontrar el auto ideal para cada ocasión.
            Queremos que disfrutes de una experiencia de alquiler rápida, simple
            y segura. Más que autos, te damos tranquilidad, respaldo y la
            confianza de saber que estás en buenas manos durante cada kilómetro
            del camino.
          </span>
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
