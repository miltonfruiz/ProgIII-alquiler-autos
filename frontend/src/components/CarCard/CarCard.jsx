import React, { useState } from "react";
import styles from "./CarCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faRoad } from "@fortawesome/free-solid-svg-icons";

const CarCard = ({
  name,
  category,
  image,
  passengers,
  transmission,
  price,
  onRent,
}) => {
  const [activo, setActivo] = useState(false);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.headContainer}>
        <p className={styles.cardTitle}>{name}</p>
        <p className={styles.carType}>{category}</p>
      </div>

      <div className={styles.imageContainer}>
        <img className={styles.cardImage} src={image} alt={name} />
      </div>

      <div className={styles.cardDataCar}>
        <span className={styles.cardCapacity}>
          <FontAwesomeIcon className={styles.icon} icon={faUsers} />
          {` ${passengers} Personas`}
        </span>
        <span className={styles.cardGearBox}>
          <FontAwesomeIcon className={styles.icon} icon={faRoad} />
          {transmission}
        </span>
      </div>

      <div className={styles.priceContainer}>
        <span className={styles.priceValue}>
          Ars ${price.toLocaleString()} /
        </span>
        <span className={styles.priceUnit}> día</span>
      </div>

      <div className={styles.cardButton}>
        <button onClick={onRent} className={styles.rentButton}>
          Rentar ahora
        </button>
      </div>
    </div>
  );
};

export default CarCard;
