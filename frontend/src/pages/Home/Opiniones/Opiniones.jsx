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
      <span className={styles.ratingText}>
        {rating} de {maxStars} estrellas
      </span>
      {[...Array(maxStars)].map((_, i) => (
        <FontAwesomeIcon
          key={i}
          icon={i < rating ? solidStar : regularStar}
          className={i < rating ? styles.filledStar : styles.emptyStar}
        />
      ))}
    </div>
  );
}

function Opiniones() {
  return (
    <section className={styles.opinionesSection}>
      <div className={styles.opinionesTitle}>
        <p>Opiniones de clientes de RentCars</p>
      </div>
      <div className={styles.opinionesConteiner}>
        <div className={styles.opinionesCard}>
          <div className={styles.profilePicConteiner}>
            <img className={styles.imageCard} src={profilePic} alt="" />
          </div>

          <div className={styles.cardContent}>
            <div className={styles.cardHead}>
              <span className={styles.nameCard}>Maria San Juan</span>
              <span className={styles.dateCard}>25/03/2025</span>
            </div>
            <p className={styles.cardVehicule}>
              <FontAwesomeIcon className={styles.cardIcon} icon={faCarRear} />
              Vehículo: Toyota Etios
            </p>
            <p className={styles.cardOpinion}>
              “Muy amable y puntual. El auto estaba en excelentes condiciones.”
            </p>
            <div className={styles.cardRating}>
              <StarRating rating={4} />
            </div>
          </div>
        </div>
        <div className={styles.opinionesCard}>
          <div className={styles.profilePicConteiner}>
            <img className={styles.imageCard} src={profilePic4} alt="" />
          </div>

          <div className={styles.cardContent}>
            <div className={styles.cardHead}>
              <span className={styles.nameCard}>Lucas Fernández</span>
              <span className={styles.dateCard}>12/02/2025</span>
            </div>
            <p className={styles.cardVehicule}>
              <FontAwesomeIcon className={styles.cardIcon} icon={faCarRear} />
              Vehículo: Peugot 208
            </p>
            <p className={styles.cardOpinion}>
              “La experiencia fue súper cómoda, repetiría sin dudas.”
            </p>
            <div className={styles.cardRating}>
              <StarRating rating={4} />
            </div>
          </div>
        </div>
        <div className={styles.opinionesCard}>
          <div className={styles.profilePicConteiner}>
            <img className={styles.imageCard} src={profilePic2} alt="" />
          </div>

          <div className={styles.cardContent}>
            <div className={styles.cardHead}>
              <span className={styles.nameCard}>Camila Ríos</span>
              <span className={styles.dateCard}>22/01/2025</span>
            </div>
            <p className={styles.cardVehicule}>
              <FontAwesomeIcon className={styles.cardIcon} icon={faCarRear} />
              Vehículo: Fiat Cronos
            </p>
            <p className={styles.cardOpinion}>
              “Todo impecable. Muy buena atención y responsabilidad.”
            </p>
            <div className={styles.cardRating}>
              <StarRating rating={5} />
            </div>
          </div>
        </div>
        <div className={styles.opinionesCard}>
          <div className={styles.profilePicConteiner}>
            <img className={styles.imageCard} src={profilePic5} alt="" />
          </div>

          <div className={styles.cardContent}>
            <div className={styles.cardHead}>
              <span className={styles.nameCard}>Tomás Aguirre</span>
              <span className={styles.dateCard}>11/04/2025</span>
            </div>
            <p className={styles.cardVehicule}>
              <FontAwesomeIcon className={styles.cardIcon} icon={faCarRear} />
              Vehículo: Volkswagen Gol
            </p>
            <p className={styles.cardOpinion}>
              “Rápido, sencillo y sin problemas. Recomiendo.”
            </p>
            <div className={styles.cardRating}>
              <StarRating rating={4} />
            </div>
          </div>
        </div>
        <div className={styles.opinionesCard}>
          <div className={styles.profilePicConteiner}>
            <img className={styles.imageCard} src={profilePic3} alt="" />
          </div>

          <div className={styles.cardContent}>
            <div className={styles.cardHead}>
              <span className={styles.nameCard}>Florencia Medina</span>
              <span className={styles.dateCard}>20/01/2025</span>
            </div>
            <p className={styles.cardVehicule}>
              <FontAwesomeIcon className={styles.cardIcon} icon={faCarRear} />
              Vehículo: Ford Ka
            </p>
            <p className={styles.cardOpinion}>
              “Excelente trato y muy buen estado del auto.”
            </p>
            <div className={styles.cardRating}>
              <StarRating rating={4} />
            </div>
          </div>
        </div>
        <div className={styles.opinionesCard}>
          <div className={styles.profilePicConteiner}>
            <img className={styles.imageCard} src={profilePic6} alt="" />
          </div>

          <div className={styles.cardContent}>
            <div className={styles.cardHead}>
              <span className={styles.nameCard}>Julián Navarro</span>
              <span className={styles.dateCard}>07/02/2025</span>
            </div>
            <p className={styles.cardVehicule}>
              <FontAwesomeIcon className={styles.cardIcon} icon={faCarRear} />
              Vehículo: Volkswagen T-Cross
            </p>
            <p className={styles.cardOpinion}>
              “Todo salió como lo acordamos. Muy confiable.”
            </p>
            <div className={styles.cardRating}>
              <StarRating rating={4} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Opiniones;
