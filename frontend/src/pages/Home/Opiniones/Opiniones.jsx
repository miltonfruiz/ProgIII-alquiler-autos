import React from "react";
import styles from "./Opiniones.module.css";

import profilePic from "../../../../public/images/reviews/user-profile.png";
import profilePic2 from "../../../../public/images/reviews/user-profile2.png";
import profilePic3 from "../../../../public/images/reviews/user-profile3.jpg";
import profilePic4 from "../../../../public/images/reviews/user-profile4.png";
import profilePic5 from "../../../../public/images/reviews/user-profile5.png";
import profilePic6 from "../../../../public/images/reviews/user-profile6.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCarRear,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

function StarRating({ rating = 4, maxStars = 5 }) {
  return (
    <div className={styles.starRating}>
      {[...Array(maxStars)].map((_, i) => (
        <FontAwesomeIcon
          key={i}
          icon={i < rating ? solidStar : regularStar}
          className={i < rating ? styles.filledStar : styles.emptyStar}
        />
      ))}
      <span className={styles.ratingText}>
        {rating} de {maxStars} estrellas
      </span>
    </div>
  );
}

function Opiniones() {
  return (
    <section className={styles.opinionesSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Experiencia de usuarios</h2>
        <p className={styles.sectionSubtitle}>
          Descubre por qué miles de personas confían en RentCars para sus
          alquileres de vehículos
        </p>
      </div>

      <div className={styles.opinionesContainer}>
        <div className={styles.opinionesGrid}>
          <div className={styles.opinionesCard}>
            <div className={styles.cardHeader}>
              <div className={styles.profileContainer}>
                <img
                  className={styles.profileImage}
                  src={profilePic}
                  alt="Maria San Juan"
                />
                <div className={styles.profileInfo}>
                  <span className={styles.name}>Maria San Juan</span>
                  <span className={styles.date}>25/03/2025</span>
                </div>
              </div>
              <div className={styles.vehicleInfo}>
                <FontAwesomeIcon
                  className={styles.vehicleIcon}
                  icon={faCarRear}
                />
                <span>Toyota Etios</span>
              </div>
            </div>
            <p className={styles.opinionText}>
              "Muy amable y puntual. El auto estaba en excelentes condiciones."
            </p>
            <div className={styles.ratingContainer}>
              <StarRating rating={4} />
            </div>
          </div>

          <div className={styles.opinionesCard}>
            <div className={styles.cardHeader}>
              <div className={styles.profileContainer}>
                <img
                  className={styles.profileImage}
                  src={profilePic4}
                  alt="Lucas Fernández"
                />
                <div className={styles.profileInfo}>
                  <span className={styles.name}>Lucas Fernández</span>
                  <span className={styles.date}>12/02/2025</span>
                </div>
              </div>
              <div className={styles.vehicleInfo}>
                <FontAwesomeIcon
                  className={styles.vehicleIcon}
                  icon={faCarRear}
                />
                <span>Peugot 208</span>
              </div>
            </div>
            <p className={styles.opinionText}>
              "La experiencia fue súper cómoda, repetiría sin dudas."
            </p>
            <div className={styles.ratingContainer}>
              <StarRating rating={4} />
            </div>
          </div>

          <div className={styles.opinionesCard}>
            <div className={styles.cardHeader}>
              <div className={styles.profileContainer}>
                <img
                  className={styles.profileImage}
                  src={profilePic2}
                  alt="Camila Ríos"
                />
                <div className={styles.profileInfo}>
                  <span className={styles.name}>Camila Ríos</span>
                  <span className={styles.date}>22/01/2025</span>
                </div>
              </div>
              <div className={styles.vehicleInfo}>
                <FontAwesomeIcon
                  className={styles.vehicleIcon}
                  icon={faCarRear}
                />
                <span>Fiat Cronos</span>
              </div>
            </div>
            <p className={styles.opinionText}>
              "Todo impecable. Muy buena atención y responsabilidad."
            </p>
            <div className={styles.ratingContainer}>
              <StarRating rating={5} />
            </div>
          </div>

          <div className={styles.opinionesCard}>
            <div className={styles.cardHeader}>
              <div className={styles.profileContainer}>
                <img
                  className={styles.profileImage}
                  src={profilePic5}
                  alt="Tomás Aguirre"
                />
                <div className={styles.profileInfo}>
                  <span className={styles.name}>Tomás Aguirre</span>
                  <span className={styles.date}>11/04/2025</span>
                </div>
              </div>
              <div className={styles.vehicleInfo}>
                <FontAwesomeIcon
                  className={styles.vehicleIcon}
                  icon={faCarRear}
                />
                <span>Volkswagen Gol</span>
              </div>
            </div>
            <p className={styles.opinionText}>
              "Rápido, sencillo y sin problemas. Recomiendo."
            </p>
            <div className={styles.ratingContainer}>
              <StarRating rating={4} />
            </div>
          </div>

          <div className={styles.opinionesCard}>
            <div className={styles.cardHeader}>
              <div className={styles.profileContainer}>
                <img
                  className={styles.profileImage}
                  src={profilePic3}
                  alt="Florencia Medina"
                />
                <div className={styles.profileInfo}>
                  <span className={styles.name}>Florencia Medina</span>
                  <span className={styles.date}>20/01/2025</span>
                </div>
              </div>
              <div className={styles.vehicleInfo}>
                <FontAwesomeIcon
                  className={styles.vehicleIcon}
                  icon={faCarRear}
                />
                <span>Ford Ka</span>
              </div>
            </div>
            <p className={styles.opinionText}>
              "Excelente trato y muy buen estado del auto."
            </p>
            <div className={styles.ratingContainer}>
              <StarRating rating={4} />
            </div>
          </div>

          <div className={styles.opinionesCard}>
            <div className={styles.cardHeader}>
              <div className={styles.profileContainer}>
                <img
                  className={styles.profileImage}
                  src={profilePic6}
                  alt="Julián Navarro"
                />
                <div className={styles.profileInfo}>
                  <span className={styles.name}>Julián Navarro</span>
                  <span className={styles.date}>07/02/2025</span>
                </div>
              </div>
              <div className={styles.vehicleInfo}>
                <FontAwesomeIcon
                  className={styles.vehicleIcon}
                  icon={faCarRear}
                />
                <span>Volkswagen T-Cross</span>
              </div>
            </div>
            <p className={styles.opinionText}>
              "Todo salió como lo acordamos. Muy confiable."
            </p>
            <div className={styles.ratingContainer}>
              <StarRating rating={4} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Opiniones;
