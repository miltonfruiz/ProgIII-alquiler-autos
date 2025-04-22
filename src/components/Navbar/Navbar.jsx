import React from "react";
import styles from "./Navbar.module.css";
import carLogo from "../../assets/car-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  return (
    <div className={styles.navBarConteiner}>
      <img
        className={styles.logoMarca}
        src={carLogo}
        alt="logo de la marca"
      ></img>
      <div className={styles.iconsConteiner}>
        <a
          href="https://www.instagram.com/chinososa__/"
          className={styles.carIcon}
        >
          <FontAwesomeIcon icon={faCar} />
        </a>
        <a
          href="https://www.instagram.com/chinososa__/"
          className={styles.userIcon}
        >
          <FontAwesomeIcon icon={faUser} />
        </a>
      </div>
    </div>
  );
}

export default Navbar;
