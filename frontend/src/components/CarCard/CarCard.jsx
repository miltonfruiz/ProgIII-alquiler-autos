import React, { useState } from "react";
import styles from "./CarCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faRoad } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CarCard = ({
  name,
  category,
  image,
  passengers,
  transmission,
  price,
  onRent,
  loggedIn,
}) => {
  const [activo, setActivo] = useState(false);
  const navigate = useNavigate();

  const handleRentClick = () => {
    if (!loggedIn) {
      toast("Debes iniciar sesión para rentar un auto");
      navigate("/login");
      return;
    }
    onRent();
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.categoryBadge}>{category}</div>
      <div className={styles.headContainer}>
        <p className={styles.cardTitle}>{name}</p>
      </div>

      <div className={styles.imageContainer}>
        <img
          className={styles.cardImage}
          src={`http://localhost:3000${image}`}
          alt={name}
        />
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
        <button onClick={handleRentClick} className={styles.rentButton}>
          Rentar ahora
        </button>
      </div>
    </div>
  );
};

export default CarCard;
