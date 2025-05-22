import React from "react";
import styles from "./Navbar.module.css";
import carLogo from "../../assets/car-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className={styles.navBarConteiner}>
      <Link to="/home">
        <img
          className={styles.logoMarca}
          src={carLogo}
          alt="logo de la marca"
        ></img>
      </Link>

      <div className={styles.iconsConteiner}>
        <Link to="/shop" className={styles.carIcon}>
          Shop
        </Link>
        <Link to="/register" className={styles.userIcon}>
          <FontAwesomeIcon icon={faUser} />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
