import React, { use } from "react";
import styles from "./Categorias.module.css";
import economicCar from "../../../assets/images/cars/toyota_etios.png";
import estandarCar from "../../../assets/images/cars/fiat-cronos.png";
import suvCar from "../../../assets/images/cars/vw-t-cross.png";
import fullSizeCar from "../../../assets/images/cars/toyota_etios-sedan.png";
import { useNavigate } from "react-router-dom";

function Categorias({ loggedIn }) {
  const navigate = useNavigate();

  const handleCategoriasClick = (categoria) => {
    if (!loggedIn) {
      navigate("/");
      return;
    }
    navigate("/shop", { state: { categoriaSeleccionada: categoria } });
  };

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
            <button onClick={() => handleCategoriasClick("Económico")}>
              Ver Más
            </button>
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
            <button onClick={() => handleCategoriasClick("Estándar")}>
              Ver Más
            </button>
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
            <button onClick={() => handleCategoriasClick("SUV")}>
              Ver Más
            </button>
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
            <button onClick={() => handleCategoriasClick("Full Size")}>
              Ver Más
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categorias;
