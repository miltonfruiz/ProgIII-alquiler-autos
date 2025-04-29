import React from "react";
import styles from "./Hero.module.css";
import carImage from "../../../assets/auto-hero.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.textConteiner}>
        <div className={styles.textContent}>
          <h1>Una manera sencilla de rentar autos</h1>
          <p>
            Reservá tu auto en segundos y disfrutá del camino sin preocupaciones
          </p>
        </div>

        <div className={styles.btnConteiner}>
          <a href="#">Rentar ya</a>
        </div>
      </div>
      <div className={styles.carImgConteiner}>
        <img
          className={styles.carImagen}
          src={carImage}
          alt="imagen de un auto"
        />
      </div>
    </section>
  );
}

export default Hero;
