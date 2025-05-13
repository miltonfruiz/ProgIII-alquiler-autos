import React from "react";
import styles from "./Recomendados.module.css";
import toyotaCar from "../../../assets/images/cars/toyota_etios.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faRoad } from "@fortawesome/free-solid-svg-icons";

function Recomendados() {
  return (
    <section className={styles.recomendadosSection}>
      <div className={styles.titleConteiner}>
        <h3>Recomendados</h3>
        <p>Los más usados entre nuestros clientes</p>
      </div>

      <div className={styles.recomendadosConteiner}>
        <div className={styles.cardConteiner}>
          <p className={styles.cardTitle}>Toyota Etios</p>
          <img className={styles.cardImage} src={toyotaCar} alt="" />
          <div className={styles.cardDataCar}>
            <span className={styles.cardCapacity}>
              {" "}
              <FontAwesomeIcon className={styles.iconUsers} icon={faUsers} />
              Personas
            </span>
            <span className={styles.cardGearBox}>
              <FontAwesomeIcon className={styles.iconRoad} icon={faRoad} />
              Manual
            </span>
          </div>
          <p className={styles.cardPrice}>
            <span className={styles.priceValue}>Ars $36.300 /</span>
            <span className={styles.priceUnit}> Día</span>
          </p>
          <div className={styles.cardButton}>
            <a href="">Rentar</a>
          </div>
        </div>

        <div className={styles.cardConteiner}>
          <p className={styles.cardTitle}>Toyota Etios</p>
          <img className={styles.cardImage} src={toyotaCar} alt="" />
          <div className={styles.cardDataCar}>
            <span className={styles.cardCapacity}>
              {" "}
              <FontAwesomeIcon className={styles.iconUsers} icon={faUsers} />
              Personas
            </span>
            <span className={styles.cardGearBox}>
              <FontAwesomeIcon className={styles.iconRoad} icon={faRoad} />
              Manual
            </span>
          </div>
          <p className={styles.cardPrice}>
            <span className={styles.priceValue}>Ars $36.300 /</span>
            <span className={styles.priceUnit}> Día</span>
          </p>
          <div className={styles.cardButton}>
            <a href="">Rentar</a>
          </div>
        </div>

        <div className={styles.cardConteiner}>
          <p className={styles.cardTitle}>Toyota Etios</p>
          <img className={styles.cardImage} src={toyotaCar} alt="" />
          <div className={styles.cardDataCar}>
            <span className={styles.cardCapacity}>
              {" "}
              <FontAwesomeIcon className={styles.iconUsers} icon={faUsers} />
              Personas
            </span>
            <span className={styles.cardGearBox}>
              <FontAwesomeIcon className={styles.iconRoad} icon={faRoad} />
              Manual
            </span>
          </div>
          <p className={styles.cardPrice}>
            <span className={styles.priceValue}>Ars $36.300 /</span>
            <span className={styles.priceUnit}> Día</span>
          </p>
          <div className={styles.cardButton}>
            <a href="">Rentar</a>
          </div>
        </div>

        <div className={styles.cardConteiner}>
          <p className={styles.cardTitle}>Toyota Etios</p>
          <img className={styles.cardImage} src={toyotaCar} alt="" />
          <div className={styles.cardDataCar}>
            <span className={styles.cardCapacity}>
              {" "}
              <FontAwesomeIcon className={styles.iconUsers} icon={faUsers} />
              Personas
            </span>
            <span className={styles.cardGearBox}>
              <FontAwesomeIcon className={styles.iconRoad} icon={faRoad} />
              Manual
            </span>
          </div>
          <p className={styles.cardPrice}>
            <span className={styles.priceValue}>Ars $36.300 /</span>
            <span className={styles.priceUnit}> Día</span>
          </p>
          <div className={styles.cardButton}>
            <a href="">Rentar</a>
          </div>
        </div>

        <div className={styles.cardConteiner}>
          <p className={styles.cardTitle}>Toyota Etios</p>
          <img className={styles.cardImage} src={toyotaCar} alt="" />
          <div className={styles.cardDataCar}>
            <span className={styles.cardCapacity}>
              {" "}
              <FontAwesomeIcon className={styles.iconUsers} icon={faUsers} />
              Personas
            </span>
            <span className={styles.cardGearBox}>
              <FontAwesomeIcon className={styles.iconRoad} icon={faRoad} />
              Manual
            </span>
          </div>
          <p className={styles.cardPrice}>
            <span className={styles.priceValue}>Ars $36.300 /</span>
            <span className={styles.priceUnit}> Día</span>
          </p>
          <div className={styles.cardButton}>
            <a href="">Rentar</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Recomendados;
