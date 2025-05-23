import React from "react";
import styles from "./RentNow.module.css";
import rentCars from "../../../assets/rentCars.png";
import { useNavigate } from "react-router-dom";

function RentNow({ loggedIn }) {
  const navigate = useNavigate();

  const handleRentNowClick = () => {
    if (loggedIn) {
      navigate("/shop");
    } else {
      navigate("/");
    }
  };

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
          <button className={styles.rentNowButton} onClick={handleRentNowClick}>
            Reservar ahora
          </button>
          {/* aqui hay que validar que este logeado*/}
        </div>
      </div>
    </section>
  );
}

export default RentNow;
