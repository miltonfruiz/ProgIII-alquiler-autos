import React from "react";
import styles from "./RentNow.module.css";
import rentCars from "../../../assets/rentCars.png";

function RentNow() {
  return (
    <section className={styles.rentNowSection}>
      <div className={styles.imageConteiner}>
        <img className={styles.rentNowImage} src={rentCars} alt="" />
      </div>
      <div className={styles.overlayContent}>
        <div className={styles.rentNowContent}>
          <span className={styles.rentNowTitle}>Reserva tu auto ahora</span>
          <span className={styles.rentNowText}>
            ¿Listo para manejar? Iniciá sesión o creá tu cuenta para completar
            la reserva
          </span>
        </div>
        <div className={styles.rentNowButtonConteiner}>
          <a className={styles.rentNowButton}>Reservar ahora</a>{" "}
          {/* aqui hay que validar que este logeado*/}
        </div>
      </div>
    </section>
  );
}

export default RentNow;
