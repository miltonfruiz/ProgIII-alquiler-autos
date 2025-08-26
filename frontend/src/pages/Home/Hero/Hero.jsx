import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Hero.module.css";
import carImage from "../../../../public/images/auto-hero.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Hero({ loggedIn }) {
  const navigate = useNavigate();

  const handleRentClick = () => {
    if (loggedIn) {
      navigate("/shop");
    } else {
      navigate("/");
    }
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroOverlay}></div>
      <div className={styles.heroContent}>
        <div className={styles.textContainer}>
          <div className={styles.textContent}>
            <h1>Una manera sencilla de rentar autos</h1>
            <p>
              Reservá tu auto en segundos y disfrutá del camino sin
              preocupaciones
            </p>
          </div>
          <div className={styles.btnContainer}>
            <button onClick={handleRentClick}>Rentar ya</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
