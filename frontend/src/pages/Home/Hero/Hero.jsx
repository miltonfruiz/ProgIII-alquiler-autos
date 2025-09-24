import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Hero.module.css";
import Carrousel from "../CarrouselHero/carrousel";

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
      <div className={styles.heroContent}>
        <div className={styles.textContainer}>
          <div className={styles.textContent}>
            <h1>Una manera sencilla de rentar autos</h1>
            <p>
              Reservá tu auto en segundos y disfrutá del camino sin
              preocupaciones
            </p>
          </div>
        </div>
      </div>
      <Carrousel />
    </section>
  );
}

export default Hero;
