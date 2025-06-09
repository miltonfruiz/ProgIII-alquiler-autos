import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.companyName}>
        <p className={styles.companyTitle}>RENTCARS</p>
        <p className={styles.companyAbout}>
          Somos un equipo joven apasionado por la tecnología y los viajes.
          Creamos esta plataforma para hacer del alquiler de autos algo fácil,
          transparente y accesible para todos.
        </p>
      </div>
      <section className={styles.footerAbout}>
        <h3 className={styles.footerTitle}>Sobre Nosotros</h3>
        <ul className={styles.footerLinks}>
          <li>
            <a href="#" className={styles.footerLink}>
              Cómo alquilar
            </a>
          </li>
          <li>
            <a href="#" className={styles.footerLink}>
              Quiénes somos
            </a>
          </li>
          <li>
            <a href="#" className={styles.footerLink}>
              Colaboraciones
            </a>
          </li>
        </ul>
      </section>
      <section className={styles.socialSection}>
        <h3 className={styles.footerTitle}>Redes Sociales</h3>
        <ul className={styles.footerLinks}>
          <li>
            <a href="#" className={styles.footerLink}>
              Facebook
            </a>
          </li>
          <li>
            <a href="#" className={styles.footerLink}>
              Instagram
            </a>
          </li>
          <li>
            <a href="#" className={styles.footerLink}>
              Twitter
            </a>
          </li>
        </ul>
      </section>
      <section className={styles.supportSection}>
        <h3 className={styles.footerTitle}>Soporte Al Cliente</h3>
        <ul className={styles.footerLinks}>
          <li>
            <a href="#" className={styles.footerLink}>
              Preguntas Frecuentes
            </a>
          </li>
          <li>
            <a href="#" className={styles.footerLink}>
              Requisitos de alquiler
            </a>
          </li>
          <li>
            <a href="#" className={styles.footerLink}>
              Centro De Ayuda
            </a>
          </li>
        </ul>
      </section>
      <div className={styles.bottomSection}>
        <p className={styles.copyright}>
          ©2025 RentCars Todos los derechos registrados
        </p>
        <div className={styles.legalLinks}>
          <a href="#" className={styles.link}>
            Política de Privacidad
          </a>
          <a href="#" className={styles.link}>
            Terminos y Condiciones
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
