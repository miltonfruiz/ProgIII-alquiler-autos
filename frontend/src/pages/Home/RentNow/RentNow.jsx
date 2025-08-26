import React from "react";
import styles from "./RentNow.module.css";
import rentCars from "../../../../public/images/rentCars.png";
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
      <div className={styles.imageContainer}>
        <img
          className={styles.rentNowImage}
          src={rentCars}
          alt="Vehículos disponibles para alquilar"
        />
        <div className={styles.overlayContent}>
          <div className={styles.textContent}>
            <h2 className={styles.rentNowTitle}>Reserva tu auto ahora</h2>
            <p className={styles.rentNowText}>
              ¿Listo para manejar? Iniciá sesión o creá tu cuenta para completar
              la reserva
            </p>
          </div>
          <div className={styles.buttonContainer}>
            <button
              className={styles.rentNowButton}
              onClick={handleRentNowClick}
            >
              Empezar ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RentNow;
