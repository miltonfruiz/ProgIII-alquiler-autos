import React from "react";
import styles from "./WhyUs.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldAlt,
  faHeadset,
  faClock,
  faHeart,
  faCarSide,
  faAward,
  faMapMarkerAlt,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
function WhyUs() {
  return (
    <section className={styles.whyUsSection}>
      <div className={styles.whyUsContainer}>
        <div className={styles.imageContainer}>
          <img
            src="https://images.pexels.com/photos/1134857/pexels-photo-1134857.jpeg?_gl=1*1f15jub*_ga*MjA3ODgzMzg2MC4xNzUyNTEzNzYz*_ga_8JE65Q40S6*czE3NTYxNDQ2MTAkbzEwJGcxJHQxNzU2MTQ0NjE1JGo1NSRsMCRoMA..s"
            alt="Vehículo de RentCars"
            className={styles.carImage}
          />
        </div>

        <div className={styles.contentContainer}>
          <h2 className={styles.sectionTitle}>¿Por qué elegir RentCars?</h2>

          <div className={styles.featuresGrid}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <FontAwesomeIcon icon={faCarSide} className={styles.icon} />
              </div>
              <div className={styles.featureContent}>
                <h3>Vehículos en excelente estado</h3>
                <p>
                  Mantenimiento constante y garantía de calidad en todos
                  nuestros autos.
                </p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <FontAwesomeIcon icon={faHeadset} className={styles.icon} />
              </div>
              <div className={styles.featureContent}>
                <h3>Atención personalizada</h3>
                <p>Te ayudamos a encontrar el auto ideal para cada ocasión.</p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <FontAwesomeIcon icon={faClock} className={styles.icon} />
              </div>
              <div className={styles.featureContent}>
                <h3>Experiencia rápida y segura</h3>
                <p>Disfruta de un proceso de alquiler simple y transparente.</p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <FontAwesomeIcon icon={faShieldAlt} className={styles.icon} />
              </div>
              <div className={styles.featureContent}>
                <h3>Tranquilidad garantizada</h3>
                <p>Sabes que estás en buenas manos durante cada kilómetro.</p>
              </div>
            </div>
          </div>

          <button className={styles.ctaButton}>Descubre nuestra flota</button>
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
