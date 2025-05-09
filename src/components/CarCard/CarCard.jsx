import React from "react";
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
}) => {
  return (
    <div className={styles.cardConteiner}>
      <div className={styles.headConteiner}>
        <p className={styles.cardTitle}>{name}</p>
        <p className={styles.carType}>{category}</p>
      </div>
      <img className={styles.cardImage} src={image} alt={name} />
      <div className={styles.cardDataCar}>
        <span className={styles.cardCapacity}>
          <FontAwesomeIcon className={styles.iconUsers} icon={faUsers} />
          {` ${passengers} Personas`}
        </span>
        <span className={styles.cardGearBox}>
          <FontAwesomeIcon className={styles.iconRoad} icon={faRoad} />
          {transmission}
        </span>
      </div>
      <p className={styles.cardPrice}>
        <span className={styles.priceValue}>
          Ars ${price.toLocaleString()} /
        </span>
        <span className={styles.priceUnit}> Día</span>
      </p>
      <div className={styles.cardButton}>
        <a href="#">Rentar</a>
      </div>
    </div>
  );
};

export default CarCard;
