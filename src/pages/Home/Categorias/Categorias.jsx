import React from "react";
import styles from "./Categorias.module.css";
import economicCar from "../../../assets/toyota_etios.png";
import estandarCar from "../../../assets/fiat-cronos.png";
import suvCar from "../../../assets/vw-t-cross.png";
import fullSizeCar from "../../../assets/toyota_etios-sedan.png";

function Categorias() {
  return (
    <section className={styles.categoriesSection}>
      <div className={styles.titleConteiner}>
        <h2>Categorias</h2>
      </div>
      <div className={styles.categoriesConteiner}>
        <div className={styles.cardConteiner}>
          <p className={styles.cardTitle}>Económico</p>
          <img className={styles.cardImage} src={economicCar} alt="" />
          <p className={styles.cardLabel}>Desde </p>
          <p className={styles.cardPrice}>
            <span className={styles.priceValue}>Ars $36.300 /</span>
            <span className={styles.priceUnit}> Día</span>
          </p>
          <div className={styles.cardButton}>
            <a href="">Ver Mas</a>
          </div>
        </div>

        <div className={styles.cardConteiner}>
          <p className={styles.cardTitle}>Estándar</p>
          <img
            className={`${styles.cardImage} ${styles.estandarImage}`}
            src={estandarCar}
            alt=""
          />
          <p className={styles.cardLabel}>Desde </p>
          <p className={styles.cardPrice}>
            <span className={styles.priceValue}>Ars $37.800 /</span>
            <span className={styles.priceUnit}> Día</span>
          </p>
          <div className={styles.cardButton}>
            <a href="">Ver Mas</a>
          </div>
        </div>

        <div className={styles.cardConteiner}>
          <p className={styles.cardTitle}>SUV</p>
          <img className={styles.cardImage} src={suvCar} alt="" />
          <p className={styles.cardLabel}>Desde </p>
          <p className={styles.cardPrice}>
            <span className={styles.priceValue}>Ars $69.200 /</span>
            <span className={styles.priceUnit}> Día</span>
          </p>
          <div className={styles.cardButton}>
            <a href="">Ver Mas</a>
          </div>
        </div>

        <div className={styles.cardConteiner}>
          <p className={styles.cardTitle}>Full Size</p>
          <img className={styles.cardImage} src={fullSizeCar} alt="" />
          <p className={styles.cardLabel}>Desde </p>
          <p className={styles.cardPrice}>
            <span className={styles.priceValue}>Ars $58,300 /</span>
            <span className={styles.priceUnit}> Día</span>
          </p>
          <div className={styles.cardButton}>
            <a href="">Ver Mas</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categorias;
